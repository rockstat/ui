import { handler } from "@/server/handler";
import { BadRequest, parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { getEventProps } from "@/server/queries/events";

export const GET = handler<{ project: string }>(async (req, params) => {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) throw new BadRequest("name required");
  return getEventProps(projectIdFrom(params), parseAnalyticsParams(req), name, req.nextUrl.searchParams.get("key") ?? undefined, parseInt(req, "limit", 50, 500));
});
