"use client";
import { parseAsBoolean, useQueryState } from "nuqs";
import { AiPanel } from "./AiPanel";

/** Mounts the assistant panel next to the content when ?ai=1 is in the URL. */
export function AiSlot() {
  const [open, setOpen] = useQueryState("ai", parseAsBoolean.withDefault(false));
  return <AiPanel open={open} onClose={() => setOpen(null)} />;
}

export function useAiToggle() {
  const [open, setOpen] = useQueryState("ai", parseAsBoolean.withDefault(false));
  return { open, toggle: () => setOpen(open ? null : true) };
}
