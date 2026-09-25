"use client";
import { useState } from "react";
import { Maximize2, Search } from "lucide-react";
import { useMetric } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import type { FilterParameter, MetricParameter, MetricRow } from "@/lib/types";
import { fmtNum, fmtPct } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CountryFlag, countryName } from "./CountryFlag";
import { cn } from "@/lib/utils";

export interface MetricListProps {
  parameter: MetricParameter;
  /** Which filter to add when a row is clicked. Defaults to parameter. */
  filterAs?: FilterParameter;
  label?: string;
  countLabel?: string;
  limit?: number;
  render?: (row: MetricRow) => React.ReactNode;
  expandable?: boolean;
}

export function renderValue(parameter: MetricParameter, row: MetricRow): React.ReactNode {
  const v = row.value;
  if (!v && parameter === "device_type") return <span>desktop</span>;
  if (!v) return <span className="text-muted-foreground">(empty)</span>;
  if (parameter === "country") {
    return (
      <span className="flex items-center gap-2">
        <CountryFlag iso={v} /> {countryName(v)}
      </span>
    );
  }
  if (parameter === "page_title_path" || parameter === "pathname") {
    const title = row.extra?.title as string | undefined;
    return (
      <span className="flex min-w-0 flex-col">
        <span className="truncate">{v}</span>
        {title && parameter === "page_title_path" && <span className="truncate text-[11px] text-muted-foreground">{title}</span>}
      </span>
    );
  }
  return <span className="truncate">{v}</span>;
}

function Rows({
  rows,
  parameter,
  filterAs,
  render,
  countLabel,
  compact,
}: {
  rows: MetricRow[];
  parameter: MetricParameter;
  filterAs?: FilterParameter;
  render?: (row: MetricRow) => React.ReactNode;
  countLabel?: string;
  compact?: boolean;
}) {
  const s = useAnalyticsState();
  const max = rows[0]?.count ?? 1;
  const fp = (filterAs ?? (parameter === "page_title_path" ? "pathname" : parameter)) as FilterParameter;
  return (
    <div className="flex flex-col">
      {rows.map(r => (
        <button
          key={r.value}
          onClick={() => s.addFilter({ parameter: fp, type: "equals", value: [r.value] })}
          className={cn("group relative flex items-center gap-3 rounded px-2 text-left text-xs hover:bg-muted/60", compact ? "h-7" : "h-8")}
          title={countLabel ? `${fmtNum(r.count)} ${countLabel}` : undefined}
        >
          <span className="metric-bar absolute inset-y-1 left-0 rounded-sm" style={{ width: `${(100 * r.count) / max}%` }} />
          <span className="relative min-w-0 flex-1">{render ? render(r) : renderValue(parameter, r)}</span>
          <span className="relative w-14 shrink-0 text-right tabular text-muted-foreground">{fmtNum(r.users)}</span>
          <span className="relative w-16 shrink-0 text-right tabular font-medium">{fmtNum(r.count)}</span>
          <span className="relative w-12 shrink-0 text-right tabular text-muted-foreground">{fmtPct(r.percentage, 0)}</span>
        </button>
      ))}
      {rows.length === 0 && <div className="py-6 text-center text-xs text-muted-foreground">No data</div>}
    </div>
  );
}

export function MetricList({ parameter, filterAs, label, countLabel = "sessions", limit = 10, render, expandable = true }: MetricListProps) {
  const { data, isLoading, isError, error } = useMetric(parameter, { limit });
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-2 pb-1 text-[11px] uppercase text-muted-foreground">
        <span className="flex-1">{label}</span>
        <span className="w-14 text-right">Users</span>
        <span className="w-16 text-right">{countLabel}</span>
        <span className="w-12 text-right">%</span>
      </div>
      {isLoading ? (
        <div className="space-y-2 px-2 pt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="px-2 py-4 text-xs text-destructive">{(error as Error).message}</div>
      ) : (
        <Rows rows={data?.rows ?? []} parameter={parameter} filterAs={filterAs} render={render} countLabel={countLabel} />
      )}
      {expandable && (data?.total ?? 0) > limit && (
        <div className="mt-auto flex justify-end pt-1">
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={() => setOpen(true)}>
            <Maximize2 className="size-3" /> All {fmtNum(data?.total)}
          </Button>
        </div>
      )}
      {open && <MetricDialog parameter={parameter} filterAs={filterAs} label={label} countLabel={countLabel} render={render} onClose={() => setOpen(false)} />}
    </div>
  );
}

function MetricDialog({
  parameter,
  filterAs,
  label,
  countLabel,
  render,
  onClose,
}: MetricListProps & { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const { data, isFetching } = useMetric(parameter, { limit: pageSize, page, search: search || undefined });
  const pages = Math.max(1, Math.ceil((data?.total ?? 0) / pageSize));
  return (
    <Dialog open onOpenChange={o => !o && onClose()}>
      <DialogContent className="max-h-[85vh] w-[720px] max-w-[95vw] overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-4 py-3">
          <DialogTitle className="text-sm">{label}</DialogTitle>
          <div className="relative mt-2">
            <Search className="absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search…"
              className="w-full rounded border border-border bg-background py-1 pr-2 pl-7 text-xs"
            />
          </div>
        </DialogHeader>
        <div className={cn("max-h-[60vh] overflow-auto px-2 py-2", isFetching && "opacity-60")}>
          <Rows rows={data?.rows ?? []} parameter={parameter} filterAs={filterAs} render={render} countLabel={countLabel} compact />
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <span>{fmtNum(data?.total)} values</span>
          <span className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-6 text-xs" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              Prev
            </Button>
            {page} / {pages}
            <Button variant="outline" size="sm" className="h-6 text-xs" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>
              Next
            </Button>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
