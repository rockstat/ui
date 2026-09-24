"use client";
import * as Flags from "country-flag-icons/react/3x2";

const NAMES = typeof Intl !== "undefined" && "DisplayNames" in Intl ? new Intl.DisplayNames(["en"], { type: "region" }) : null;

export function countryName(iso: string): string {
  if (!iso) return "Unknown";
  try {
    return NAMES?.of(iso.toUpperCase()) ?? iso;
  } catch {
    return iso;
  }
}

export function CountryFlag({ iso, className = "h-3 w-4 rounded-[2px]" }: { iso: string; className?: string }) {
  const code = iso?.toUpperCase() as keyof typeof Flags;
  const Flag = code && (Flags as Record<string, React.ComponentType<{ className?: string }>>)[code];
  if (!Flag) return <span className={className + " inline-block bg-muted"} />;
  return <Flag className={className} />;
}
