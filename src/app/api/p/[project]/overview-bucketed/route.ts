import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseBucket, projectIdFrom } from "@/server/params";
import { getOverviewBucketed } from "@/server/queries/overview";

export const GET = handler<{ project: string }>(async (req, params) =>
  getOverviewBucketed(projectIdFrom(params), parseAnalyticsParams(req), parseBucket(req))
);
