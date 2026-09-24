import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseBucket, projectIdFrom } from "@/server/params";
import { getEventsBucketed } from "@/server/queries/events";

export const GET = handler<{ project: string }>(async (req, params) => {
  const names = (req.nextUrl.searchParams.get("names") ?? "").split(",").filter(Boolean);
  return getEventsBucketed(projectIdFrom(params), parseAnalyticsParams(req), parseBucket(req), names);
});
