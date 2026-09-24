-- stats_ui: narrow, well-sorted copies of stats.events for the analytics UI.
-- Raw stats.events stays untouched; these tables are fed by materialized views.

CREATE DATABASE IF NOT EXISTS stats_ui;

-- ---------------------------------------------------------------------------
-- events: one row per raw event, only columns the UI needs, sorted for
-- (projectId, date, time) range scans. TTL keeps it bounded.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stats_ui.events
(
    projectId       UInt32,
    date            Date,
    dateTime        DateTime,
    ts              UInt64,                      -- ms
    uid             UInt64,
    sess_start      UInt64,                      -- ms, session key together with uid
    name            LowCardinality(String),
    is_page         UInt8,

    host            LowCardinality(String),      -- page_domain without www
    path            String,
    query           String,
    title           String,
    url             String,
    ref             String,
    ref_host        LowCardinality(String),

    sess_num        UInt16,
    sess_pageNum    UInt16,
    sess_eventNum   UInt16,
    sess_type       LowCardinality(String),
    sess_engine     LowCardinality(String),
    sess_refhost    LowCardinality(String),
    utm_source      LowCardinality(String),
    utm_medium      LowCardinality(String),
    utm_campaign    LowCardinality(String),
    utm_content     LowCardinality(String),
    utm_term        LowCardinality(String),
    pid             LowCardinality(String),
    cid             String,

    user_id         String,
    is_auth         Int8,
    locale          LowCardinality(String),
    currency        LowCardinality(String),
    language        LowCardinality(String),
    tz              LowCardinality(String),
    build_version   LowCardinality(String),

    country         LowCardinality(String),
    region          LowCardinality(String),
    city            LowCardinality(String),

    browser         LowCardinality(String),
    browser_version LowCardinality(String),
    os              LowCardinality(String),
    os_version      LowCardinality(String),
    device_type     LowCardinality(String),
    device_vendor   LowCardinality(String),
    device_model    LowCardinality(String),
    screen_w        Int16,
    screen_h        Int16,

    is_bot          Int8,
    is_webview      Int8,
    threat_score    Float32,
    asn_org         LowCardinality(String),
    ip              String,
    lib_v           UInt32,

    props           Map(String, String)          -- data_extra without _internal keys
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(date)
ORDER BY (projectId, date, dateTime, uid)
TTL date + INTERVAL 90 DAY
SETTINGS index_granularity = 8192;

CREATE MATERIALIZED VIEW IF NOT EXISTS stats_ui.events_mv TO stats_ui.events AS
SELECT
    projectId,
    date,
    dateTime,
    timestamp                                   AS ts,
    uid,
    sess_start,
    name,
    name = 'page'                               AS is_page,
    domainWithoutWWW(page_domain)               AS host,
    page_path                                   AS path,
    page_query                                  AS query,
    page_title                                  AS title,
    page_url                                    AS url,
    page_ref                                    AS ref,
    domainWithoutWWW(page_ref)                  AS ref_host,
    sess_num, sess_pageNum, sess_eventNum,
    sess_type, sess_engine, sess_refhost,
    sess_marks_utm_source                       AS utm_source,
    sess_marks_utm_medium                       AS utm_medium,
    sess_marks_utm_campaign                     AS utm_campaign,
    sess_marks_utm_content                      AS utm_content,
    sess_marks_utm_term                         AS utm_term,
    sess_marks_pid                              AS pid,
    sess_marks_cid                              AS cid,
    user_id,
    user_isAuth                                 AS is_auth,
    user_locale                                 AS locale,
    user_currency                               AS currency,
    user_language                               AS language,
    user_tz                                     AS tz,
    user_build_version                          AS build_version,
    mmgeo_country_iso                           AS country,
    mmgeo_region_en                             AS region,
    mmgeo_city_en                               AS city,
    uap_browser_name                            AS browser,
    uap_browser_version                         AS browser_version,
    uap_os_name                                 AS os,
    uap_os_version                              AS os_version,
    uap_device_type                             AS device_type,
    uap_device_vendor                           AS device_vendor,
    uap_device_model                            AS device_model,
    browser_w                                   AS screen_w,
    browser_h                                   AS screen_h,
    uapc_is_bot                                 AS is_bot,
    uapc_is_webview                             AS is_webview,
    toFloat32(rst_score_total)                  AS threat_score,
    rst_asn_org                                 AS asn_org,
    td_ip                                       AS ip,
    toUInt32(lib_v)                             AS lib_v,
    mapFilter((k, v) -> NOT startsWith(k, '_'),
        CAST((data_extra.key, data_extra.value), 'Map(String, String)')) AS props
FROM stats.events
WHERE projectId > 0;

-- ---------------------------------------------------------------------------
-- sessions: one row per (project, uid, sess_start), aggregated incrementally.
-- date is derived from sess_start so a session spanning midnight is one row.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stats_ui.sessions
(
    projectId       UInt32,
    date            Date,
    uid             UInt64,
    sess_start      UInt64,

    start_ts        SimpleAggregateFunction(min, UInt64),
    end_ts          SimpleAggregateFunction(max, UInt64),
    pageviews       SimpleAggregateFunction(sum, UInt64),
    events          SimpleAggregateFunction(sum, UInt64),

    entry_path      AggregateFunction(argMin, String, UInt64),
    exit_path       AggregateFunction(argMax, String, UInt64),
    entry_url       AggregateFunction(argMin, String, UInt64),
    entry_title     AggregateFunction(argMin, String, UInt64),
    entry_ref       AggregateFunction(argMin, String, UInt64),

    host            SimpleAggregateFunction(any, String),
    sess_num        SimpleAggregateFunction(max, UInt16),
    sess_type       SimpleAggregateFunction(any, String),
    sess_engine     SimpleAggregateFunction(any, String),
    sess_refhost    SimpleAggregateFunction(any, String),
    utm_source      SimpleAggregateFunction(any, String),
    utm_medium      SimpleAggregateFunction(any, String),
    utm_campaign    SimpleAggregateFunction(any, String),
    utm_content     SimpleAggregateFunction(any, String),
    utm_term        SimpleAggregateFunction(any, String),
    pid             SimpleAggregateFunction(any, String),
    cid             SimpleAggregateFunction(any, String),

    user_id         SimpleAggregateFunction(max, String),
    is_auth         SimpleAggregateFunction(max, Int8),
    locale          SimpleAggregateFunction(any, String),
    currency        SimpleAggregateFunction(any, String),
    language        SimpleAggregateFunction(any, String),
    tz              SimpleAggregateFunction(any, String),

    country         SimpleAggregateFunction(any, String),
    region          SimpleAggregateFunction(any, String),
    city            SimpleAggregateFunction(any, String),

    browser         SimpleAggregateFunction(any, String),
    browser_version SimpleAggregateFunction(any, String),
    os              SimpleAggregateFunction(any, String),
    os_version      SimpleAggregateFunction(any, String),
    device_type     SimpleAggregateFunction(any, String),
    device_vendor   SimpleAggregateFunction(any, String),
    device_model    SimpleAggregateFunction(any, String),
    screen_w        SimpleAggregateFunction(any, Int16),
    screen_h        SimpleAggregateFunction(any, Int16),

    is_bot          SimpleAggregateFunction(max, Int8),
    is_webview      SimpleAggregateFunction(max, Int8),
    threat_score    SimpleAggregateFunction(max, Float32),
    ip              SimpleAggregateFunction(any, String)
)
ENGINE = AggregatingMergeTree
PARTITION BY toYYYYMM(date)
ORDER BY (projectId, date, uid, sess_start)
TTL date + INTERVAL 90 DAY
SETTINGS index_granularity = 8192;

CREATE MATERIALIZED VIEW IF NOT EXISTS stats_ui.sessions_mv TO stats_ui.sessions AS
SELECT
    projectId,
    toDate(intDiv(sess_start, 1000))            AS date,
    uid,
    sess_start,
    min(timestamp)                              AS start_ts,
    max(timestamp)                              AS end_ts,
    countIf(name = 'page')                      AS pageviews,
    count()                                     AS events,
    argMinStateIf(page_path, timestamp, name = 'page')   AS entry_path,
    argMaxStateIf(page_path, timestamp, name = 'page')   AS exit_path,
    argMinStateIf(page_url,  timestamp, name = 'page')   AS entry_url,
    argMinStateIf(page_title, timestamp, name = 'page')  AS entry_title,
    argMinStateIf(page_ref,  timestamp, name = 'page')   AS entry_ref,
    any(domainWithoutWWW(page_domain))          AS host,
    max(sess_num)                               AS sess_num,
    any(sess_type)                              AS sess_type,
    any(sess_engine)                            AS sess_engine,
    any(sess_refhost)                           AS sess_refhost,
    any(sess_marks_utm_source)                  AS utm_source,
    any(sess_marks_utm_medium)                  AS utm_medium,
    any(sess_marks_utm_campaign)                AS utm_campaign,
    any(sess_marks_utm_content)                 AS utm_content,
    any(sess_marks_utm_term)                    AS utm_term,
    any(sess_marks_pid)                         AS pid,
    any(sess_marks_cid)                         AS cid,
    max(user_id)                                AS user_id,
    max(user_isAuth)                            AS is_auth,
    any(user_locale)                            AS locale,
    any(user_currency)                          AS currency,
    any(user_language)                          AS language,
    any(user_tz)                                AS tz,
    any(mmgeo_country_iso)                      AS country,
    any(mmgeo_region_en)                        AS region,
    any(mmgeo_city_en)                          AS city,
    any(uap_browser_name)                       AS browser,
    any(uap_browser_version)                    AS browser_version,
    any(uap_os_name)                            AS os,
    any(uap_os_version)                         AS os_version,
    any(uap_device_type)                        AS device_type,
    any(uap_device_vendor)                      AS device_vendor,
    any(uap_device_model)                       AS device_model,
    any(browser_w)                              AS screen_w,
    any(browser_h)                              AS screen_h,
    max(uapc_is_bot)                            AS is_bot,
    max(uapc_is_webview)                        AS is_webview,
    max(toFloat32(rst_score_total))             AS threat_score,
    any(td_ip)                                  AS ip
FROM stats.events
WHERE projectId > 0 AND sess_start > 0
GROUP BY projectId, date, uid, sess_start;

-- ---------------------------------------------------------------------------
-- funnels: saved funnel definitions (shared by everyone using the UI).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stats_ui.funnels
(
    projectId   UInt32,
    id          String,
    name        String,
    definition  String,          -- JSON: { steps: [...], window: seconds, scope: 'user'|'session' }
    updated     DateTime,
    deleted     UInt8 DEFAULT 0
)
ENGINE = ReplacingMergeTree(updated)
ORDER BY (projectId, id);
