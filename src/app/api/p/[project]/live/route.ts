import { handler } from "@/server/handler";
import { parseInt, projectIdFrom } from "@/server/params";
import { getLiveUsers } from "@/server/queries/live";

export const GET = handler<{ project: string }>(async (req, params) => ({ users: await getLiveUsers(projectIdFrom(params), parseInt(req, "minutes", 5, 60)) }));
