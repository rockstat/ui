import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { BadRequest, parseAnalyticsParams, projectIdFrom } from "@/server/params";
import { getProject } from "@/server/projects";
import { SYSTEM_STABLE } from "@/server/ai/prompt";
import { execute, tools } from "@/server/ai/tools";

export const maxDuration = 300;

const MODEL = process.env.AI_MODEL || "claude-opus-5";
const MAX_TURNS = 12;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/**
 * Streams the assistant's answer as newline-delimited JSON events:
 * {type:"text",text}, {type:"tool_start",id,name,input}, {type:"tool_result",id,ui,isError}, {type:"done",usage} or {type:"error",message}.
 * The client keeps only the text turns; tool calls are re-run when needed.
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ project: string }> }) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured on the server" }), { status: 503, headers: { "content-type": "application/json" } });
  }
  let projectId: number;
  let params: ReturnType<typeof parseAnalyticsParams>;
  let history: ChatTurn[];
  try {
    projectId = projectIdFrom(await ctx.params);
    params = parseAnalyticsParams(req);
    const body = (await req.json()) as { messages?: ChatTurn[] };
    history = (body.messages ?? []).filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string").slice(-20);
    if (!history.length || history[history.length - 1].role !== "user") throw new BadRequest("last message must be from the user");
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "bad request" }), { status: 400, headers: { "content-type": "application/json" } });
  }

  const project = await getProject(projectId);
  const fromIso = new Date(params.from).toISOString().replace("T", " ").slice(0, 19);
  const toIso = new Date(params.to).toISOString().replace("T", " ").slice(0, 19);
  const context = `Context for this conversation:
- project: ${project?.name ?? projectId} (projectId = ${projectId}${project?.domains?.length ? `, hosts e.g. ${project.domains.slice(0, 3).join(", ")}` : ""})
- selected range (UTC): ${fromIso} to ${toIso}; SQL: projectId = ${projectId} AND date >= toDate('${fromIso.slice(0, 10)}') AND date <= toDate('${toIso.slice(0, 10)}') AND dateTime >= toDateTime('${fromIso}') AND dateTime < toDateTime('${toIso}') (for stats_ui.sessions use sess_start >= ${params.from} AND sess_start < ${params.to} together with the date bounds)
- user's timezone: ${params.tz}
- global filters: ${params.filters.length ? JSON.stringify(params.filters) : "none"}
- bots: ${params.excludeBots === false ? "included" : "excluded (is_bot = 0)"}
- today (UTC): ${new Date().toISOString().slice(0, 10)}`;

  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = history.map(m => ({ role: m.role, content: m.content }));
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (ev: Record<string, unknown>) => controller.enqueue(encoder.encode(JSON.stringify(ev) + "\n"));
      try {
        let jsonRetries = 0;
        for (let turn = 0; turn < MAX_TURNS; turn++) {
          const s = client.beta.messages.stream({
            model: MODEL,
            max_tokens: 16000,
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
            thinking: { type: "adaptive" },
            output_config: { effort: "medium" },
            system: [
              { type: "text", text: SYSTEM_STABLE, cache_control: { type: "ephemeral" } },
              { type: "text", text: context },
            ],
            tools,
            messages,
          });
          s.on("text", text => send({ type: "text", text }));
          let message: Anthropic.Beta.BetaMessage;
          try {
            message = await s.finalMessage();
            jsonRetries = 0;
          } catch (err) {
            if (err instanceof Anthropic.APIError || jsonRetries++ >= 2) throw err;
            continue;
          }
          if (message.stop_reason === "refusal") {
            send({ type: "text", text: "\n\n_The assistant declined to answer this request._" });
            break;
          }
          const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
          if (message.stop_reason === "max_tokens" && toolUses.length) {
            send({ type: "error", message: "answer was cut off, please ask a narrower question" });
            break;
          }
          if (message.stop_reason === "pause_turn") {
            messages.push({ role: "assistant", content: message.content });
            continue;
          }
          if (!toolUses.length) {
            send({ type: "done", usage: message.usage });
            break;
          }
          messages.push({ role: "assistant", content: message.content });
          const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
          for (const tu of toolUses) {
            send({ type: "tool_start", id: tu.id, name: tu.name, input: tu.input });
            const r = await execute(tu.name, tu.input, { projectId, params });
            send({ type: "tool_result", id: tu.id, name: tu.name, ui: r.ui, isError: !!r.isError, text: r.isError ? r.result : undefined });
            results.push({ type: "tool_result", tool_use_id: tu.id, content: r.result, is_error: r.isError });
          }
          messages.push({ role: "user", content: results });
        }
      } catch (e) {
        const message =
          e instanceof Anthropic.AuthenticationError
            ? "Anthropic API key is invalid"
            : e instanceof Anthropic.RateLimitError
              ? "Anthropic rate limit reached, try again in a minute"
              : e instanceof Anthropic.APIError
                ? `Anthropic API error ${e.status}: ${e.message}`
                : e instanceof Error
                  ? e.message
                  : String(e);
        console.error("[ai]", e);
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" } });
}
