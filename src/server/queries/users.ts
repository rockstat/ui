import "server-only";
import type { UserProfile } from "@/lib/types";
import { query, T } from "../clickhouse";

/** Profile by device uid or by product user_id (all devices of that user). */
export async function getUserProfile(projectId: number, key: { uid?: string; userId?: string }, days = 90): Promise<UserProfile | undefined> {
  const cond = key.uid ? "uid = {uid:UInt64}" : "user_id = {userId:String}";
  const rows = await query<Record<string, unknown>>(
    `SELECT a_uid AS uid, a_user_id AS user_id, a_first_seen AS first_seen, a_last_seen AS last_seen, a_sessions AS sessions, a_pageviews AS pageviews, a_events AS events,
            a_country AS country, a_region AS region, a_city AS city, a_browser AS browser, a_browser_version AS browser_version, a_os AS os, a_os_version AS os_version,
            a_device_type AS device_type, a_device_vendor AS device_vendor, a_device_model AS device_model, a_screen_w AS screen_w, a_screen_h AS screen_h,
            a_locale AS locale, a_currency AS currency, a_language AS language, a_tz AS tz, a_is_auth AS is_auth, a_ip AS ip, a_user_ids AS user_ids
     FROM (
     SELECT
       toString(argMax(uid, end_ts)) AS a_uid,
       max(user_id) AS a_user_id,
       min(start_ts) AS a_first_seen, max(end_ts) AS a_last_seen,
       count() AS a_sessions, sum(pageviews) AS a_pageviews, sum(events) AS a_events,
       argMax(country, end_ts) AS a_country, argMax(region, end_ts) AS a_region, argMax(city, end_ts) AS a_city,
       argMax(browser, end_ts) AS a_browser, argMax(browser_version, end_ts) AS a_browser_version,
       argMax(os, end_ts) AS a_os, argMax(os_version, end_ts) AS a_os_version,
       argMax(device_type, end_ts) AS a_device_type, argMax(device_vendor, end_ts) AS a_device_vendor, argMax(device_model, end_ts) AS a_device_model,
       argMax(screen_w, end_ts) AS a_screen_w, argMax(screen_h, end_ts) AS a_screen_h,
       argMax(locale, end_ts) AS a_locale, argMax(currency, end_ts) AS a_currency, argMax(language, end_ts) AS a_language, argMax(tz, end_ts) AS a_tz,
       max(is_auth) AS a_is_auth, argMax(ip, end_ts) AS a_ip,
       arrayFilter(x -> x != '', groupUniqArray(20)(user_id)) AS a_user_ids
     FROM (
       SELECT uid, sess_start, max(user_id) user_id, min(start_ts) start_ts, max(end_ts) end_ts, sum(pageviews) pageviews, sum(events) events,
              any(country) country, any(region) region, any(city) city, any(browser) browser, any(browser_version) browser_version,
              any(os) os, any(os_version) os_version, any(device_type) device_type, any(device_vendor) device_vendor, any(device_model) device_model,
              any(screen_w) screen_w, any(screen_h) screen_h, any(locale) locale, any(currency) currency, any(language) language, any(tz) tz,
              max(is_auth) is_auth, any(ip) ip
       FROM (SELECT * FROM ${T.sessions} WHERE projectId = {projectId:UInt32} AND date >= today() - {days:UInt32} AND ${cond})
       GROUP BY uid, sess_start
     )
     )`,
    { projectId, days, uid: key.uid ?? "0", userId: key.userId ?? "" }
  );
  const r = rows[0];
  if (!r || Number(r.sessions) === 0) return undefined;
  const o = { ...r } as Record<string, unknown>;
  for (const k of ["first_seen", "last_seen", "sessions", "pageviews", "events", "screen_w", "screen_h", "is_auth"]) o[k] = Number(o[k]);
  return o as unknown as UserProfile;
}
