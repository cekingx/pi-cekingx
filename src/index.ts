import { callAdvisor } from "./advisor.js";

const APERTURE_BASE = "http://cekingx-ai.longhair-sole.ts.net";

const KIMI_K26_FIREWORKS = {
  baseUrl: APERTURE_BASE + "/v1",
  apiKey: "-",
  api: "openai-completions",
  models: [
    {
      id: "accounts/fireworks/models/kimi-k2p6",
      name: "accounts/fireworks/models/kimi-k2p6",
      reasoning: false,
      input: ["text"],
      cost: { input: 0.95, output: 4, cacheRead: 0.16, cacheWrite: 0 },
      contextWindow: 262000,
      maxTokens: 8192,
      compat: {
        supportsDeveloperRole: false,
        maxTokensField: "max_tokens",
      },
    },
  ],
}

const GEMINI_31_PRO_AI_STUDIO = {
  baseUrl: APERTURE_BASE + "/v1",
  apiKey: "-",
  api: "openai-completions",
  models: [
    {
      id: "google/gemini-3.1-pro-preview",
      name: "google/gemini-3.1-pro-preview",
      reasoning: false,
      input: ["text"],
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
      contextWindow: 1000000,
      maxTokens: 8192,
      compat: {
        supportsDeveloperRole: false,
        maxTokensField: "max_tokens",
      },
    },
  ],
}

export default function (pi: any) {
  pi.registerProvider("executor", KIMI_K26_FIREWORKS);

  pi.registerProvider("advisor", GEMINI_31_PRO_AI_STUDIO);

  pi.registerTool({
    name: "ask_advisor",
    description:
      `Consult advisor for high-level reasoning, planning, or decisions ` +
      `that require deeper intelligence. Use this when you are unsure about an approach, ` +
      `need a second opinion, or the task involves significant complexity or risk.`,
    parameters: {
      type: "object",
      properties: {
        question: {
          type: "string",
          description: "The question or problem to send to the advisor.",
        },
        context: {
          type: "string",
          description: "Relevant background context the advisor needs to answer well.",
        },
      },
      required: ["question"],
    },
    execute: async (_toolCallId: string, params: { question: string; context?: string }, signal: AbortSignal) => {
      const text = await callAdvisor(APERTURE_BASE, params.question, signal, params.context);
      return { content: [{ type: "text", text }] };
    },
  });
}
