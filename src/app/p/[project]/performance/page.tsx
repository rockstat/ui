"use client";
import { useMemo, useState } from "react";
import { useVitalsBreakdown, useVitalsBucketed, useVitalsSummary } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { VITAL_NAMES, type VitalName } from "@/lib/types";
import { fmtMs, fmtNum, fmtPct } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { CountryFlag, countryName } from "@/components/CountryFlag";
import { cn } from "@/lib/utils";

const THRESHOLDS: Record<VitalName, [number, number]> = { LCP: [2500, 4000], CLS: [0.1, 0.25], INP: [200, 500], FCP: [1800, 3000], TTFB: [800, 1800] };
const LABEL: Record<VitalName, string> = { LCP: "Largest Contentful Paint", CLS: "Cumulative Layout Shift", INP: "Interaction to Next Paint", FCP: "First Contentful Paint", TTFB: "Time to First Byte" };
const DIMS = [
  ["pathname", "Pages"],
  ["hostname", "Hosts"],
  ["device_type", "Devices"],
  ["browser", "Browsers"],
  ["os", "OS"],
  ["country", "Countries"],
] as const;

function fmtVital(name: VitalName, v: number) {
  return name === "CLS" ? v.toFixed(3) : fmtMs(v);
}
function rating(name: VitalName, v: number): "good" | "warning" | "critical" {
  const [g, p] = THRESHOLDS[name];
  return v <= g ? "good" : v <= p ? "warning" : "critical";
}
const RATING_COLOR = { good: "var(--status-good)", warning: "var(--status-warning)", critical: "var(--status-critical)" };

function RatingBar({ good, ni, poor }: { good: number; ni: number; poor: number }) {
  const t = good + ni + poor || 1;
  return (
    <span className="flex h-1.5 w-full gap-px overflow-hidden rounded-sm">
      <span style={{ width: `${(100 * good) / t}%`, background: RATING_COLOR.good }} />
      <span style={{ width: `${(100 * ni) / t}%`, background: RATING_COLOR.warning }} />
      <span style={{ width: `${(100 * poor) / t}%`, background: RATING_COLOR.critical }} />
    </span>
  );
}

export default function PerformancePage() {
  const s = useAnalyticsState();
  const [vital, setVital] = useState<VitalName>("LCP");
  const [dim, setDim] = useState<(typeof DIMS)[number][0]>("pathname");
  const summary = useVitalsSummary();
  const bucketed = useVitalsBucketed();
  const breakdown = useVitalsBreakdown(vital, dim);

  const series = useMemo(() => {
    const rows = (bucketed.data ?? []).filter(r => r.name === vital);
    return [{ id: `${vital} p75`, color: "var(--series-1)", data: rows.map(r => ({ x: r.time, y: r.p75 })) }];
  }, [bucketed.data, vital]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
        {VITAL_NAMES.map(name => {
          const v = summary.data?.find(x => x.name === name);
          const r = v ? rating(name, v.p75) : "good";
          return (
            <button key={name} onClick={() => setVital(name)} className={cn("flex flex-col gap-1 bg-card px-4 py-3 text-left hover:bg-muted/60", vital === name && "bg-muted shadow-[inset_0_-2px_0_var(--series-1)]")}>
              <span className="text-xs text-muted-foreground" title={LABEL[name]}>
                {name} <span className="text-[10px]">p75</span>
              </span>
              {!v ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <span className="tabular text-xl font-semibold" style={{ color: RATING_COLOR[r] }}>
                  {fmtVital(name, v.p75)}
                </span>
              )}
              {v && <RatingBar good={v.good} ni={v.needs_improvement} poor={v.poor} />}
              <span className="text-[11px] text-muted-foreground">{v ? `${fmtNum(v.samples)} samples · p50 ${fmtVital(name, v.p50)} · p90 ${fmtVital(name, v.p90)}` : ""}</span>
            </button>
          );
        })}
      </div>
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="mb-1 text-xs text-muted-foreground">
          {LABEL[vital]} · p75 over time · good ≤ {fmtVital(vital, THRESHOLDS[vital][0])}, poor &gt; {fmtVital(vital, THRESHOLDS[vital][1])}
        </div>
        <TimeSeriesChart series={series} bucket={s.bucket} format={v => fmtVital(vital, v)} area={false} />
      </div>
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
          {DIMS.map(([id, label]) => (
            <button key={id} onClick={() => setDim(id)} className={cn("rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground", dim === id && "bg-muted font-medium text-foreground")}>
              {label}
            </button>
          ))}
        </div>
        <div className="p-2">
          <div className="flex items-center gap-3 px-2 pb-1 text-[11px] uppercase text-muted-foreground">
            <span className="flex-1">{DIMS.find(d => d[0] === dim)?.[1]}</span>
            <span className="w-32">Ratings</span>
            <span className="w-16 text-right">Samples</span>
            <span className="w-20 text-right">p75</span>
            <span className="w-14 text-right">Good</span>
          </div>
          {breakdown.isLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            breakdown.data?.map(r => {
              const t = r.good + r.needs_improvement + r.poor || 1;
              return (
                <div key={r.value} className="flex h-8 items-center gap-3 px-2 text-xs hover:bg-muted/60">
                  <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
                    {dim === "country" && <CountryFlag iso={r.value} />}
                    {dim === "country" ? countryName(r.value) : r.value || <span className="text-muted-foreground">(empty)</span>}
                  </span>
                  <span className="w-32">
                    <RatingBar good={r.good} ni={r.needs_improvement} poor={r.poor} />
                  </span>
                  <span className="w-16 text-right tabular text-muted-foreground">{fmtNum(r.samples)}</span>
                  <span className="w-20 text-right tabular font-medium" style={{ color: RATING_COLOR[rating(vital, r.p75)] }}>
                    {fmtVital(vital, r.p75)}
                  </span>
                  <span className="w-14 text-right tabular text-muted-foreground">{fmtPct((100 * r.good) / t, 0)}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
