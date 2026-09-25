"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, Send, Square, Trash2, ChevronDown, ChevronRight, Database, X } from "lucide-react";
import { streamAi, type AiEvent } from "@/lib/api";
import { useAnalyticsState } from "@/lib/state";
import { useProjectId } from "@/lib/project";
import { cn } from "@/lib/utils";
import { fmtNum } from "@/lib/format";

interface ToolCall {
  id: string;
  name: string;
  input: unknown;
  ui?: unknown;
  isError?: boolean;
  text?: string;
  done: boolean;
}
interface Msg {
  role: "user" | "assistant";
  content: string;
  tools?: ToolCall[];
  error?: string;
}

const SUGGESTIONS = [
  "What changed compared to the previous period?",
  "Which traffic sources bring users who register?",
  "Show the registration → deposit funnel by device type",
  "Top 10 pages by bounce rate with at least 1000 sessions",
  "Which countries grew the most this week?",
];

function ToolView({ t }: { t: ToolCall }) {
  const [open, setOpen] = useState(false);
  const input = (t.input ?? {}) as Record<string, unknown>;
  const label = t.name === "run_sql" ? String(input.purpose ?? "SQL query") : t.name === "breakdown" ? `breakdown by ${input.dimension}` : t.name === "top_events" ? "top events" : t.name;
  const rows = Array.isArray(t.ui) ? (t.ui as Record<string, unknown>[]) : t.ui && typeof t.ui === "object" && Array.isArray((t.ui as { rows?: unknown }).rows) ? ((t.ui as { rows: Record<string, unknown>[] }).rows) : null;
  return (
    <div className="my-1 rounded border border-border bg-background/60 text-[11px]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-1.5 px-2 py-1 text-left text-muted-foreground hover:text-foreground">
        {open ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
        <Database className={cn("size-3", t.isError && "text-destructive")} />
        <span className="truncate">{label}</span>
        {!t.done && <span className="ml-auto animate-pulse">running…</span>}
        {t.done && rows && <span className="ml-auto tabular">{rows.length} rows</span>}
      </button>
      {open && (
        <div className="max-h-64 overflow-auto border-t border-border p-2">
          {t.name === "run_sql" && <pre className="mb-2 whitespace-pre-wrap font-mono text-[10px] text-muted-foreground">{String(input.sql ?? "")}</pre>}
          {t.isError && <div className="text-destructive">{t.text}</div>}
          {rows && rows.length > 0 && (
            <table className="w-full text-[10px]">
              <thead>
                <tr>
                  {Object.keys(rows[0]).map(k => (
                    <th key={k} className="px-1 text-left font-medium text-muted-foreground">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 50).map((r, i) => (
                  <tr key={i} className="border-t border-border/50">
                    {Object.values(r).map((v, j) => (
                      <td key={j} className="px-1 tabular whitespace-nowrap">
                        {typeof v === "number" ? fmtNum(v) : typeof v === "object" ? JSON.stringify(v) : String(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {t.name === "overview" && t.ui ? <pre className="font-mono text-[10px]">{JSON.stringify(t.ui, null, 1)}</pre> : null}
        </div>
      )}
    </div>
  );
}

export function AiPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const project = useProjectId();
  const s = useAnalyticsState();
  const key = `rs-ai-${project}`;
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      return raw ? (JSON.parse(raw) as Msg[]) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(msgs.slice(-40)));
    } catch {
      /* ignore */
    }
    bottom.current?.scrollIntoView({ block: "end" });
  }, [msgs, key]);

  async function ask(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    const history = [...msgs.filter(m => !m.error), { role: "user" as const, content: q }];
    setMsgs([...history, { role: "assistant", content: "", tools: [] }]);
    setBusy(true);
    abort.current = new AbortController();
    const apply = (fn: (m: Msg) => Msg) => setMsgs(cur => cur.map((m, i) => (i === cur.length - 1 ? fn(m) : m)));
    try {
      for await (const ev of streamAi(project, s.query, history.map(m => ({ role: m.role, content: m.content })), abort.current.signal)) {
        handle(ev, apply);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") apply(m => ({ ...m, error: e instanceof Error ? e.message : String(e) }));
    } finally {
      setBusy(false);
      apply(m => ({ ...m, tools: m.tools?.map(t => ({ ...t, done: true })) }));
    }
  }

  function handle(ev: AiEvent, apply: (fn: (m: Msg) => Msg) => void) {
    if (ev.type === "text") apply(m => ({ ...m, content: m.content + (ev.text ?? "") }));
    else if (ev.type === "tool_start") apply(m => ({ ...m, tools: [...(m.tools ?? []), { id: ev.id!, name: ev.name!, input: ev.input, done: false }] }));
    else if (ev.type === "tool_result") apply(m => ({ ...m, tools: (m.tools ?? []).map(t => (t.id === ev.id ? { ...t, ui: ev.ui, isError: ev.isError, text: ev.message ?? (ev as { text?: string }).text, done: true } : t)) }));
    else if (ev.type === "error") apply(m => ({ ...m, error: ev.message }));
  }

  if (!open) return null;
  return (
    <aside className="flex h-full w-[420px] shrink-0 flex-col border-l border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Sparkles className="size-4 text-[var(--series-1)]" />
        <span className="text-sm font-medium">Ask AI</span>
        <span className="text-[11px] text-muted-foreground">uses the current range and filters</span>
        <button onClick={() => setMsgs([])} className="ml-auto text-muted-foreground hover:text-foreground" title="Clear conversation">
          <Trash2 className="size-3.5" />
        </button>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 text-sm">
        {msgs.length === 0 && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Ask about traffic, events, funnels or users. The assistant queries the same data as the dashboards.</div>
            {SUGGESTIONS.map(q => (
              <button key={q} onClick={() => ask(q)} className="block w-full rounded border border-border px-2 py-1.5 text-left text-xs hover:bg-muted">
                {q}
              </button>
            ))}
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={cn("mb-3", m.role === "user" ? "flex justify-end" : "")}>
            {m.role === "user" ? (
              <div className="max-w-[85%] rounded-lg bg-[var(--series-1)]/20 px-3 py-1.5 text-sm whitespace-pre-wrap">{m.content}</div>
            ) : (
              <div className="max-w-full">
                {m.tools?.map(t => <ToolView key={t.id} t={t} />)}
                <div className="prose-sm max-w-none [&_a]:text-[var(--series-1)] [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:text-xs [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_table]:my-2 [&_table]:w-full [&_table]:text-xs [&_td]:border-t [&_td]:border-border [&_td]:px-1.5 [&_td]:py-0.5 [&_th]:px-1.5 [&_th]:text-left [&_th]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children }) =>
                        href?.startsWith("/") ? (
                          <Link href={href}>{children}</Link>
                        ) : (
                          <a href={href} target="_blank" rel="noreferrer">
                            {children}
                          </a>
                        ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
                {busy && i === msgs.length - 1 && !m.content && !m.tools?.length && <span className="animate-pulse text-muted-foreground">thinking…</span>}
                {m.error && <div className="mt-1 rounded border border-destructive/40 bg-destructive/10 px-2 py-1 text-xs text-destructive">{m.error}</div>}
              </div>
            )}
          </div>
        ))}
        <div ref={bottom} />
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-end gap-2 border-t border-border p-2"
      >
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(input);
            }
          }}
          rows={2}
          placeholder="Ask a question… (Enter to send, Shift+Enter for a new line)"
          className="min-h-0 flex-1 resize-none rounded border border-border bg-background px-2 py-1.5 text-sm"
        />
        {busy ? (
          <button type="button" onClick={() => abort.current?.abort()} className="rounded border border-border p-2 hover:bg-muted" title="Stop">
            <Square className="size-4" />
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()} className="rounded bg-[var(--series-1)] p-2 text-white disabled:opacity-40" title="Send">
            <Send className="size-4" />
          </button>
        )}
      </form>
    </aside>
  );
}
