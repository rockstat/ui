"use client";
import { ResponsiveLine, type LineSeries, type SliceTooltipProps, type LineCustomSvgLayerProps } from "@nivo/line";
import { useMemo } from "react";
import type { Bucket } from "@/lib/types";
import { fmtCompact, fmtNum } from "@/lib/format";

export interface Series {
  id: string;
  color: string;
  dashed?: boolean;
  data: { x: string; y: number; label?: string }[];
}

interface Props {
  series: Series[];
  bucket: Bucket;
  height?: number;
  format?: (v: number) => string;
  area?: boolean;
  /** Sparkline: no axes, no grid, tight margins. */
  compact?: boolean;
}

function fmtAxis(iso: string, bucket: Bucket): string {
  const d = new Date(iso.replace(" ", "T"));
  if (bucket === "day" || bucket === "week") return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  if (bucket === "month") return d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function fmtFull(iso: string, bucket: Bucket): string {
  const d = new Date(iso.replace(" ", "T"));
  if (bucket === "day" || bucket === "week" || bucket === "month") return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  return d.toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

const theme = {
  text: { fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "inherit" },
  axis: { ticks: { line: { stroke: "transparent" } }, domain: { line: { stroke: "transparent" } } },
  grid: { line: { stroke: "var(--border)", strokeWidth: 1 } },
  crosshair: { line: { stroke: "var(--muted-foreground)", strokeWidth: 1, strokeOpacity: 0.6 } },
};

export function TimeSeriesChart({ series, bucket, height = 280, format = fmtNum, area = true, compact = false }: Props) {
  const data: LineSeries[] = useMemo(
    () => series.map(s => ({ id: s.id, data: s.data.map((p, i) => ({ x: i, y: p.y, label: p.label ?? p.x })) })),
    [series]
  );
  const primary = series[0];
  const n = primary?.data.length ?? 0;
  const tickEvery = Math.max(1, Math.ceil(n / 8));

  const Tooltip = ({ slice }: SliceTooltipProps<LineSeries>) => {
    const idx = Number(slice.points[0]?.data.x ?? 0);
    return (
      <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
        <div className="mb-1 text-muted-foreground">{primary?.data[idx] ? fmtFull(primary.data[idx].x, bucket) : ""}</div>
        {series.map(s => {
          const p = s.data[idx];
          if (!p) return null;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-3 rounded" style={{ background: s.color, opacity: s.dashed ? 0.5 : 1 }} />
              <span className="text-muted-foreground">{s.id}</span>
              <span className="ml-auto tabular font-medium">{format(p.y)}</span>
              {s.dashed && <span className="text-muted-foreground">({fmtFull(p.x, bucket)})</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const Lines = ({ series: ss, lineGenerator, xScale, yScale }: LineCustomSvgLayerProps<LineSeries>) => (
    <g>
      {ss.map((sr, i) => (
        <path
          key={sr.id}
          d={lineGenerator(sr.data.map(d => ({ x: xScale(d.data.x as number), y: yScale(d.data.y as number) }))) ?? ""}
          fill="none"
          stroke={series[i]?.color}
          strokeWidth={2}
          strokeDasharray={series[i]?.dashed ? "4 4" : undefined}
          opacity={series[i]?.dashed ? 0.55 : 1}
        />
      ))}
    </g>
  );

  if (!n) return <div className="flex items-center justify-center text-muted-foreground" style={{ height }}>No data</div>;

  return (
    <div style={{ height }}>
      <ResponsiveLine
        data={data}
        theme={theme}
        colors={series.map(s => s.color)}
        margin={compact ? { top: 4, right: 4, bottom: 4, left: 4 } : { top: 10, right: 12, bottom: 28, left: format === fmtNum ? 44 : 60 }}
        xScale={{ type: "linear", min: 0, max: Math.max(n - 1, 1) }}
        yScale={{ type: "linear", min: 0, max: "auto", nice: true }}
        curve="monotoneX"
        lineWidth={2}
        enablePoints={false}
        enableArea={area}
        areaOpacity={0.12}
        enableGridX={false}
        enableGridY={!compact}
        gridYValues={4}
        axisLeft={compact ? null : { tickValues: 4, format: (v: number) => (format === fmtNum ? fmtCompact(v) : format(v)) }}
        axisBottom={
          compact
            ? null
            : {
                tickValues: primary.data.map((_, i) => i).filter(i => i % tickEvery === 0),
                format: (i: number) => (primary.data[i] ? fmtAxis(primary.data[i].x, bucket) : ""),
              }
        }
        enableSlices="x"
        sliceTooltip={Tooltip}
        layers={["grid", "axes", "areas", "crosshair", Lines, "slices", "mesh"]}
        defs={[]}
        animate={false}
        role="img"
      />
    </div>
  );
}
