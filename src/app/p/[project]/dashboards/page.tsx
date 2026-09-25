"use client";
import { useEffect, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { Plus, Pencil, Check, Trash2, LayoutDashboard } from "lucide-react";
import type { Layout } from "react-grid-layout";
import { useDashboards, useDeleteDashboard, useSaveDashboard } from "@/lib/api";
import { defaultDashboard, newWidgetId, type Dashboard, type DashboardConfig, type Widget } from "@/lib/dashboards";
import { DashboardGrid } from "@/components/dashboards/DashboardGrid";
import { WidgetEditor } from "@/components/dashboards/WidgetEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function DashboardsPage() {
  const [selectedId, setSelectedId] = useQueryState("d", parseAsString);
  const list = useDashboards();
  const save = useSaveDashboard();
  const del = useDeleteDashboard();
  const current = list.data?.find(d => d.id === selectedId) ?? list.data?.[0];

  async function createDefault() {
    const d = await save.mutateAsync({ name: "Overview", config: defaultDashboard() });
    setSelectedId(d.id);
  }
  async function createEmpty() {
    const d = await save.mutateAsync({ name: `Dashboard ${(list.data?.length ?? 0) + 1}`, config: { widgets: [] } });
    setSelectedId(d.id);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1.5">
        {list.data?.map(d => (
          <button key={d.id} onClick={() => setSelectedId(d.id)} className={cn("rounded px-2.5 py-1 text-xs hover:bg-muted", current?.id === d.id && "bg-muted font-medium")}>
            {d.name}
          </button>
        ))}
        <button onClick={createEmpty} className="flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground" title="New dashboard">
          <Plus className="size-3.5" /> New
        </button>
      </div>
      {list.isLoading ? (
        <Skeleton className="h-64" />
      ) : !current ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-10 text-center">
          <LayoutDashboard className="size-8 text-muted-foreground" />
          <div className="text-sm">No dashboards yet</div>
          <div className="max-w-md text-xs text-muted-foreground">Start from the default set (users, sessions, traffic types, devices, top pages, countries, referrers) or build your own from scratch.</div>
          <div className="flex gap-2">
            <Button size="sm" onClick={createDefault} disabled={save.isPending}>
              Create default dashboard
            </Button>
            <Button size="sm" variant="outline" onClick={createEmpty} disabled={save.isPending}>
              Empty dashboard
            </Button>
          </div>
        </div>
      ) : (
        <Editor key={current.id} dashboard={current} onDelete={async () => {
          if (!confirm(`Delete dashboard "${current.name}"?`)) return;
          await del.mutateAsync(current.id);
          setSelectedId(null);
        }} />
      )}
    </div>
  );
}

function Editor({ dashboard, onDelete }: { dashboard: Dashboard; onDelete: () => void }) {
  const save = useSaveDashboard();
  const [editing, setEditing] = useState(false);
  const [config, setConfig] = useState<DashboardConfig>(dashboard.config);
  const [name, setName] = useState(dashboard.name);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [dirty, setDirty] = useState(false);

  // Persist shortly after the last change while in edit mode.
  useEffect(() => {
    if (!dirty || !editing) return;
    const t = setTimeout(async () => {
      await save.mutateAsync({ id: dashboard.id, name, config });
      setDirty(false);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, name, dirty, editing]);

  function update(c: DashboardConfig) {
    setConfig(c);
    setDirty(true);
  }
  function onLayout(layout: Layout) {
    const byId = new Map(layout.map(l => [l.i, l]));
    const next = config.widgets.map(w => {
      const l = byId.get(w.id);
      return l ? { ...w, grid: { x: l.x, y: l.y, w: l.w, h: l.h } } : w;
    });
    if (JSON.stringify(next) !== JSON.stringify(config.widgets)) update({ widgets: next });
  }
  function addWidget() {
    const y = config.widgets.reduce((m, w) => Math.max(m, w.grid.y + w.grid.h), 0);
    setEditingWidget({ id: newWidgetId(), type: "stat", title: "", metric: "users", grid: { x: 0, y, w: 4, h: 6 } });
  }
  function saveWidget(w: Widget) {
    const exists = config.widgets.some(x => x.id === w.id);
    update({ widgets: exists ? config.widgets.map(x => (x.id === w.id ? w : x)) : [...config.widgets, w] });
    setEditingWidget(null);
  }
  async function finish() {
    await save.mutateAsync({ id: dashboard.id, name, config });
    setDirty(false);
    setEditing(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {editing ? (
          <input value={name} onChange={e => { setName(e.target.value); setDirty(true); }} className="rounded border border-border bg-background px-2 py-1 text-sm font-medium" />
        ) : (
          <span className="px-1 text-sm font-medium">{dashboard.name}</span>
        )}
        <span className="text-xs text-muted-foreground">{config.widgets.length} widgets{dirty ? " · saving…" : ""}</span>
        <span className="ml-auto flex items-center gap-2">
          {editing && (
            <>
              <Button size="sm" variant="outline" onClick={addWidget}>
                <Plus className="size-3.5" /> Add widget
              </Button>
              <Button size="sm" variant="outline" onClick={onDelete} className="text-destructive">
                <Trash2 className="size-3.5" />
              </Button>
              <Button size="sm" onClick={finish}>
                <Check className="size-3.5" /> Done
              </Button>
            </>
          )}
          {!editing && (
            <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
              <Pencil className="size-3.5" /> Edit
            </Button>
          )}
        </span>
      </div>
      {config.widgets.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-10 text-center text-xs text-muted-foreground">
          Empty dashboard. {editing ? "Use “Add widget”." : "Press Edit to add widgets."}
        </div>
      ) : (
        <DashboardGrid widgets={config.widgets} editing={editing} onLayout={onLayout} onEdit={setEditingWidget} onRemove={id => update({ widgets: config.widgets.filter(w => w.id !== id) })} />
      )}
      {editingWidget && <WidgetEditor widget={editingWidget} onSave={saveWidget} onClose={() => setEditingWidget(null)} />}
    </div>
  );
}
