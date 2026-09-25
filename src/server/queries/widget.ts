import "server-only";
import type { AnalyticsParams, Bucket, MetricRow } from "@/lib/types";
import type { Widget, WidgetMetric } from "@/lib/dashboards";
import { query, T } from "../clickhouse";
import { bucketExpr, buildEventsWhere, buildSessionsWhere, eventColumn, sessionColumn } from "../sql";
import { getOverview, getOverviewBucketed } from "./overview";
import { getMetric } from "./metric";
import { getEventsBucketed } from "./events";
import { listFunnels, runFunnel } from "./funnels";
import { BadRequest } from "../params";

export interface WidgetData {
  /** stat: current value + previous-period value + sparkline */
  value?: number;
  previous?: number;
  /** line: time → series values; `series` order matters for colours */
  series?: { id: string; data: { x: string; y: number }[] }[];
  /** pie / table */
  rows?: MetricRow[];
  /** funnel */
  funnel?: { label: string; count: number; conversion: number }[];
}

const PAGE_LEVEL = new Set(["pathname", "page_title", "querystring", "hostname", "event_name", "build_version", "asn_org"]);

function withFilters(p: AnalyticsParams, w: Widget): AnalyticsParams {
  return w.filters?.length ? { ...p, filters: [...p.filters, ...w.filters] } : p;
}

function metricOf(row: Record<string, number>, metric: WidgetMetric): number {
  return Number(row[metric] ?? 0);
}

/** Time series of one metric split by the top-N values of a dimension. */
async function dimensionBucketed(projectId: number, p: AnalyticsParams, metric: WidgetMetric, dimension: string, limit: number, bucket: Bucket) {
  const top = await getMetric(projectId, p, dimension as never, { limit, page: 1 });
  const values = top.rows.map(r => r.value);
  if (!values.length) return [];
  const isPage = PAGE_LEVEL.has(dimension);
  const params: Record<string, unknown> = {};
  let rows: { time: string; value: string; v: string }[];
  if (isPage) {
    const built = buildEventsWhere(projectId, p, T.events, T.sessions);
    Object.assign(params, built.params, { tz: p.tz, vals: values });
    const col = eventColumn(dimension as never);
    const agg = metric === "users" ? "uniq(uid)" : metric === "sessions" ? "uniq(uid, sess_start)" : metric === "events" ? "count()" : "countIf(is_page = 1)";
    rows = await query(
      `SELECT ${bucketExpr("dateTime", bucket)} AS time, ${col} AS value, ${agg} AS v
       FROM ${T.events} WHERE ${built.where} AND ${col} IN ({vals:Array(String)})
       GROUP BY time, value ORDER BY time`,
      params as never
    );
  } else {
    const built = buildSessionsWhere(projectId, p, T.events, T.sessions);
    Object.assign(params, built.params, { tz: p.tz, vals: values });
    const col = sessionColumn(dimension as never)!;
    const isAgg = col.includes("Merge(");
    const agg =
      metric === "users"
        ? "uniq(uid)"
        : metric === "pageviews"
          ? "sum(pv)"
          : metric === "events"
            ? "sum(ev)"
            : metric === "bounce_rate"
              ? "round(100 * countIf(pv <= 1) / greatest(count(), 1), 1)"
              : metric === "session_duration"
                ? "round(avg((e - s) / 1000), 1)"
                : metric === "pages_per_session"
                  ? "round(sum(pv) / greatest(count(), 1), 2)"
                  : "count()";
    rows = await query(
      `SELECT time, value, ${agg} AS v FROM (
         SELECT ${bucketExpr("toDateTime(intDiv(sess_start, 1000))", bucket)} AS time, uid, sess_start,
                ${isAgg ? col : `any(${col})`} AS value, sum(pageviews) AS pv, sum(events) AS ev, min(start_ts) AS s, max(end_ts) AS e
         FROM ${T.sessions} WHERE ${built.where} GROUP BY time, uid, sess_start
       ) WHERE value IN ({vals:Array(String)})
       GROUP BY time, value ORDER BY time`,
      params as never
    );
  }
  const times = [...new Set(rows.map(r => r.time))].sort();
  return values.map(v => {
    const m = new Map(rows.filter(r => r.value === v).map(r => [r.time, Number(r.v)]));
    return { id: v || "(empty)", data: times.map(t => ({ x: t, y: m.get(t) ?? 0 })) };
  });
}

async function eventMetric(projectId: number, p: AnalyticsParams, name: string, bucket: Bucket) {
  const rows = await getEventsBucketed(projectId, p, bucket, [name]);
  return rows.map(r => ({ x: r.time, y: r.count }));
}

export async function runWidget(projectId: number, p: AnalyticsParams, prev: AnalyticsParams, w: Widget, bucket: Bucket): Promise<WidgetData> {
  const params = withFilters(p, w);
  const prevParams = withFilters(prev, w);
  switch (w.type) {
    case "stat": {
      const metric = w.metric ?? "users";
      if (metric.startsWith("event:")) {
        const name = metric.slice(6);
        const [cur, before] = await Promise.all([eventMetric(projectId, params, name, bucket), eventMetric(projectId, prevParams, name, bucket)]);
        const sum = (a: { y: number }[]) => a.reduce((s, r) => s + r.y, 0);
        return { value: sum(cur), previous: sum(before), series: [{ id: name, data: cur }] };
      }
      const [cur, before, series] = await Promise.all([getOverview(projectId, params), getOverview(projectId, prevParams), getOverviewBucketed(projectId, params, bucket)]);
      return {
        value: metricOf(cur as never, metric),
        previous: metricOf(before as never, metric),
        series: [{ id: metric, data: series.map(r => ({ x: r.time, y: metricOf(r as never, metric) })) }],
      };
    }
    case "line": {
      const metric = w.metric ?? "sessions";
      if (metric.startsWith("event:")) {
        return { series: [{ id: metric.slice(6), data: await eventMetric(projectId, params, metric.slice(6), bucket) }] };
      }
      if (w.dimension) return { series: await dimensionBucketed(projectId, params, metric, w.dimension, w.limit ?? 5, bucket) };
      const series = await getOverviewBucketed(projectId, params, bucket);
      return { series: [{ id: metric, data: series.map(r => ({ x: r.time, y: metricOf(r as never, metric) })) }] };
    }
    case "pie":
    case "table": {
      if (!w.dimension) throw new BadRequest("dimension required");
      const r = await getMetric(projectId, params, w.dimension as never, { limit: w.limit ?? 10, page: 1 });
      return { rows: r.rows };
    }
    case "funnel": {
      if (!w.funnelId) throw new BadRequest("funnelId required");
      const f = (await listFunnels(projectId)).find(x => x.id === w.funnelId);
      if (!f) return { funnel: [] };
      const res = await runFunnel(projectId, params, f.definition);
      return { funnel: res.map(s => ({ label: s.label, count: s.count, conversion: s.conversion })) };
    }
  }
}
