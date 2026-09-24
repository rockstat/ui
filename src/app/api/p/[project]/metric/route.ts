import { handler } from "@/server/handler";
import { BadRequest, parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { getMetric } from "@/server/queries/metric";
import type { MetricParameter } from "@/lib/types";
import { FILTER_PARAMETERS } from "@/lib/types";

const EXTRA = ["page_title_path", "sess_refhost", "event_name"];

export const GET = handler<{ project: string }>(async (req, params) => {
  const parameter = req.nextUrl.searchParams.get("parameter") ?? "";
  if (!(FILTER_PARAMETERS as readonly string[]).includes(parameter) && !EXTRA.includes(parameter)) {
    throw new BadRequest(`unknown parameter ${parameter}`);
  }
  return getMetric(projectIdFrom(params), parseAnalyticsParams(req), parameter as MetricParameter, {
    limit: parseInt(req, "limit", 10, 500),
    page: parseInt(req, "page", 1, 10000),
    search: req.nextUrl.searchParams.get("search") ?? undefined,
  });
});
