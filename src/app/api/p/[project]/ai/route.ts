import OpenAI from "openai";
import { NextRequest } from "next/server";
import { BadRequest, parseAnalyticsParams, projectIdFrom } from "@/server/params";
import { getProject } from "@/server/projects";
import { SYSTEM_STABLE } from "@/server/ai/prompt";
import { execute, tools } from "@/server/ai/tools";

export const maxDuration = 300;

// DeepSeek speaks the OpenAI Chat Completions protocol; any compatible endpoint works via AI_BASE_URL.
const MODEL = process.env.AI_MODEL || "deepseek-chat";
const BASE_URL = process.env.AI_BASE_URL || "https://api.deepseek.com";
const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.AI_API_KEY;
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
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "DEEPSEEK_API_KEY is not configured on the server" }), { status: 503, headers: { "content-type": "application/json" } });
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

  const client = new OpenAI({ apiKey: API_KEY, baseURL: BASE_URL });
  // The stable system prompt goes first so the provider's prefix cache can reuse it; the context varies per request.
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_STABLE },
    { role: "system", content: context },
    ...history.map(m => ({ role: m.role, content: m.content })),
  ];
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (ev: Record<string, unknown>) => controller.enqueue(encoder.encode(JSON.stringify(ev) + "\n"));
      try {
        for (let turn = 0; turn < MAX_TURNS; turn++) {
          const s = client.chat.completions.stream({ model: MODEL, messages, tools, tool_choice: "auto", stream: true, max_tokens: 8000 });
          s.on("content", delta => send({ type: "text", text: delta }));
          const completion = await s.finalChatCompletion();
          const choice = completion.choices[0];
          const msg = choice.message;
          const calls = (msg.tool_calls ?? []).filter((c): c is OpenAI.Chat.Completions.ChatCompletionMessageFunctionToolCall => c.type === "function");

          if (choice.finish_reason === "length") {
            send({ type: "error", message: "answer was cut off, please ask a narrower question" });
            break;
          }
          if (!calls.length) {
            send({ type: "done", usage: completion.usage });
            break;
          }
          messages.push({ role: "assistant", content: msg.content ?? "", tool_calls: calls });
          for (const call of calls) {
            let args: unknown = {};
            try {
              args = call.function.arguments ? JSON.parse(call.function.arguments) : {};
            } catch {
              messages.push({ role: "tool", tool_call_id: call.id, content: "error: arguments were not valid JSON" });
              send({ type: "tool_result", id: call.id, name: call.function.name, isError: true, text: "arguments were not valid JSON" });
              continue;
            }
            send({ type: "tool_start", id: call.id, name: call.function.name, input: args });
            const r = await execute(call.function.name, args, { projectId, params });
            send({ type: "tool_result", id: call.id, name: call.function.name, ui: r.ui, isError: !!r.isError, text: r.isError ? r.result : undefined });
            messages.push({ role: "tool", tool_call_id: call.id, content: r.result });
          }
        }
      } catch (e) {
        const message =
          e instanceof OpenAI.AuthenticationError
            ? "DeepSeek API key is invalid"
            : e instanceof OpenAI.RateLimitError
              ? "DeepSeek rate limit reached, try again in a minute"
              : e instanceof OpenAI.APIError
                ? `DeepSeek API error ${e.status}: ${e.message}`
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
