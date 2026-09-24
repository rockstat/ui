"use client";
import { useState } from "react";
import { X, GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import type { FunnelStep } from "@/lib/api";
import { useEventNames, useEventProps, useMetric } from "@/lib/api";
import { fmtNum } from "@/lib/format";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function Suggest({
  value,
  placeholder,
  items,
  onChange,
  className,
}: {
  value: string;
  placeholder: string;
  items: { value: string; count?: number }[];
  onChange: (v: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const shown = items.filter(i => !value || i.value.toLowerCase().includes(value.toLowerCase())).slice(0, 30);
  return (
    <Popover open={open && shown.length > 0} onOpenChange={setOpen}>
      <PopoverTrigger
        nativeButton={false}
        render={
          <input
            value={value}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onChange={e => {
              onChange(e.target.value);
              setOpen(true);
            }}
            className={cn("rounded border border-border bg-background px-2 py-1 text-xs", className)}
          />
        }
      />
      <PopoverContent align="start" className="max-h-64 w-72 overflow-auto p-1" initialFocus={false}>
        {shown.map(i => (
          <button
            key={i.value}
            onMouseDown={e => e.preventDefault()}
            onClick={() => {
              onChange(i.value);
              setOpen(false);
            }}
            className="flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs hover:bg-muted"
          >
            <span className="truncate">{i.value || "(empty)"}</span>
            {i.count !== undefined && <span className="ml-2 tabular text-muted-foreground">{fmtNum(i.count)}</span>}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function StepRow({ step, index, total, onChange, onRemove, onMove }: { step: FunnelStep; index: number; total: number; onChange: (s: FunnelStep) => void; onRemove: () => void; onMove: (d: -1 | 1) => void }) {
  const names = useEventNames(undefined, 500);
  const paths = useMetric("pathname", { limit: 200, enabled: step.event === "page" });
  const props = useEventProps(step.event && step.event !== "page" ? step.event : null, step.prop_key || undefined);
  const [showProp, setShowProp] = useState(!!step.prop_key);
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background/40 px-2 py-1.5">
      <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium">{index + 1}</span>
      <GripVertical className="size-3.5 text-muted-foreground" />
      <Suggest
        value={step.event}
        placeholder="event name"
        items={(names.data ?? []).map(n => ({ value: n.name, count: n.count }))}
        onChange={v => onChange({ ...step, event: v, path: v === "page" ? step.path : undefined, prop_key: undefined, prop_value: undefined })}
        className="w-52"
      />
      {step.event === "page" && (
        <Suggest value={step.path ?? ""} placeholder="path (any)" items={(paths.data?.rows ?? []).map(r => ({ value: r.value, count: r.count }))} onChange={v => onChange({ ...step, path: v || undefined })} className="w-56" />
      )}
      {step.event && step.event !== "page" && !showProp && (
        <button className="text-[11px] text-muted-foreground hover:text-foreground" onClick={() => setShowProp(true)}>
          + property
        </button>
      )}
      {showProp && step.event !== "page" && (
        <>
          <Suggest value={step.prop_key ?? ""} placeholder="property" items={(props.data?.keys ?? []).map(k => ({ value: k.key, count: k.count }))} onChange={v => onChange({ ...step, prop_key: v || undefined })} className="w-36" />
          <span className="text-xs text-muted-foreground">=</span>
          <Suggest value={step.prop_value ?? ""} placeholder="value" items={(props.data?.values ?? []).map(v => ({ value: v.value, count: v.count }))} onChange={v => onChange({ ...step, prop_value: v })} className="w-40" />
        </>
      )}
      <input value={step.label ?? ""} placeholder="label" onChange={e => onChange({ ...step, label: e.target.value || undefined })} className="w-32 rounded border border-border bg-background px-2 py-1 text-xs" />
      <span className="ml-auto flex items-center gap-1 text-muted-foreground">
        <button disabled={index === 0} onClick={() => onMove(-1)} className="disabled:opacity-30 hover:text-foreground">
          <ArrowUp className="size-3.5" />
        </button>
        <button disabled={index === total - 1} onClick={() => onMove(1)} className="disabled:opacity-30 hover:text-foreground">
          <ArrowDown className="size-3.5" />
        </button>
        <button disabled={total <= 2} onClick={onRemove} className="disabled:opacity-30 hover:text-destructive">
          <X className="size-3.5" />
        </button>
      </span>
    </div>
  );
}

export function StepEditor({ steps, onChange }: { steps: FunnelStep[]; onChange: (s: FunnelStep[]) => void }) {
  return (
    <div className="space-y-1.5">
      {steps.map((s, i) => (
        <StepRow
          key={i}
          step={s}
          index={i}
          total={steps.length}
          onChange={ns => onChange(steps.map((x, j) => (j === i ? ns : x)))}
          onRemove={() => onChange(steps.filter((_, j) => j !== i))}
          onMove={d => {
            const next = [...steps];
            const [it] = next.splice(i, 1);
            next.splice(i + d, 0, it);
            onChange(next);
          }}
        />
      ))}
      {steps.length < 10 && (
        <button onClick={() => onChange([...steps, { event: "" }])} className="rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
          + Add step
        </button>
      )}
    </div>
  );
}
