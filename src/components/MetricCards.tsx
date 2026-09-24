"use client";
import { cn } from "@/lib/utils";
import { fmtDelta } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export interface MetricDef<K extends string = string> {
  key: K;
  label: string;
  format: (v: number) => string;
  /** true when a decrease is good (e.g. bounce rate) */
  inverse?: boolean;
}

export function MetricCards<K extends string>({
  defs,
  current,
  previous,
  selected,
  onSelect,
  loading,
}: {
  defs: MetricDef<K>[];
  current?: Record<K, number>;
  previous?: Record<K, number>;
  selected?: K;
  onSelect?: (k: K) => void;
  loading?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
      {defs.map(d => {
        const cur = current?.[d.key];
        const prev = previous?.[d.key];
        const delta = cur !== undefined && prev !== undefined ? fmtDelta(cur, prev) : null;
        const good = delta && (d.inverse ? delta.dir === "down" : delta.dir === "up");
        const bad = delta && (d.inverse ? delta.dir === "up" : delta.dir === "down");
        return (
          <button
            key={d.key}
            onClick={() => onSelect?.(d.key)}
            className={cn(
              "flex flex-col gap-1 bg-card px-4 py-3 text-left hover:bg-muted/60",
              selected === d.key && "bg-muted shadow-[inset_0_-2px_0_var(--series-1)]"
            )}
          >
            <span className="text-xs text-muted-foreground">{d.label}</span>
            {loading || cur === undefined ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <span className="tabular text-xl font-semibold">{d.format(cur)}</span>
            )}
            <span className={cn("h-4 text-[11px] tabular", good && "text-[var(--status-good)]", bad && "text-[var(--status-critical)]", !good && !bad && "text-muted-foreground")}>
              {delta?.text ?? ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
