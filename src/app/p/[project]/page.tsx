"use client";
import { useMemo, useState } from "react";
import { useOverview, useOverviewBucketed } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import { MetricCards, type MetricDef } from "@/components/MetricCards";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { Section } from "@/components/Section";
import { MetricList } from "@/components/MetricList";
import { fmtCompact, fmtDuration, fmtNum, fmtPct } from "@/lib/format";
import type { BucketedRow } from "@/lib/types";

type Key = keyof Omit<BucketedRow, "time">;

const DEFS: MetricDef<Key>[] = [
  { key: "users", label: "Users", format: fmtNum },
  { key: "sessions", label: "Sessions", format: fmtNum },
  { key: "pageviews", label: "Pageviews", format: fmtNum },
  { key: "bounce_rate", label: "Bounce rate", format: v => fmtPct(v, 1), inverse: true },
  { key: "session_duration", label: "Session duration", format: fmtDuration },
  { key: "pages_per_session", label: "Pages / session", format: v => v.toFixed(2) },
];

export default function OverviewPage() {
  const s = useAnalyticsState();
  const [metric, setMetric] = useState<Key>("users");
  const cur = useOverview();
  const prev = useOverview(true);
  const series = useOverviewBucketed();
  const prevSeries = useOverviewBucketed(undefined, true);
  const def = DEFS.find(d => d.key === metric)!;

  const chart = useMemo(() => {
    const a = series.data ?? [];
    const b = prevSeries.data ?? [];
    return [
      { id: def.label, color: "var(--series-1)", data: a.map(r => ({ x: r.time, y: r[metric] })) },
      ...(b.length ? [{ id: "Previous period", color: "var(--series-1)", dashed: true, data: a.map((r, i) => ({ x: b[i]?.time ?? r.time, y: b[i]?.[metric] ?? 0 })) }] : []),
    ];
  }, [series.data, prevSeries.data, metric, def.label]);

  const format = metric === "bounce_rate" ? (v: number) => fmtPct(v, 1) : metric === "session_duration" ? fmtDuration : metric === "pages_per_session" ? (v: number) => v.toFixed(2) : fmtCompact;

  return (
    <div className="space-y-4">
      <MetricCards defs={DEFS} current={cur.data} previous={prev.data} selected={metric} onSelect={setMetric} loading={cur.isLoading} />
      <div className="rounded-lg border border-border bg-card p-3">
        {series.isError ? (
          <div className="text-xs text-destructive">{(series.error as Error).message}</div>
        ) : (
          <TimeSeriesChart series={chart} bucket={s.bucket} format={format} />
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Section
          tabs={[
            { id: "path", label: "Pages", content: <MetricList parameter="page_title_path" label="Path" countLabel="views" /> },
            { id: "entry", label: "Entry", content: <MetricList parameter="entry_page" label="Entry page" /> },
            { id: "exit", label: "Exit", content: <MetricList parameter="exit_page" label="Exit page" /> },
            { id: "title", label: "Titles", content: <MetricList parameter="page_title" label="Title" countLabel="views" /> },
            { id: "host", label: "Hosts", content: <MetricList parameter="hostname" label="Host" countLabel="views" /> },
          ]}
        />
        <Section
          tabs={[
            { id: "type", label: "Traffic type", content: <MetricList parameter="sess_type" label="Type" /> },
            { id: "ref", label: "Referrers", content: <MetricList parameter="referrer" label="Referrer host" /> },
            { id: "src", label: "UTM source", content: <MetricList parameter="utm_source" label="Source" /> },
            { id: "med", label: "Medium", content: <MetricList parameter="utm_medium" label="Medium" /> },
            { id: "camp", label: "Campaign", content: <MetricList parameter="utm_campaign" label="Campaign" /> },
            { id: "pid", label: "Partner", content: <MetricList parameter="pid" label="Partner ID" /> },
          ]}
        />
        <Section
          tabs={[
            { id: "country", label: "Countries", content: <MetricList parameter="country" label="Country" /> },
            { id: "region", label: "Regions", content: <MetricList parameter="region" label="Region" /> },
            { id: "city", label: "Cities", content: <MetricList parameter="city" label="City" /> },
            { id: "tz", label: "Timezones", content: <MetricList parameter="timezone" label="Timezone" /> },
          ]}
        />
        <Section
          tabs={[
            { id: "device", label: "Devices", content: <MetricList parameter="device_type" label="Device" /> },
            { id: "browser", label: "Browsers", content: <MetricList parameter="browser" label="Browser" /> },
            { id: "os", label: "OS", content: <MetricList parameter="os" label="OS" /> },
            { id: "model", label: "Models", content: <MetricList parameter="device_model" label="Model" /> },
            { id: "screen", label: "Screens", content: <MetricList parameter="screen" label="Screen" /> },
          ]}
        />
        <Section
          tabs={[
            { id: "locale", label: "Locales", content: <MetricList parameter="locale" label="Locale" /> },
            { id: "currency", label: "Currencies", content: <MetricList parameter="currency" label="Currency" /> },
            { id: "lang", label: "Languages", content: <MetricList parameter="language" label="Language" /> },
            { id: "auth", label: "Authorized", content: <MetricList parameter="is_auth" label="Authorized (1 = yes)" /> },
            { id: "build", label: "Builds", content: <MetricList parameter="build_version" label="Build" countLabel="views" /> },
          ]}
        />
        <Section
          tabs={[
            { id: "events", label: "Events", content: <MetricList parameter="event_name" label="Event" countLabel="events" limit={12} /> },
            { id: "asn", label: "Networks", content: <MetricList parameter="asn_org" label="ASN org" countLabel="views" /> },
          ]}
        />
      </div>
    </div>
  );
}
