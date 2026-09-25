# Rockstat analytics: rules for the agent

Rockstat is a web analytics platform. The warehouse is ClickHouse; the agent works with the `stats_ui` database
(narrow, query-friendly copies of the raw event stream) and `stats.vitals` (Web Vitals samples). All timestamps are UTC.

## Core concepts
- **Project** = a website (`projectId`). Always filter `projectId`; ask which project if the user did not say. Project 1 is the main one.
- **Device / anonymous user** = `uid` (UInt64). **Logged-in user** = `user_id` (String, '' when anonymous, `is_auth = 1`).
- **Session** = the pair `(uid, sess_start)`; `sess_start` is a millisecond timestamp. Sessions live in `stats_ui.sessions`
  (AggregatingMergeTree: always `GROUP BY uid, sess_start` and use `min/max/sum/any`, `argMinMerge(entry_path)`, `argMaxMerge(exit_path)`).
- **Pageview** = a row in `stats_ui.events` with `name = 'page'` (`is_page = 1`). All other `name` values are product events.
- **Bots**: exclude with `is_bot = 0` unless asked otherwise.
- `date` is in the sort key of both tables: always put a `date` range in WHERE, plus `dateTime` (events) or `sess_start` (sessions) bounds for exact ranges.

## Metrics
- users = `uniq(uid)`; sessions = number of `(uid, sess_start)` groups; pageviews = `countIf(is_page = 1)`; events = `count()`.
- bounce rate = share of sessions with `pageviews <= 1`; session duration = `(max(end_ts) - min(start_ts)) / 1000` seconds; pages per session = `sum(pageviews) / sessions`.
- Traffic type = `sess_type` (partner, campaign, direct, webview, referral, internal, organic, social); search engine / social network = `sess_engine`;
  referrer host = `sess_refhost`; UTM = `utm_source/utm_medium/utm_campaign/utm_content/utm_term`; partner id = `pid`, click id = `cid`.
- Geo: `country` (ISO2), `region`, `city`. Device: `device_type` ('' means desktop, 'mobile', 'tablet', 'smarttv'), `browser`, `os`, `screen_w x screen_h`.

## Important events (project 1)
- Registration: `regPopup_open` (form opened), `registration_success` (account created), `popup_entranceForm_success` (login/registration popup success).
- Deposit: `deposit_open` (payment page opened), `deposit_form_submit`, `depositCard_submit`, `payment_method_click` (props: name, requisite_id).
- Engagement: `element_click` (props target_text, target_cls, target_id, href), `link_click` (href, outbound), `form_submit` (fid, fact),
  `gameCard_playBtn_click`, `game_iframe_load`, `listings_show`, `mainSlider_slide_active`.
- Technical noise, ignore in journeys: `page_loaded`, `page_unload`, `page_visibility`, `session`, `tlsfp`, `tm`, `ab_featureFire`, `ab_bucketed`, `container_bd_handled`, `ping38`.
- A/B tests: `ab_bucketed` (props experimentId, variationId, hashAttribute) and `ab_featureFire` (props feature_key, feature_value, feature_source).
- Event properties are in `props` (Map): `props['key']`; use `mapKeys(props)` to discover keys for an event.

## Funnels and journeys
- Funnel over users: `windowFunnel(window_ms)(ts, name = 'A', name = 'B', ...)` grouped by `uid` (or by `uid, sess_start` for per-session funnels); level k means the user reached step k in order.
- Path sequences per session: `arrayCompact(arrayMap(x -> x.2, arraySort(x -> x.1, groupArray((ts, path)))))` over pageviews.

## Answering style
- Answer in the user's language. Give the numbers, the period they cover, and one or two sentences of interpretation.
- Keep result sets small (LIMIT), never scan `stats.events` (the raw table is not exposed here).
