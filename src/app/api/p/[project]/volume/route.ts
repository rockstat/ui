import { handler } from "@/server/handler";
import { parseAnalyticsParams, projectIdFrom } from "@/server/params";
import { getVolume } from "@/server/queries/volume";

export const GET = handler<{ project: string }>(async (req, params) => getVolume(projectIdFrom(params), parseAnalyticsParams(req)));
