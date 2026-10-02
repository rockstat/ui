import "server-only";
import type { AnalyticsParams } from "@/lib/types";
import { env } from "../env";
import { queryOne } from "../clickhouse";

/** Raw ingest tables that carry projectId + date + dateTime. Counted as stored, bots included. */
export const VOLUME_TABLES: { table: string; label: string }[] = [
  { table: "events", label: "Web events" },
  { table: "activity", label: "Activity" },
  { table: "batches", label: "Batches" },
  { table: "pixels", label: "Pixels" },
  { table: "webhooks", label: "Webhooks" },
  { table: "redirects", label: "Redirects" },
  { table: "vitals", label: "Web Vitals" },
  { table: "ping38", label: "Ping" },
  { table: "rrweb", label: "Session replay" },
  { table: "events_mp_android", label: "Mobile Android" },
  { table: "events_mp_ios", label: "Mobile iOS" },
  { table: "events_ph", label: "PostHog bridge" },
];

export interface VolumeRow {
  table: string;
  label: string;
  count: number;
  error?: string;
}

export async function getVolume(projectId: number, p: AnalyticsParams): Promise<{ total: number; rows: VolumeRow[] }> {
  const params = { projectId, from: Math.floor(p.from / 1000), to: Math.floor(p.to / 1000) };
  const rows = await Promise.all(
    VOLUME_TABLES.map(async ({ table, label }): Promise<VolumeRow> => {
      try {
        const r = await queryOne<{ c: string }>(
          `SELECT count() AS c FROM ${env.rawDb}.${table}
           WHERE projectId = {projectId:UInt32}
             AND date >= toDate(toDateTime({from:UInt32})) AND date <= toDate(toDateTime({to:UInt32}))
             AND dateTime >= toDateTime({from:UInt32}) AND dateTime < toDateTime({to:UInt32})`,
          params
        );
        return { table, label, count: Number(r?.c ?? 0) };
      } catch (e) {
        return { table, label, count: 0, error: e instanceof Error ? e.message.slice(0, 120) : String(e) };
      }
    })
  );
  return { total: rows.reduce((a, r) => a + r.count, 0), rows };
}
