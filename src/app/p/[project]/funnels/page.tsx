"use client";
import { useEffect, useMemo, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { Save, Trash2, Plus } from "lucide-react";
import { useDeleteFunnel, useFunnelRun, useFunnels, useSaveFunnel, type FunnelDefinition, type SavedFunnel } from "@/lib/api";
import { StepEditor } from "@/components/funnels/StepEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtNum, fmtPct } from "@/lib/format";
import { cn } from "@/lib/utils";

const WINDOWS: { v: number; label: string }[] = [
  { v: 3600, label: "1 hour" },
  { v: 86400, label: "24 hours" },
  { v: 7 * 86400, label: "7 days" },
  { v: 30 * 86400, label: "30 days" },
  { v: 0, label: "Whole range" },
];

/** Re-run the funnel only after the editor has been quiet for a moment. */
function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

const EMPTY: FunnelDefinition = { steps: [{ event: "page", path: "/" }, { event: "" }], window: 86400, scope: "user" };

export default function FunnelsPage() {
  const [selectedId, setSelectedId] = useQueryState("f", parseAsString);
  const funnels = useFunnels();
  const del = useDeleteFunnel();
  // "new" = empty editor; otherwise the chosen or the most recent saved funnel.
  const effectiveId = selectedId ?? funnels.data?.[0]?.id ?? "new";
  const selected = effectiveId === "new" ? undefined : funnels.data?.find(f => f.id === effectiveId);

  async function doDelete(f: SavedFunnel) {
    if (!confirm(`Delete funnel "${f.name}"?`)) return;
    await del.mutateAsync(f.id);
    if (effectiveId === f.id) setSelectedId("new");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="text-xs font-medium uppercase text-muted-foreground">Funnels</span>
          <button onClick={() => setSelectedId("new")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Plus className="size-3.5" /> New
          </button>
        </div>
        <div className="p-1">
          {funnels.isLoading && <Skeleton className="m-2 h-16" />}
          {funnels.data?.map(f => (
            <div key={f.id} className={cn("group flex items-center rounded px-2 py-1.5 text-xs hover:bg-muted/60", f.id === effectiveId && "bg-muted")}>
              <button className="min-w-0 flex-1 text-left" onClick={() => setSelectedId(f.id)}>
                <div className="truncate font-medium">{f.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{f.definition.steps.map(s => s.label || s.event).join(" → ")}</div>
              </button>
              <button onClick={() => doDelete(f)} className="ml-1 hidden text-muted-foreground hover:text-destructive group-hover:block">
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
          {funnels.data?.length === 0 && <div className="p-3 text-xs text-muted-foreground">No saved funnels yet</div>}
        </div>
      </aside>
      {funnels.isLoading ? (
        <Skeleton className="h-64" />
      ) : (
        <Editor key={effectiveId} saved={selected} onSaved={id => setSelectedId(id)} />
      )}
    </div>
  );
}

function Editor({ saved, onSaved }: { saved?: SavedFunnel; onSaved: (id: string) => void }) {
  const save = useSaveFunnel();
  const [def, setDef] = useState<FunnelDefinition>(saved?.definition ?? EMPTY);
  const [name, setName] = useState(saved?.name ?? "");
  const [dirty, setDirty] = useState(false);
  const debounced = useDebounced(def, 600);
  const runnable = useMemo(() => (debounced.steps.length >= 2 && debounced.steps.every(s => s.event) ? debounced : null), [debounced]);
  const result = useFunnelRun(runnable);

  function update(patch: Partial<FunnelDefinition>) {
    setDef(d => ({ ...d, ...patch }));
    setDirty(true);
  }
  async function doSave() {
    const out = await save.mutateAsync({ id: saved?.id, name: name || "Untitled funnel", definition: def });
    setDirty(false);
    onSaved(out.id);
  }

  const max = result.data?.[0]?.count ?? 1;

  return (
      <div className="min-w-0 space-y-4">        <div className="rounded-lg border border-border bg-card p-3">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <input value={name} onChange={e => { setName(e.target.value); setDirty(true); }} placeholder="Funnel name" className="w-64 rounded border border-border bg-background px-2 py-1 text-sm font-medium" />
            <select value={def.scope} onChange={e => update({ scope: e.target.value as "user" | "session" })} className="rounded border border-border bg-background px-2 py-1 text-xs">
              <option value="user">Count users</option>
              <option value="session">Count sessions</option>
            </select>
            <select value={def.window} onChange={e => update({ window: Number(e.target.value) })} className="rounded border border-border bg-background px-2 py-1 text-xs" title="Max time from first to last step">
              {WINDOWS.map(w => (
                <option key={w.v} value={w.v}>
                  within {w.label}
                </option>
              ))}
            </select>
            <Button size="sm" className="ml-auto" onClick={doSave} disabled={save.isPending || !runnable}>
              <Save className="size-3.5" /> {saved ? "Save" : "Save as new"}
              {dirty && saved ? " *" : ""}
            </Button>
          </div>
          <StepEditor steps={def.steps} onChange={steps => update({ steps })} />
          <div className="mt-2 text-[11px] text-muted-foreground">
            Steps must happen in this order (other events in between are fine). Global date range and filters apply.
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-3">
          {!runnable ? (
            <div className="py-10 text-center text-muted-foreground">Fill in at least two steps</div>
          ) : result.isLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : result.isError ? (
            <div className="text-xs text-destructive">{(result.error as Error).message}</div>
          ) : (
            <div className={cn("space-y-3", result.isFetching && "opacity-60")}>
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${result.data!.length}, minmax(0, 1fr))` }}>
                {result.data!.map(r => (
                  <div key={r.step} className="flex flex-col gap-1">
                    <div className="truncate text-xs text-muted-foreground" title={r.label}>
                      {r.step}. {r.label}
                    </div>
                    <div className="tabular text-xl font-semibold">{fmtNum(r.count)}</div>
                    <div className="flex h-40 items-end rounded bg-muted/40">
                      <div className="w-full rounded-t bg-[var(--series-1)]" style={{ height: `${Math.max(1, (100 * r.count) / max)}%` }} />
                    </div>
                    <div className="text-xs">
                      <span className="tabular font-medium">{fmtPct(r.conversion, 1)}</span> <span className="text-muted-foreground">of first</span>
                    </div>
                    {r.step > 1 && (
                      <div className="text-xs text-muted-foreground">
                        <span className="tabular text-foreground">{fmtPct(r.step_conversion, 1)}</span> of previous · <span className="tabular text-[var(--status-critical)]">−{fmtNum(r.dropoff)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-2 text-xs text-muted-foreground">
                Overall conversion <span className="tabular font-medium text-foreground">{fmtPct(result.data![result.data!.length - 1].conversion, 2)}</span> ·{" "}
                {fmtNum(result.data![0].count)} → {fmtNum(result.data![result.data!.length - 1].count)} {def.scope === "user" ? "users" : "sessions"}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
