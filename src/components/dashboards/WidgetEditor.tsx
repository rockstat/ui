"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BASE_METRICS, type Widget, type WidgetMetric, type WidgetType } from "@/lib/dashboards";
import { useEventNames, useFunnels, useMetric } from "@/lib/api";
import { PARAM_GROUPS, PARAM_LABEL, TYPE_LABEL, FILTER_TYPES } from "@/lib/filters";
import type { Filter, FilterParameter, FilterType } from "@/lib/types";
import { fmtNum } from "@/lib/format";

const TYPES: { id: WidgetType; label: string; hint: string }[] = [
  { id: "stat", label: "Number", hint: "one metric with change vs previous period and a sparkline" },
  { id: "line", label: "Chart", hint: "metric over time, optionally split by a dimension" },
  { id: "pie", label: "Share", hint: "distribution of a dimension" },
  { id: "table", label: "Table", hint: "top values of a dimension" },
  { id: "funnel", label: "Funnel", hint: "a saved funnel" },
];

const sel = "rounded border border-border bg-background px-2 py-1 text-xs";

function MetricPicker({ value, onChange }: { value: WidgetMetric; onChange: (m: WidgetMetric) => void }) {
  const isEvent = value.startsWith("event:");
  const [search, setSearch] = useState("");
  const names = useEventNames(search || undefined, 30);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={isEvent ? "event:" : value} onChange={e => onChange(e.target.value === "event:" ? "event:page" : (e.target.value as WidgetMetric))} className={sel}>
        {BASE_METRICS.map(m => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
        <option value="event:">Event count…</option>
      </select>
      {isEvent && (
        <>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="find event" className={sel + " w-40"} />
          <select value={value} onChange={e => onChange(e.target.value as WidgetMetric)} className={sel}>
            <option value={value}>{value.slice(6)}</option>
            {names.data?.filter(n => `event:${n.name}` !== value).map(n => (
              <option key={n.name} value={`event:${n.name}`}>
                {n.name} ({fmtNum(n.count)})
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

function DimensionPicker({ value, onChange, allowNone }: { value?: string; onChange: (d: FilterParameter | "event_name" | undefined) => void; allowNone?: boolean }) {
  return (
    <select value={value ?? ""} onChange={e => onChange((e.target.value || undefined) as FilterParameter | undefined)} className={sel}>
      {allowNone && <option value="">no split</option>}
      {PARAM_GROUPS.map(g => (
        <optgroup key={g.label} label={g.label}>
          {g.params.map(p => (
            <option key={p} value={p}>
              {PARAM_LABEL[p]}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function FilterRow({ f, onChange, onRemove }: { f: Filter; onChange: (f: Filter) => void; onRemove: () => void }) {
  const suggestions = useMetric(f.parameter, { limit: 15, search: f.value[0] || undefined });
  const needsValue = f.type !== "is_null" && f.type !== "is_not_null";
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <DimensionPicker value={f.parameter} onChange={d => d && onChange({ ...f, parameter: d as FilterParameter, value: [] })} />
      <select value={f.type} onChange={e => onChange({ ...f, type: e.target.value as FilterType })} className={sel}>
        {FILTER_TYPES.map(t => (
          <option key={t} value={t}>
            {TYPE_LABEL[t]}
          </option>
        ))}
      </select>
      {needsValue && (
        <>
          <input list={`sugg-${f.parameter}`} value={f.value[0] ?? ""} onChange={e => onChange({ ...f, value: [e.target.value] })} placeholder="value" className={sel + " w-44"} />
          <datalist id={`sugg-${f.parameter}`}>{suggestions.data?.rows.map(r => <option key={r.value} value={r.value} />)}</datalist>
        </>
      )}
      <button onClick={onRemove} className="text-muted-foreground hover:text-destructive">
        <X className="size-3.5" />
      </button>
    </div>
  );
}

export function WidgetEditor({ widget, onSave, onClose }: { widget: Widget; onSave: (w: Widget) => void; onClose: () => void }) {
  const [w, setW] = useState<Widget>({ ...widget, filters: widget.filters ?? [] });
  const funnels = useFunnels();
  const set = (patch: Partial<Widget>) => setW(x => ({ ...x, ...patch }));
  const valid = (w.type === "funnel" ? !!w.funnelId : true) && (w.type === "pie" || w.type === "table" ? !!w.dimension : true);

  return (
    <Dialog open onOpenChange={o => !o && onClose()}>
      <DialogContent className="w-[640px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-sm">{widget.title ? "Edit widget" : "New widget"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-5 gap-1">
            {TYPES.map(t => (
              <button
                key={t.id}
                title={t.hint}
                onClick={() =>
                  set({
                    type: t.id,
                    metric: t.id === "stat" || t.id === "line" ? (w.metric ?? "users") : undefined,
                    dimension: t.id === "pie" || t.id === "table" ? (w.dimension ?? "pathname") : t.id === "line" ? w.dimension : undefined,
                    funnelId: t.id === "funnel" ? w.funnelId : undefined,
                  })
                }
                className={"rounded border px-2 py-1.5 " + (w.type === t.id ? "border-[var(--series-1)] bg-muted font-medium" : "border-border text-muted-foreground hover:bg-muted")}
              >
                {t.label}
              </button>
            ))}
          </div>
          <label className="block">
            <span className="text-muted-foreground">Title</span>
            <input value={w.title} onChange={e => set({ title: e.target.value })} className={sel + " mt-1 w-full"} />
          </label>
          {(w.type === "stat" || w.type === "line") && (
            <div>
              <div className="mb-1 text-muted-foreground">Metric</div>
              <MetricPicker value={w.metric ?? "users"} onChange={m => set({ metric: m })} />
            </div>
          )}
          {w.type === "line" && !(w.metric ?? "").startsWith("event:") && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Split by</span>
              <DimensionPicker value={w.dimension} onChange={d => set({ dimension: d })} allowNone />
              {w.dimension && (
                <>
                  <span className="text-muted-foreground">top</span>
                  <input type="number" min={2} max={12} value={w.limit ?? 5} onChange={e => set({ limit: Number(e.target.value) })} className={sel + " w-16"} />
                </>
              )}
            </div>
          )}
          {(w.type === "pie" || w.type === "table") && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Dimension</span>
              <DimensionPicker value={w.dimension} onChange={d => set({ dimension: d })} />
              <span className="text-muted-foreground">rows</span>
              <input type="number" min={2} max={50} value={w.limit ?? 10} onChange={e => set({ limit: Number(e.target.value) })} className={sel + " w-16"} />
            </div>
          )}
          {w.type === "funnel" && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Funnel</span>
              <select value={w.funnelId ?? ""} onChange={e => set({ funnelId: e.target.value || undefined })} className={sel}>
                <option value="">choose…</option>
                {funnels.data?.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
              {funnels.data?.length === 0 && <span className="text-muted-foreground">no saved funnels yet</span>}
            </div>
          )}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-muted-foreground">Widget filters (in addition to global ones)</span>
              <button className="text-muted-foreground hover:text-foreground" onClick={() => set({ filters: [...(w.filters ?? []), { parameter: "country", type: "equals", value: [] }] })}>
                + add
              </button>
            </div>
            <div className="space-y-1.5">
              {(w.filters ?? []).map((f, i) => (
                <FilterRow key={i} f={f} onChange={nf => set({ filters: w.filters!.map((x, j) => (j === i ? nf : x)) })} onRemove={() => set({ filters: w.filters!.filter((_, j) => j !== i) })} />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" disabled={!valid} onClick={() => onSave({ ...w, filters: (w.filters ?? []).filter(f => f.type === "is_null" || f.type === "is_not_null" || f.value[0]) })}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
