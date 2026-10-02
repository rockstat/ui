/** Base path the app is served under (e.g. "/ui" behind a reverse proxy). Fixed at build time. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Absolute URL path inside the app, with the base path applied. */
export function withBase(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
