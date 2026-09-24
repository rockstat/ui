import "server-only";
import type { AnalyticsParams } from "@/lib/types";
import { query, T } from "../clickhouse";
import { buildEventsWhere } from "../sql";

export interface JourneyOptions {
  /** Sequence of page paths or of event names. */
  mode: "pages" | "events";
  /** Number of transitions (columns - 1). */
  steps: number;
  /** Top nodes per column; the rest fold into "Other". */
  top: number;
  /** Start sequences at the first occurrence of this value (path or event name). */
  start?: string;
  /** Events mode: names to ignore (noise like page_loaded). */
  exclude?: string[];
}

export interface JourneyNode {
  id: string;
  step: number;
  label: string;
  value: number;
  kind: "node" | "other" | "exit";
}
export interface JourneyLink {
  source: string;
  target: string;
  value: number;
}
export interface Journeys {
  nodes: JourneyNode[];
  links: JourneyLink[];
  sessions: number;
}

const EXIT = "__exit__";
const OTHER = "__other__";

export async function getJourneys(projectId: number, p: AnalyticsParams, o: JourneyOptions): Promise<Journeys> {
  const built = buildEventsWhere(projectId, p, T.events, T.sessions);
  const steps = Math.min(Math.max(o.steps, 1), 10);
  const top = Math.min(Math.max(o.top, 2), 30);
  const valueExpr = o.mode === "pages" ? "path" : "name";
  let rowFilter = o.mode === "pages" ? " AND is_page = 1" : "";
  if (o.mode === "events" && o.exclude?.length) {
    built.params.excl = o.exclude.slice(0, 50);
    rowFilter += " AND name NOT IN ({excl:Array(String)})";
  }
  // Per session: values ordered by time, consecutive duplicates collapsed, optionally
  // cut to start at the chosen value, then the first steps+1 entries.
  let seq = `arrayCompact(arrayMap(x -> x.2, arraySort(x -> x.1, groupArray((ts, ${valueExpr})))))`;
  if (o.start) {
    built.params.start = o.start;
    seq = `arraySlice(${seq}, indexOf(${seq}, {start:String}))`;
  }
  const rows = await query<{ step: string; src: string; dst: string; c: string }>(
    `SELECT t.1 AS step, t.2 AS src, t.3 AS dst, count() AS c
     FROM (
       SELECT arrayJoin(arrayMap(i -> (i, s[i], if(i < length(s), s[i + 1], '${EXIT}')), range(1, least(length(s), ${steps}) + 1))) AS t
       FROM (
         SELECT ${seq} AS s
         FROM ${T.events}
         WHERE ${built.where}${rowFilter}
         GROUP BY uid, sess_start
       )
       WHERE length(s) > 0
     )
     GROUP BY step, src, dst
     ORDER BY step, c DESC`,
    built.params
  );

  // Column totals: column i = outgoing of step i; the last column = incoming of the last step.
  const colTotals: Map<string, number>[] = Array.from({ length: steps + 1 }, () => new Map());
  for (const r of rows) {
    const step = Number(r.step);
    const c = Number(r.c);
    colTotals[step - 1].set(r.src, (colTotals[step - 1].get(r.src) ?? 0) + c);
    colTotals[step].set(r.dst, (colTotals[step].get(r.dst) ?? 0) + c);
  }
  // Keep the top values per column (exits never fold into Other).
  const keep = colTotals.map(m => new Set([...m.entries()].filter(([k]) => k !== EXIT).sort((a, b) => b[1] - a[1]).slice(0, top).map(([k]) => k)));
  const norm = (col: number, v: string) => (v === EXIT ? EXIT : keep[col].has(v) ? v : OTHER);

  const links = new Map<string, number>();
  const nodeVal = new Map<string, number>();
  for (const r of rows) {
    const step = Number(r.step);
    const c = Number(r.c);
    const a = `${step - 1}:${norm(step - 1, r.src)}`;
    const b = `${step}:${norm(step, r.dst)}`;
    links.set(`${a}\u0000${b}`, (links.get(`${a}\u0000${b}`) ?? 0) + c);
    nodeVal.set(a, (nodeVal.get(a) ?? 0) + c);
    if (step === steps || r.dst === EXIT) nodeVal.set(b, (nodeVal.get(b) ?? 0) + c);
  }
  const nodes: JourneyNode[] = [...nodeVal.entries()].map(([id, value]) => {
    const [step, key] = [Number(id.slice(0, id.indexOf(":"))), id.slice(id.indexOf(":") + 1)];
    return {
      id,
      step,
      value,
      label: key === EXIT ? "Exit" : key === OTHER ? "Other" : key || "(empty)",
      kind: key === EXIT ? "exit" : key === OTHER ? "other" : "node",
    };
  });
  // Nodes that are only link targets in intermediate columns get their value from incoming links.
  for (const [k, v] of links) {
    const [, b] = k.split("\u0000");
    if (!nodeVal.has(b)) nodes.push({ id: b, step: Number(b.slice(0, b.indexOf(":"))), value: v, label: b.slice(b.indexOf(":") + 1) || "(empty)", kind: "node" });
  }
  const sessions = [...colTotals[0].values()].reduce((a, b) => a + b, 0);
  return {
    nodes,
    links: [...links.entries()].map(([k, value]) => {
      const [source, target] = k.split("\u0000");
      return { source, target, value };
    }),
    sessions,
  };
}
