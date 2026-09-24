import { handler } from "@/server/handler";
import { parseAnalyticsParams, projectIdFrom } from "@/server/params";
import { getOverview } from "@/server/queries/overview";

export const GET = handler<{ project: string }>(async (req, params) => getOverview(projectIdFrom(params), parseAnalyticsParams(req)));
