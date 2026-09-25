import type { Filter, FilterParameter } from "./types";

export type WidgetType = "stat" | "line" | "pie" | "table" | "funnel";

/** Metrics a widget can show; "event:<name>" counts occurrences of one event. */
export type WidgetMetric = "users" | "sessions" | "pageviews" | "events" | "bounce_rate" | "session_duration" | "pages_per_session" | `event:${string}`;

export const BASE_METRICS: { id: WidgetMetric; label: string }[] = [
  { id: "users", label: "Users" },
  { id: "sessions", label: "Sessions" },
  { id: "pageviews", label: "Pageviews" },
  { id: "events", label: "Events" },
  { id: "bounce_rate", label: "Bounce rate" },
  { id: "session_duration", label: "Session duration" },
  { id: "pages_per_session", label: "Pages / session" },
];

export interface WidgetGrid {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  /** stat / line: what to measure. */
  metric?: WidgetMetric;
  /** pie / table: what to break down by; line: optional split into top-N series. */
  dimension?: FilterParameter | "event_name";
  /** pie / table / line split: number of values. */
  limit?: number;
  /** funnel: saved funnel id. */
  funnelId?: string;
  /** Extra filters applied on top of the global ones. */
  filters?: Filter[];
  grid: WidgetGrid;
}

export interface DashboardConfig {
  widgets: Widget[];
}

export interface Dashboard {
  id: string;
  name: string;
  config: DashboardConfig;
  updated: string;
}

export const GRID_COLS = 12;
export const ROW_HEIGHT = 40;

export function metricLabel(m: WidgetMetric | undefined): string {
  if (!m) return "";
  if (m.startsWith("event:")) return m.slice(6);
  return BASE_METRICS.find(b => b.id === m)?.label ?? m;
}

let seq = 0;
export function newWidgetId(): string {
  return `w${Date.now().toString(36)}${(seq++).toString(36)}`;
}

/** The starting dashboard, modelled on the default Yandex Metrica set. */
export function defaultDashboard(): DashboardConfig {
  const w = (partial: Omit<Widget, "id">): Widget => ({ id: newWidgetId(), ...partial });
  return {
    widgets: [
      w({ type: "stat", title: "Users", metric: "users", grid: { x: 0, y: 0, w: 3, h: 3 } }),
      w({ type: "stat", title: "Sessions", metric: "sessions", grid: { x: 3, y: 0, w: 3, h: 3 } }),
      w({ type: "stat", title: "Pageviews", metric: "pageviews", grid: { x: 6, y: 0, w: 3, h: 3 } }),
      w({ type: "stat", title: "Bounce rate", metric: "bounce_rate", grid: { x: 9, y: 0, w: 3, h: 3 } }),
      w({ type: "line", title: "Sessions by traffic type", metric: "sessions", dimension: "sess_type", limit: 6, grid: { x: 0, y: 3, w: 8, h: 8 } }),
      w({ type: "pie", title: "Devices", dimension: "device_type", limit: 6, grid: { x: 8, y: 3, w: 4, h: 8 } }),
      w({ type: "table", title: "Top pages", dimension: "pathname", limit: 10, grid: { x: 0, y: 11, w: 6, h: 9 } }),
      w({ type: "pie", title: "Countries", dimension: "country", limit: 8, grid: { x: 6, y: 11, w: 3, h: 9 } }),
      w({ type: "table", title: "Referrers", dimension: "referrer", limit: 10, grid: { x: 9, y: 11, w: 3, h: 9 } }),
      w({ type: "line", title: "Session duration", metric: "session_duration", grid: { x: 0, y: 20, w: 6, h: 7 } }),
      w({ type: "table", title: "Browsers", dimension: "browser", limit: 8, grid: { x: 6, y: 20, w: 6, h: 7 } }),
    ],
  };
}
