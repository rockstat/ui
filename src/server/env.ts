import "server-only";

function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

export const env = {
  clickhouseUrl: req("CLICKHOUSE_URL"),
  clickhouseUser: process.env.CLICKHOUSE_USER ?? "default",
  clickhousePassword: process.env.CLICKHOUSE_PASSWORD ?? "",
  db: process.env.CLICKHOUSE_DB ?? "stats_ui",
  rawDb: process.env.CLICKHOUSE_RAW_DB ?? "stats",
  uiPassword: process.env.UI_PASSWORD ?? "",
  uiSecret: req("UI_SECRET"),
  projectsJson: process.env.PROJECTS ?? "",
};
