"use client";
import { useAnalyticsState } from "@/lib/state";
import { BUCKET_LABEL, bucketsFor } from "@/lib/time";
import type { Bucket } from "@/lib/types";

export function BucketPicker() {
  const s = useAnalyticsState();
  const options = bucketsFor(s.range);
  return (
    <select
      className="h-8 rounded-md border border-border bg-card px-2 text-xs text-foreground"
      value={s.bucketMode}
      onChange={e => s.setBucket(e.target.value as Bucket | "auto")}
    >
      <option value="auto">Auto ({BUCKET_LABEL[s.bucket]})</option>
      {options.map(b => (
        <option key={b} value={b}>
          {BUCKET_LABEL[b]}
        </option>
      ))}
    </select>
  );
}
