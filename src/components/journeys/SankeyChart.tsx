"use client";
import { Sankey } from "@nivo/sankey";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { JourneyLink, JourneyNode } from "@/server/queries/journeys";
import { fmtNum, fmtPct } from "@/lib/format";

const PALETTE = ["var(--series-1)", "var(--series-3)", "var(--series-2)", "var(--series-7)", "var(--series-4)", "var(--series-5)", "var(--series-6)", "var(--series-8)"];

export function SankeyChart({ nodes, links, sessions, height = 560 }: { nodes: JourneyNode[]; links: JourneyLink[]; sessions: number; height?: number }) {
  // Same label → same colour in every column; colours assigned by first-column rank so the
  // biggest entry pages get the leading palette slots.
  const colorOf = useMemo(() => {
    const order = [...nodes].sort((a, b) => a.step - b.step || b.value - a.value);
    const map = new Map<string, string>();
    let i = 0;
    for (const n of order) {
      if (n.kind === "exit") map.set(n.id, "var(--status-critical)");
      else if (n.kind === "other") map.set(n.id, "var(--muted-foreground)");
      else {
        if (!map.has(n.label)) map.set(n.label, PALETTE[i++ % PALETTE.length]);
        map.set(n.id, map.get(n.label)!);
      }
    }
    return (id: string) => map.get(id) ?? "var(--series-1)";
  }, [nodes]);
  const byId = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);
  // Measure the container ourselves. nivo's ResponsiveWrapper relies on ResizeObserver only,
  // which browsers do not deliver to hidden tabs; the synchronous measurement covers that case.
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = Math.floor(el.getBoundingClientRect().width);
      setWidth(prev => (prev === w ? prev : w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!links.length) return <div className="flex items-center justify-center text-muted-foreground" style={{ height }}>No data</div>;

  return (
    <div style={{ height }} ref={box}>
      {width > 0 && (
      <Sankey
        width={width}
        height={height}
        data={{ nodes: nodes.map(n => ({ id: n.id })), links }}
        margin={{ top: 8, right: 170, bottom: 8, left: 170 }}
        align="start"
        sort="descending"
        colors={n => colorOf(n.id)}
        nodeOpacity={1}
        nodeThickness={14}
        nodeSpacing={10}
        nodeBorderWidth={0}
        nodeBorderRadius={2}
        linkOpacity={0.35}
        linkHoverOthersOpacity={0.1}
        linkBlendMode="normal"
        enableLinkGradient
        label={n => {
          const j = byId.get(n.id);
          return j ? `${j.label.length > 28 ? j.label.slice(0, 27) + "…" : j.label} · ${fmtNum(j.value)}` : n.id;
        }}
        labelPosition="outside"
        labelPadding={8}
        labelTextColor="var(--foreground)"
        theme={{ text: { fontSize: 11, fill: "var(--foreground)", fontFamily: "inherit" } }}
        nodeTooltip={({ node }) => {
          const j = byId.get(node.id);
          return (
            <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
              <div className="font-medium">{j?.label}</div>
              <div className="text-muted-foreground">
                step {(j?.step ?? 0) + 1} · {fmtNum(j?.value)} sessions · {fmtPct(sessions ? (100 * (j?.value ?? 0)) / sessions : 0, 1)} of all
              </div>
            </div>
          );
        }}
        linkTooltip={({ link }) => {
          const a = byId.get(link.source.id);
          const b = byId.get(link.target.id);
          return (
            <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
              <div>
                {a?.label} → {b?.label}
              </div>
              <div className="text-muted-foreground">
                {fmtNum(link.value)} sessions · {fmtPct(a?.value ? (100 * link.value) / a.value : 0, 1)} of {a?.label}
              </div>
            </div>
          );
        }}
      />
      )}
    </div>
  );
}
