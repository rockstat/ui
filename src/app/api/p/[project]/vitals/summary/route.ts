import { handler } from "@/server/handler";
import { parseAnalyticsParams, projectIdFrom } from "@/server/params";
import { getVitalsSummary } from "@/server/queries/vitals";

export const GET = handler<{ project: string }>(async (req, params) => getVitalsSummary(projectIdFrom(params), parseAnalyticsParams(req)));
