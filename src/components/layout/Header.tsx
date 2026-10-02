"use client";
import { DateRangePicker } from "@/components/DateRangePicker";
import { FilterBar } from "@/components/filters/FilterBar";
import { BucketPicker } from "@/components/BucketPicker";
import { useAnalyticsState } from "@/lib/state";
import { Bot, Sparkles, EyeOff } from "lucide-react";
import { setSecret, useSecret } from "@/lib/secret";
import { useAiToggle } from "@/components/ai/AiSlot";
import { cn } from "@/lib/utils";

export function Header() {
  const s = useAnalyticsState();
  const ai = useAiToggle();
  const secret = useSecret();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-2 px-4 py-3 md:px-6">
        <DateRangePicker />
        <BucketPicker />
        <button
          title={s.includeBots ? "Bots included" : "Bots excluded"}
          onClick={() => s.setIncludeBots(!s.includeBots)}
          className={cn(
            "flex h-8 items-center gap-1.5 rounded-md border border-border px-2 text-xs text-muted-foreground hover:bg-muted",
            s.includeBots && "border-[var(--status-warning)] text-foreground"
          )}
        >
          <Bot className="size-3.5" /> {s.includeBots ? "bots on" : "bots off"}
        </button>
        <button
          title={secret ? "Secret mode on: hosts, paths and IPs are replaced with fictional ones" : "Secret mode: hide hosts, paths and IPs"}
          onClick={() => setSecret(!secret)}
          className={cn(
            "flex h-8 items-center gap-1.5 rounded-md border border-border px-2 text-xs hover:bg-muted",
            secret ? "border-[var(--series-7)] text-foreground" : "text-muted-foreground"
          )}
        >
          <EyeOff className="size-3.5" /> {secret ? "secret on" : "secret"}
        </button>
        <div className="ml-auto" />
        <FilterBar />
        <button
          onClick={ai.toggle}
          className={cn("flex h-8 items-center gap-1.5 rounded-md border border-border px-2 text-xs hover:bg-muted", ai.open ? "border-[var(--series-1)] text-foreground" : "text-muted-foreground")}
          title="Ask the AI assistant about this data"
        >
          <Sparkles className="size-3.5" /> Ask AI
        </button>
      </div>
    </header>
  );
}
