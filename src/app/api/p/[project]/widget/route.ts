import { handler } from "@/server/handler";
import { BadRequest, parseAnalyticsParams, parseBucket, projectIdFrom } from "@/server/params";
import { validateConfig } from "@/server/queries/dashboards";
import { runWidget } from "@/server/queries/widget";

/** POST body: one widget config. Query string: the usual range/filters plus `bucket`. */
export const POST = handler<{ project: string }>(async (req, params) => {
  const p = parseAnalyticsParams(req);
  const len = p.to - p.from;
  const prev = { ...p, from: p.from - len, to: p.from };
  const body = await req.json().catch(() => null);
  const cfg = validateConfig({ widgets: [body] });
  if (!cfg.widgets[0]) throw new BadRequest("widget required");
  return runWidget(projectIdFrom(params), p, prev, cfg.widgets[0], parseBucket(req));
});
