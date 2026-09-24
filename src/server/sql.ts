import "server-only";
import type { AnalyticsParams, Bucket, Filter, FilterParameter } from "@/lib/types";
import type { Params } from "./clickhouse";

/**
 * Column mapping for each filter parameter on the two UI tables.
 * `events` = stats_ui.events (one row per event), `sessions` = stats_ui.sessions.
 * A `null` on sessions means the parameter is event-scoped: session queries
 * resolve it through an IN (SELECT uid, sess_start FROM events ...) subquery.
 */
const COLUMNS: Record<FilterParameter, { events: string; sessions: string | null }> = {
  hostname: { events: "host", sessions: "host" },
  pathname: { events: "path", sessions: null },
  page_title: { events: "title", sessions: null },
  querystring: { events: "query", sessions: null },
  entry_page: { events: "path", sessions: "argMinMerge(entry_path)" },
  exit_page: { events: "path", sessions: "argMaxMerge(exit_path)" },
  referrer: { events: "sess_refhost", sessions: "sess_refhost" },
  sess_type: { events: "sess_type", sessions: "sess_type" },
  sess_engine: { events: "sess_engine", sessions: "sess_engine" },
  utm_source: { events: "utm_source", sessions: "utm_source" },
  utm_medium: { events: "utm_medium", sessions: "utm_medium" },
  utm_campaign: { events: "utm_campaign", sessions: "utm_campaign" },
  utm_content: { events: "utm_content", sessions: "utm_content" },
  utm_term: { events: "utm_term", sessions: "utm_term" },
  pid: { events: "pid", sessions: "pid" },
  cid: { events: "cid", sessions: "cid" },
  country: { events: "country", sessions: "country" },
  region: { events: "region", sessions: "region" },
  city: { events: "city", sessions: "city" },
  browser: { events: "browser", sessions: "browser" },
  browser_version: { events: "browser_version", sessions: "browser_version" },
  os: { events: "os", sessions: "os" },
  os_version: { events: "os_version", sessions: "os_version" },
  device_type: { events: "device_type", sessions: "device_type" },
  device_vendor: { events: "device_vendor", sessions: "device_vendor" },
  device_model: { events: "device_model", sessions: "device_model" },
  screen: { events: "concat(toString(screen_w), 'x', toString(screen_h))", sessions: "concat(toString(screen_w), 'x', toString(screen_h))" },
  locale: { events: "locale", sessions: "locale" },
  currency: { events: "currency", sessions: "currency" },
  language: { events: "language", sessions: "language" },
  timezone: { events: "tz", sessions: "tz" },
  build_version: { events: "build_version", sessions: null },
  event_name: { events: "name", sessions: null },
  user_id: { events: "user_id", sessions: "user_id" },
  uid: { events: "toString(uid)", sessions: "toString(uid)" },
  is_auth: { events: "toString(is_auth)", sessions: "toString(is_auth)" },
  is_bot: { events: "toString(is_bot)", sessions: "toString(is_bot)" },
  is_webview: { events: "toString(is_webview)", sessions: "toString(is_webview)" },
  asn_org: { events: "asn_org", sessions: null },
};

export const SESSION_ONLY_PARAMS = new Set<FilterParameter>(["entry_page", "exit_page"]);

export function eventColumn(p: FilterParameter): string {
  return COLUMNS[p].events;
}
export function sessionColumn(p: FilterParameter): string | null {
  return COLUMNS[p].sessions;
}

/** Bucketing expression in the requested timezone; returns a DateTime in tz. */
export function bucketExpr(col: string, bucket: Bucket, tzParam = "tz"): string {
  const t = `toTimeZone(${col}, {${tzParam}:String})`;
  switch (bucket) {
    case "minute":
      return `toStartOfMinute(${t})`;
    case "five_minutes":
      return `toStartOfFiveMinutes(${t})`;
    case "fifteen_minutes":
      return `toStartOfFifteenMinutes(${t})`;
    case "hour":
      return `toStartOfHour(${t})`;
    case "day":
      return `toStartOfDay(${t})`;
    case "week":
      return `toDateTime(toStartOfWeek(${t}, 1), {${tzParam}:String})`;
    case "month":
      return `toDateTime(toStartOfMonth(${t}), {${tzParam}:String})`;
  }
}

export interface Built {
  where: string; // without leading WHERE / AND
  params: Params;
}

function escapeLike(v: string) {
  return v.replace(/[\\%_]/g, "\\$&");
}

/** One filter as a SQL condition over `col`. Values are bound as query params. */
function condition(col: string, f: Filter, params: Params, idx: number): string {
  const key = (i: number) => `f${idx}_${i}`;
  switch (f.type) {
    case "is_null":
      return `${col} = ''`;
    case "is_not_null":
      return `${col} != ''`;
    case "equals": {
      params[key(0)] = f.value;
      return `${col} IN ({${key(0)}:Array(String)})`;
    }
    case "not_equals": {
      params[key(0)] = f.value;
      return `${col} NOT IN ({${key(0)}:Array(String)})`;
    }
    case "contains":
    case "not_contains":
    case "starts_with":
    case "ends_with": {
      const parts = f.value.map((v, i) => {
        const pat =
          f.type === "starts_with" ? `${escapeLike(v)}%` : f.type === "ends_with" ? `%${escapeLike(v)}` : `%${escapeLike(v)}%`;
        params[key(i)] = pat;
        return `${col} ${f.type === "not_contains" ? "NOT LIKE" : "LIKE"} {${key(i)}:String}`;
      });
      return `(${parts.join(f.type === "not_contains" ? " AND " : " OR ")})`;
    }
    case "regex": {
      const parts = f.value.map((v, i) => {
        params[key(i)] = v.slice(0, 500);
        return `match(${col}, {${key(i)}:String})`;
      });
      return `(${parts.join(" OR ")})`;
    }
  }
}

/** Base time/project/bot conditions for the events table. */
export function eventsBase(projectId: number, p: AnalyticsParams, params: Params, prefix = ""): string[] {
  params.projectId = projectId;
  params.from = Math.floor(p.from / 1000);
  params.to = Math.floor(p.to / 1000);
  const c = [
    `${prefix}projectId = {projectId:UInt32}`,
    `${prefix}date >= toDate(toDateTime({from:UInt32}))`,
    `${prefix}date <= toDate(toDateTime({to:UInt32}))`,
    `${prefix}dateTime >= toDateTime({from:UInt32})`,
    `${prefix}dateTime < toDateTime({to:UInt32})`,
  ];
  if (p.excludeBots !== false) c.push(`${prefix}is_bot = 0`);
  return c;
}

/** Base conditions for the sessions table (by session start). */
export function sessionsBase(projectId: number, p: AnalyticsParams, params: Params, prefix = ""): string[] {
  params.projectId = projectId;
  params.fromMs = p.from;
  params.toMs = p.to;
  const c = [
    `${prefix}projectId = {projectId:UInt32}`,
    `${prefix}date >= toDate(toDateTime(intDiv({fromMs:UInt64}, 1000)))`,
    `${prefix}date <= toDate(toDateTime(intDiv({toMs:UInt64}, 1000)))`,
    `${prefix}sess_start >= {fromMs:UInt64}`,
    `${prefix}sess_start < {toMs:UInt64}`,
  ];
  if (p.excludeBots !== false) c.push(`${prefix}is_bot = 0`);
  return c;
}

/**
 * WHERE for an events-table query. Session-only params (entry/exit page) are
 * resolved through a sessions subquery.
 */
export function buildEventsWhere(projectId: number, p: AnalyticsParams, eventsTable: string, sessionsTable: string): Built {
  const params: Params = {};
  const conds = eventsBase(projectId, p, params);
  const sessionOnly: Filter[] = [];
  p.filters.forEach((f, i) => {
    if (SESSION_ONLY_PARAMS.has(f.parameter)) sessionOnly.push(f);
    else conds.push(condition(eventColumn(f.parameter), f, params, i));
  });
  if (sessionOnly.length) {
    const sub = sessionsBase(projectId, p, params, "");
    const having = sessionOnly.map((f, i) => condition(sessionColumn(f.parameter)!, f, params, 1000 + i));
    conds.push(
      `(uid, sess_start) IN (SELECT uid, sess_start FROM ${sessionsTable} WHERE ${sub.join(" AND ")} GROUP BY uid, sess_start HAVING ${having.join(" AND ")})`
    );
  }
  void eventsTable;
  return { where: conds.join(" AND "), params };
}

/**
 * WHERE + HAVING for a sessions-table query. Event-scoped params (pathname,
 * event_name, ...) are resolved through an events subquery: sessions that
 * contain at least one matching event. Aggregated params go to HAVING.
 */
export function buildSessionsWhere(
  projectId: number,
  p: AnalyticsParams,
  eventsTable: string,
  sessionsTable: string
): { where: string; having: string; params: Params } {
  const params: Params = {};
  const conds = sessionsBase(projectId, p, params);
  const having: string[] = [];
  const eventScoped: Filter[] = [];
  p.filters.forEach((f, i) => {
    const col = sessionColumn(f.parameter);
    if (col === null) eventScoped.push(f);
    else if (SESSION_ONLY_PARAMS.has(f.parameter)) having.push(condition(col, f, params, i));
    else conds.push(condition(col, f, params, i));
  });
  if (eventScoped.length) {
    const sub = eventsBase(projectId, p, params, "");
    eventScoped.forEach((f, i) => sub.push(condition(eventColumn(f.parameter), f, params, 2000 + i)));
    conds.push(`(uid, sess_start) IN (SELECT uid, sess_start FROM ${eventsTable} WHERE ${sub.join(" AND ")})`);
  }
  void sessionsTable;
  return { where: conds.join(" AND "), having: having.join(" AND "), params };
}
