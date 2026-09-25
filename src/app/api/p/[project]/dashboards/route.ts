import { NextRequest, NextResponse } from "next/server";
import { handler } from "@/server/handler";
import { BadRequest, projectIdFrom } from "@/server/params";
import { deleteDashboard, listDashboards, saveDashboard, validateConfig } from "@/server/queries/dashboards";

export const GET = handler<{ project: string }>(async (_req, params) => listDashboards(projectIdFrom(params)));

export const POST = handler<{ project: string }>(async (req, params) => {
  const body = (await req.json().catch(() => ({}))) as { id?: string; name?: string; config?: unknown };
  if (!body.name) throw new BadRequest("name required");
  return saveDashboard(projectIdFrom(params), { id: body.id, name: body.name, config: validateConfig(body.config) });
});

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ project: string }> }) {
  const id = req.nextUrl.searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  await deleteDashboard(projectIdFrom(await ctx.params), id);
  return NextResponse.json({ ok: true });
}
