import { NextRequest, NextResponse } from "next/server";
import { rewriteCssUrls } from "@/server/replay/css";

const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36";
const MAX_BYTES = 25 * 1024 * 1024;

function isPrivateHost(host: string): boolean {
  return (
    host === "localhost" ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
    /^0\./.test(host) ||
    host === "::1" ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  );
}

/**
 * Proxy for stylesheets/images/fonts of recorded pages: CDNs refuse hotlinks from the
 * player's origin but serve a plain server request. CSS gets its url()/@import rewritten
 * back through this proxy.
 */
export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url") ?? "";
  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return new NextResponse("bad url", { status: 400 });
  }
  if (!/^https?:$/.test(url.protocol) || isPrivateHost(url.hostname)) return new NextResponse("forbidden", { status: 403 });
  try {
    const upstream = await fetch(url, {
      headers: { "user-agent": BROWSER_UA, accept: "*/*", "accept-language": "en-US,en;q=0.9" },
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    });
    const type = upstream.headers.get("content-type") ?? "application/octet-stream";
    const len = Number(upstream.headers.get("content-length") ?? 0);
    if (len > MAX_BYTES) return new NextResponse("too large", { status: 413 });
    const headers: Record<string, string> = { "cache-control": "public, max-age=3600" };
    if (/text\/css/i.test(type) || /\.css(\?|#|$)/i.test(url.pathname)) {
      headers["content-type"] = "text/css; charset=utf-8";
      return new NextResponse(rewriteCssUrls(await upstream.text(), upstream.url || target), { status: upstream.status, headers });
    }
    if (/text\/html/i.test(type)) return new NextResponse("html not proxied", { status: 415 });
    headers["content-type"] = type;
    const buf = await upstream.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) return new NextResponse("too large", { status: 413 });
    return new NextResponse(buf, { status: upstream.status, headers });
  } catch (e) {
    return new NextResponse(e instanceof Error ? e.message : String(e), { status: 502 });
  }
}
