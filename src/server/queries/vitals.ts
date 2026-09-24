import "server-only";
import type { AnalyticsParams, Bucket, VitalBreakdownRow, VitalName, VitalSummary } from "@/lib/types";
import { VITAL_NAMES } from "@/lib/types";
import { query, T } from "../clickhouse";
import { bucketExpr } from "../sql";
import type { Params } from "../clickhouse";

/**
 * Vitals live in the raw stats.vitals table (data_extra: name, value, rating).
 * Only a subset of filters is applied here: those whose raw columns exist.
 */
const RAW_COLS: Partial<Record<string, string>> = {
  hostname: "page_domain_wo_www",
  pathname: "page_path",
  country: "mmgeo_country_iso",
  region: "mmgeo_region_en",
  city: "mmgeo_city_en",
  browser: "uap_browser_name",
  os: "uap_os_name",
  device_type: "uap_device_type",
  sess_type: "sess_type",
  utm_source: "sess_marks_utm_source",
  utm_medium: "sess_marks_utm_medium",
  utm_campaign: "sess_marks_utm_campaign",
  user_id: "user_id",
  uid: "toString(uid)",
};

function base(projectId: number, p: AnalyticsParams): { where: string; params: Params } {
  const params: Params = { projectId, from: Math.floor(p.from / 1000), to: Math.floor(p.to / 1000) };
  const c = [
    `projectId = {projectId:UInt32}`,
    `date >= toDate(toDateTime({from:UInt32}))`,
    `date <= toDate(toDateTime({to:UInt32}))`,
    `dateTime >= toDateTime({from:UInt32})`,
    `dateTime < toDateTime({to:UInt32})`,
    `has(data_extra.key, 'name')`,
  ];
  if (p.excludeBots !== false) c.push(`uapc_is_bot = 0`);
  p.filters.forEach((f, i) => {
    const col = RAW_COLS[f.parameter];
    if (!col) return;
    if (f.type === "equals") {
      params[`v${i}`] = f.value;
      c.push(`${col} IN ({v${i}:Array(String)})`);
    } else if (f.type === "not_equals") {
      params[`v${i}`] = f.value;
      c.push(`${col} NOT IN ({v${i}:Array(String)})`);
    } else if (f.type === "contains") {
      params[`v${i}`] = `%${f.value[0] ?? ""}%`;
      c.push(`${col} LIKE {v${i}:String}`);
    }
  });
  return { where: c.join(" AND "), params };
}

const VNAME = `data_extra.value[indexOf(data_extra.key, 'name')]`;
const VVALUE = `toFloat64OrZero(data_extra.value[indexOf(data_extra.key, 'value')])`;
const VRATING = `data_extra.value[indexOf(data_extra.key, 'rating')]`;

export async function getVitalsSummary(projectId: number, p: AnalyticsParams): Promise<VitalSummary[]> {
  const b = base(projectId, p);
  const rows = await query<Record<string, string>>(
    `SELECT ${VNAME} AS name, count() AS samples,
            quantile(0.5)(v) AS p50, quantile(0.75)(v) AS p75, quantile(0.9)(v) AS p90, quantile(0.99)(v) AS p99,
            countIf(r = 'good') AS good, countIf(r = 'needs-improvement') AS needs_improvement, countIf(r = 'poor') AS poor
     FROM (SELECT data_extra.key, data_extra.value, ${VVALUE} AS v, ${VRATING} AS r FROM ${T.vitals} WHERE ${b.where})
     WHERE name IN ('LCP','CLS','INP','FCP','TTFB')
     GROUP BY name`,
    b.params
  );
  const byName = new Map(rows.map(r => [r.name, r]));
  return VITAL_NAMES.map(name => {
    const r = byName.get(name);
    return {
      name,
      samples: Number(r?.samples ?? 0),
      p50: Number(r?.p50 ?? 0),
      p75: Number(r?.p75 ?? 0),
      p90: Number(r?.p90 ?? 0),
      p99: Number(r?.p99 ?? 0),
      good: Number(r?.good ?? 0),
      needs_improvement: Number(r?.needs_improvement ?? 0),
      poor: Number(r?.poor ?? 0),
    };
  });
}

export async function getVitalsBucketed(projectId: number, p: AnalyticsParams, bucket: Bucket) {
  const b = base(projectId, p);
  b.params.tz = p.tz;
  const rows = await query<{ time: string; name: string; p75: string; samples: string }>(
    `SELECT ${bucketExpr("dateTime", bucket)} AS time, ${VNAME} AS name, quantile(0.75)(${VVALUE}) AS p75, count() AS samples
     FROM ${T.vitals} WHERE ${b.where} AND ${VNAME} IN ('LCP','CLS','INP','FCP','TTFB')
     GROUP BY time, name ORDER BY time`,
    b.params
  );
  return rows.map(r => ({ time: r.time, name: r.name as VitalName, p75: Number(r.p75), samples: Number(r.samples) }));
}

const DIM_COLS: Record<string, string> = {
  pathname: "page_path",
  hostname: "page_domain_wo_www",
  country: "mmgeo_country_iso",
  device_type: "uap_device_type",
  browser: "uap_browser_name",
  os: "uap_os_name",
  region: "mmgeo_region_en",
  city: "mmgeo_city_en",
};

export async function getVitalsBreakdown(
  projectId: number,
  p: AnalyticsParams,
  name: VitalName,
  dimension: string,
  limit = 50
): Promise<VitalBreakdownRow[]> {
  const col = DIM_COLS[dimension];
  if (!col) throw new Error(`unsupported dimension ${dimension}`);
  const b = base(projectId, p);
  b.params.name = name;
  const rows = await query<Record<string, string>>(
    `SELECT ${col} AS value, count() AS samples, quantile(0.75)(${VVALUE}) AS p75,
            countIf(${VRATING} = 'good') AS good, countIf(${VRATING} = 'needs-improvement') AS needs_improvement, countIf(${VRATING} = 'poor') AS poor
     FROM ${T.vitals} WHERE ${b.where} AND ${VNAME} = {name:String}
     GROUP BY value ORDER BY samples DESC LIMIT ${Math.min(limit, 500)}`,
    b.params
  );
  return rows.map(r => ({
    value: r.value,
    samples: Number(r.samples),
    p75: Number(r.p75),
    good: Number(r.good),
    needs_improvement: Number(r.needs_improvement),
    poor: Number(r.poor),
  }));
}
