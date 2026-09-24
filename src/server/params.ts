import "server-only";
import { NextRequest } from "next/server";
import type { AnalyticsParams, Bucket, Filter, FilterParameter, FilterType } from "@/lib/types";
import { FILTER_PARAMETERS } from "@/lib/types";

const FILTER_TYPES: FilterType[] = [
  "equals",
  "not_equals",
  "contains",
  "not_contains",
  "starts_with",
  "ends_with",
  "regex",
  "is_null",
  "is_not_null",
];

export class BadRequest extends Error {}

export function parseFilters(raw: string | null): Filter[] {
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new BadRequest("filters must be JSON");
  }
  if (!Array.isArray(parsed)) throw new BadRequest("filters must be an array");
  const out: Filter[] = [];
  for (const f of parsed as Array<Record<string, unknown>>) {
    const parameter = String(f.parameter) as FilterParameter;
    const type = String(f.type) as FilterType;
    if (!FILTER_PARAMETERS.includes(parameter)) throw new BadRequest(`unknown filter parameter ${parameter}`);
    if (!FILTER_TYPES.includes(type)) throw new BadRequest(`unknown filter type ${type}`);
    const value = Array.isArray(f.value) ? f.value.map(String).slice(0, 50) : [String(f.value ?? "")];
    out.push({ parameter, type, value });
  }
  return out.slice(0, 30);
}

export function parseAnalyticsParams(req: NextRequest): AnalyticsParams {
  const sp = req.nextUrl.searchParams;
  const from = Number(sp.get("from"));
  const to = Number(sp.get("to"));
  if (!Number.isFinite(from) || !Number.isFinite(to) || from >= to) throw new BadRequest("from/to required (unix ms)");
  const tz = sp.get("tz") || "UTC";
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
  } catch {
    throw new BadRequest(`invalid tz ${tz}`);
  }
  const excludeBots = sp.get("bots") !== "1";
  return { from, to, tz, filters: parseFilters(sp.get("filters")), excludeBots };
}

export function parseBucket(req: NextRequest): Bucket {
  const b = req.nextUrl.searchParams.get("bucket") ?? "hour";
  const ok: Bucket[] = ["minute", "five_minutes", "fifteen_minutes", "hour", "day", "week", "month"];
  if (!ok.includes(b as Bucket)) throw new BadRequest(`invalid bucket ${b}`);
  return b as Bucket;
}

export function parseInt(req: NextRequest, name: string, def: number, max = 1000): number {
  const v = Number(req.nextUrl.searchParams.get(name) ?? def);
  if (!Number.isFinite(v) || v < 0) return def;
  return Math.min(Math.floor(v), max);
}

export function projectIdFrom(params: { project: string }): number {
  const id = Number(params.project);
  if (!Number.isInteger(id) || id <= 0) throw new BadRequest("invalid project id");
  return id;
}
