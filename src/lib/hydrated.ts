"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false during server rendering and hydration, true once the component runs on the client. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
