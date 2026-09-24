#!/usr/bin/env bash
# Backfill stats_ui.events / stats_ui.sessions from stats.events, one day at a time, newest first.
# Usage: CH_URL=https://user:pass@host:8443/ ./backfill.sh <days> <cutoff 'YYYY-MM-DD HH:MM:SS'>
set -euo pipefail
DAYS=${1:-30}
CUTOFF=${2:?cutoff datetime required (min dateTime already present in stats_ui.events)}
CH_URL=${CH_URL:?}
SETTINGS="max_execution_time=3600&max_insert_threads=4&max_threads=8&max_memory_usage=20000000000"

EVENTS_SELECT=$(python3 - <<'PY'
import re
sql=open('clickhouse/schema.sql').read()
m=re.search(r'CREATE MATERIALIZED VIEW IF NOT EXISTS stats_ui.events_mv TO stats_ui.events AS\s*(SELECT.*?)WHERE projectId > 0;', sql, re.S)
print(m.group(1))
PY
)
SESSIONS_SELECT=$(python3 - <<'PY'
import re
sql=open('clickhouse/schema.sql').read()
m=re.search(r'CREATE MATERIALIZED VIEW IF NOT EXISTS stats_ui.sessions_mv TO stats_ui.sessions AS\s*(SELECT.*?)WHERE projectId > 0 AND sess_start > 0\s*(GROUP BY.*?);', sql, re.S)
print(m.group(1)+' __WHERE__ '+m.group(2))
PY
)

CUT_MS=$(python3 -c "import datetime as d,sys; print(int(d.datetime.strptime(sys.argv[1],'%Y-%m-%d %H:%M:%S').replace(tzinfo=d.timezone.utc).timestamp()*1000))" "$CUTOFF")
for i in $(seq 0 $((DAYS-1))); do
  D=$(date -v-${i}d +%F 2>/dev/null || date -d "-${i} day" +%F)
  HAVE=$(curl -sS "${CH_URL}" --data-binary "SELECT count() FROM stats_ui.events WHERE date = '${D}' AND dateTime < '${CUTOFF}'")
  if [ "$HAVE" = "0" ]; then
    echo "[$(date +%T)] day $D events..."
    curl -sS --fail-with-body "${CH_URL}?${SETTINGS}" --data-binary "INSERT INTO stats_ui.events ${EVENTS_SELECT} WHERE projectId > 0 AND date = '${D}' AND dateTime < '${CUTOFF}'" || { echo "FAILED events $D"; exit 1; }
  else
    echo "[$(date +%T)] day $D events already present ($HAVE rows), skipping"
  fi
  HAVE=$(curl -sS "${CH_URL}" --data-binary "SELECT count() FROM stats_ui.sessions WHERE date = '${D}' AND start_ts < ${CUT_MS}")
  if [ "$HAVE" = "0" ]; then
    echo "[$(date +%T)] day $D sessions..."
    Q="INSERT INTO stats_ui.sessions ${SESSIONS_SELECT/__WHERE__/WHERE projectId > 0 AND sess_start > 0 AND date = '${D}' AND dateTime < '${CUTOFF}'}"
    curl -sS --fail-with-body "${CH_URL}?${SETTINGS}" --data-binary "$Q" || { echo "FAILED sessions $D"; exit 1; }
  else
    echo "[$(date +%T)] day $D sessions already present ($HAVE rows), skipping"
  fi
done
echo "[$(date +%T)] done"
