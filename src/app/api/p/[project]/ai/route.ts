import OpenAI from "openai";
import { NextRequest } from "next/server";
import { BadRequest, parseAnalyticsParams, projectIdFrom } from "@/server/params";
import { getProject } from "@/server/projects";
import { SYSTEM_STABLE } from "@/server/ai/prompt";
import { execute, tools } from "@/server/ai/tools";

export const maxDuration = 300;

const MODEL = process.env.AI_MODEL || "gpt-5.5";
const MAX_TURNS = 12;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/**
 * Streams the assistant's answer as newline-delimited JSON events:
 * {type:"text",text}, {type:"tool_start",id,name,input}, {type:"tool_result",id,name,ui,isError,text}, {type:"done",usage} or {type:"error",message}.
 * The client keeps only the text turns; tool calls are re-run when needed.
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ project: string }> }) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "OPENAI_API_KEY is not configured on the server" }), { status: 503, headers: { "content-type": "application/json" } });
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

  const client = new OpenAI();
  // Conversation as Responses API input items; function calls/outputs are appended as the loop runs.
  const input: OpenAI.Responses.ResponseInput = [{ role: "developer", content: context }, ...history.map(m => ({ role: m.role, content: m.content }))];
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (ev: Record<string, unknown>) => controller.enqueue(encoder.encode(JSON.stringify(ev) + "\n"));
      try {
        for (let turn = 0; turn < MAX_TURNS; turn++) {
          const s = client.responses.stream({
            model: MODEL,
            instructions: SYSTEM_STABLE,
            input,
            tools,
            reasoning: { effort: "medium" },
            prompt_cache_key: `rockstat-ai-${projectId}`,
          });
          s.on("response.output_text.delta", ev => send({ type: "text", text: ev.delta }));
          const response: OpenAI.Responses.Response = await s.finalResponse();

          if (response.status === "incomplete") {
            send({ type: "error", message: `answer was cut off (${response.incomplete_details?.reason ?? "unknown"})` });
            break;
          }
          const calls = response.output.filter((o): o is OpenAI.Responses.ResponseFunctionToolCall => o.type === "function_call");
          const refusal = response.output.find(o => o.type === "message")?.content.find(c => c.type === "refusal");
          if (refusal) send({ type: "text", text: `\n\n_${refusal.refusal}_` });
          if (!calls.length) {
            send({ type: "done", usage: response.usage });
            break;
          }
          // Keep the model's own output items (reasoning, messages, calls) in the transcript, then add the outputs.
          // The SDK's stream helper decorates items with `parsed_arguments` / `parsed`, which the API rejects on input.
          input.push(
            ...response.output.map(o => {
              const { parsed_arguments: _pa, parsed: _p, ...rest } = o as unknown as Record<string, unknown>;
              void _pa;
              void _p;
              return rest as unknown as OpenAI.Responses.ResponseInputItem;
            })
          );
          for (const call of calls) {
            let args: unknown = {};
            try {
              args = call.arguments ? JSON.parse(call.arguments) : {};
            } catch {
              input.push({ type: "function_call_output", call_id: call.call_id, output: "error: arguments were not valid JSON" });
              send({ type: "tool_result", id: call.call_id, name: call.name, isError: true, text: "arguments were not valid JSON" });
              continue;
            }
            send({ type: "tool_start", id: call.call_id, name: call.name, input: args });
            const r = await execute(call.name, args, { projectId, params });
            send({ type: "tool_result", id: call.call_id, name: call.name, ui: r.ui, isError: !!r.isError, text: r.isError ? r.result : undefined });
            input.push({ type: "function_call_output", call_id: call.call_id, output: r.result });
          }
        }
      } catch (e) {
        const message =
          e instanceof OpenAI.AuthenticationError
            ? "OpenAI API key is invalid"
            : e instanceof OpenAI.RateLimitError
              ? "OpenAI rate limit reached, try again in a minute"
              : e instanceof OpenAI.APIError
                ? `OpenAI API error ${e.status}: ${e.message}`
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
