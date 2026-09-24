import { handler } from "@/server/handler";
import { BadRequest, projectIdFrom } from "@/server/params";
import { getUserProfile } from "@/server/queries/users";

export const GET = handler<{ project: string }>(async (req, params) => {
  const uid = req.nextUrl.searchParams.get("uid") ?? undefined;
  const userId = req.nextUrl.searchParams.get("userId") ?? undefined;
  if (!uid && !userId) throw new BadRequest("uid or userId required");
  if (uid && !/^\d+$/.test(uid)) throw new BadRequest("invalid uid");
  return getUserProfile(projectIdFrom(params), { uid, userId });
});
