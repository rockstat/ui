import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { getJourneys } from "@/server/queries/journeys";

export const GET = handler<{ project: string }>(async (req, params) => {
  const sp = req.nextUrl.searchParams;
  return getJourneys(projectIdFrom(params), parseAnalyticsParams(req), {
    mode: sp.get("mode") === "events" ? "events" : "pages",
    steps: parseInt(req, "steps", 4, 10),
    top: parseInt(req, "top", 8, 30),
    start: sp.get("start") || undefined,
    exclude: (sp.get("exclude") ?? "").split(",").filter(Boolean),
  });
});
