#!/usr/bin/env node
/**
 * Exports an anonymised data sample for local development and demos.
 *
 * Picks a fraction of device ids (uid) and exports ALL their rows for the last N days, so sessions,
 * funnels and journeys stay consistent. Then rewrites everything that could identify the site or the
 * person: hosts become fictional domains (consistently, so the same site maps to the same fake name),
 * brand words inside URLs, titles and event properties are replaced along with them, uid / user_id /
 * click ids are hashed, IPs are replaced with private-range addresses.
 *
 * Usage:
 *   node scripts/export-sample.mjs [--days 3] [--rate 0.001] [--project 1] [--out samples]
 * Reads CLICKHOUSE_URL / CLICKHOUSE_USER / CLICKHOUSE_PASSWORD / CLICKHOUSE_DB / CLICKHOUSE_RAW_DB from .env.local.
 *
 * Output (gzip JSONEachRow):
 *   samples/events.jsonl.gz    stats_ui.events rows
 *   samples/sessions.jsonl.gz  stats_ui.sessions, merged into plain rows (one per session)
 *   samples/vitals.jsonl.gz    stats.vitals rows, only the columns the UI reads
 */
import { createHash } from "node:crypto";
import { createWriteStream, readFileSync, mkdirSync } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import readline from "node:readline";

// ---------- config ----------
const args = Object.fromEntries(
  process.argv.slice(2).map((a, i, arr) => (a.startsWith("--") ? [a.slice(2), arr[i + 1] ?? "1"] : [])).filter(x => x.length)
);
const DAYS = Number(args.days ?? 3);
const RATE = Number(args.rate ?? 0.001);
const PROJECT = args.project ? Number(args.project) : null;
const OUT = args.out ?? "samples";
const MOD = 1_000_000;
const KEEP_BELOW = Math.max(1, Math.round(RATE * MOD));

function loadEnv() {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && env[m[1]] === undefined) env[m[1]] = m[2];
    }
  } catch {
    /* no .env.local */
  }
  return env;
}
const env = loadEnv();
const CH = {
  url: (env.CLICKHOUSE_URL ?? "http://localhost:8123").replace(/\/$/, ""),
  user: env.CLICKHOUSE_USER ?? "default",
  password: env.CLICKHOUSE_PASSWORD ?? "",
  db: env.CLICKHOUSE_DB ?? "stats_ui",
  rawDb: env.CLICKHOUSE_RAW_DB ?? "stats",
};
const SALT = createHash("sha256").update(`sample-${Date.now()}`).digest("hex");

// ---------- anonymisation ----------
const ADJ = ["amber", "brisk", "cobalt", "dusty", "ember", "fable", "gilded", "hollow", "ivory", "jade", "kelp", "lunar", "misty", "nova", "opal", "pearl", "quiet", "rusty", "sable", "tidal", "umber", "velvet", "wild", "zesty"];
const NOUN = ["arena", "bay", "cove", "delta", "field", "grove", "harbor", "island", "junction", "keep", "lagoon", "meadow", "nest", "orchard", "plaza", "quarry", "ridge", "summit", "tower", "valley", "wharf", "yard"];
const TLDS = [".example", ".test", ".invalid"];

const h = s => createHash("sha256").update(SALT + s).digest();
const pick = (arr, buf, i) => arr[buf[i] % arr.length];

/** Registrable part of a host: the label before the public suffix (good enough for our data). */
function brandOf(host) {
  const parts = host.toLowerCase().split(".").filter(Boolean);
  if (parts.length < 2) return parts[0] ?? "";
  const two = new Set(["co", "com", "net", "org", "gov", "edu", "ac"]);
  return parts.length >= 3 && two.has(parts[parts.length - 2]) ? parts[parts.length - 3] : parts[parts.length - 2];
}
const brandMap = new Map(); // real brand label -> fake brand label
function fakeBrand(brand) {
  if (!brand) return "";
  let f = brandMap.get(brand);
  if (!f) {
    const b = h("brand:" + brand);
    f = `${pick(ADJ, b, 0)}${pick(NOUN, b, 1)}`;
    brandMap.set(brand, f);
    noteBrand(brand);
  }
  return f;
}
/** Every word a site name is made of (hyphen parts, digits stripped) gets its own fake word. */
function noteBrand(label) {
  const words = new Set();
  for (const part of label.split(/[-_]/)) {
    if (part.length >= 4) words.add(part);
    const alpha = part.replace(/\d+$/, "");
    if (alpha.length >= 4) words.add(alpha);
  }
  for (const w of words) if (!brandMap.has(w)) brandMap.set(w, `${pick(ADJ, h("word:" + w), 3)}${pick(NOUN, h("word:" + w), 4)}`);
}
const GENERIC_SUB = new Set(["www", "m", "mobile", "app", "api", "static", "cdn", "trade", "checkout", "payment", "pay", "mail", "blog", "docs", "shop", "dev", "stage", "test", "admin", "help", "support", "news", "go", "my", "web", "img", "images", "media", "assets", "auth", "id", "sso"]);
const hostMap = new Map();
function fakeHost(host) {
  if (!host) return host;
  const key = host.toLowerCase();
  let f = hostMap.get(key);
  if (!f) {
    const parts = key.split(".");
    const brand = brandOf(key);
    const idx = parts.lastIndexOf(brand);
    const subs = idx > 0 ? parts.slice(0, idx) : [];
    for (const label of subs) if (!GENERIC_SUB.has(label)) noteBrand(label);
    const sub = subs.map(l => (GENERIC_SUB.has(l) ? l : pick(ADJ, h("sub:" + l), 2))).join(".");
    f = `${sub ? sub + "." : ""}${fakeBrand(brand)}${pick(TLDS, h("tld:" + brand), 0)}`;
    hostMap.set(key, f);
  }
  return f;
}
const HOST_RE = /\b((?:[a-z0-9-]+\.)+[a-z]{2,})\b/gi;
let brandRe = null;
function rebuildBrandRe() {
  const brands = [...brandMap.keys()].filter(b => b.length >= 4).sort((a, b) => b.length - a.length);
  brandRe = brands.length ? new RegExp(brands.map(b => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gi") : null;
}
/** Replace hosts and brand words inside free text (URLs, titles, event props). */
function scrubText(s) {
  if (typeof s !== "string" || !s) return s;
  let out = s.replace(HOST_RE, m => (/^\d+\.\d+\.\d+\.\d+$/.test(m) ? fakeIp(m) : fakeHost(m)));
  if (brandRe) out = out.replace(brandRe, m => fakeBrand(m.toLowerCase()));
  return out;
}
const fakeId = (prefix, v) => (v ? String(BigInt("0x" + h(prefix + v).subarray(0, 8).toString("hex")) % 9_000_000_000n + 1_000_000_000n) : v);
const fakeUid = v => (v && v !== "0" ? String(BigInt("0x" + h("uid:" + v).subarray(0, 8).toString("hex")) | (1n << 62n)) : v);
function fakeIp(v) {
  if (!v) return v;
  const b = h("ip:" + v);
  return `10.${b[0]}.${b[1]}.${b[2]}`;
}

const HOST_FIELDS = ["host", "ref_host", "sess_refhost", "page_domain", "page_domain_wo_www"];
const SKIP = new Set(["date", "dateTime", "name", "uid", "user_id", "cid", "pid", "ip", "props", "data_extra.key", "data_extra.value"]);
function scrubRow(row) {
  for (const k of HOST_FIELDS) if (row[k]) row[k] = fakeHost(row[k]);
  for (const [k, v] of Object.entries(row)) if (typeof v === "string" && !SKIP.has(k) && !HOST_FIELDS.includes(k)) row[k] = scrubText(v);
  if (row.uid !== undefined) row.uid = fakeUid(String(row.uid));
  if (row.user_id) row.user_id = fakeId("user:", row.user_id);
  if (row.cid) row.cid = fakeId("cid:", row.cid);
  if (row.pid) row.pid = fakeId("pid:", row.pid);
  if (row.ip) row.ip = fakeIp(row.ip);
  if (row.props && typeof row.props === "object") {
    for (const [k, v] of Object.entries(row.props)) {
      if (/user_?id|email|phone|name$/i.test(k)) row.props[k] = fakeId("prop:", v);
      else row.props[k] = scrubText(v);
    }
  }
  // stats.vitals keeps arrays instead of a map
  if (Array.isArray(row["data_extra.value"])) row["data_extra.value"] = row["data_extra.value"].map(scrubText);
  return row;
}

// ---------- clickhouse ----------
async function stream(sql, onRow) {
  const params = new URLSearchParams({
    default_format: "JSONEachRow",
    output_format_json_quote_64bit_integers: "1",
    max_execution_time: "3600",
  });
  const res = await fetch(`${CH.url}/?${params}`, {
    method: "POST",
    body: sql,
    headers: { Authorization: "Basic " + Buffer.from(`${CH.user}:${CH.password}`).toString("base64") },
  });
  if (!res.ok) throw new Error(`ClickHouse ${res.status}: ${await res.text()}`);
  const rl = readline.createInterface({ input: Readable.fromWeb(res.body) });
  let n = 0;
  for await (const line of rl) {
    if (!line.trim()) continue;
    onRow(JSON.parse(line));
    n++;
  }
  return n;
}

async function exportTable(name, sql) {
  const path = `${OUT}/${name}.jsonl.gz`;
  const gz = createGzip({ level: 6 });
  const file = createWriteStream(path);
  const done = pipeline(gz, file);
  let n = 0;
  const started = Date.now();
  await stream(sql, row => {
    if (n === 0) rebuildBrandRe();
    const line = JSON.stringify(scrubRow(row)) + "\n";
    if (!gz.write(line)) return; // backpressure is fine to ignore for this size
    n++;
  });
  gz.end();
  await done;
  console.log(`${path}: ${n} rows in ${((Date.now() - started) / 1000).toFixed(0)}s`);
}

const project = PROJECT ? `AND projectId = ${PROJECT}` : "AND projectId > 0";
const sampled = `cityHash64(uid) % ${MOD} < ${KEEP_BELOW}`;
const range = `date >= today() - ${DAYS - 1}`;

mkdirSync(OUT, { recursive: true });
console.log(`sampling ${(RATE * 100).toFixed(3)}% of uids, last ${DAYS} days${PROJECT ? `, project ${PROJECT}` : ""}`);

// Hosts first, so the brand regexp is complete before any text is scrubbed.
await stream(`SELECT DISTINCT host FROM ${CH.db}.events WHERE ${range} ${project} AND ${sampled} AND host != ''`, r => fakeHost(r.host));
await stream(`SELECT DISTINCT ref_host AS host FROM ${CH.db}.events WHERE ${range} ${project} AND ${sampled} AND ref_host != ''`, r => fakeHost(r.host));
rebuildBrandRe();
console.log(`${hostMap.size} hosts mapped to ${brandMap.size} fictional brands`);

await exportTable(
  "events",
  `SELECT * EXCEPT (asn_org) FROM ${CH.db}.events WHERE ${range} ${project} AND ${sampled} ORDER BY projectId, date, dateTime`
);

await exportTable(
  "sessions",
  `SELECT projectId, date, uid, sess_start,
          min(start_ts) AS start_ts, max(end_ts) AS end_ts, sum(pageviews) AS pageviews, sum(events) AS events,
          argMinMerge(entry_path) AS entry_path, argMaxMerge(exit_path) AS exit_path, argMinMerge(entry_url) AS entry_url,
          argMinMerge(entry_title) AS entry_title, argMinMerge(entry_ref) AS entry_ref,
          any(host) AS host, max(sess_num) AS sess_num, any(sess_type) AS sess_type, any(sess_engine) AS sess_engine, any(sess_refhost) AS sess_refhost,
          any(utm_source) AS utm_source, any(utm_medium) AS utm_medium, any(utm_campaign) AS utm_campaign, any(utm_content) AS utm_content, any(utm_term) AS utm_term,
          any(pid) AS pid, any(cid) AS cid, max(user_id) AS user_id, max(is_auth) AS is_auth,
          any(locale) AS locale, any(currency) AS currency, any(language) AS language, any(tz) AS tz,
          any(country) AS country, any(region) AS region, any(city) AS city,
          any(browser) AS browser, any(browser_version) AS browser_version, any(os) AS os, any(os_version) AS os_version,
          any(device_type) AS device_type, any(device_vendor) AS device_vendor, any(device_model) AS device_model,
          any(screen_w) AS screen_w, any(screen_h) AS screen_h, max(is_bot) AS is_bot, max(is_webview) AS is_webview, max(threat_score) AS threat_score, any(ip) AS ip
   FROM (SELECT * FROM ${CH.db}.sessions WHERE ${range} ${project} AND ${sampled})
   GROUP BY projectId, date, uid, sess_start ORDER BY projectId, date, sess_start`
);

await exportTable(
  "vitals",
  `SELECT projectId, date, dateTime, timestamp, uid, sess_start, page_domain_wo_www, page_path, page_url, page_title,
          mmgeo_country_iso, mmgeo_region_en, mmgeo_city_en, uap_browser_name, uap_os_name, uap_device_type,
          sess_type, sess_marks_utm_source, sess_marks_utm_medium, sess_marks_utm_campaign, user_id, uapc_is_bot,
          \`data_extra.key\`, \`data_extra.value\`
   FROM ${CH.rawDb}.vitals WHERE ${range} ${project} AND ${sampled} ORDER BY projectId, date, dateTime`
);
console.log("done");
