"use client";
import { Button } from "@/components/ui/button";
import { fmtNum } from "@/lib/format";

export function Pagination({ page, pages, total, onPage, label = "rows" }: { page: number; pages: number; total?: number; onPage: (p: number) => void; label?: string }) {
  return (
    <div className="flex items-center justify-between px-1 py-2 text-xs text-muted-foreground">
      <span>{total !== undefined && total >= 0 ? `${fmtNum(total)} ${label}` : ""}</span>
      <span className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-6 text-xs" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Prev
        </Button>
        {page}
        {pages > 0 ? ` / ${pages}` : ""}
        <Button variant="outline" size="sm" className="h-6 text-xs" disabled={pages > 0 && page >= pages} onClick={() => onPage(page + 1)}>
          Next
        </Button>
      </span>
    </div>
  );
}
