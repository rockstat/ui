"use client";
import { useState } from "react";
import { useSessions } from "@/lib/api";
import { SessionCard } from "@/components/sessions/SessionCard";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function SessionsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useSessions({ page, pageSize: 50 });
  const pages = data ? Math.ceil(data.total / data.pageSize) : 0;
  return (
    <div className="space-y-2">
      <Pagination page={page} pages={pages} total={data?.total} onPage={setPage} label="sessions" />
      {isError && <div className="text-xs text-destructive">{(error as Error).message}</div>}
      <div className={isFetching ? "space-y-1.5 opacity-60" : "space-y-1.5"}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-9 w-full" />)
          : data?.rows.map(s => <SessionCard key={`${s.uid}-${s.sess_start}`} s={s} />)}
        {data && data.rows.length === 0 && <div className="py-10 text-center text-muted-foreground">No sessions in this range</div>}
      </div>
      <Pagination page={page} pages={pages} total={data?.total} onPage={setPage} label="sessions" />
    </div>
  );
}
