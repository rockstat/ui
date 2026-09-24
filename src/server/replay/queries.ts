import "server-only";
import type { AnalyticsParams } from "@/lib/types";
import { query, T, type Params } from "../clickhouse";

export interface RecordingSummary {
  uid: string;
  sess_start: number;
  sess_pageNum: number;
  started: number; // server ms of rec_start
  ended: number;
  duration: number; // ms
  batches: number;
  bytes: number;
  page_url: string;
  page_title: string;
  host: string;
  browser: string;
  os: string;
  device_type: string;
  country: string;
  city: string;
  user_id: string;
  screen_w: number;
  screen_h: number;
  /** A rec_start row arrived, so the page snapshot most likely did too. */
  has_start: boolean;
}

/** Only rrweb rows carry a handful of dimensions; filters outside this list are ignored here. */
const COLS: Partial<Record<string, string>> = {
  hostname: "page_domain_wo_www",
  pathname: "page_path",
  country: "mmgeo_country_iso",
  city: "mmgeo_city_en",
  browser: "uap_browser_name",
  os: "uap_os_name",
  device_type: "uap_device_type",
  user_id: "user_id",
  uid: "toString(uid)",
  sess_type: "sess_type",
  utm_source: "sess_marks_utm_source",
};

function base(projectId: number, p: AnalyticsParams): { where: string; params: Params } {
  const params: Params = { projectId, from: Math.floor(p.from / 1000), to: Math.floor(p.to / 1000) };
  const c = [
    `projectId = {projectId:UInt32}`,
    `date >= toDate(toDateTime({from:UInt32}))`,
    `date <= toDate(toDateTime({to:UInt32}))`,
    `dateTime >= toDateTime({from:UInt32})`,
    `dateTime < toDateTime({to:UInt32})`,
  ];
  p.filters.forEach((f, i) => {
    const col = COLS[f.parameter];
    if (!col) return;
    if (f.type === "equals" || f.type === "not_equals") {
      params[`v${i}`] = f.value;
      c.push(`${col} ${f.type === "equals" ? "IN" : "NOT IN"} ({v${i}:Array(String)})`);
    } else if (f.type === "contains") {
      params[`v${i}`] = `%${f.value[0] ?? ""}%`;
      c.push(`${col} LIKE {v${i}:String}`);
    }
  });
  return { where: c.join(" AND "), params };
}

/**
 * Recordings (one per rrweb.record call = uid + sess_start + sess_pageNum) in the range,
 * newest first. Aggregated over stats.rrweb; a recording spanning the range edge is included
 * as long as any of its rows falls inside.
 */
export async function listRecordings(
  projectId: number,
  p: AnalyticsParams,
  opts: { page: number; pageSize: number; search?: string; uid?: string; minDuration?: number; playableOnly?: boolean }
): Promise<{ rows: RecordingSummary[]; total: number }> {
  const b = base(projectId, p);
  let where = b.where;
  if (opts.uid) {
    b.params.uidF = opts.uid;
    where += ` AND uid = {uidF:UInt64}`;
  }
  if (opts.search) {
    b.params.search = `%${opts.search}%`;
    where += ` AND (page_url ILIKE {search:String} OR user_id LIKE {search:String} OR toString(uid) LIKE {search:String})`;
  }
  const pageSize = Math.min(Math.max(opts.pageSize, 1), 200);
  const offset = Math.max(opts.page - 1, 0) * pageSize;
  const minDur = Math.max(opts.minDuration ?? 0, 0);
  const rows = await query<Record<string, string>>(
    `SELECT toString(uid) AS uid, sess_start, sess_pageNum,
            min(timestamp) AS started, max(timestamp) AS ended, max(timestamp) - min(timestamp) AS duration,
            uniq(data_seq) AS batches, sum(length(data_d)) AS bytes, countIf(name = 'rec_start') AS starts,
            anyIf(page_url, name = 'rec_start') AS page_url_start, any(page_url) AS page_url_any,
            anyIf(page_title, name = 'rec_start') AS page_title_start, any(page_title) AS page_title_any,
            any(page_domain_wo_www) AS host,
            any(uap_browser_name) AS browser, any(uap_os_name) AS os, any(uap_device_type) AS device_type,
            any(mmgeo_country_iso) AS country, any(mmgeo_city_en) AS city, max(user_id) AS user_id,
            any(browser_w) AS screen_w, any(browser_h) AS screen_h,
            count() OVER () AS total
     FROM ${T.rrweb}
     WHERE ${where}
     GROUP BY uid, sess_start, sess_pageNum
     HAVING bytes > 0 AND duration >= {minDur:UInt64}${opts.playableOnly ? " AND starts > 0" : ""}
     ORDER BY started DESC
     LIMIT ${pageSize} OFFSET ${offset}`,
    { ...b.params, minDur }
  );
  return {
    total: Number(rows[0]?.total ?? 0),
    rows: rows.map(r => ({
      uid: r.uid,
      sess_start: Number(r.sess_start),
      sess_pageNum: Number(r.sess_pageNum),
      started: Number(r.started),
      ended: Number(r.ended),
      duration: Number(r.duration),
      batches: Number(r.batches),
      bytes: Number(r.bytes),
      page_url: r.page_url_start || r.page_url_any,
      page_title: r.page_title_start || r.page_title_any,
      host: r.host,
      browser: r.browser,
      os: r.os,
      device_type: r.device_type,
      country: r.country,
      city: r.city,
      user_id: r.user_id,
      screen_w: Number(r.screen_w),
      screen_h: Number(r.screen_h),
      has_start: Number(r.starts) > 0,
    })),
  };
}

/** Columns the rrweb-viewer parser expects (its DEFAULT_COLUMNS). */
const ROW_COLUMNS = [
  "uid", "id", "timestamp", "name", "data_seq", "data_part", "data_of", "data_packed", "data_d",
  "sess_start", "sess_num", "sess_pageNum", "page_url", "page_title", "page_domain", "browser_w", "browser_h",
  "uap_browser_name", "uap_browser_version", "uap_os_name", "uap_os_version", "uap_device_type", "uap_device_vendor", "uap_device_model",
  "mmgeo_country_iso", "mmgeo_city_en", "td_ip", "td_ua", "user_id", "user_locale",
];

/** Raw rows for one uid (all its recordings within ±days of the range), streamed as JSONEachRow text. */
export async function fetchReplayRows(projectId: number, uid: string, days = 30): Promise<string> {
  const { ch } = await import("../clickhouse");
  const rs = await ch().query({
    query: `SELECT ${ROW_COLUMNS.map(c => `\`${c}\``).join(", ")} FROM ${T.rrweb}
            WHERE projectId = {projectId:UInt32} AND date >= today() - {days:UInt32} AND uid = {uid:UInt64}
            ORDER BY timestamp, data_seq, data_part`,
    query_params: { projectId, uid, days },
    format: "JSONEachRow",
    clickhouse_settings: { output_format_json_quote_64bit_integers: 1, max_result_rows: "0", result_overflow_mode: "throw" },
  });
  return rs.text();
}

/** Which sessions of the given (uid, sess_start) pairs have a recording. */
export async function sessionsWithReplay(projectId: number, pairs: { uid: string; sess_start: number }[]): Promise<Set<string>> {
  if (!pairs.length) return new Set();
  const wanted = new Set(pairs.map(p => `${p.uid}:${p.sess_start}`));
  const rows = await query<{ uid: string; sess_start: string }>(
    `SELECT DISTINCT toString(uid) AS uid, sess_start FROM ${T.rrweb}
     WHERE projectId = {projectId:UInt32} AND date >= today() - 90
       AND uid IN (SELECT toUInt64(arrayJoin({uids:Array(String)}))) AND sess_start IN (SELECT toUInt64(arrayJoin({starts:Array(String)})))`,
    { projectId, uids: pairs.map(p => p.uid), starts: pairs.map(p => String(p.sess_start)) }
  );
  return new Set(rows.map(r => `${r.uid}:${r.sess_start}`).filter(k => wanted.has(k)));
}
