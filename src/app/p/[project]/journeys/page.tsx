"use client";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { api, useEventNames, useMetric } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import { useProjectId } from "@/lib/project";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fmtNum } from "@/lib/format";
import type { Journeys } from "@/server/queries/journeys";

const SankeyChart = dynamic(() => import("@/components/journeys/SankeyChart").then(m => m.SankeyChart), { ssr: false });

/** Technical events that would drown the picture in events mode. */
const DEFAULT_EXCLUDE = ["page_loaded", "page_unload", "page_visibility", "session", "tlsfp", "tm", "ab_featureFire", "ab_bucketed", "container_bd_handled", "ping38", "vitals"];

function StartPicker({ mode, value, onChange }: { mode: "pages" | "events"; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const paths = useMetric("pathname", { limit: 20, search: q || undefined, enabled: mode === "pages" && open });
  const names = useEventNames(q || undefined, 20);
  const items = mode === "pages" ? (paths.data?.rows ?? []).map(r => ({ value: r.value, count: r.count })) : (names.data ?? []).map(n => ({ value: n.name, count: n.count }));
  return (
    <span className="flex items-center gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="flex h-7 items-center gap-1 rounded border border-border bg-background px-2 text-xs hover:bg-muted">
          {value ? (
            <>
              start at <span className="font-medium">{value}</span>
            </>
          ) : (
            <span className="text-muted-foreground">start at any {mode === "pages" ? "page" : "event"}</span>
          )}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-80 p-2">
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" className="mb-1 w-full rounded border border-border bg-background px-2 py-1 text-xs" />
          <div className="max-h-64 overflow-auto">
            {items.map(i => (
              <button
                key={i.value}
                onClick={() => {
                  onChange(i.value);
                  setOpen(false);
                }}
                className="flex w-full justify-between rounded px-2 py-1 text-left text-xs hover:bg-muted"
              >
                <span className="truncate">{i.value || "(empty)"}</span>
                <span className="ml-2 tabular text-muted-foreground">{fmtNum(i.count)}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {value && (
        <button onClick={() => onChange("")} className="text-muted-foreground hover:text-foreground" title="Clear">
          <X className="size-3.5" />
        </button>
      )}
    </span>
  );
}

export default function JourneysPage() {
  const project = useProjectId();
  const s = useAnalyticsState();
  const [o, setO] = useQueryStates(
    {
      mode: parseAsStringEnum<"pages" | "events">(["pages", "events"]).withDefault("pages"),
      steps: parseAsInteger.withDefault(4),
      top: parseAsInteger.withDefault(8),
      start: parseAsString.withDefault(""),
    },
    { history: "replace" }
  );
  const data = useQuery({
    queryKey: ["journeys", project, s.query, o.mode, o.steps, o.top, o.start],
    queryFn: () =>
      api<Journeys>(`p/${project}/journeys`, { ...s.query, mode: o.mode, steps: o.steps, top: o.top, start: o.start || undefined, exclude: o.mode === "events" ? DEFAULT_EXCLUDE.join(",") : undefined }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2 text-xs">
        <div className="flex overflow-hidden rounded border border-border">
          {(["pages", "events"] as const).map(m => (
            <button key={m} onClick={() => setO({ mode: m, start: "" })} className={"px-2 py-1 " + (o.mode === m ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground")}>
              {m === "pages" ? "Pages" : "Events"}
            </button>
          ))}
        </div>
        <StartPicker mode={o.mode} value={o.start} onChange={v => setO({ start: v })} />
        <label className="flex items-center gap-1 text-muted-foreground">
          steps
          <select value={o.steps} onChange={e => setO({ steps: Number(e.target.value) })} className="rounded border border-border bg-background px-1 py-0.5 text-xs text-foreground">
            {[2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1 text-muted-foreground">
          top per step
          <select value={o.top} onChange={e => setO({ top: Number(e.target.value) })} className="rounded border border-border bg-background px-1 py-0.5 text-xs text-foreground">
            {[4, 6, 8, 10, 12, 15, 20].map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <span className="ml-auto text-muted-foreground">
          {data.data ? `${fmtNum(data.data.sessions)} sessions` : ""}
          {o.mode === "events" && <span title={DEFAULT_EXCLUDE.join(", ")}> · technical events hidden</span>}
        </span>
      </div>
      <div className="rounded-lg border border-border bg-card p-3">
        {data.isLoading ? (
          <Skeleton className="h-[560px] w-full" />
        ) : data.isError ? (
          <div className="text-xs text-destructive">{(data.error as Error).message}</div>
        ) : (
          <div className={data.isFetching ? "opacity-60" : ""}>
            <ErrorBoundary label="Sankey">
              <SankeyChart nodes={data.data!.nodes} links={data.data!.links} sessions={data.data!.sessions} />
            </ErrorBoundary>
          </div>
        )}
        <div className="mt-2 text-[11px] text-muted-foreground">
          Each column is the n-th {o.mode === "pages" ? "page" : "event"} of a session (consecutive repeats collapsed). Exit = session had no further {o.mode === "pages" ? "pageview" : "event"}. Hover nodes and flows for shares.
        </div>
      </div>
    </div>
  );
}
