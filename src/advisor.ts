import { completeSimple } from "@mariozechner/pi-ai";
import type { Model, Context, UserMessage, AssistantMessage } from "@mariozechner/pi-ai";
import { MODEL_ADVISOR } from "./index.js";

export async function callAdvisor(
  apertureBase: string,
  question: string,
  context?: string,
  signal?: AbortSignal
): Promise<string> {
  const model: Model<"openai-completions"> = {
    id: MODEL_ADVISOR,
    name: "Gemini 3.1 Pro Preview (Aperture)",
    api: "openai-completions",
    provider: "gemini-aperture",
    baseUrl: apertureBase + "/v1",
    reasoning: false,
    input: ["text"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 1000000,
    maxTokens: 8192,
    compat: {
      supportsDeveloperRole: false,
      maxTokensField: "max_tokens",
    },
  };

  const messages: (UserMessage | AssistantMessage)[] = [];

  if (context) {
    messages.push({ role: "user", content: `Context:\n${context}`, timestamp: Date.now() });
    messages.push({
      role: "assistant",
      content: [{ type: "text", text: "Understood. What is your question?" }],
      api: "openai-completions",
      provider: "gemini-aperture",
      model: MODEL_ADVISOR,
      usage: {
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        totalTokens: 0,
        cost: {
          input: 0,
          output: 0,
          cacheRead: 0,
          cacheWrite: 0,
          total: 0
        }
      },
      stopReason: "stop",
      timestamp: Date.now(),
    });
  }

  messages.push({ role: "user", content: question, timestamp: Date.now() });

  const piContext: Context = { messages };

  const result = await completeSimple(model, piContext, { apiKey: "-", maxTokens: 8192, signal });

  if (result.stopReason === "error" || result.stopReason === "aborted") {
    throw new Error(`Advisor call failed: ${result.errorMessage ?? "unknown error"}`);
  }

  const textBlock = result.content.find((c) => c.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Advisor returned an empty response");
  }

  return textBlock.text;
}
