import { handler } from "@/server/handler";
import { BadRequest, parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { getVitalsBreakdown } from "@/server/queries/vitals";
import { VITAL_NAMES, type VitalName } from "@/lib/types";

export const GET = handler<{ project: string }>(async (req, params) => {
  const name = req.nextUrl.searchParams.get("name") as VitalName;
  const dimension = req.nextUrl.searchParams.get("dimension") ?? "pathname";
  if (!VITAL_NAMES.includes(name)) throw new BadRequest("invalid vital name");
  return getVitalsBreakdown(projectIdFrom(params), parseAnalyticsParams(req), name, dimension, parseInt(req, "limit", 50, 500));
});
