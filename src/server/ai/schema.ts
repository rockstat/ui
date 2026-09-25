import "server-only";

/** Data model description handed to the assistant (keep in sync with clickhouse/schema.sql). */
export const DATA_MODEL = `
Database stats_ui (ClickHouse). Dates/times are UTC. Sessions and pageviews are the main units.

TABLE stats_ui.events — one row per tracked event (browser SDK). Sorted by (projectId, date, dateTime, uid).
  projectId UInt32          -- site/project id; ALWAYS filter by it
  date Date, dateTime DateTime, ts UInt64 (ms)
  uid UInt64                -- device/browser id (anonymous user)
  sess_start UInt64 (ms)    -- session key together with uid: session = (uid, sess_start)
  name LowCardinality(String) -- event name; 'page' = pageview. Other names are product events, e.g. regPopup_open, popup_entranceForm_success (registration success), deposit_open, deposit_form_submit, element_click, link_click, form_submit
  is_page UInt8             -- 1 for pageviews
  host, path, query, title, url, ref, ref_host   -- page fields (host without www; ref_host = referrer host)
  sess_num UInt16 (n-th session of this uid), sess_pageNum, sess_eventNum
  sess_type LowCardinality  -- traffic type: partner, campaign, direct, webview, referral, internal, organic, social
  sess_engine (google, yandex, telegram, ...), sess_refhost (referrer host of the session)
  utm_source, utm_medium, utm_campaign, utm_content, utm_term, pid (partner id), cid (click id)
  user_id String            -- product user id when logged in ('' otherwise); is_auth Int8
  locale, currency, language, tz, build_version
  country (ISO2), region, city
  browser, browser_version, os, os_version, device_type ('mobile','tablet','' = desktop, 'smarttv', ...), device_vendor, device_model, screen_w, screen_h
  is_bot Int8 (exclude bots with is_bot = 0), is_webview, threat_score Float32, asn_org, ip
  props Map(String, String) -- event properties, e.g. props['target_text'], props['href'], props['payment_method']; keys differ per event name

TABLE stats_ui.sessions — AggregatingMergeTree, one logical row per (projectId, uid, sess_start); date = day of sess_start.
  Because parts may be unmerged, ALWAYS aggregate with GROUP BY uid, sess_start (or use the merged form below).
  Plain-aggregate columns (use min/max/sum/any): start_ts, end_ts (ms), pageviews, events, host, sess_num, sess_type, sess_engine, sess_refhost,
    utm_*, pid, cid, user_id (use max), is_auth (max), locale, currency, language, tz, country, region, city, browser, browser_version, os, os_version,
    device_type, device_vendor, device_model, screen_w, screen_h, is_bot (max), is_webview, threat_score, ip
  AggregateFunction columns: entry_path, entry_url, entry_title, entry_ref (argMinMerge), exit_path (argMaxMerge)
  Typical merged session query:
    SELECT uid, sess_start, min(start_ts) s, max(end_ts) e, sum(pageviews) pv, any(sess_type) sess_type, max(user_id) user_id,
           argMinMerge(entry_path) entry_path, argMaxMerge(exit_path) exit_path
    FROM stats_ui.sessions WHERE projectId = 1 AND date >= today() - 7 AND is_bot = 0 GROUP BY uid, sess_start
  Metrics: sessions = count() of groups; users = uniq(uid); bounce = pageviews <= 1; duration = (max(end_ts) - min(start_ts)) / 1000 seconds.

TABLE stats.vitals — Web Vitals samples; data_extra.key / data_extra.value arrays hold name (LCP/CLS/INP/FCP/TTFB), value, rating.
TABLE stats_ui.funnels / stats_ui.dashboards — saved UI objects (id, name, definition/config JSON).

Conventions: filter projectId and a date range in every query (date column first, it is in the sort key); exclude bots with is_bot = 0
unless asked otherwise; prefer stats_ui.sessions for session/user metrics and stats_ui.events for event/page metrics; keep result sets small
(GROUP BY + ORDER BY + LIMIT); use ClickHouse SQL (uniq, countIf, quantile, toStartOfHour, toDate, windowFunnel).
`;

/** How to build links into the UI so the answer can point at screens. */
export const UI_LINKS = `
UI links (relative, the app prefixes the project): /p/{projectId}, /p/{projectId}/sessions, /p/{projectId}/events, /p/{projectId}/funnels,
/p/{projectId}/journeys, /p/{projectId}/replay, /p/{projectId}/performance, /p/{projectId}/dashboards, /p/{projectId}/user/{uid or user_id}.
Query params: range=today|yesterday|24h|7d|30d|90d|this_month|last_month or range=custom&from=<ms>&to=<ms>; bucket=hour|day;
filters=<JSON array of {parameter,type,value:[...]}> where parameter is one of hostname, pathname, page_title, querystring, entry_page, exit_page,
referrer, sess_type, sess_engine, utm_source, utm_medium, utm_campaign, utm_content, utm_term, pid, cid, country, region, city, browser,
browser_version, os, os_version, device_type, device_vendor, device_model, screen, locale, currency, language, timezone, build_version, event_name,
user_id, uid, is_auth, is_bot, is_webview, asn_org and type is equals|not_equals|contains|not_contains|starts_with|ends_with|regex|is_null|is_not_null.
Example: /p/1/sessions?range=7d&filters=[{"parameter":"country","type":"equals","value":["AZ"]}]
`;
