import { NextRequest, NextResponse } from "next/server";
import { handler } from "@/server/handler";
import { BadRequest, projectIdFrom } from "@/server/params";
import { deleteFunnel, listFunnels, saveFunnel, validateDefinition } from "@/server/queries/funnels";

export const GET = handler<{ project: string }>(async (_req, params) => listFunnels(projectIdFrom(params)));

export const POST = handler<{ project: string }>(async (req, params) => {
  const body = (await req.json().catch(() => ({}))) as { id?: string; name?: string; definition?: unknown };
  if (!body.name) throw new BadRequest("name required");
  return saveFunnel(projectIdFrom(params), { id: body.id, name: body.name, definition: validateDefinition(body.definition) });
});

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ project: string }> }) {
  const id = req.nextUrl.searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  await deleteFunnel(projectIdFrom(await ctx.params), id);
  return NextResponse.json({ ok: true });
}
