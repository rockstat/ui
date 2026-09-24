// Shared between server queries and client components.

export type FilterType =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "starts_with"
  | "ends_with"
  | "regex"
  | "is_null"
  | "is_not_null";

export const FILTER_PARAMETERS = [
  "hostname",
  "pathname",
  "page_title",
  "querystring",
  "entry_page",
  "exit_page",
  "referrer",
  "sess_type",
  "sess_engine",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "pid",
  "cid",
  "country",
  "region",
  "city",
  "browser",
  "browser_version",
  "os",
  "os_version",
  "device_type",
  "device_vendor",
  "device_model",
  "screen",
  "locale",
  "currency",
  "language",
  "timezone",
  "build_version",
  "event_name",
  "user_id",
  "uid",
  "is_auth",
  "is_bot",
  "is_webview",
  "asn_org",
] as const;

export type FilterParameter = (typeof FILTER_PARAMETERS)[number];

export interface Filter {
  parameter: FilterParameter;
  type: FilterType;
  value: string[];
}

/** Query-string shape every analytics endpoint accepts. */
export interface AnalyticsParams {
  /** Unix ms, inclusive. */
  from: number;
  /** Unix ms, exclusive. */
  to: number;
  /** IANA timezone used for bucketing. */
  tz: string;
  filters: Filter[];
  /** Exclude events flagged as bots. Default true. */
  excludeBots?: boolean;
}

export type Bucket = "minute" | "five_minutes" | "fifteen_minutes" | "hour" | "day" | "week" | "month";

export interface OverviewMetrics {
  pageviews: number;
  events: number;
  sessions: number;
  users: number;
  bounce_rate: number; // 0..100
  session_duration: number; // seconds
  pages_per_session: number;
  auth_users: number;
}

export interface BucketedRow {
  time: string; // 'YYYY-MM-DD HH:MM:SS' in tz
  pageviews: number;
  events: number;
  sessions: number;
  users: number;
  bounce_rate: number;
  session_duration: number;
  pages_per_session: number;
}

export interface MetricRow {
  value: string;
  count: number;
  users: number;
  percentage: number;
  extra?: Record<string, string | number>;
}

export type MetricParameter =
  | FilterParameter
  | "page_title_path" // title grouped with its path
  | "sess_refhost"
  | "event_name";

export interface SessionRow {
  uid: string;
  sess_start: number;
  start_ts: number;
  end_ts: number;
  duration: number;
  pageviews: number;
  events: number;
  entry_path: string;
  exit_path: string;
  entry_url: string;
  entry_title: string;
  entry_ref: string;
  host: string;
  sess_num: number;
  sess_type: string;
  sess_engine: string;
  sess_refhost: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  pid: string;
  cid: string;
  user_id: string;
  is_auth: number;
  locale: string;
  currency: string;
  language: string;
  tz: string;
  country: string;
  region: string;
  city: string;
  browser: string;
  browser_version: string;
  os: string;
  os_version: string;
  device_type: string;
  device_vendor: string;
  device_model: string;
  screen_w: number;
  screen_h: number;
  is_bot: number;
  is_webview: number;
  threat_score: number;
  ip: string;
  has_replay?: boolean;
}

export interface EventRow {
  ts: number;
  name: string;
  is_page: number;
  host: string;
  path: string;
  query: string;
  title: string;
  url: string;
  ref: string;
  uid: string;
  sess_start: number;
  user_id: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  device_type: string;
  props: Record<string, string>;
}

export interface EventNameRow {
  name: string;
  count: number;
  users: number;
  sessions: number;
}

export interface UserProfile {
  uid: string;
  user_id: string;
  first_seen: number;
  last_seen: number;
  sessions: number;
  pageviews: number;
  events: number;
  country: string;
  region: string;
  city: string;
  browser: string;
  browser_version: string;
  os: string;
  os_version: string;
  device_type: string;
  device_vendor: string;
  device_model: string;
  screen_w: number;
  screen_h: number;
  locale: string;
  currency: string;
  language: string;
  tz: string;
  is_auth: number;
  ip: string;
  user_ids: string[];
}

export type VitalName = "LCP" | "CLS" | "INP" | "FCP" | "TTFB";
export const VITAL_NAMES: VitalName[] = ["LCP", "CLS", "INP", "FCP", "TTFB"];

export interface VitalSummary {
  name: VitalName;
  samples: number;
  p50: number;
  p75: number;
  p90: number;
  p99: number;
  good: number;
  needs_improvement: number;
  poor: number;
}

export interface VitalBreakdownRow {
  value: string;
  samples: number;
  p75: number;
  good: number;
  needs_improvement: number;
  poor: number;
}

export interface Paged<T> {
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
}
