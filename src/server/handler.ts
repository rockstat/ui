import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { BadRequest } from "./params";

type Ctx<P> = { params: Promise<P> };

/** Wraps a route handler: resolves params, maps BadRequest to 400, logs the rest as 500. */
export function handler<P = Record<string, string>>(fn: (req: NextRequest, params: P) => Promise<unknown>) {
  return async (req: NextRequest, ctx: Ctx<P>) => {
    try {
      const data = await fn(req, await ctx.params);
      return NextResponse.json(data, { headers: { "Cache-Control": "private, max-age=15" } });
    } catch (e) {
      if (e instanceof BadRequest) return NextResponse.json({ error: e.message }, { status: 400 });
      console.error(e);
      const msg = e instanceof Error ? e.message : "internal error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  };
}
