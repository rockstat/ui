"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Clock, FileText, Zap, User, PlayCircle } from "lucide-react";
import type { SessionRow } from "@/lib/types";
import { CountryFlag, countryName } from "@/components/CountryFlag";
import { DeviceIcon, deviceLabel } from "@/components/DeviceIcons";
import { fmtDateTime, fmtDuration, fmtNum, truncate } from "@/lib/format";
import { useSession } from "@/lib/api";
import { useProjectId } from "@/lib/project";
import { EventTimeline } from "./EventTimeline";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SessionCard({ s, defaultOpen = false }: { s: SessionRow; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const project = useProjectId();
  const detail = useSession(s.uid, s.sess_start, open);
  const source = s.utm_source || s.sess_refhost || s.sess_engine || "";
  return (
    <div className="rounded-lg border border-border bg-card">
      <button onClick={() => setOpen(!open)} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 text-left text-xs hover:bg-muted/40">
        {open ? <ChevronDown className="size-3.5 text-muted-foreground" /> : <ChevronRight className="size-3.5 text-muted-foreground" />}
        <span className="w-32 shrink-0 tabular text-muted-foreground">{fmtDateTime(s.start_ts)}</span>
        <span className="flex w-36 shrink-0 items-center gap-1.5" title={countryName(s.country)}>
          <CountryFlag iso={s.country} />
          <span className="truncate">{s.city || countryName(s.country)}</span>
        </span>
        <span className="flex w-40 shrink-0 items-center gap-1.5 text-muted-foreground" title={`${deviceLabel(s.device_type)} · ${s.os} ${s.os_version}`}>
          <DeviceIcon type={s.device_type} />
          <span className="truncate">
            {s.browser} · {s.os}
          </span>
        </span>
        <span className="w-24 shrink-0 truncate text-muted-foreground" title={`${s.sess_type} ${source}`}>
          <span className={cn("rounded px-1", s.sess_type === "partner" && "bg-[var(--series-7)]/20", s.sess_type === "campaign" && "bg-[var(--series-4)]/20")}>{s.sess_type}</span>
        </span>
        <span className="min-w-0 flex-1 truncate font-medium" title={s.entry_url}>
          {truncate(s.entry_path || s.entry_url, 60)}
          {s.exit_path && s.exit_path !== s.entry_path && <span className="text-muted-foreground"> → {truncate(s.exit_path, 40)}</span>}
        </span>
        <span className="flex w-14 items-center gap-1 tabular text-muted-foreground" title="pageviews">
          <FileText className="size-3" /> {fmtNum(s.pageviews)}
        </span>
        <span className="flex w-16 items-center gap-1 tabular text-muted-foreground" title="events">
          <Zap className="size-3" /> {fmtNum(s.events)}
        </span>
        <span className="flex w-16 items-center gap-1 tabular text-muted-foreground">
          <Clock className="size-3" /> {fmtDuration(s.duration)}
        </span>
        {(s.has_replay || detail.data?.hasReplay) && (
          <Link
            href={`/p/${project}/replay?uid=${s.uid}&start=${s.sess_start}&pn=1`}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1 text-[var(--series-3)] hover:underline"
            title="Session replay"
          >
            <PlayCircle className="size-3.5" />
          </Link>
        )}
        <Link
          href={`/p/${project}/user/${s.uid}`}
          onClick={e => e.stopPropagation()}
          className="flex w-28 items-center gap-1 truncate text-muted-foreground hover:text-foreground"
          title={`uid ${s.uid}${s.user_id ? ` · user ${s.user_id}` : ""}`}
        >
          <User className={cn("size-3", s.user_id && "text-[var(--status-good)]")} /> {s.user_id || s.uid.slice(-8)}
        </Link>
      </button>
      {open && (
        <div className="border-t border-border px-3 py-2">
          <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span>host {s.host}</span>
            <span>session #{s.sess_num}</span>
            {s.sess_refhost && <span>ref {s.sess_refhost}</span>}
            {s.utm_source && <span>utm {s.utm_source} / {s.utm_medium} / {s.utm_campaign}</span>}
            {s.pid && <span>pid {s.pid}</span>}
            {s.locale && <span>locale {s.locale}</span>}
            {s.currency && <span>currency {s.currency}</span>}
            <span>
              screen {s.screen_w}×{s.screen_h}
            </span>
            {s.ip && <span>ip {s.ip}</span>}
            {s.threat_score > 0 && <span className="text-[var(--status-warning)]">threat {s.threat_score}</span>}
          </div>
          {detail.isLoading ? (
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          ) : (
            <EventTimeline events={detail.data?.events ?? []} start={s.start_ts} />
          )}
        </div>
      )}
    </div>
  );
}
