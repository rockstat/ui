"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAnalyticsState } from "@/lib/state";
import { PRESETS, rangeLabel } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/hydrated";

function toInput(ts: number) {
  const d = new Date(ts);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function DateRangePicker() {
  const s = useAnalyticsState();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(toInput(s.range.from));
  const [to, setTo] = useState(toInput(s.range.to - 1));

  function applyCustom() {
    const f = new Date(from + "T00:00:00").getTime();
    const t = new Date(to + "T00:00:00").getTime() + 86_400_000;
    if (Number.isFinite(f) && Number.isFinite(t) && f < t) {
      s.setPreset("custom", { from: f, to: t });
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3 text-xs hover:bg-muted">
        <Calendar className="size-3.5 text-muted-foreground" />
        {s.preset === "custom" && !hydrated ? "Custom range" : rangeLabel(s.preset, s.range)}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[420px] p-0">
        <div className="flex">
          <div className="flex w-40 flex-col border-r border-border p-1">
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  s.setPreset(p.id);
                  setOpen(false);
                }}
                className={cn("rounded px-2 py-1.5 text-left text-xs hover:bg-muted", s.preset === p.id && "bg-muted font-medium")}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="text-xs font-medium">Custom range</div>
            <label className="text-xs text-muted-foreground">
              From
              <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="mt-1 w-full rounded border border-border bg-background px-2 py-1 text-xs" />
            </label>
            <label className="text-xs text-muted-foreground">
              To
              <input type="date" value={to} onChange={e => setTo(e.target.value)} className="mt-1 w-full rounded border border-border bg-background px-2 py-1 text-xs" />
            </label>
            <Button size="sm" onClick={applyCustom} className="mt-1">
              Apply
            </Button>
            <div className="text-[11px] text-muted-foreground">Times are in your local timezone ({s.tz}).</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
