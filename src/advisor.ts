import { completeSimple } from "@mariozechner/pi-ai";
import type { Model, Context, UserMessage, AssistantMessage } from "@mariozechner/pi-ai";
import { GEMINI_31_PRO_AI_STUDIO } from "./index.js";

export async function callAdvisor(
  question: string,
  signal: AbortSignal,
  context?: string,
): Promise<string> {
  const messages: (UserMessage | AssistantMessage)[] = [];

  if (context) {
    messages.push({ role: "user", content: `Context:\n${context}`, timestamp: Date.now() });
    messages.push({
      role: "assistant",
      content: [{ type: "text", text: "Understood. What is your question?" }],
      api: GEMINI_31_PRO_AI_STUDIO.api,
      provider: GEMINI_31_PRO_AI_STUDIO.provider,
      model: GEMINI_31_PRO_AI_STUDIO.id,
      usage: {
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        totalTokens: 0,
        cost: {
          total: 0,
          ...GEMINI_31_PRO_AI_STUDIO.cost
        }
      },
      stopReason: "stop",
      timestamp: Date.now(),
    });
  }

  messages.push({ role: "user", content: question, timestamp: Date.now() });

  const piContext: Context = { messages };

  const result = await completeSimple(GEMINI_31_PRO_AI_STUDIO, piContext, { apiKey: "-", maxTokens: 8192, signal });

  if (result.stopReason === "error" || result.stopReason === "aborted") {
    throw new Error(`Advisor call failed: ${result.errorMessage ?? "unknown error"}`);
  }

  const textBlock = result.content.find((c) => c.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Advisor returned an empty response");
  }

  return textBlock.text;
}
