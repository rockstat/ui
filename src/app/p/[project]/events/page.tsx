"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useEventLog, useEventNames, useEventProps, useEventsBucketed } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import { TimeSeriesChart, type Series } from "@/components/charts/TimeSeriesChart";
import { EventTimeline } from "@/components/sessions/EventTimeline";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtNum, fmtPct } from "@/lib/format";
import { cn } from "@/lib/utils";

const COLORS = ["var(--series-1)", "var(--series-2)", "var(--series-3)", "var(--series-4)", "var(--series-5)", "var(--series-6)", "var(--series-7)", "var(--series-8)"];

export default function EventsPage() {
  const s = useAnalyticsState();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [propKey, setPropKey] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const names = useEventNames(search || undefined);
  const bucketed = useEventsBucketed(selected);
  const log = useEventLog({ page, pageSize: 100, names: selected });
  const focus = selected.length === 1 ? selected[0] : null;
  const props = useEventProps(focus, propKey);

  function toggle(name: string) {
    setPropKey(undefined);
    setPage(1);
    setSelected(sel => (sel.includes(name) ? sel.filter(n => n !== name) : sel.length >= 8 ? sel : [...sel, name]));
  }

  const series: Series[] = useMemo(() => {
    const rows = bucketed.data ?? [];
    const times = [...new Set(rows.map(r => r.time))].sort();
    return selected.map((name, i) => {
      const byTime = new Map(rows.filter(r => r.name === name).map(r => [r.time, r.count]));
      return { id: name, color: COLORS[i % COLORS.length], data: times.map(t => ({ x: t, y: byTime.get(t) ?? 0 })) };
    });
  }, [bucketed.data, selected]);

  const maxCount = names.data?.[0]?.count ?? 1;

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <aside className="flex max-h-[calc(100vh-120px)] flex-col rounded-lg border border-border bg-card">
        <div className="relative border-b border-border p-2">
          <Search className="absolute top-1/2 left-4 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…" className="w-full rounded border border-border bg-background py-1 pr-2 pl-7 text-xs" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 text-[11px] uppercase text-muted-foreground">
          <span className="flex-1">Event</span>
          <span className="w-14 text-right">Users</span>
          <span className="w-16 text-right">Count</span>
        </div>
        <div className="flex-1 overflow-auto px-1 pb-1">
          {names.isLoading
            ? Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="my-1 h-6 w-full" />)
            : names.data?.map(n => {
                const idx = selected.indexOf(n.name);
                return (
                  <button
                    key={n.name}
                    onClick={() => toggle(n.name)}
                    className={cn("relative flex h-7 w-full items-center gap-2 rounded px-2 text-left text-xs hover:bg-muted/60", idx >= 0 && "bg-muted")}
                  >
                    <span className="metric-bar absolute inset-y-1 left-0 rounded-sm" style={{ width: `${(100 * n.count) / maxCount}%` }} />
                    <span className="relative size-2 shrink-0 rounded-full" style={{ background: idx >= 0 ? COLORS[idx % COLORS.length] : "transparent", outline: idx >= 0 ? "none" : "1px solid var(--border)" }} />
                    <span className="relative min-w-0 flex-1 truncate">{n.name}</span>
                    <span className="relative w-14 text-right tabular text-muted-foreground">{fmtNum(n.users)}</span>
                    <span className="relative w-16 text-right tabular font-medium">{fmtNum(n.count)}</span>
                  </button>
                );
              })}
        </div>
      </aside>

      <div className="min-w-0 space-y-4">
        <div className="rounded-lg border border-border bg-card p-3">
          {selected.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center text-muted-foreground">Select up to 8 events on the left to chart them</div>
          ) : (
            <>
              <TimeSeriesChart series={series} bucket={s.bucket} area={selected.length === 1} />
              <div className="mt-2 flex flex-wrap gap-3 px-1 text-xs">
                {series.map(sr => (
                  <span key={sr.id} className="flex items-center gap-1.5">
                    <span className="inline-block h-0.5 w-3 rounded" style={{ background: sr.color }} /> {sr.id}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {focus && (
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">Properties of {focus}</div>
            <div className="flex flex-wrap gap-1.5">
              {props.data?.keys.map(k => (
                <button
                  key={k.key}
                  onClick={() => setPropKey(propKey === k.key ? undefined : k.key)}
                  className={cn("rounded border border-border px-2 py-0.5 text-xs hover:bg-muted", propKey === k.key && "bg-muted font-medium")}
                >
                  {k.key} <span className="text-muted-foreground">{fmtNum(k.count)}</span>
                </button>
              ))}
              {props.data?.keys.length === 0 && <span className="text-xs text-muted-foreground">No properties</span>}
            </div>
            {propKey && (
              <div className="mt-3">
                {props.data?.values.map(v => (
                  <div key={v.value} className="relative flex h-7 items-center gap-3 px-2 text-xs">
                    <span className="metric-bar absolute inset-y-1 left-0 rounded-sm" style={{ width: `${v.percentage}%` }} />
                    <span className="relative min-w-0 flex-1 truncate">{v.value || <span className="text-muted-foreground">(empty)</span>}</span>
                    <span className="relative w-14 text-right tabular text-muted-foreground">{fmtNum(v.users)}</span>
                    <span className="relative w-16 text-right tabular font-medium">{fmtNum(v.count)}</span>
                    <span className="relative w-12 text-right tabular text-muted-foreground">{fmtPct(v.percentage, 0)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg border border-border bg-card p-3">
          <div className="mb-1 text-xs font-medium uppercase text-muted-foreground">Event log {selected.length ? `· ${selected.join(", ")}` : "· all events"}</div>
          {log.isLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <div className={cn(log.isFetching && "opacity-60")}>
              <EventTimeline events={log.data?.rows ?? []} start={log.data?.rows[0]?.ts ?? 0} showUser />
            </div>
          )}
          <Pagination page={page} pages={0} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}
