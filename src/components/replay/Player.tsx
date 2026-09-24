"use client";
import { useEffect, useRef, useState } from "react";
import "rrweb-viewer/style.css";
import type { Recording, RrwebViewer as RrwebViewerType } from "rrweb-viewer";

interface Props {
  /** uid whose rows are loaded from /api/p/{project}/replay/rows. */
  uid: string | null;
  project: number;
  /** Recording to select once loaded, by session start + page number. */
  target?: { sess_start: number; sess_pageNum: number } | null;
  onRecordings?: (recs: Recording[]) => void;
  onSelect?: (rec: Recording | null, index: number) => void;
}

/**
 * Wraps the imperative rrweb-viewer in React. The library is browser-only (rrweb touches
 * `window` on import), so it is imported lazily inside an effect.
 */
export function Player({ uid, project, target, onRecordings, onSelect }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const viewer = useRef<RrwebViewerType | null>(null);
  const [status, setStatus] = useState<string>("");
  const cbs = useRef({ onRecordings, onSelect });
  useEffect(() => {
    cbs.current = { onRecordings, onSelect };
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      const { RrwebViewer, proxyRewriter } = await import("rrweb-viewer");
      if (!alive || !box.current) return;
      viewer.current = new RrwebViewer(box.current, {
        autoPlay: true,
        skipInactive: true,
        showList: true,
        showInfo: true,
        locale: "en",
        rewriteAssets: proxyRewriter("/api/asset?url="),
        onSelect: (rec, i) => cbs.current.onSelect?.(rec, i),
      });
    })();
    return () => {
      alive = false;
      viewer.current?.destroy();
      viewer.current = null;
    };
  }, []);

  useEffect(() => {
    if (!uid) return;
    let alive = true;
    (async () => {
      setStatus("Loading…");
      try {
        const res = await fetch(`/api/p/${project}/replay/rows?uid=${uid}`);
        if (!res.ok) throw new Error(await res.text());
        const text = await res.text();
        const rows = text
          .split("\n")
          .filter(l => l.trim())
          .map(l => JSON.parse(l));
        // wait for the viewer to be constructed (first effect is async)
        for (let i = 0; i < 50 && !viewer.current; i++) await new Promise(r => setTimeout(r, 50));
        if (!alive || !viewer.current) return;
        const recs = viewer.current.loadRows(rows);
        cbs.current.onRecordings?.(recs);
        const idx = target ? recs.findIndex(r => r.meta.sessStart === target.sess_start && r.meta.pageNum === target.sess_pageNum) : -1;
        const pick = idx >= 0 ? idx : recs.findIndex(r => r.playable);
        if (pick >= 0) viewer.current.select(pick, true);
        const lost = recs.reduce((s, r) => s + r.stats.lostParts, 0);
        setStatus(`${recs.length} recordings, ${recs.filter(r => r.playable).length} playable${lost ? `, ${lost} lost parts` : ""}`);
      } catch (e) {
        if (alive) setStatus(`Error: ${e instanceof Error ? e.message : String(e)}`);
      }
    })();
    return () => {
      alive = false;
    };
    // target is intentionally only read on uid change: selecting another recording of the same uid is done via select()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, project]);

  useEffect(() => {
    if (!target || !viewer.current) return;
    const recs = viewer.current.list;
    const idx = recs.findIndex(r => r.meta.sessStart === target.sess_start && r.meta.pageNum === target.sess_pageNum);
    if (idx >= 0 && idx !== viewer.current.currentIndexValue) viewer.current.select(idx, true);
  }, [target]);

  return (
    <div className="flex h-full flex-col">
      <div ref={box} className="rs-player min-h-0 flex-1" />
      <div className="px-2 py-1 text-[11px] text-muted-foreground">{status}</div>
    </div>
  );
}
