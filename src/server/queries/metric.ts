import "server-only";
import type { AnalyticsParams, MetricParameter, MetricRow } from "@/lib/types";
import { query, T } from "../clickhouse";
import { buildEventsWhere, buildSessionsWhere, eventColumn, sessionColumn } from "../sql";

/** Parameters answered from the events table (counted in pageviews). */
const PAGE_LEVEL = new Set<MetricParameter>(["pathname", "page_title", "page_title_path", "querystring", "hostname", "event_name", "build_version", "asn_org"]);

export interface MetricOptions {
  limit: number;
  page: number;
  search?: string;
}

export async function getMetric(
  projectId: number,
  p: AnalyticsParams,
  parameter: MetricParameter,
  opts: MetricOptions
): Promise<{ rows: MetricRow[]; total: number }> {
  const limit = Math.min(Math.max(opts.limit, 1), 500);
  const offset = Math.max(opts.page - 1, 0) * limit;

  if (PAGE_LEVEL.has(parameter)) {
    const built = buildEventsWhere(projectId, p, T.events, T.sessions);
    const isEvent = parameter === "event_name";
    const groupExpr =
      parameter === "page_title_path" ? "path" : eventColumn(parameter === "event_name" ? "event_name" : (parameter as never));
    const valueExpr = parameter === "page_title_path" ? "path" : groupExpr;
    const extra = parameter === "page_title_path" || parameter === "pathname" ? ", anyHeavy(title) AS title" : "";
    const search = opts.search ? ` AND ${valueExpr} ILIKE {search:String}` : "";
    if (opts.search) built.params.search = `%${opts.search}%`;
    const countExpr = isEvent ? "count()" : "countIf(is_page = 1)";
    const rowsFilter = isEvent ? "" : " AND is_page = 1";
    const rows = await query<{ value: string; count: string; users: string; total_count: string; total: string; title?: string }>(
      `WITH (SELECT ${countExpr} FROM ${T.events} WHERE ${built.where}${rowsFilter}) AS total_count,
            (SELECT uniq(${valueExpr}) FROM ${T.events} WHERE ${built.where}${rowsFilter}${search}) AS total
       SELECT ${valueExpr} AS value, ${countExpr} AS count, uniq(uid) AS users, total_count, total${extra}
       FROM ${T.events}
       WHERE ${built.where}${rowsFilter}${search}
       GROUP BY value
       ORDER BY count DESC, value
       LIMIT ${limit} OFFSET ${offset}`,
      built.params
    );
    const totalCount = Number(rows[0]?.total_count ?? 0);
    return {
      total: Number(rows[0]?.total ?? 0),
      rows: rows.map(r => ({
        value: r.value,
        count: Number(r.count),
        users: Number(r.users),
        percentage: totalCount ? Math.round((1000 * Number(r.count)) / totalCount) / 10 : 0,
        extra: r.title !== undefined ? { title: r.title } : undefined,
      })),
    };
  }

  // Session level: count sessions.
  const built = buildSessionsWhere(projectId, p, T.events, T.sessions);
  const col = sessionColumn(parameter as never) ?? (parameter === "sess_refhost" ? "sess_refhost" : null);
  if (!col) throw new Error(`unsupported metric ${parameter}`);
  const isAgg = col.includes("Merge(");
  // Aggregated columns (entry/exit page) must be computed per session first.
  const inner = `SELECT uid, sess_start, ${isAgg ? col : `any(${col})`} AS value
                 ${built.having ? ", argMinMerge(entry_path) entry_path_v, argMaxMerge(exit_path) exit_path_v" : ""}
                 FROM ${T.sessions} WHERE ${built.where} GROUP BY uid, sess_start
                 ${built.having ? "HAVING " + built.having.replace(/argMinMerge\(entry_path\)/g, "entry_path_v").replace(/argMaxMerge\(exit_path\)/g, "exit_path_v") : ""}`;
  const search = opts.search ? ` WHERE value ILIKE {search:String}` : "";
  if (opts.search) built.params.search = `%${opts.search}%`;
  const rows = await query<{ value: string; count: string; users: string; total_count: string; total: string }>(
    `WITH (SELECT count() FROM (${inner})) AS total_count,
          (SELECT uniq(value) FROM (${inner})${search}) AS total
     SELECT value, count() AS count, uniq(uid) AS users, total_count, total
     FROM (${inner})${search}
     GROUP BY value
     ORDER BY count DESC, value
     LIMIT ${limit} OFFSET ${offset}`,
    built.params
  );
  const totalCount = Number(rows[0]?.total_count ?? 0);
  return {
    total: Number(rows[0]?.total ?? 0),
    rows: rows.map(r => ({
      value: r.value,
      count: Number(r.count),
      users: Number(r.users),
      percentage: totalCount ? Math.round((1000 * Number(r.count)) / totalCount) / 10 : 0,
    })),
  };
}
