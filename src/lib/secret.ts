"use client";
import { useSyncExternalStore } from "react";

/**
 * Secret mode: hides hostnames, URL paths, IPs and site names in the UI by replacing them with
 * fictional but stable stand-ins (the same real value always maps to the same fake one within a
 * browser). Purely cosmetic and client-side: queries and filters keep working on real values.
 */

const KEY = "rs-secret";
const SEED_KEY = "rs-secret-seed";
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
export function setSecret(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
    if (on && !localStorage.getItem(SEED_KEY)) localStorage.setItem(SEED_KEY, Math.random().toString(36).slice(2));
  } catch {
    /* ignore */
  }
  listeners.forEach(l => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
export function useSecret(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}

// ---- deterministic fakes ----
const ADJ = ["amber", "brisk", "cobalt", "dusty", "ember", "fable", "gilded", "hollow", "ivory", "jade", "kelp", "lunar", "misty", "nova", "opal", "pearl", "quiet", "rusty", "sable", "tidal", "umber", "velvet", "wild", "zesty"];
const NOUN = ["arena", "bay", "cove", "delta", "field", "grove", "harbor", "island", "junction", "keep", "lagoon", "meadow", "nest", "orchard", "plaza", "quarry", "ridge", "summit", "tower", "valley", "wharf", "yard"];
const TLDS = [".example", ".test", ".invalid"];
const GENERIC_SUB = new Set(["www", "m", "mobile", "app", "api", "static", "cdn", "trade", "checkout", "payment", "pay", "mail", "blog", "docs", "shop", "dev", "stage", "test", "admin", "help", "support", "news", "go", "my", "web", "img", "images", "media", "assets", "auth", "id", "sso"]);

let seed = "";
function fnv(s: string): number {
  let h = 0x811c9dc5 ^ seed.length;
  const str = seed + s;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}
function ensureSeed() {
  if (seed) return;
  try {
    seed = localStorage.getItem(SEED_KEY) ?? "s";
  } catch {
    seed = "s";
  }
}
const pick = <T,>(arr: T[], h: number, shift = 0) => arr[(h >>> shift) % arr.length];

/** Registrable label of a host (the part before the public suffix; good enough for analytics hosts). */
function brandOf(host: string): string {
  const parts = host.split(".").filter(Boolean);
  if (parts.length < 2) return parts[0] ?? "";
  const two = new Set(["co", "com", "net", "org", "gov", "edu", "ac"]);
  return parts.length >= 3 && two.has(parts[parts.length - 2]) ? parts[parts.length - 3] : parts[parts.length - 2];
}

const brandWords = new Map<string, string>(); // real word -> fake word, collected from hosts seen so far
function noteBrand(label: string) {
  for (const part of label.split(/[-_]/)) {
    const variants = new Set([part, part.replace(/\d+$/, "")]);
    for (const w of variants) {
      if (w.length >= 4 && !brandWords.has(w)) {
        const h = fnv("b:" + w); // same key as fakeBrand, so the word and the host agree
        brandWords.set(w, pick(ADJ, h) + pick(NOUN, h, 8));
      }
    }
  }
}
export function fakeBrand(brand: string): string {
  if (!brand) return "";
  const h = fnv("b:" + brand.toLowerCase());
  noteBrand(brand.toLowerCase());
  return pick(ADJ, h) + pick(NOUN, h, 8);
}
export function maskHost(host: string): string {
  if (!host) return host;
  ensureSeed();
  const key = host.toLowerCase();
  if (/^\d+\.\d+\.\d+\.\d+$/.test(key)) return maskIp(key);
  const parts = key.split(".");
  const brand = brandOf(key);
  const idx = parts.lastIndexOf(brand);
  const subs = idx > 0 ? parts.slice(0, idx) : [];
  for (const l of subs) if (!GENERIC_SUB.has(l)) noteBrand(l);
  const sub = subs.map(l => (GENERIC_SUB.has(l) ? l : pick(ADJ, fnv("sub:" + l), 4))).join(".");
  return `${sub ? sub + "." : ""}${fakeBrand(brand)}${pick(TLDS, fnv("t:" + brand))}`;
}
export function maskIp(ip: string): string {
  if (!ip) return ip;
  ensureSeed();
  const h = fnv("ip:" + ip);
  return `10.${(h >>> 16) & 255}.${(h >>> 8) & 255}.${h & 255}`;
}
/** Keeps the path structure (depth, numeric ids look numeric) but replaces every segment. */
export function maskPath(path: string): string {
  if (!path || path === "/") return path;
  ensureSeed();
  const [p, q] = path.split("?");
  const out = p
    .split("/")
    .map(seg => {
      if (!seg) return seg;
      if (/^\d+$/.test(seg)) return String(fnv("n:" + seg) % 100000);
      const h = fnv("p:" + seg.toLowerCase());
      return h % 3 === 0 ? pick(NOUN, h) : `${pick(ADJ, h)}-${pick(NOUN, h, 8)}`;
    })
    .join("/");
  return q !== undefined ? `${out}?${maskQuery(q)}` : out;
}
function maskQuery(q: string): string {
  return q
    .split("&")
    .map(kv => {
      const [k, v] = kv.split("=");
      if (v === undefined) return k;
      return `${k}=${/^\d+$/.test(v) ? String(fnv("n:" + v) % 10_000_000) : maskText(v)}`;
    })
    .join("&");
}
export function maskUrl(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    return `${u.protocol}//${maskHost(u.hostname)}${maskPath(u.pathname + u.search)}`;
  } catch {
    return maskText(url);
  }
}

const HOST_RE = /\b((?:[a-z0-9-]+\.)+[a-z]{2,})\b/gi;
const IP_RE = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
const URL_RE = /https?:\/\/[^\s)"'<>]+/gi;
/** Free text: URLs, hostnames, IPs and site names collected from hosts seen so far. */
export function maskText(text: string): string {
  if (!text) return text;
  ensureSeed();
  let out = text.replace(URL_RE, m => maskUrl(m)).replace(IP_RE, m => maskIp(m)).replace(HOST_RE, m => maskHost(m));
  if (brandWords.size) {
    const words = [...brandWords.keys()].sort((a, b) => b.length - a.length);
    const re = new RegExp(words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gi");
    out = out.replace(re, m => brandWords.get(m.toLowerCase()) ?? m);
  }
  return out;
}

export type MaskKind = "host" | "path" | "url" | "ip" | "text" | "none";

/** Which masking a dimension / field needs. */
export function kindOf(parameter: string): MaskKind {
  switch (parameter) {
    case "hostname":
    case "referrer":
    case "sess_refhost":
    case "host":
    case "ref_host":
      return "host";
    case "pathname":
    case "entry_page":
    case "exit_page":
    case "page_title_path":
    case "path":
      return "path";
    case "page_title":
    case "title":
    case "utm_source":
    case "utm_campaign":
    case "utm_content":
    case "utm_term":
    case "querystring":
    case "query":
      return "text";
    case "ip":
      return "ip";
    case "url":
    case "ref":
      return "url";
    default:
      return "none";
  }
}

export interface Masker {
  on: boolean;
  host: (v: string) => string;
  path: (v: string) => string;
  url: (v: string) => string;
  ip: (v: string) => string;
  text: (v: string) => string;
  value: (parameter: string, v: string) => string;
}
const id = (v: string) => v;
const OFF: Masker = { on: false, host: id, path: id, url: id, ip: id, text: id, value: (_p, v) => v };
const ON: Masker = {
  on: true,
  host: maskHost,
  path: maskPath,
  url: maskUrl,
  ip: maskIp,
  text: maskText,
  value: (p, v) => {
    switch (kindOf(p)) {
      case "host":
        return maskHost(v);
      case "path":
        return maskPath(v);
      case "url":
        return maskUrl(v);
      case "ip":
        return maskIp(v);
      case "text":
        return maskText(v);
      default:
        return v;
    }
  },
};
export function useMask(): Masker {
  return useSecret() ? ON : OFF;
}
