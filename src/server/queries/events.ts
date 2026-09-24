import "server-only";
import type { AnalyticsParams, Bucket, EventNameRow, EventRow, MetricRow, Paged } from "@/lib/types";
import { query, T } from "../clickhouse";
import { bucketExpr, buildEventsWhere } from "../sql";

export async function getEventNames(projectId: number, p: AnalyticsParams, search?: string, limit = 200): Promise<EventNameRow[]> {
  const built = buildEventsWhere(projectId, p, T.events, T.sessions);
  if (search) built.params.search = `%${search}%`;
  const rows = await query<{ name: string; count: string; users: string; sessions: string }>(
    `SELECT name, count() AS count, uniq(uid) AS users, uniq(uid, sess_start) AS sessions
     FROM ${T.events}
     WHERE ${built.where}${search ? " AND name ILIKE {search:String}" : ""}
     GROUP BY name
     ORDER BY count DESC
     LIMIT ${Math.min(limit, 1000)}`,
    built.params
  );
  return rows.map(r => ({ name: r.name, count: Number(r.count), users: Number(r.users), sessions: Number(r.sessions) }));
}

export async function getEventsBucketed(
  projectId: number,
  p: AnalyticsParams,
  bucket: Bucket,
  names: string[]
): Promise<{ time: string; name: string; count: number; users: number }[]> {
  const built = buildEventsWhere(projectId, p, T.events, T.sessions);
  built.params.tz = p.tz;
  built.params.names = names.slice(0, 20);
  const rows = await query<{ time: string; name: string; count: string; users: string }>(
    `SELECT ${bucketExpr("dateTime", bucket)} AS time, name, count() AS count, uniq(uid) AS users
     FROM ${T.events}
     WHERE ${built.where} AND name IN ({names:Array(String)})
     GROUP BY time, name
     ORDER BY time`,
    built.params
  );
  return rows.map(r => ({ ...r, count: Number(r.count), users: Number(r.users) }));
}

export async function getEventLog(
  projectId: number,
  p: AnalyticsParams,
  opts: { page: number; pageSize: number; names?: string[]; uid?: string; userId?: string }
): Promise<Paged<EventRow>> {
  const built = buildEventsWhere(projectId, p, T.events, T.sessions);
  let where = built.where;
  if (opts.names?.length) {
    built.params.names = opts.names.slice(0, 50);
    where += ` AND name IN ({names:Array(String)})`;
  }
  if (opts.uid) {
    built.params.uidF = opts.uid;
    where += ` AND uid = {uidF:UInt64}`;
  }
  if (opts.userId) {
    built.params.userIdF = opts.userId;
    where += ` AND user_id = {userIdF:String}`;
  }
  const pageSize = Math.min(Math.max(opts.pageSize, 1), 500);
  const offset = Math.max(opts.page - 1, 0) * pageSize;
  const rows = await query<Record<string, unknown>>(
    `SELECT ts, name, is_page, host, path, query, title, url, ref, toString(uid) AS uid_s, sess_start, user_id,
            country, city, browser, os, device_type, props
     FROM ${T.events}
     WHERE ${where}
     ORDER BY date DESC, dateTime DESC, ts DESC
     LIMIT ${pageSize} OFFSET ${offset}`,
    built.params
  );
  return {
    rows: rows.map(r => ({ ...r, uid: String(r.uid_s), ts: Number(r.ts), is_page: Number(r.is_page), sess_start: Number(r.sess_start) }) as EventRow),
    page: opts.page,
    pageSize,
    total: -1,
  };
}

/** Property keys for an event name with value counts (top values per key). */
export async function getEventProps(
  projectId: number,
  p: AnalyticsParams,
  name: string,
  key?: string,
  limit = 50
): Promise<{ keys: { key: string; count: number }[]; values: MetricRow[] }> {
  const built = buildEventsWhere(projectId, p, T.events, T.sessions);
  built.params.name = name;
  const keys = await query<{ key: string; count: string }>(
    `SELECT arrayJoin(mapKeys(props)) AS key, count() AS count
     FROM ${T.events} WHERE ${built.where} AND name = {name:String}
     GROUP BY key ORDER BY count DESC LIMIT 200`,
    built.params
  );
  let values: MetricRow[] = [];
  if (key) {
    built.params.key = key;
    const rows = await query<{ value: string; count: string; users: string; total: string }>(
      `WITH (SELECT count() FROM ${T.events} WHERE ${built.where} AND name = {name:String} AND mapContains(props, {key:String})) AS total
       SELECT props[{key:String}] AS value, count() AS count, uniq(uid) AS users, total
       FROM ${T.events} WHERE ${built.where} AND name = {name:String} AND mapContains(props, {key:String})
       GROUP BY value ORDER BY count DESC LIMIT ${Math.min(limit, 500)}`,
      built.params
    );
    const total = Number(rows[0]?.total ?? 0);
    values = rows.map(r => ({
      value: r.value,
      count: Number(r.count),
      users: Number(r.users),
      percentage: total ? Math.round((1000 * Number(r.count)) / total) / 10 : 0,
    }));
  }
  return { keys: keys.map(k => ({ key: k.key, count: Number(k.count) })), values };
}
