import "server-only";
import type { AnalyticsParams, EventRow, Paged, SessionRow } from "@/lib/types";
import { query, T } from "../clickhouse";
import { buildSessionsWhere } from "../sql";

/**
 * ClickHouse aliases are query-global, so `max(end_ts) AS end_ts` would make a
 * later `max(end_ts)` refer to the alias. Aggregates are therefore aliased with
 * an `a_` prefix in an inner query and renamed in the outer one.
 */
const COLS: [string, string][] = [
  ["uid", "toString(uid)"],
  ["sess_start", "sess_start"],
  ["start_ts", "min(start_ts)"],
  ["end_ts", "max(end_ts)"],
  ["pageviews", "sum(pageviews)"],
  ["events", "sum(events)"],
  ["entry_path", "argMinMerge(entry_path)"],
  ["exit_path", "argMaxMerge(exit_path)"],
  ["entry_url", "argMinMerge(entry_url)"],
  ["entry_title", "argMinMerge(entry_title)"],
  ["entry_ref", "argMinMerge(entry_ref)"],
  ["host", "any(host)"],
  ["sess_num", "max(sess_num)"],
  ["sess_type", "any(sess_type)"],
  ["sess_engine", "any(sess_engine)"],
  ["sess_refhost", "any(sess_refhost)"],
  ["utm_source", "any(utm_source)"],
  ["utm_medium", "any(utm_medium)"],
  ["utm_campaign", "any(utm_campaign)"],
  ["utm_content", "any(utm_content)"],
  ["utm_term", "any(utm_term)"],
  ["pid", "any(pid)"],
  ["cid", "any(cid)"],
  ["user_id", "max(user_id)"],
  ["is_auth", "max(is_auth)"],
  ["locale", "any(locale)"],
  ["currency", "any(currency)"],
  ["language", "any(language)"],
  ["tz", "any(tz)"],
  ["country", "any(country)"],
  ["region", "any(region)"],
  ["city", "any(city)"],
  ["browser", "any(browser)"],
  ["browser_version", "any(browser_version)"],
  ["os", "any(os)"],
  ["os_version", "any(os_version)"],
  ["device_type", "any(device_type)"],
  ["device_vendor", "any(device_vendor)"],
  ["device_model", "any(device_model)"],
  ["screen_w", "any(screen_w)"],
  ["screen_h", "any(screen_h)"],
  ["is_bot", "max(is_bot)"],
  ["is_webview", "max(is_webview)"],
  ["threat_score", "max(threat_score)"],
  ["ip", "any(ip)"],
];

const INNER = COLS.map(([n, e]) => `${e} AS a_${n}`).join(", ");
const OUTER = COLS.map(([n]) => `a_${n} AS ${n}`).join(", ") + ", greatest(a_end_ts - a_start_ts, 0) / 1000 AS duration";

/** HAVING from buildSessionsWhere refers to argMinMerge(entry_path) etc.; map to inner aliases. */
function fixHaving(h: string) {
  return h.replace(/argMinMerge\(entry_path\)/g, "a_entry_path").replace(/argMaxMerge\(exit_path\)/g, "a_exit_path");
}

const NUMERIC = ["sess_start", "start_ts", "end_ts", "duration", "pageviews", "events", "sess_num", "is_auth", "screen_w", "screen_h", "is_bot", "is_webview", "threat_score"];

function num(r: Record<string, unknown>): SessionRow {
  const o = { ...r } as Record<string, unknown>;
  for (const k of NUMERIC) o[k] = Number(o[k]);
  delete o.total;
  return o as unknown as SessionRow;
}

export async function listSessions(
  projectId: number,
  p: AnalyticsParams,
  opts: { page: number; pageSize: number; uid?: string; userId?: string }
): Promise<Paged<SessionRow>> {
  const built = buildSessionsWhere(projectId, p, T.events, T.sessions);
  let where = built.where;
  if (opts.uid) {
    built.params.uidF = opts.uid;
    where += ` AND uid = {uidF:UInt64}`;
  }
  if (opts.userId) {
    built.params.userIdF = opts.userId;
    where += ` AND user_id = {userIdF:String}`;
  }
  const pageSize = Math.min(Math.max(opts.pageSize, 1), 200);
  const offset = Math.max(opts.page - 1, 0) * pageSize;
  // Phase 1: pick the page of session keys using only the cheap columns (and the
  // entry/exit aggregates when a HAVING filter needs them); phase 2 merges the full
  // row set for those keys only. Merging every column for ~1M sessions/day just to
  // show 50 took 3+ s.
  const havingCols = built.having ? ", argMinMerge(entry_path) AS a_entry_path, argMaxMerge(exit_path) AS a_exit_path" : "";
  const having = built.having ? `HAVING ${fixHaving(built.having)}` : "";
  const keys = `SELECT uid, sess_start, min(start_ts) AS a_start_ts${havingCols} FROM ${T.sessions} WHERE ${where} GROUP BY uid, sess_start ${having}`;
  const [rows, totalRow] = await Promise.all([
    query<Record<string, unknown>>(
      `SELECT ${OUTER}
       FROM (SELECT ${INNER} FROM ${T.sessions}
             WHERE ${where} AND (uid, sess_start) IN (SELECT uid, sess_start FROM (${keys} ORDER BY a_start_ts DESC LIMIT ${pageSize} OFFSET ${offset}))
             GROUP BY uid, sess_start)
       ORDER BY a_start_ts DESC`,
      built.params
    ),
    query<{ total: string }>(`SELECT count() AS total FROM (${keys})`, built.params),
  ]);
  return { rows: rows.map(num), page: opts.page, pageSize, total: Number(totalRow[0]?.total ?? 0) };
}

export async function getSession(projectId: number, uid: string, sessStart: number): Promise<SessionRow | undefined> {
  const rows = await query<Record<string, unknown>>(
    `SELECT ${OUTER}
     FROM (SELECT ${INNER} FROM ${T.sessions}
           WHERE projectId = {projectId:UInt32} AND date = toDate(toDateTime(intDiv({s:UInt64}, 1000))) AND uid = {uid:UInt64} AND sess_start = {s:UInt64}
           GROUP BY uid, sess_start)`,
    { projectId, uid, s: sessStart }
  );
  return rows[0] ? num(rows[0]) : undefined;
}

export async function getSessionEvents(projectId: number, uid: string, sessStart: number, limit = 2000): Promise<EventRow[]> {
  const rows = await query<Record<string, unknown>>(
    `SELECT ts, name, is_page, host, path, query, title, url, ref, toString(uid) AS uid_s, sess_start, user_id,
            country, city, browser, os, device_type, props
     FROM ${T.events}
     WHERE projectId = {projectId:UInt32}
       AND date >= toDate(toDateTime(intDiv({s:UInt64}, 1000))) AND date <= toDate(toDateTime(intDiv({s:UInt64}, 1000))) + 1
       AND uid = {uid:UInt64} AND sess_start = {s:UInt64}
     ORDER BY ts
     LIMIT ${limit}`,
    { projectId, uid, s: sessStart }
  );
  return rows.map(r => ({ ...r, uid: String(r.uid_s), ts: Number(r.ts), is_page: Number(r.is_page), sess_start: Number(r.sess_start) }) as EventRow);
}
