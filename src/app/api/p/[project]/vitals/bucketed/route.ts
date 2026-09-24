import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseBucket, projectIdFrom } from "@/server/params";
import { getVitalsBucketed } from "@/server/queries/vitals";

export const GET = handler<{ project: string }>(async (req, params) =>
  getVitalsBucketed(projectIdFrom(params), parseAnalyticsParams(req), parseBucket(req))
);
