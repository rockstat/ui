import "server-only";
import { queryOne, T } from "../clickhouse";

export async function getLiveUsers(projectId: number, minutes = 5): Promise<number> {
  const r = await queryOne<{ users: string }>(
    `SELECT uniq(uid) AS users FROM ${T.events}
     WHERE projectId = {projectId:UInt32} AND date >= today() - 1 AND dateTime >= now() - INTERVAL {m:UInt32} MINUTE AND is_bot = 0`,
    { projectId, m: minutes }
  );
  return Number(r?.users ?? 0);
}
