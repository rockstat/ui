"use client";
import { useState } from "react";
import { FileText, MousePointerClick, Link2, Send, Zap, ChevronDown, ChevronRight } from "lucide-react";
import type { EventRow } from "@/lib/types";
import { fmtDateTime, fmtTime, truncate } from "@/lib/format";
import Link from "next/link";
import { useProjectId } from "@/lib/project";
import { cn } from "@/lib/utils";

function icon(name: string, isPage: number) {
  if (isPage) return <FileText className="size-3.5 text-[var(--series-1)]" />;
  if (name === "element_click") return <MousePointerClick className="size-3.5 text-[var(--series-2)]" />;
  if (name === "link_click") return <Link2 className="size-3.5 text-[var(--series-2)]" />;
  if (name === "form_submit") return <Send className="size-3.5 text-[var(--series-3)]" />;
  return <Zap className="size-3.5 text-muted-foreground" />;
}

function summary(e: EventRow): string {
  if (e.is_page) return e.path + (e.query || "");
  const p = e.props ?? {};
  if (e.name === "element_click" || e.name === "link_click") return [p.target_text || p.text, p.target_href || p.href, p.target_id && `#${p.target_id}`, p.target_cls].filter(Boolean).join(" · ");
  if (e.name === "form_submit") return [p.fid, p.fact].filter(Boolean).join(" · ");
  const keys = Object.keys(p).slice(0, 3);
  return keys.map(k => `${k}=${p[k]}`).join(" · ");
}

export function EventTimeline({ events, start, showUser = false }: { events: EventRow[]; start: number; showUser?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const project = useProjectId();
  return (
    <div className="flex flex-col">
      {events.map((e, i) => {
        const props = Object.entries(e.props ?? {});
        const isOpen = open === i;
        return (
          <div key={i} className="border-l border-border pl-3 text-xs">
            <button onClick={() => setOpen(isOpen ? null : i)} className={cn("flex w-full items-center gap-2 rounded px-1 py-1 text-left hover:bg-muted/60", e.is_page && "font-medium")}>
              {showUser ? (
                <span className="w-32 shrink-0 tabular text-muted-foreground">{fmtDateTime(e.ts)}</span>
              ) : (
                <>
                  <span className="w-16 shrink-0 tabular text-muted-foreground">{fmtTime(e.ts)}</span>
                  <span className="w-10 shrink-0 tabular text-[10px] text-muted-foreground">+{((e.ts - start) / 1000).toFixed(1)}s</span>
                </>
              )}
              {showUser && (
                <Link href={`/p/${project}/user/${e.uid}`} onClick={ev => ev.stopPropagation()} className="w-24 shrink-0 truncate text-muted-foreground hover:text-foreground">
                  {e.user_id || e.uid.slice(-8)}
                </Link>
              )}
              {icon(e.name, e.is_page)}
              <span className="w-40 shrink-0 truncate">{e.is_page ? "page" : e.name}</span>
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{truncate(summary(e), 140)}</span>
              {props.length > 0 && (isOpen ? <ChevronDown className="size-3 shrink-0" /> : <ChevronRight className="size-3 shrink-0" />)}
            </button>
            {isOpen && (
              <div className="mb-1 ml-28 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 rounded bg-muted/40 px-2 py-1 font-mono text-[11px]">
                {e.is_page && (
                  <>
                    <span className="text-muted-foreground">url</span>
                    <span className="break-all">{e.url}</span>
                    <span className="text-muted-foreground">title</span>
                    <span>{e.title}</span>
                    <span className="text-muted-foreground">ref</span>
                    <span className="break-all">{e.ref}</span>
                  </>
                )}
                {props.map(([k, v]) => (
                  <span key={k} className="contents">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="break-all">{v}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
