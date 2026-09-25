import "server-only";
import { createClient, type ClickHouseClient } from "@clickhouse/client";
import { env } from "./env";

let client: ClickHouseClient | null = null;

export function ch(): ClickHouseClient {
  if (!client) {
    client = createClient({
      url: env.clickhouseUrl,
      username: env.clickhouseUser,
      password: env.clickhousePassword,
      request_timeout: 60_000,
      clickhouse_settings: {
        max_execution_time: 60,
        max_result_rows: "100000",
        result_overflow_mode: "break",
        prefer_column_name_to_alias: 1,
      },
    });
  }
  return client;
}

export const T = {
  events: `${env.db}.events`,
  sessions: `${env.db}.sessions`,
  rawEvents: `${env.rawDb}.events`,
  vitals: `${env.rawDb}.vitals`,
  rrweb: `${env.rawDb}.rrweb`,
  funnels: `${env.db}.funnels`,
  dashboards: `${env.db}.dashboards`,
};

export type Params = Record<string, string | number | boolean | string[] | number[]>;

export async function query<T = Record<string, unknown>>(sql: string, params: Params = {}): Promise<T[]> {
  const started = Date.now();
  try {
    const rs = await ch().query({ query: sql, query_params: params, format: "JSONEachRow" });
    const rows = await rs.json<T>();
    if (process.env.NODE_ENV !== "production" && Date.now() - started > 2000) {
      console.warn(`[ch] slow query ${Date.now() - started}ms\n${sql.slice(0, 400)}`);
    }
    return rows;
  } catch (e) {
    console.error(`[ch] query failed\n${sql}\nparams=${JSON.stringify(params)}`);
    throw e;
  }
}

export async function queryOne<T = Record<string, unknown>>(sql: string, params: Params = {}): Promise<T | undefined> {
  const rows = await query<T>(sql, params);
  return rows[0];
}
