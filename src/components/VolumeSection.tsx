"use client";
import { Database } from "lucide-react";
import { useVolume } from "@/lib/api";
import { fmtNum, fmtPct } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

/** Total number of rows stored for the project in the period, across every raw table. */
export function VolumeSection() {
  const { data, isLoading, isFetching } = useVolume();
  const rows = (data?.rows ?? []).filter(r => r.count > 0 || r.error).sort((a, b) => b.count - a.count);
  const max = rows[0]?.count ?? 1;
  return (
    <section className={"rounded-lg border border-border bg-card" + (isFetching ? " opacity-70" : "")}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Database className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium">Events stored, all tables</span>
        <span className="text-[11px] text-muted-foreground">raw rows for the period, bots included, independent of filters</span>
        <span className="ml-auto tabular text-base font-semibold">{isLoading ? <Skeleton className="h-5 w-24" /> : fmtNum(data?.total)}</span>
      </div>
      {isLoading ? (
        <Skeleton className="m-3 h-20" />
      ) : (
        <div className="grid gap-x-6 gap-y-1 p-2 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(r => (
            <div key={r.table} className="relative flex h-7 items-center gap-3 px-2 text-xs" title={r.error ?? `stats.${r.table}`}>
              <span className="metric-bar absolute inset-y-1 left-0 rounded-sm" style={{ width: `${(100 * r.count) / max}%` }} />
              <span className="relative min-w-0 flex-1 truncate">
                {r.label} <span className="text-muted-foreground">{r.table}</span>
                {r.error && <span className="text-destructive"> · error</span>}
              </span>
              <span className="relative w-20 shrink-0 text-right tabular font-medium">{fmtNum(r.count)}</span>
              <span className="relative w-10 shrink-0 text-right tabular text-muted-foreground">{fmtPct(data?.total ? (100 * r.count) / data.total : 0, 0)}</span>
            </div>
          ))}
          {rows.length === 0 && <div className="p-2 text-xs text-muted-foreground">No rows in this period</div>}
        </div>
      )}
    </section>
  );
}
