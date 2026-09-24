import "server-only";
import { randomUUID } from "node:crypto";
import type { AnalyticsParams } from "@/lib/types";
import { query, T, type Params } from "../clickhouse";
import { buildEventsWhere } from "../sql";
import { BadRequest } from "../params";

export interface FunnelStep {
  /** Event name; 'page' for pageviews. */
  event: string;
  /** Optional page path (mainly for 'page'). */
  path?: string;
  /** Optional property filter on data props. */
  prop_key?: string;
  prop_value?: string;
  label?: string;
}

export interface FunnelDefinition {
  steps: FunnelStep[];
  /** Max seconds between first and last step. 0 = whole selected range. */
  window: number;
  /** Count users (uid) or sessions (uid + sess_start). */
  scope: "user" | "session";
}

export interface FunnelStepResult {
  step: number;
  label: string;
  count: number;
  /** % of step 1 */
  conversion: number;
  /** % of previous step */
  step_conversion: number;
  dropoff: number;
}

export interface SavedFunnel {
  id: string;
  name: string;
  definition: FunnelDefinition;
  updated: string;
}

export function validateDefinition(raw: unknown): FunnelDefinition {
  const d = (raw ?? {}) as Partial<FunnelDefinition>;
  if (!Array.isArray(d.steps) || d.steps.length < 2 || d.steps.length > 10) throw new BadRequest("funnel needs 2..10 steps");
  const steps: FunnelStep[] = d.steps.map(s => {
    const st = (s ?? {}) as Partial<FunnelStep>;
    if (!st.event || typeof st.event !== "string") throw new BadRequest("each step needs an event name");
    return {
      event: st.event.slice(0, 200),
      path: st.path ? String(st.path).slice(0, 500) : undefined,
      prop_key: st.prop_key ? String(st.prop_key).slice(0, 200) : undefined,
      prop_value: st.prop_key && st.prop_value !== undefined ? String(st.prop_value).slice(0, 500) : undefined,
      label: st.label ? String(st.label).slice(0, 100) : undefined,
    };
  });
  const window = Number(d.window ?? 0);
  if (!Number.isFinite(window) || window < 0 || window > 90 * 86400) throw new BadRequest("invalid window");
  const scope = d.scope === "session" ? "session" : "user";
  return { steps, window: Math.floor(window), scope };
}

function stepLabel(s: FunnelStep): string {
  if (s.label) return s.label;
  let l = s.event;
  if (s.path) l += ` ${s.path}`;
  if (s.prop_key) l += ` [${s.prop_key}=${s.prop_value ?? ""}]`;
  return l;
}

export async function runFunnel(projectId: number, p: AnalyticsParams, def: FunnelDefinition): Promise<FunnelStepResult[]> {
  const built = buildEventsWhere(projectId, p, T.events, T.sessions);
  const params: Params = { ...built.params };
  const conds = def.steps.map((s, i) => {
    params[`s${i}_e`] = s.event;
    let c = `name = {s${i}_e:String}`;
    if (s.path) {
      params[`s${i}_p`] = s.path;
      c += ` AND path = {s${i}_p:String}`;
    }
    if (s.prop_key) {
      params[`s${i}_k`] = s.prop_key;
      params[`s${i}_v`] = s.prop_value ?? "";
      c += ` AND props[{s${i}_k:String}] = {s${i}_v:String}`;
    }
    return `(${c})`;
  });
  params.names = [...new Set(def.steps.map(s => s.event))];
  // windowFunnel works in the unit of its timestamp argument: ts is in ms.
  const windowMs = def.window > 0 ? def.window * 1000 : p.to - p.from;
  params.win = windowMs;
  const key = def.scope === "session" ? "uid, sess_start" : "uid";
  const rows = await query<{ level: string; c: string }>(
    `SELECT level, count() AS c
     FROM (
       SELECT ${key}, windowFunnel({win:UInt64})(ts, ${conds.join(", ")}) AS level
       FROM ${T.events}
       WHERE ${built.where} AND name IN ({names:Array(String)})
       GROUP BY ${key}
     )
     WHERE level > 0
     GROUP BY level`,
    params
  );
  const byLevel = new Map(rows.map(r => [Number(r.level), Number(r.c)]));
  const n = def.steps.length;
  const reached: number[] = [];
  for (let k = 1; k <= n; k++) {
    let sum = 0;
    for (let l = k; l <= n; l++) sum += byLevel.get(l) ?? 0;
    reached.push(sum);
  }
  return def.steps.map((s, i) => {
    const count = reached[i];
    const prev = i === 0 ? count : reached[i - 1];
    return {
      step: i + 1,
      label: stepLabel(s),
      count,
      conversion: reached[0] ? Math.round((1000 * count) / reached[0]) / 10 : 0,
      step_conversion: prev ? Math.round((1000 * count) / prev) / 10 : 0,
      dropoff: i === 0 ? 0 : prev - count,
    };
  });
}

export async function listFunnels(projectId: number): Promise<SavedFunnel[]> {
  const rows = await query<{ id: string; name: string; definition: string; updated: string }>(
    `SELECT id, name, definition, updated FROM ${T.funnels} FINAL WHERE projectId = {projectId:UInt32} AND deleted = 0 ORDER BY updated DESC`,
    { projectId }
  );
  return rows.map(r => ({ id: r.id, name: r.name, definition: JSON.parse(r.definition) as FunnelDefinition, updated: r.updated }));
}

export async function saveFunnel(projectId: number, input: { id?: string; name: string; definition: FunnelDefinition }): Promise<SavedFunnel> {
  const id = input.id && /^[0-9a-f-]{36}$/.test(input.id) ? input.id : randomUUID();
  const name = input.name.trim().slice(0, 100) || "Untitled funnel";
  const { ch } = await import("../clickhouse");
  await ch().insert({
    table: T.funnels,
    values: [{ projectId, id, name, definition: JSON.stringify(input.definition), updated: Math.floor(Date.now() / 1000), deleted: 0 }],
    format: "JSONEachRow",
  });
  return { id, name, definition: input.definition, updated: new Date().toISOString() };
}

export async function deleteFunnel(projectId: number, id: string): Promise<void> {
  const existing = (await listFunnels(projectId)).find(f => f.id === id);
  if (!existing) return;
  const { ch } = await import("../clickhouse");
  await ch().insert({
    table: T.funnels,
    values: [{ projectId, id, name: existing.name, definition: JSON.stringify(existing.definition), updated: Math.floor(Date.now() / 1000), deleted: 1 }],
    format: "JSONEachRow",
  });
}
