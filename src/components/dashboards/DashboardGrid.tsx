"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { GridLayout, verticalCompactor, type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { GRID_COLS, ROW_HEIGHT, type Widget } from "@/lib/dashboards";
import { WidgetView, widgetSubtitle } from "./WidgetView";
import { cn } from "@/lib/utils";

interface Props {
  widgets: Widget[];
  editing: boolean;
  onLayout: (layout: Layout) => void;
  onEdit: (w: Widget) => void;
  onRemove: (id: string) => void;
}

export function DashboardGrid({ widgets, editing, onLayout, onEdit, onRemove }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setWidth(Math.floor(el.getBoundingClientRect().width));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const layout: Layout = widgets.map(w => ({ i: w.id, ...w.grid, minW: 2, minH: 2 }));
  const margin = 12;

  return (
    <div ref={box} className={cn(editing && "rounded-lg outline-1 outline-dashed outline-border")}>
      {width > 0 && (
        <GridLayout
          width={width}
          gridConfig={{ cols: GRID_COLS, rowHeight: ROW_HEIGHT, margin: [margin, margin], containerPadding: [0, 0] }}
          dragConfig={{ enabled: editing, handle: ".widget-handle" }}
          resizeConfig={{ enabled: editing }}
          compactor={verticalCompactor}
          layout={layout}
          onLayoutChange={onLayout}
        >
          {widgets.map(w => {
            const px = w.grid.h * ROW_HEIGHT + (w.grid.h - 1) * margin;
            return (
              <div key={w.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
                <div className={cn("flex h-8 shrink-0 items-center gap-1 px-2", editing && "widget-handle cursor-move")}>
                  {editing && <GripVertical className="size-3.5 text-muted-foreground" />}
                  <span className="truncate text-xs font-medium">{w.title || widgetSubtitle(w)}</span>
                  {w.title && widgetSubtitle(w) !== w.title && <span className="ml-1 truncate text-[10px] text-muted-foreground">{widgetSubtitle(w)}</span>}
                  {editing && (
                    <span className="ml-auto flex items-center gap-1">
                      <button onMouseDown={e => e.stopPropagation()} onClick={() => onEdit(w)} className="text-muted-foreground hover:text-foreground">
                        <Pencil className="size-3.5" />
                      </button>
                      <button onMouseDown={e => e.stopPropagation()} onClick={() => onRemove(w.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-3.5" />
                      </button>
                    </span>
                  )}
                </div>
                <div className="min-h-0 flex-1 px-2 pb-2">
                  <WidgetView w={w} height={px - 32 - 8} />
                </div>
              </div>
            );
          })}
        </GridLayout>
      )}
    </div>
  );
}
