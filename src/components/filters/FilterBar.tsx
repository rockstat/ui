"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAnalyticsState } from "@/lib/state";
import { FILTER_TYPES, PARAM_GROUPS, PARAM_LABEL, TYPE_LABEL } from "@/lib/filters";
import type { Filter, FilterParameter, FilterType } from "@/lib/types";
import { useMetric } from "@/lib/api";
import { truncate } from "@/lib/format";

function ValuePicker({ parameter, value, onChange }: { parameter: FilterParameter; value: string; onChange: (v: string) => void }) {
  const { data } = useMetric(parameter === "event_name" ? "event_name" : parameter, { limit: 15, search: value || undefined });
  return (
    <div>
      <input
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Value"
        className="w-full rounded border border-border bg-background px-2 py-1 text-xs"
      />
      <div className="mt-1 max-h-48 overflow-auto">
        {data?.rows.map(r => (
          <button key={r.value} onClick={() => onChange(r.value)} className="flex w-full justify-between rounded px-2 py-1 text-left text-xs hover:bg-muted">
            <span className="truncate">{r.value || "(empty)"}</span>
            <span className="tabular text-muted-foreground">{r.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function FilterBar() {
  const s = useAnalyticsState();
  const [open, setOpen] = useState(false);
  const [parameter, setParameter] = useState<FilterParameter | null>(null);
  const [type, setType] = useState<FilterType>("equals");
  const [value, setValue] = useState("");

  function add() {
    if (!parameter) return;
    const needsValue = type !== "is_null" && type !== "is_not_null";
    if (needsValue && !value) return;
    const f: Filter = { parameter, type, value: needsValue ? [value] : [] };
    s.addFilter(f);
    setOpen(false);
    setParameter(null);
    setValue("");
    setType("equals");
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {s.filters.map((f, i) => (
        <span key={i} className="flex h-8 items-center gap-1 rounded-md border border-border bg-card px-2 text-xs">
          <span className="text-muted-foreground">{PARAM_LABEL[f.parameter]}</span>
          <span className="text-muted-foreground">{TYPE_LABEL[f.type]}</span>
          <span className="font-medium">{truncate(f.value.join(", "), 40)}</span>
          <button onClick={() => s.removeFilter(i)} className="ml-1 text-muted-foreground hover:text-foreground">
            <X className="size-3" />
          </button>
        </span>
      ))}
      <Popover
        open={open}
        onOpenChange={o => {
          setOpen(o);
          if (!o) setParameter(null);
        }}
      >
        <PopoverTrigger className="flex h-8 items-center gap-1 rounded-md border border-dashed border-border px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
          <Plus className="size-3.5" /> Filter
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-2">
          {!parameter ? (
            <div className="max-h-96 overflow-auto">
              {PARAM_GROUPS.map(g => (
                <div key={g.label} className="mb-1">
                  <div className="px-2 py-1 text-[11px] font-medium uppercase text-muted-foreground">{g.label}</div>
                  {g.params.map(p => (
                    <button key={p} onClick={() => setParameter(p)} className="block w-full rounded px-2 py-1 text-left text-xs hover:bg-muted">
                      {PARAM_LABEL[p]}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <button className="text-muted-foreground hover:text-foreground" onClick={() => setParameter(null)}>
                  ←
                </button>
                <span className="font-medium">{PARAM_LABEL[parameter]}</span>
                <select value={type} onChange={e => setType(e.target.value as FilterType)} className="ml-auto rounded border border-border bg-background px-1 py-0.5 text-xs">
                  {FILTER_TYPES.map(t => (
                    <option key={t} value={t}>
                      {TYPE_LABEL[t]}
                    </option>
                  ))}
                </select>
              </div>
              {type !== "is_null" && type !== "is_not_null" && <ValuePicker parameter={parameter} value={value} onChange={setValue} />}
              <Button size="sm" className="w-full" onClick={add}>
                Add filter
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
