"use client";
import { useEffect, useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import dynamic from "next/dynamic";
import { Search, Clock, Layers } from "lucide-react";
import { api } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import { useProjectId } from "@/lib/project";
import { CountryFlag, countryName } from "@/components/CountryFlag";
import { DeviceIcon } from "@/components/DeviceIcons";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtDateTime, fmtNum, truncate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { RecordingSummary } from "@/server/replay/queries";

const Player = dynamic(() => import("@/components/replay/Player").then(m => m.Player), { ssr: false });

function fmtDur(ms: number) {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

export default function ReplayPage() {
  const project = useProjectId();
  const s = useAnalyticsState();
  const [sel, setSel] = useQueryStates({ uid: parseAsString, start: parseAsInteger, pn: parseAsInteger }, { history: "replace" });
  const [search, setSearch] = useState("");
  const [minDuration, setMinDuration] = useState(0);
  const [playable, setPlayable] = useState(true);
  const [page, setPage] = useState(1);

  const list = useQuery({
    queryKey: ["replay-list", project, s.query, search, minDuration, playable, page],
    queryFn: () =>
      api<{ rows: RecordingSummary[]; total: number }>(`p/${project}/replay/list`, { ...s.query, search, minDuration, page, pageSize: 50, playable: playable ? "1" : "0" }),
    placeholderData: keepPreviousData,
  });
  const pages = list.data ? Math.ceil(list.data.total / 50) : 0;

  // Auto-select the first playable-looking recording when nothing is chosen.
  useEffect(() => {
    if (!sel.uid && list.data?.rows.length) {
      const r = list.data.rows[0];
      setSel({ uid: r.uid, start: r.sess_start, pn: r.sess_pageNum });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.data]);

  const target = useMemo(() => (sel.start && sel.pn !== null ? { sess_start: sel.start, sess_pageNum: sel.pn ?? 1 } : null), [sel.start, sel.pn]);

  return (
    <div className="grid h-[calc(100vh-110px)] gap-3 lg:grid-cols-[360px_1fr]">
      <aside className="flex min-h-0 flex-col rounded-lg border border-border bg-card">
        <div className="flex gap-2 border-b border-border p-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="URL, user id, uid…"
              className="w-full rounded border border-border bg-background py-1 pr-2 pl-7 text-xs"
            />
          </div>
          <select
            value={minDuration}
            onChange={e => {
              setMinDuration(Number(e.target.value));
              setPage(1);
            }}
            className="rounded border border-border bg-background px-1 text-xs"
            title="Minimum duration"
          >
            <option value={0}>any</option>
            <option value={10000}>≥ 10s</option>
            <option value={30000}>≥ 30s</option>
            <option value={60000}>≥ 1m</option>
            <option value={300000}>≥ 5m</option>
          </select>
          <label className="flex items-center gap-1 text-xs text-muted-foreground" title="Only recordings whose first batch (page snapshot) arrived">
            <input type="checkbox" checked={playable} onChange={e => { setPlayable(e.target.checked); setPage(1); }} /> playable
          </label>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {list.isLoading ? (
            <div className="space-y-2 p-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : list.isError ? (
            <div className="p-3 text-xs text-destructive">{(list.error as Error).message}</div>
          ) : (
            list.data?.rows.map(r => {
              const active = r.uid === sel.uid && r.sess_start === sel.start && r.sess_pageNum === sel.pn;
              return (
                <button
                  key={`${r.uid}-${r.sess_start}-${r.sess_pageNum}`}
                  onClick={() => setSel({ uid: r.uid, start: r.sess_start, pn: r.sess_pageNum })}
                  className={cn("flex w-full flex-col gap-0.5 border-b border-border px-3 py-2 text-left text-xs hover:bg-muted/60", active && "bg-muted", !r.has_start && "opacity-50")}
                >
                  <div className="flex items-center gap-2">
                    <span className="tabular text-muted-foreground">{fmtDateTime(r.started)}</span>
                    <span className="ml-auto flex items-center gap-1 tabular text-muted-foreground">
                      <Clock className="size-3" /> {fmtDur(r.duration)}
                    </span>
                    <span className="flex items-center gap-1 tabular text-muted-foreground" title="batches">
                      <Layers className="size-3" /> {r.batches}
                    </span>
                  </div>
                  <div className="truncate font-medium" title={r.page_url}>
                    {truncate(r.page_url.replace(/^https?:\/\//, ""), 60)}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CountryFlag iso={r.country} />
                    <span className="truncate">{r.city || countryName(r.country)}</span>
                    <DeviceIcon type={r.device_type} />
                    <span className="truncate">
                      {r.browser} · {r.os}
                    </span>
                    <span className="ml-auto truncate">{r.user_id || r.uid.slice(-8)}</span>
                  </div>
                </button>
              );
            })
          )}
          {list.data && list.data.rows.length === 0 && <div className="p-6 text-center text-xs text-muted-foreground">No recordings in this range</div>}
        </div>
        <Pagination page={page} pages={pages} total={list.data?.total} onPage={setPage} label="recordings" />
      </aside>
      <div className="min-h-0 overflow-hidden rounded-lg border border-border bg-card">
        {sel.uid ? (
          <Player
            uid={sel.uid}
            project={project}
            target={target}
            onSelect={rec => {
              if (rec?.meta.sessStart && rec.meta.pageNum !== undefined) setSel({ start: rec.meta.sessStart, pn: rec.meta.pageNum });
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">Select a recording</div>
        )}
      </div>
    </div>
  );
}
