import { NextRequest, NextResponse } from "next/server";
import { BadRequest, projectIdFrom } from "@/server/params";
import { fetchReplayRows } from "@/server/replay/queries";

/** Raw stats.rrweb rows for one uid as JSONEachRow text; parsed in the browser by rrweb-viewer. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ project: string }> }) {
  try {
    const uid = req.nextUrl.searchParams.get("uid") ?? "";
    if (!/^\d+$/.test(uid)) throw new BadRequest("uid required");
    const text = await fetchReplayRows(projectIdFrom(await ctx.params), uid);
    return new NextResponse(text, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "private, max-age=60" } });
  } catch (e) {
    if (e instanceof BadRequest) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error(e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "internal error" }, { status: 500 });
  }
}
