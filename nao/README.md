# nao analytics agent (pilot)

[nao](https://github.com/getnao/nao) is an open-source analytics agent with its own chat UI. This folder is a nao
project pointed at the Rockstat `stats_ui` tables, run side by side with the dashboard for comparison.

```bash
cd nao
python3 -m venv .venv && ./.venv/bin/pip install 'nao-core[clickhouse,openai]' packaging
cp .env.example .env            # CLICKHOUSE_*, OPENAI_API_KEY, BETTER_AUTH_SECRET
set -a; . ./.env; set +a
./.venv/bin/nao debug           # connectivity check
./.venv/bin/nao sync -p databases   # regenerates databases/**/columns.md + preview.md (safe: only stats_ui.* and stats.vitals)
./.venv/bin/nao chat --port 5005    # chat UI at http://localhost:5005
```

Context the agent gets: `RULES.md` (Rockstat data model, metrics, key events), `databases/**` (synced schemas and previews,
add human notes to `annotations.md`), `semantics/` and `queries/` for a metric layer and vetted SQL. The dashboard links
to the chat when `NEXT_PUBLIC_NAO_URL` is set.
