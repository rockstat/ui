import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { getEventNames } from "@/server/queries/events";

export const GET = handler<{ project: string }>(async (req, params) =>
  getEventNames(projectIdFrom(params), parseAnalyticsParams(req), req.nextUrl.searchParams.get("search") ?? undefined, parseInt(req, "limit", 200, 1000))
);
