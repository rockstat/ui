"use client";
import { parseAsBoolean, parseAsInteger, parseAsJson, parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { useMemo } from "react";
import type { Bucket, Filter } from "./types";
import { browserTz, defaultBucket, previousRange, resolveRange, type RangePreset, type TimeRange } from "./time";
import { FILTER_PARAMETERS } from "./types";

const PRESET_IDS: RangePreset[] = ["today", "yesterday", "24h", "7d", "30d", "90d", "this_month", "last_month", "custom"];
const BUCKETS: Bucket[] = ["minute", "five_minutes", "fifteen_minutes", "hour", "day", "week", "month"];

function validateFilters(v: unknown): Filter[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (f): f is Filter =>
      f && typeof f === "object" && (FILTER_PARAMETERS as readonly string[]).includes(f.parameter) && typeof f.type === "string" && Array.isArray(f.value)
  );
}

export const stateParsers = {
  range: parseAsStringEnum<RangePreset>(PRESET_IDS).withDefault("24h"),
  from: parseAsInteger,
  to: parseAsInteger,
  bucket: parseAsStringEnum<Bucket | "auto">([...BUCKETS, "auto"]).withDefault("auto"),
  filters: parseAsJson<Filter[]>(validateFilters).withDefault([]),
  bots: parseAsBoolean.withDefault(false),
  q: parseAsString.withDefault(""),
};

export interface AnalyticsState {
  preset: RangePreset;
  range: TimeRange;
  prevRange: TimeRange;
  bucket: Bucket;
  bucketMode: Bucket | "auto";
  filters: Filter[];
  includeBots: boolean;
  tz: string;
  setPreset: (p: RangePreset, custom?: TimeRange) => void;
  setBucket: (b: Bucket | "auto") => void;
  setFilters: (f: Filter[]) => void;
  addFilter: (f: Filter) => void;
  removeFilter: (i: number) => void;
  setIncludeBots: (b: boolean) => void;
  /** Serializable query for API calls. */
  query: Record<string, string>;
  prevQuery: Record<string, string>;
}

export function useAnalyticsState(): AnalyticsState {
  const [s, set] = useQueryStates(stateParsers, { history: "replace" });
  const tz = useMemo(() => browserTz(), []);

  return useMemo(() => {
    const range = resolveRange(s.range, { from: s.from, to: s.to });
    const prevRange = previousRange(range);
    const bucket = s.bucket === "auto" ? defaultBucket(range) : s.bucket;
    const q = (r: TimeRange): Record<string, string> => ({
      from: String(r.from),
      to: String(r.to),
      tz,
      ...(s.filters.length ? { filters: JSON.stringify(s.filters) } : {}),
      ...(s.bots ? { bots: "1" } : {}),
    });
    return {
      preset: s.range,
      range,
      prevRange,
      bucket,
      bucketMode: s.bucket,
      filters: s.filters,
      includeBots: s.bots,
      tz,
      setPreset: (p, custom) => set(p === "custom" && custom ? { range: p, from: custom.from, to: custom.to } : { range: p, from: null, to: null }),
      setBucket: b => set({ bucket: b }),
      setFilters: f => set({ filters: f }),
      addFilter: f => set({ filters: [...s.filters, f] }),
      removeFilter: i => set({ filters: s.filters.filter((_, j) => j !== i) }),
      setIncludeBots: b => set({ bots: b }),
      query: q(range),
      prevQuery: q(prevRange),
    };
  }, [s, set, tz]);
}
