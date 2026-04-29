import { callAdvisor } from "./advisor.js";
import type { Model } from "@mariozechner/pi-ai";

const APERTURE_BASE = "http://cekingx-ai.longhair-sole.ts.net";

export const KIMI_K26_FIREWORKS: Model<'openai-completions'> = {
  id: "accounts/fireworks/models/kimi-k2p6",
  name: "accounts/fireworks/models/kimi-k2p6",
  provider: 'tailscale-aperture',
  baseUrl: APERTURE_BASE + "/v1",
  api: "openai-completions",
  reasoning: false,
  input: ["text"],
  cost: { input: 0.95, output: 4, cacheRead: 0.16, cacheWrite: 0 },
  contextWindow: 262000,
  maxTokens: 8192,
  compat: {
    supportsDeveloperRole: false,
    maxTokensField: "max_tokens",
  },
}

export const GEMINI_31_PRO_AI_STUDIO: Model<'google-generative-ai'> = {
  id: "gemini-3.1-pro-preview",
  name: "gemini-3.1-pro-preview",
  provider: 'tailscale-aperture',
  baseUrl: APERTURE_BASE,
  api: 'google-generative-ai',
  reasoning: false,
  input: ["text"],
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  contextWindow: 1000000,
  maxTokens: 8192,
}

export default function (pi: any) {
  pi.registerProvider("executor", {
    apiKey: "-",
    baseUrl: APERTURE_BASE + "/v1",
    models: [KIMI_K26_FIREWORKS]
  });

  pi.registerProvider("advisor", {
    apiKey: "-",
    baseUrl: APERTURE_BASE,
    api: 'google-generative-ai',
    models: [GEMINI_31_PRO_AI_STUDIO]
  });

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
      const text = await callAdvisor(params.question, signal, params.context);
      return { content: [{ type: "text", text }] };
    },
  });
}
