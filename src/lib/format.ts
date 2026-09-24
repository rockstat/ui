const nf = new Intl.NumberFormat("en-US");

export function fmtNum(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "–";
  return nf.format(Math.round(n));
}

export function fmtCompact(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "–";
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (abs >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (abs >= 1e4) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return nf.format(Math.round(n));
}

export function fmtPct(n: number | undefined | null, digits = 1): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "–";
  return n.toFixed(digits) + "%";
}

export function fmtDuration(sec: number | undefined | null): string {
  if (sec === undefined || sec === null || Number.isNaN(sec)) return "–";
  const s = Math.round(sec);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return `${m}m ${r}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

export function fmtMs(ms: number | undefined | null): string {
  if (ms === undefined || ms === null || Number.isNaN(ms)) return "–";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function fmtDateTime(ts: number, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(ts).toLocaleString("en-GB", { hour12: false, ...opts });
}

export function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-GB", { hour12: false });
}

export function fmtDelta(cur: number, prev: number): { text: string; dir: "up" | "down" | "flat" } {
  if (!prev) return { text: "", dir: "flat" };
  const d = ((cur - prev) / prev) * 100;
  if (Math.abs(d) < 0.05) return { text: "0%", dir: "flat" };
  return { text: `${d > 0 ? "+" : ""}${d.toFixed(1)}%`, dir: d > 0 ? "up" : "down" };
}

export function truncate(s: string, n = 60): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
