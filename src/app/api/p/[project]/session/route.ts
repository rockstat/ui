import { handler } from "@/server/handler";
import { BadRequest, projectIdFrom } from "@/server/params";
import { getSession, getSessionEvents } from "@/server/queries/sessions";
import { sessionsWithReplay } from "@/server/replay/queries";

export const GET = handler<{ project: string }>(async (req, params) => {
  const uid = req.nextUrl.searchParams.get("uid");
  const start = Number(req.nextUrl.searchParams.get("start"));
  if (!uid || !/^\d+$/.test(uid) || !Number.isFinite(start)) throw new BadRequest("uid and start required");
  const projectId = projectIdFrom(params);
  const [session, events, replays] = await Promise.all([
    getSession(projectId, uid, start),
    getSessionEvents(projectId, uid, start),
    sessionsWithReplay(projectId, [{ uid, sess_start: start }]),
  ]);
  return { session, events, hasReplay: replays.size > 0 };
});
