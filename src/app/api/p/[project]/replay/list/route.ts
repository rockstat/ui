import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { listRecordings } from "@/server/replay/queries";

export const GET = handler<{ project: string }>(async (req, params) =>
  listRecordings(projectIdFrom(params), parseAnalyticsParams(req), {
    page: parseInt(req, "page", 1, 10000),
    pageSize: parseInt(req, "pageSize", 50, 200),
    search: req.nextUrl.searchParams.get("search") ?? undefined,
    uid: req.nextUrl.searchParams.get("uid") ?? undefined,
    minDuration: parseInt(req, "minDuration", 0, 3_600_000),
    playableOnly: req.nextUrl.searchParams.get("playable") === "1",
  })
);
