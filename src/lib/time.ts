import type { Bucket } from "./types";

export type RangePreset = "today" | "yesterday" | "24h" | "7d" | "30d" | "this_month" | "last_month" | "90d" | "custom";

export const PRESETS: { id: RangePreset; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "24h", label: "Last 24 hours" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
  { id: "this_month", label: "This month" },
  { id: "last_month", label: "Last month" },
];

export interface TimeRange {
  from: number; // unix ms inclusive
  to: number; // unix ms exclusive
}

const DAY = 86_400_000;

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function browserTz(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/** Resolve a preset into an absolute range in the browser's local timezone. */
export function resolveRange(preset: RangePreset, custom?: { from?: number | null; to?: number | null }): TimeRange {
  const now = new Date();
  const today0 = startOfDay(now).getTime();
  switch (preset) {
    case "today":
      return { from: today0, to: today0 + DAY };
    case "yesterday":
      return { from: today0 - DAY, to: today0 };
    case "24h":
      return { from: now.getTime() - DAY, to: now.getTime() + 60_000 };
    case "7d":
      return { from: today0 - 6 * DAY, to: today0 + DAY };
    case "30d":
      return { from: today0 - 29 * DAY, to: today0 + DAY };
    case "90d":
      return { from: today0 - 89 * DAY, to: today0 + DAY };
    case "this_month": {
      const s = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      return { from: s, to: today0 + DAY };
    }
    case "last_month": {
      const s = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
      const e = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      return { from: s, to: e };
    }
    case "custom": {
      const from = custom?.from ?? today0 - 6 * DAY;
      const to = custom?.to ?? today0 + DAY;
      return { from, to };
    }
  }
}

export function previousRange(r: TimeRange): TimeRange {
  const len = r.to - r.from;
  return { from: r.from - len, to: r.from };
}

/** Sensible bucket for the span. */
export function defaultBucket(r: TimeRange): Bucket {
  const hours = (r.to - r.from) / 3_600_000;
  if (hours <= 3) return "five_minutes";
  if (hours <= 12) return "fifteen_minutes";
  if (hours <= 48) return "hour";
  if (hours <= 24 * 92) return "day";
  return "week";
}

export function bucketsFor(r: TimeRange): Bucket[] {
  const hours = (r.to - r.from) / 3_600_000;
  const all: Bucket[] = ["minute", "five_minutes", "fifteen_minutes", "hour", "day", "week", "month"];
  const est: Record<Bucket, number> = {
    minute: hours * 60,
    five_minutes: hours * 12,
    fifteen_minutes: hours * 4,
    hour: hours,
    day: hours / 24,
    week: hours / 168,
    month: hours / 720,
  };
  return all.filter(b => est[b] >= 2 && est[b] <= 2000);
}

export const BUCKET_LABEL: Record<Bucket, string> = {
  minute: "Minute",
  five_minutes: "5 min",
  fifteen_minutes: "15 min",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
};

export function rangeLabel(preset: RangePreset, r: TimeRange): string {
  const p = PRESETS.find(p => p.id === preset);
  if (p) return p.label;
  const f = new Date(r.from).toLocaleDateString("en-GB");
  const t = new Date(r.to - 1).toLocaleDateString("en-GB");
  return f === t ? f : `${f} – ${t}`;
}
