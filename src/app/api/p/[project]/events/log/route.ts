import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { getEventLog } from "@/server/queries/events";

export const GET = handler<{ project: string }>(async (req, params) => {
  const names = (req.nextUrl.searchParams.get("names") ?? "").split(",").filter(Boolean);
  return getEventLog(projectIdFrom(params), parseAnalyticsParams(req), {
    page: parseInt(req, "page", 1, 10000),
    pageSize: parseInt(req, "pageSize", 100, 500),
    names,
    uid: req.nextUrl.searchParams.get("uid") ?? undefined,
    userId: req.nextUrl.searchParams.get("userId") ?? undefined,
  });
});
