# Rockstat Analytics UI

Web analytics dashboard on top of Rockstat data in ClickHouse (`stats.events`, `stats.vitals`, `stats.rrweb`).
The screens and interaction patterns follow [rybbit](https://github.com/rybbit-io/rybbit); the data model is Rockstat's own.

Sections: Overview, Sessions (with event timeline), Events explorer, Funnels, Journeys (Sankey), Session replay, Performance (Web Vitals), user profile.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- shadcn/ui (Base UI) + Tailwind 4, nivo charts
- TanStack Query; date range and filters live in the URL (nuqs), so any view is shareable
- `@clickhouse/client`, every query is parameterised (`{name:Type}`)
- Auth: a single shared password (`UI_PASSWORD`) and a signed cookie (jose), enforced in `src/proxy.ts`
- Session replay player: [`rrweb-viewer`](https://github.com/madiedinro/rockstat-rrweb)

## Data

The raw `stats.events` table (250+ columns, sorted by `(intHash32(uid), date)`) is a poor fit for dashboards: every
range query scans a whole monthly partition. The UI therefore reads from the `stats_ui` database, which is filled by
materialized views defined in `clickhouse/schema.sql`:

| Table | Purpose | Sort key |
|---|---|---|
| `stats_ui.events` | narrow copy of events (~50 columns, `props` = `data_extra` as a Map) | `(projectId, date, dateTime, uid)` |
| `stats_ui.sessions` | one row per `(projectId, uid, sess_start)`, AggregatingMergeTree | `(projectId, date, uid, sess_start)` |
| `stats_ui.funnels` | saved funnel definitions | `(projectId, id)` |

Both data tables keep 90 days (TTL). Web Vitals are read from `stats.vitals` and replay rows from `stats.rrweb` directly.

Field mapping: pageview = `name = 'page'`; geo = `mmgeo_*`; user agent = `uap_*`; bot flag = `uapc_is_bot`;
traffic source = `sess_type` / `sess_engine` / `sess_refhost`, UTM = `sess_marks_*`; identity = `uid` (device) and
`user_id` (product user).

### Initial backfill

```bash
CH_URL='https://user:pass@host:8443/' ./clickhouse/backfill.sh 30 '<min(dateTime) from stats_ui.events>'
```

The script fills one day at a time, newest first, and skips days that are already present. The cutoff is the moment
the materialized views were created, so live and backfilled rows never overlap.

## Running

```bash
cp .env.example .env.local   # fill in
pnpm install
pnpm dev                     # http://localhost:3000
```

Projects come from the `PROJECTS` env variable (JSON `[{"id":1,"name":"..."}]`); any project id seen in the data
during the last 7 days is added automatically, named after its busiest host.

`pnpm build` produces a standalone output; a `Dockerfile` is included.

## Sample data

`scripts/export-sample.mjs` exports an anonymised sample for local development and demos: a fraction of device ids
with all their rows for the last N days, so sessions, funnels and journeys stay consistent.

```bash
node scripts/export-sample.mjs --days 3 --rate 0.001      # → samples/{events,sessions,vitals}.jsonl.gz
```

Hosts become fictional domains (`novafield.test`, `trade.jadecove.example`), the site names are replaced inside
URLs, titles, query strings and event properties as well, `uid` / `user_id` / click ids are hashed and IPs are
replaced with private addresses. The mapping is random per run and is not stored. `samples/` is ignored by git and
Docker.

## Funnels

Steps are event names (for `page` a path can be given, for other events a property from `props`), a time window from
first to last step, and a choice between counting users (uid) or sessions. Computed with ClickHouse `windowFunnel`
over `stats_ui.events`, respecting the global date range and filters. Saved funnels are shared by everyone.

## Journeys

Sankey of page (or event) sequences per session: consecutive repeats collapsed, optional start page/event, 2–8 steps,
top-N nodes per column with the rest folded into "Other"; "Exit" means the session ended. In events mode technical
events (`page_loaded`, `tlsfp`, `ab_*`, ...) are hidden.

## Session replay

The Replay section plays rrweb recordings from `stats.rrweb` with the `rrweb-viewer` library (installed as
`file:../rrweb_viewer`; after changing the library run `pnpm build` there and `pnpm install` here). Rows for a uid are
served by `/api/p/{id}/replay/rows`; parsing and playback happen in the browser. Stylesheets and images of recorded
pages go through the `/api/asset?url=…` proxy because CDNs refuse hotlinks. Sessions that have a recording show a ▶ icon
in the session lists.

## API

All endpoints live under `/api/p/{projectId}/…` and share the query parameters `from`, `to` (unix ms), `tz`,
`filters` (JSON) and `bots=1`:
`overview`, `overview-bucketed?bucket=`, `metric?parameter=`, `sessions`, `session?uid&start`, `events/names`,
`events/bucketed?names=`, `events/log`, `events/props?name&key`, `user?uid|userId`, `funnels` (GET/POST/DELETE),
`funnels/run` (POST), `journeys`, `replay/list`, `replay/rows?uid`, `vitals/summary`, `vitals/bucketed`,
`vitals/breakdown?name&dimension`, `live`.

Filters are `{parameter, type, value[]}`; parameters are listed in `src/lib/types.ts` and mapped to columns in
`src/server/sql.ts`. Event-level filters (path, event name) on session queries become
`IN (SELECT uid, sess_start FROM events …)`; entry/exit page filters become a HAVING over sessions.
