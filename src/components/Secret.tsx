"use client";
import type { ReactNode } from "react";
import { useSecret, kindOf } from "@/lib/secret";
import { cn } from "@/lib/utils";

/**
 * Blurs its children while secret mode is on. Wrap identifying text (hosts, paths, URLs, ids, IPs,
 * titles); leave numbers, dates, geo, devices and session types unwrapped so the picture stays readable.
 */
export function S({ children, className, on = true }: { children: ReactNode; className?: string; on?: boolean }) {
  const secret = useSecret();
  if (!secret || !on || children === null || children === undefined || children === "") return <>{children}</>;
  return <span className={cn("secret-blur", className)}>{children}</span>;
}

/** Counts of users, sessions and events: blurred in secret mode, shares and rates stay visible. */
export function N({ children, className }: { children: ReactNode; className?: string }) {
  return <S className={className}>{children}</S>;
}

/** Blur only when the dimension / field is an identifying one. */
export function SV({ parameter, children, className }: { parameter: string; children: ReactNode; className?: string }) {
  return (
    <S on={kindOf(parameter) !== "none"} className={className}>
      {children}
    </S>
  );
}
