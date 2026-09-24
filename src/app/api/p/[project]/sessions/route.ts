import { handler } from "@/server/handler";
import { parseAnalyticsParams, parseInt, projectIdFrom } from "@/server/params";
import { listSessions } from "@/server/queries/sessions";
import { sessionsWithReplay } from "@/server/replay/queries";

export const GET = handler<{ project: string }>(async (req, params) => {
  const projectId = projectIdFrom(params);
  const paged = await listSessions(projectId, parseAnalyticsParams(req), {
    page: parseInt(req, "page", 1, 10000),
    pageSize: parseInt(req, "pageSize", 50, 200),
    uid: req.nextUrl.searchParams.get("uid") ?? undefined,
    userId: req.nextUrl.searchParams.get("userId") ?? undefined,
  });
  const replays = await sessionsWithReplay(projectId, paged.rows.map(r => ({ uid: r.uid, sess_start: r.sess_start }))).catch(() => new Set<string>());
  return { ...paged, rows: paged.rows.map(r => ({ ...r, has_replay: replays.has(`${r.uid}:${r.sess_start}`) })) };
});
