import "server-only";

/**
 * Rewrites url() / @import in CSS to go through the asset proxy.
 * Ported from rrweb-viewer/src/assets.ts (rewriteCssUrls + proxyRewriter) so the
 * browser-only library is not imported on the server.
 */
const CSS_URL_RE = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g;
const CSS_IMPORT_RE = /@import\s+(['"])([^'"]+)\1/g;

export const ASSET_PREFIX = "/api/asset?url=";

function proxied(url: string): string {
  if (url.startsWith(ASSET_PREFIX)) return url;
  return ASSET_PREFIX + encodeURIComponent(url.startsWith("//") ? `https:${url}` : url);
}

export function rewriteCssUrls(css: string, base: string): string {
  const resolve = (u: string): string | null => {
    if (/^(data|blob):/i.test(u) || u.startsWith("#")) return null;
    let abs = u;
    if (!/^https?:\/\//i.test(u) && !u.startsWith("//")) {
      try {
        abs = new URL(u, base).toString();
      } catch {
        return null;
      }
    }
    return proxied(abs);
  };
  return css
    .replace(CSS_IMPORT_RE, (m, q: string, u: string) => {
      const next = resolve(u);
      return next ? `@import ${q}${next}${q}` : m;
    })
    .replace(CSS_URL_RE, (m, q: string, u: string) => {
      const next = resolve(u);
      return next ? `url(${q}${next}${q})` : m;
    });
}
