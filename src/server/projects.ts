import "server-only";
import { env } from "./env";
import { query, T } from "./clickhouse";

export interface Project {
  id: number;
  name: string;
  domains?: string[];
}

/** Without PROJECTS in the environment, projects are discovered from the data (see listProjects). */
const DEFAULT_PROJECTS: Project[] = [];

function configured(): Project[] {
  if (!env.projectsJson) return DEFAULT_PROJECTS;
  try {
    const parsed = JSON.parse(env.projectsJson) as Project[];
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch (e) {
    console.error("PROJECTS env is not valid JSON", e);
  }
  return DEFAULT_PROJECTS;
}

let cache: { at: number; projects: Project[] } | null = null;

/** Configured projects, plus any project id seen in the last 7 days that is not configured (named after its busiest host). */
export async function listProjects(): Promise<Project[]> {
  if (cache && Date.now() - cache.at < 5 * 60_000) return cache.projects;
  const base = configured();
  const known = new Set(base.map(p => p.id));
  const rows = await query<{ projectId: number; host: string; c: string }>(
    `SELECT projectId, host, count() c
     FROM ${T.events}
     WHERE date >= today() - 7 AND is_page = 1
     GROUP BY projectId, host
     ORDER BY projectId, c DESC
     LIMIT 3 BY projectId`
  );
  const domains = new Map<number, string[]>();
  for (const r of rows) {
    const id = Number(r.projectId);
    if (!domains.has(id)) domains.set(id, []);
    if (r.host) domains.get(id)!.push(r.host);
  }
  const projects: Project[] = base.map(p => ({ ...p, domains: p.domains ?? domains.get(p.id) ?? [] }));
  for (const [id, hosts] of domains) {
    if (!known.has(id)) projects.push({ id, name: hosts[0] || `Project ${id}`, domains: hosts });
  }
  cache = { at: Date.now(), projects };
  return projects;
}

export async function getProject(id: number): Promise<Project | undefined> {
  return (await listProjects()).find(p => p.id === id);
}
