"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type {
  BucketedRow,
  EventNameRow,
  EventRow,
  MetricParameter,
  MetricRow,
  OverviewMetrics,
  Paged,
  SessionRow,
  UserProfile,
  VitalBreakdownRow,
  VitalName,
  VitalSummary,
  Bucket,
} from "./types";
import { useAnalyticsState } from "./state";
import { useProjectId } from "./project";

export interface Project {
  id: number;
  name: string;
  domains?: string[];
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function api<T>(path: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") sp.set(k, String(v));
  const qs = sp.toString();
  const res = await fetch(`/api/${path}${qs ? `?${qs}` : ""}`);
  if (res.status === 401 && typeof window !== "undefined") {
    window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(res.status, body.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export function useProjects() {
  return useQuery({ queryKey: ["projects"], queryFn: () => api<Project[]>("projects"), staleTime: 5 * 60_000 });
}

/** Base for per-project analytics hooks: project id + current query. */
function useCtx(prev = false) {
  const project = useProjectId();
  const s = useAnalyticsState();
  const q = prev ? s.prevQuery : s.query;
  return { project, q, s };
}

export function useOverview(prev = false) {
  const { project, q } = useCtx(prev);
  return useQuery({
    queryKey: ["overview", project, q],
    queryFn: () => api<OverviewMetrics>(`p/${project}/overview`, q),
    placeholderData: keepPreviousData,
  });
}

export function useOverviewBucketed(bucket?: Bucket, prev = false) {
  const { project, q, s } = useCtx(prev);
  const b = bucket ?? s.bucket;
  return useQuery({
    queryKey: ["overview-bucketed", project, q, b],
    queryFn: () => api<BucketedRow[]>(`p/${project}/overview-bucketed`, { ...q, bucket: b }),
    placeholderData: keepPreviousData,
  });
}

export function useMetric(parameter: MetricParameter, opts: { limit?: number; page?: number; search?: string; enabled?: boolean } = {}) {
  const { project, q } = useCtx();
  return useQuery({
    queryKey: ["metric", project, q, parameter, opts.limit ?? 10, opts.page ?? 1, opts.search ?? ""],
    queryFn: () =>
      api<{ rows: MetricRow[]; total: number }>(`p/${project}/metric`, {
        ...q,
        parameter,
        limit: opts.limit ?? 10,
        page: opts.page ?? 1,
        search: opts.search,
      }),
    placeholderData: keepPreviousData,
    enabled: opts.enabled ?? true,
  });
}

export function useSessions(opts: { page: number; pageSize?: number; uid?: string; userId?: string }) {
  const { project, q } = useCtx();
  return useQuery({
    queryKey: ["sessions", project, q, opts],
    queryFn: () => api<Paged<SessionRow>>(`p/${project}/sessions`, { ...q, page: opts.page, pageSize: opts.pageSize ?? 50, uid: opts.uid, userId: opts.userId }),
    placeholderData: keepPreviousData,
  });
}

export function useSession(uid: string, start: number, enabled = true) {
  const project = useProjectId();
  return useQuery({
    queryKey: ["session", project, uid, start],
    queryFn: () => api<{ session?: SessionRow; events: EventRow[]; hasReplay?: boolean }>(`p/${project}/session`, { uid, start }),
    enabled,
    staleTime: 60_000,
  });
}

export function useEventNames(search?: string, limit = 200) {
  const { project, q } = useCtx();
  return useQuery({
    queryKey: ["event-names", project, q, search ?? "", limit],
    queryFn: () => api<EventNameRow[]>(`p/${project}/events/names`, { ...q, search, limit }),
    placeholderData: keepPreviousData,
  });
}

export function useEventsBucketed(names: string[]) {
  const { project, q, s } = useCtx();
  return useQuery({
    queryKey: ["events-bucketed", project, q, s.bucket, names],
    queryFn: () => api<{ time: string; name: string; count: number; users: number }[]>(`p/${project}/events/bucketed`, { ...q, bucket: s.bucket, names: names.join(",") }),
    enabled: names.length > 0,
    placeholderData: keepPreviousData,
  });
}

export function useEventLog(opts: { page: number; pageSize?: number; names?: string[]; uid?: string; userId?: string }) {
  const { project, q } = useCtx();
  return useQuery({
    queryKey: ["event-log", project, q, opts],
    queryFn: () =>
      api<Paged<EventRow>>(`p/${project}/events/log`, {
        ...q,
        page: opts.page,
        pageSize: opts.pageSize ?? 100,
        names: opts.names?.join(","),
        uid: opts.uid,
        userId: opts.userId,
      }),
    placeholderData: keepPreviousData,
  });
}

export function useEventProps(name: string | null, key?: string) {
  const { project, q } = useCtx();
  return useQuery({
    queryKey: ["event-props", project, q, name, key ?? ""],
    queryFn: () => api<{ keys: { key: string; count: number }[]; values: MetricRow[] }>(`p/${project}/events/props`, { ...q, name: name!, key }),
    enabled: !!name,
    placeholderData: keepPreviousData,
  });
}

export function useUserProfile(key: { uid?: string; userId?: string }) {
  const project = useProjectId();
  return useQuery({
    queryKey: ["user", project, key],
    queryFn: () => api<UserProfile | null>(`p/${project}/user`, key),
    enabled: !!(key.uid || key.userId),
  });
}

export function useVitalsSummary() {
  const { project, q } = useCtx();
  return useQuery({ queryKey: ["vitals-summary", project, q], queryFn: () => api<VitalSummary[]>(`p/${project}/vitals/summary`, q), placeholderData: keepPreviousData });
}

export function useVitalsBucketed() {
  const { project, q, s } = useCtx();
  return useQuery({
    queryKey: ["vitals-bucketed", project, q, s.bucket],
    queryFn: () => api<{ time: string; name: VitalName; p75: number; samples: number }[]>(`p/${project}/vitals/bucketed`, { ...q, bucket: s.bucket }),
    placeholderData: keepPreviousData,
  });
}

export function useVitalsBreakdown(name: VitalName, dimension: string, limit = 50) {
  const { project, q } = useCtx();
  return useQuery({
    queryKey: ["vitals-breakdown", project, q, name, dimension, limit],
    queryFn: () => api<VitalBreakdownRow[]>(`p/${project}/vitals/breakdown`, { ...q, name, dimension, limit }),
    placeholderData: keepPreviousData,
  });
}

export function useLive(minutes = 5) {
  const project = useProjectId();
  return useQuery({
    queryKey: ["live", project, minutes],
    queryFn: () => api<{ users: number }>(`p/${project}/live`, { minutes }),
    refetchInterval: 30_000,
  });
}

// ---- Funnels ----
import type { FunnelDefinition, FunnelStepResult, SavedFunnel } from "@/server/queries/funnels";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export type { FunnelDefinition, FunnelStep, FunnelStepResult, SavedFunnel } from "@/server/queries/funnels";

async function apiJson<T>(method: "POST" | "DELETE", path: string, params: Record<string, string> = {}, body?: unknown): Promise<T> {
  const sp = new URLSearchParams(params);
  const res = await fetch(`/api/${path}${sp.size ? `?${sp}` : ""}`, {
    method,
    headers: body !== undefined ? { "content-type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const b = (await res.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(res.status, b.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export function useFunnels() {
  const project = useProjectId();
  return useQuery({ queryKey: ["funnels", project], queryFn: () => api<SavedFunnel[]>(`p/${project}/funnels`) });
}

export function useFunnelRun(def: FunnelDefinition | null) {
  const { project, q } = useCtx();
  return useQuery({
    queryKey: ["funnel-run", project, q, def],
    queryFn: () => apiJson<FunnelStepResult[]>("POST", `p/${project}/funnels/run`, q, def),
    enabled: !!def && def.steps.length >= 2 && def.steps.every(s => s.event),
    placeholderData: keepPreviousData,
  });
}

export function useSaveFunnel() {
  const project = useProjectId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id?: string; name: string; definition: FunnelDefinition }) => apiJson<SavedFunnel>("POST", `p/${project}/funnels`, {}, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["funnels", project] }),
  });
}

export function useDeleteFunnel() {
  const project = useProjectId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiJson<{ ok: true }>("DELETE", `p/${project}/funnels`, { id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["funnels", project] }),
  });
}

// ---- Dashboards ----
import type { Dashboard, DashboardConfig, Widget } from "@/lib/dashboards";
import type { WidgetData } from "@/server/queries/widget";
export type { WidgetData } from "@/server/queries/widget";

export function useDashboards() {
  const project = useProjectId();
  return useQuery({ queryKey: ["dashboards", project], queryFn: () => api<Dashboard[]>(`p/${project}/dashboards`) });
}

export function useSaveDashboard() {
  const project = useProjectId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id?: string; name: string; config: DashboardConfig }) => apiJson<Dashboard>("POST", `p/${project}/dashboards`, {}, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboards", project] }),
  });
}

export function useDeleteDashboard() {
  const project = useProjectId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiJson<{ ok: true }>("DELETE", `p/${project}/dashboards`, { id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboards", project] }),
  });
}

/** Data for one widget; the key excludes grid position so moving a widget does not refetch. */
export function useWidget(w: Widget) {
  const { project, q, s } = useCtx();
  const spec = { type: w.type, metric: w.metric, dimension: w.dimension, limit: w.limit, funnelId: w.funnelId, filters: w.filters };
  return useQuery({
    queryKey: ["widget", project, q, s.bucket, spec],
    queryFn: () => apiJson<WidgetData>("POST", `p/${project}/widget`, { ...q, bucket: s.bucket }, { ...spec, id: w.id, title: w.title, grid: w.grid }),
    placeholderData: keepPreviousData,
  });
}
