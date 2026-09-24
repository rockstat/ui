"use client";
import { useParams } from "next/navigation";

export function useProjectId(): number {
  const params = useParams<{ project?: string }>();
  return Number(params?.project ?? 0);
}
