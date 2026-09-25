import "server-only";
import { randomUUID } from "node:crypto";
import type { Dashboard, DashboardConfig, Widget } from "@/lib/dashboards";
import { FILTER_PARAMETERS } from "@/lib/types";
import { query, T } from "../clickhouse";
import { BadRequest, parseFilters } from "../params";

const TYPES = new Set(["stat", "line", "pie", "table", "funnel"]);

export function validateConfig(raw: unknown): DashboardConfig {
  const c = (raw ?? {}) as Partial<DashboardConfig>;
  if (!Array.isArray(c.widgets) || c.widgets.length > 60) throw new BadRequest("widgets must be an array (max 60)");
  const widgets: Widget[] = c.widgets.map((w, i) => {
    const x = (w ?? {}) as Partial<Widget>;
    if (!TYPES.has(String(x.type))) throw new BadRequest(`widget ${i}: unknown type`);
    const g = x.grid ?? { x: 0, y: 0, w: 4, h: 6 };
    const dim = x.dimension ? String(x.dimension) : undefined;
    if (dim && dim !== "event_name" && !(FILTER_PARAMETERS as readonly string[]).includes(dim)) throw new BadRequest(`widget ${i}: unknown dimension`);
    return {
      id: String(x.id ?? `w${i}`).slice(0, 40),
      type: x.type as Widget["type"],
      title: String(x.title ?? "").slice(0, 120),
      metric: x.metric ? (String(x.metric).slice(0, 220) as Widget["metric"]) : undefined,
      dimension: dim as Widget["dimension"],
      limit: x.limit !== undefined ? Math.min(Math.max(Number(x.limit) || 10, 1), 50) : undefined,
      funnelId: x.funnelId && /^[0-9a-f-]{36}$/.test(String(x.funnelId)) ? String(x.funnelId) : undefined,
      filters: x.filters ? parseFilters(JSON.stringify(x.filters)) : undefined,
      grid: { x: clamp(g.x, 0, 11), y: clamp(g.y, 0, 10_000), w: clamp(g.w, 1, 12), h: clamp(g.h, 2, 60) },
    };
  });
  return { widgets };
}
const clamp = (v: unknown, lo: number, hi: number) => Math.min(Math.max(Math.floor(Number(v) || 0), lo), hi);

export async function listDashboards(projectId: number): Promise<Dashboard[]> {
  const rows = await query<{ id: string; name: string; config: string; updated: string }>(
    `SELECT id, name, config, updated FROM ${T.dashboards} FINAL WHERE projectId = {projectId:UInt32} AND deleted = 0 ORDER BY updated DESC`,
    { projectId }
  );
  return rows.map(r => ({ id: r.id, name: r.name, config: JSON.parse(r.config) as DashboardConfig, updated: r.updated }));
}

export async function saveDashboard(projectId: number, input: { id?: string; name: string; config: DashboardConfig }): Promise<Dashboard> {
  const id = input.id && /^[0-9a-f-]{36}$/.test(input.id) ? input.id : randomUUID();
  const name = input.name.trim().slice(0, 100) || "Dashboard";
  const { ch } = await import("../clickhouse");
  await ch().insert({
    table: T.dashboards,
    values: [{ projectId, id, name, config: JSON.stringify(input.config), updated: Math.floor(Date.now() / 1000), deleted: 0 }],
    format: "JSONEachRow",
  });
  return { id, name, config: input.config, updated: new Date().toISOString() };
}

export async function deleteDashboard(projectId: number, id: string): Promise<void> {
  const existing = (await listDashboards(projectId)).find(d => d.id === id);
  if (!existing) return;
  const { ch } = await import("../clickhouse");
  await ch().insert({
    table: T.dashboards,
    values: [{ projectId, id, name: existing.name, config: JSON.stringify(existing.config), updated: Math.floor(Date.now() / 1000), deleted: 1 }],
    format: "JSONEachRow",
  });
}
