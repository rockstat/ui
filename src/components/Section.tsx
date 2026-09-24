"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SectionTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

/** Card with a row of small tabs; only the active tab mounts (so only it queries). */
export function Section({ tabs, className }: { tabs: SectionTab[]; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const tab = tabs.find(t => t.id === active) ?? tabs[0];
  return (
    <section className={cn("flex min-h-[380px] flex-col rounded-lg border border-border bg-card", className)}>
      <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn("rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground", t.id === tab.id && "bg-muted font-medium text-foreground")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 p-2">{tab.content}</div>
    </section>
  );
}
