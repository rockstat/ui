import "server-only";
import type { AnalyticsParams, Bucket, BucketedRow, OverviewMetrics } from "@/lib/types";
import { query, queryOne, T } from "../clickhouse";
import { bucketExpr, buildEventsWhere, buildSessionsWhere } from "../sql";

const SESSION_AGG = `
  count()                                              AS sessions,
  uniq(uid)                                            AS users,
  uniqIf(user_id, user_id != '')                       AS auth_users,
  round(100 * countIf(pageviews <= 1) / greatest(count(), 1), 1) AS bounce_rate,
  round(avg((end_ts - start_ts) / 1000), 1)            AS session_duration,
  round(sum(pageviews) / greatest(count(), 1), 2)      AS pages_per_session`;

export async function getOverview(projectId: number, p: AnalyticsParams): Promise<OverviewMetrics> {
  const ev = buildEventsWhere(projectId, p, T.events, T.sessions);
  const se = buildSessionsWhere(projectId, p, T.events, T.sessions);

  const [e, s] = await Promise.all([
    queryOne<{ pageviews: string; events: string }>(
      `SELECT countIf(is_page = 1) AS pageviews, count() AS events FROM ${T.events} WHERE ${ev.where}`,
      ev.params
    ),
    queryOne<Record<string, string>>(
      se.having
        ? `SELECT ${SESSION_AGG} FROM (
             SELECT uid, sess_start, max(user_id) user_id, sum(pageviews) pageviews, min(start_ts) start_ts, max(end_ts) end_ts,
                    argMinMerge(entry_path) entry_path_v, argMaxMerge(exit_path) exit_path_v
             FROM ${T.sessions} WHERE ${se.where} GROUP BY uid, sess_start
             HAVING ${se.having.replace(/argMinMerge\(entry_path\)/g, "entry_path_v").replace(/argMaxMerge\(exit_path\)/g, "exit_path_v")})`
        : `SELECT ${SESSION_AGG} FROM (
             SELECT uid, sess_start, max(user_id) user_id, sum(pageviews) pageviews, min(start_ts) start_ts, max(end_ts) end_ts
             FROM ${T.sessions} WHERE ${se.where} GROUP BY uid, sess_start)`,
      se.params
    ),
  ]);

  return {
    pageviews: Number(e?.pageviews ?? 0),
    events: Number(e?.events ?? 0),
    sessions: Number(s?.sessions ?? 0),
    users: Number(s?.users ?? 0),
    auth_users: Number(s?.auth_users ?? 0),
    bounce_rate: Number(s?.bounce_rate ?? 0),
    session_duration: Number(s?.session_duration ?? 0),
    pages_per_session: Number(s?.pages_per_session ?? 0),
  };
}

export async function getOverviewBucketed(projectId: number, p: AnalyticsParams, bucket: Bucket): Promise<BucketedRow[]> {
  const ev = buildEventsWhere(projectId, p, T.events, T.sessions);
  const se = buildSessionsWhere(projectId, p, T.events, T.sessions);
  ev.params.tz = p.tz;
  se.params.tz = p.tz;

  const evBucket = bucketExpr("dateTime", bucket);
  const seBucket = bucketExpr("toDateTime(intDiv(sess_start, 1000))", bucket);

  const [events, sessions] = await Promise.all([
    query<{ time: string; pageviews: string; events: string; users: string }>(
      `SELECT ${evBucket} AS time, countIf(is_page = 1) AS pageviews, count() AS events, uniq(uid) AS users
       FROM ${T.events} WHERE ${ev.where} GROUP BY time ORDER BY time`,
      ev.params
    ),
    query<Record<string, string>>(
      `SELECT time, ${SESSION_AGG} FROM (
         SELECT ${seBucket} AS time, uid, sess_start, max(user_id) user_id, sum(pageviews) pageviews, min(start_ts) start_ts, max(end_ts) end_ts
                ${se.having ? ", argMinMerge(entry_path) entry_path_v, argMaxMerge(exit_path) exit_path_v" : ""}
         FROM ${T.sessions} WHERE ${se.where} GROUP BY time, uid, sess_start
         ${se.having ? "HAVING " + se.having.replace(/argMinMerge\(entry_path\)/g, "entry_path_v").replace(/argMaxMerge\(exit_path\)/g, "exit_path_v") : ""})
       GROUP BY time ORDER BY time`,
      se.params
    ),
  ]);

  const byTime = new Map<string, BucketedRow>();
  const blank = (time: string): BucketedRow => ({
    time,
    pageviews: 0,
    events: 0,
    sessions: 0,
    users: 0,
    bounce_rate: 0,
    session_duration: 0,
    pages_per_session: 0,
  });
  for (const r of events) {
    const row = byTime.get(r.time) ?? blank(r.time);
    row.pageviews = Number(r.pageviews);
    row.events = Number(r.events);
    row.users = Number(r.users);
    byTime.set(r.time, row);
  }
  for (const r of sessions) {
    const row = byTime.get(r.time) ?? blank(r.time);
    row.sessions = Number(r.sessions);
    row.bounce_rate = Number(r.bounce_rate);
    row.session_duration = Number(r.session_duration);
    row.pages_per_session = Number(r.pages_per_session);
    byTime.set(r.time, row);
  }
  return [...byTime.values()].sort((a, b) => (a.time < b.time ? -1 : 1));
}
