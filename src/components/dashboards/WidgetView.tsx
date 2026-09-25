"use client";
import { useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";
import type { Widget } from "@/lib/dashboards";
import { metricLabel } from "@/lib/dashboards";
import { useWidget } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { renderValue } from "@/components/MetricList";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtCompact, fmtDelta, fmtDuration, fmtNum, fmtPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { FilterParameter, MetricRow } from "@/lib/types";
import { PARAM_LABEL } from "@/lib/filters";

const PALETTE = ["var(--series-1)", "var(--series-2)", "var(--series-3)", "var(--series-4)", "var(--series-5)", "var(--series-6)", "var(--series-7)", "var(--series-8)"];

function formatter(metric?: string) {
  if (metric === "bounce_rate") return (v: number) => fmtPct(v, 1);
  if (metric === "session_duration") return fmtDuration;
  if (metric === "pages_per_session") return (v: number) => v.toFixed(2);
  return fmtNum;
}

export function WidgetView({ w, height }: { w: Widget; height: number }) {
  const s = useAnalyticsState();
  const { data, isLoading, isError, error, isFetching } = useWidget(w);
  const fmt = formatter(w.metric);
  const inner = Math.max(height - 8, 40);

  const lineSeries = useMemo(
    () => (data?.series ?? []).map((sr, i) => ({ id: sr.id, color: PALETTE[i % PALETTE.length], data: sr.data })),
    [data?.series]
  );

  if (isLoading) return <Skeleton className="h-full w-full" />;
  if (isError) return <div className="p-2 text-xs text-destructive">{(error as Error).message}</div>;
  if (!data) return null;

  const body = (() => {
    switch (w.type) {
      case "stat": {
        const delta = data.value !== undefined && data.previous !== undefined ? fmtDelta(data.value, data.previous) : null;
        const inverse = w.metric === "bounce_rate";
        const good = delta && (inverse ? delta.dir === "down" : delta.dir === "up");
        const bad = delta && (inverse ? delta.dir === "up" : delta.dir === "down");
        return (
          <div className="flex h-full flex-col">
            <div className="flex items-baseline gap-2 px-1">
              <span className="tabular text-2xl font-semibold">{fmt(data.value ?? 0)}</span>
              <span className={cn("text-xs tabular", good && "text-[var(--status-good)]", bad && "text-[var(--status-critical)]", !good && !bad && "text-muted-foreground")}>
                {delta?.text}
              </span>
            </div>
            {inner > 90 && lineSeries.length > 0 && (
              <div className="min-h-0 flex-1">
                <TimeSeriesChart series={lineSeries} bucket={s.bucket} height={inner - 44} format={fmt} compact />
              </div>
            )}
          </div>
        );
      }
      case "line":
        return (
          <div className="flex h-full flex-col">
            <div className="min-h-0 flex-1">
              <TimeSeriesChart series={lineSeries} bucket={s.bucket} height={inner - (lineSeries.length > 1 ? 22 : 0)} format={fmt} area={lineSeries.length === 1} />
            </div>
            {lineSeries.length > 1 && (
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 px-1 text-[11px] text-muted-foreground">
                {lineSeries.map(sr => (
                  <span key={sr.id} className="flex items-center gap-1">
                    <span className="inline-block h-0.5 w-3 rounded" style={{ background: sr.color }} /> {sr.id}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      case "pie":
        return <PieView rows={data.rows ?? []} dimension={w.dimension!} height={inner} />;
      case "table":
        return <TableView rows={data.rows ?? []} dimension={w.dimension!} />;
      case "funnel": {
        const f = data.funnel ?? [];
        const max = f[0]?.count ?? 1;
        if (!f.length) return <div className="p-2 text-xs text-muted-foreground">Funnel not found</div>;
        return (
          <div className="flex h-full flex-col justify-between gap-1 px-1">
            {f.map((st, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between">
                  <span className="truncate">{st.label}</span>
                  <span className="ml-2 shrink-0 tabular">
                    {fmtNum(st.count)} <span className="text-muted-foreground">{fmtPct(st.conversion, 1)}</span>
                  </span>
                </div>
                <div className="h-1.5 rounded bg-muted/50">
                  <div className="h-full rounded bg-[var(--series-1)]" style={{ width: `${(100 * st.count) / max}%` }} />
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  })();

  return <div className={cn("h-full", isFetching && "opacity-70")}>{body}</div>;
}

function TableView({ rows, dimension }: { rows: MetricRow[]; dimension: string }) {
  const max = rows[0]?.count ?? 1;
  return (
    <div className="flex h-full flex-col overflow-auto">
      {rows.map(r => (
        <div key={r.value} className="relative flex h-7 shrink-0 items-center gap-2 px-1 text-xs">
          <span className="metric-bar absolute inset-y-1 left-0 rounded-sm" style={{ width: `${(100 * r.count) / max}%` }} />
          <span className="relative min-w-0 flex-1 truncate">{renderValue(dimension as never, r)}</span>
          <span className="relative w-14 shrink-0 text-right tabular font-medium">{fmtCompact(r.count)}</span>
          <span className="relative w-10 shrink-0 text-right tabular text-muted-foreground">{fmtPct(r.percentage, 0)}</span>
        </div>
      ))}
      {rows.length === 0 && <div className="p-2 text-xs text-muted-foreground">No data</div>}
    </div>
  );
}

function PieView({ rows, dimension, height }: { rows: MetricRow[]; dimension: string; height: number }) {
  const total = rows.reduce((a, r) => a + r.count, 0) || 1;
  const labelOf = (r: MetricRow) => r.value || (dimension === "device_type" ? "desktop" : "(empty)");
  const data = rows.slice(0, 8).map((r, i) => ({ id: labelOf(r), label: labelOf(r), value: r.count, color: PALETTE[i % PALETTE.length] }));
  const legendW = 150;
  return (
    <div className="flex h-full items-stretch gap-2">
      <div className="min-w-0 flex-1" style={{ height }}>
        <ResponsivePie
          data={data}
          margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
          innerRadius={0.6}
          padAngle={1}
          cornerRadius={2}
          colors={d => d.data.color}
          borderWidth={0}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          animate={false}
          tooltip={({ datum }) => (
            <div className="rounded-md border border-border bg-popover px-2 py-1 text-xs shadow-md">
              {datum.label}: {fmtNum(datum.value)} ({fmtPct((100 * datum.value) / total, 1)})
            </div>
          )}
        />
      </div>
      <div className="flex shrink-0 flex-col justify-center gap-0.5 overflow-hidden text-[11px]" style={{ width: legendW }}>
        {rows.slice(0, 8).map((r, i) => (
          <div key={r.value} className="flex items-center gap-1.5">
            <span className="size-2 shrink-0 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
            <span className="min-w-0 flex-1 truncate">{dimension === "country" ? renderValue("country", r) : labelOf(r)}</span>
            <span className="tabular text-muted-foreground">{fmtPct((100 * r.count) / total, 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function widgetSubtitle(w: Widget): string {
  const parts: string[] = [];
  if (w.metric && w.type !== "pie" && w.type !== "table" && w.type !== "funnel") parts.push(metricLabel(w.metric));
  if (w.dimension) parts.push(`by ${PARAM_LABEL[w.dimension as FilterParameter] ?? w.dimension}`);
  if (w.filters?.length) parts.push(`${w.filters.length} filter${w.filters.length > 1 ? "s" : ""}`);
  return parts.join(" · ");
}
