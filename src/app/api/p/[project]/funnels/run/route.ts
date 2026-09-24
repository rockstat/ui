import { handler } from "@/server/handler";
import { parseAnalyticsParams, projectIdFrom } from "@/server/params";
import { runFunnel, validateDefinition } from "@/server/queries/funnels";

/** POST body: funnel definition; time range and filters come from the query string like everywhere else. */
export const POST = handler<{ project: string }>(async (req, params) => {
  const body = await req.json().catch(() => ({}));
  return runFunnel(projectIdFrom(params), parseAnalyticsParams(req), validateDefinition(body));
});
