import "server-only";
import type OpenAI from "openai";
import { z } from "zod";
import type { AnalyticsParams } from "@/lib/types";
import { ch, T } from "../clickhouse";
import { env } from "../env";
import { getEventNames } from "../queries/events";
import { getMetric } from "../queries/metric";
import { getOverview } from "../queries/overview";
import { DATA_MODEL } from "./schema";

export const MAX_ROWS = 200;

export const tools: OpenAI.Responses.FunctionTool[] = [
  {
    type: "function",
    name: "describe_data",
    description: "Returns the description of the analytics tables and columns (stats_ui.events, stats_ui.sessions) and query conventions. Call this before writing SQL for the first time in a conversation.",
    parameters: { type: "object", properties: {}, additionalProperties: false },
    strict: true,
  },
  {
    type: "function",
    name: "overview",
    description: "Key metrics (users, sessions, pageviews, events, bounce rate, avg session duration, pages per session) for the current project, date range and filters. Cheap and exact; prefer it over SQL for headline numbers.",
    parameters: { type: "object", properties: {}, additionalProperties: false },
    strict: true,
  },
  {
    type: "function",
    name: "top_events",
    description: "Most frequent event names in the current range with counts, unique users and sessions. Use it to find the exact event name for something the user describes (e.g. registration, deposit).",
    parameters: {
      type: "object",
      properties: { search: { type: "string", description: "Optional substring to search in event names" }, limit: { type: "integer", minimum: 1, maximum: 200 } },
      required: [],
      additionalProperties: false,
    },
    strict: false,
  },
  {
    type: "function",
    name: "breakdown",
    description: "Top values of one dimension in the current range and filters, with counts (pageviews for page dimensions, sessions for session dimensions), unique users and percentages. Dimensions: pathname, hostname, page_title, entry_page, exit_page, referrer, sess_type, sess_engine, utm_source, utm_medium, utm_campaign, pid, country, region, city, browser, os, device_type, device_model, screen, locale, currency, language, timezone, event_name, build_version.",
    parameters: {
      type: "object",
      properties: { dimension: { type: "string" }, limit: { type: "integer", minimum: 1, maximum: 100 }, search: { type: "string" } },
      required: ["dimension"],
      additionalProperties: false,
    },
    strict: false,
  },
  {
    type: "function",
    name: "run_sql",
    description:
      "Runs a read-only ClickHouse SELECT against stats_ui (and stats.vitals) and returns up to 200 rows as JSON. Always filter projectId and a date range. Use it for anything the other tools cannot answer: funnels (windowFunnel), retention, event properties, custom segments, time series.",
    parameters: {
      type: "object",
      properties: { sql: { type: "string", description: "One SELECT statement, no trailing semicolon" }, purpose: { type: "string", description: "One short sentence: what this query answers (shown to the user)" } },
      required: ["sql", "purpose"],
      additionalProperties: false,
    },
    strict: true,
  },
];

const RunSql = z.object({ sql: z.string().min(6).max(8000), purpose: z.string().max(300) });
const TopEvents = z.object({ search: z.string().optional(), limit: z.number().int().min(1).max(200).optional() });
const Breakdown = z.object({ dimension: z.string(), limit: z.number().int().min(1).max(100).optional(), search: z.string().optional() });

// Writes, DDL, table functions that reach outside ClickHouse, and output redirection.
const FORBIDDEN =
  /\b(insert|alter|drop|create|truncate|rename|attach|detach|optimize|system|grant|revoke|kill|set\s|exchange|move|into\s+outfile|url|file|remote|remoteSecure|cluster|s3|hdfs|mysql|postgresql|jdbc|odbc|mongodb|redis|executable|input|format)\s*\(/i;
const FORBIDDEN_WORDS = /\b(insert|alter|drop|create|truncate|rename|attach|detach|optimize|grant|revoke|kill|exchange|move|outfile)\b|\bsystem\s|\bsettings\b/i;
const ALLOWED_TABLE = /\b(stats_ui\.(events|sessions|funnels|dashboards)|stats\.vitals)\b/;

/** Validates and runs one SELECT with ClickHouse read-only settings and hard limits. */
export async function runSql(sql: string): Promise<{ rows: Record<string, unknown>[]; truncated: boolean; elapsed_ms: number }> {
  const clean = sql.replace(/--[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "").trim().replace(/;+\s*$/, "");
  if (!/^(select|with)\b/i.test(clean)) throw new Error("only SELECT statements are allowed");
  if (clean.includes(";")) throw new Error("one statement only");
  if (FORBIDDEN.test(clean) || FORBIDDEN_WORDS.test(clean)) throw new Error("statement contains a forbidden keyword or function");
  if (/\bfrom\s+(?!\()/i.test(clean) && !ALLOWED_TABLE.test(clean)) throw new Error("only stats_ui.* and stats.vitals tables are allowed");
  if (/\b(system|information_schema)\./i.test(clean)) throw new Error("system tables are not allowed");
  const started = Date.now();
  const rs = await ch().query({
    query: clean,
    format: "JSONEachRow",
    clickhouse_settings: {
      readonly: "1" as never,
      max_execution_time: 60,
      max_result_rows: String(MAX_ROWS + 1),
      result_overflow_mode: "break",
      max_memory_usage: "8000000000",
      output_format_json_quote_64bit_integers: 0 as never,
    },
  });
  const rows = await rs.json<Record<string, unknown>>();
  return { rows: rows.slice(0, MAX_ROWS), truncated: rows.length > MAX_ROWS, elapsed_ms: Date.now() - started };
}

export interface ToolContext {
  projectId: number;
  params: AnalyticsParams;
}

/** Executes one tool call; returns the text for the tool_result plus a compact payload for the UI. */
export async function execute(name: string, input: unknown, ctx: ToolContext): Promise<{ result: string; ui?: unknown; isError?: boolean }> {
  try {
    switch (name) {
      case "describe_data":
        return { result: DATA_MODEL + `\nCurrent project id: ${ctx.projectId}. Database name: ${env.db} (tables ${T.events}, ${T.sessions}).` };
      case "overview": {
        const o = await getOverview(ctx.projectId, ctx.params);
        return { result: JSON.stringify(o), ui: o };
      }
      case "top_events": {
        const p = TopEvents.parse(input ?? {});
        const rows = await getEventNames(ctx.projectId, ctx.params, p.search, p.limit ?? 40);
        return { result: JSON.stringify(rows), ui: rows };
      }
      case "breakdown": {
        const p = Breakdown.parse(input);
        const r = await getMetric(ctx.projectId, ctx.params, p.dimension as never, { limit: p.limit ?? 15, page: 1, search: p.search });
        return { result: JSON.stringify(r.rows), ui: r.rows };
      }
      case "run_sql": {
        const p = RunSql.parse(input);
        const r = await runSql(p.sql);
        const text = JSON.stringify(r.rows);
        return { result: (r.truncated ? `(truncated to ${MAX_ROWS} rows)\n` : "") + text, ui: r };
      }
      default:
        return { result: `unknown tool ${name}`, isError: true };
    }
  } catch (e) {
    return { result: `error: ${e instanceof Error ? e.message : String(e)}`, isError: true };
  }
}
