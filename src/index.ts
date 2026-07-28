import { callAdvisor } from "./advisor.js";
import type { Model } from "@earendil-works/pi-ai";

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

export const KIMI_K27_FIREWORKS: Model<'openai-completions'> = {
  id: "accounts/fireworks/models/kimi-k2p7-code",
  name: "accounts/fireworks/models/kimi-k2p7-code",
  provider: 'tailscale-aperture',
  baseUrl: APERTURE_BASE,
  api: "openai-completions",
  reasoning: true,
  input: ["text"],
  cost: { input: 0.95, output: 4, cacheRead: 0.19, cacheWrite: 0 },
  contextWindow: 262000,
  maxTokens: 8192,
  compat: {
    supportsDeveloperRole: false,
    maxTokensField: "max_tokens",
  },
}

export const KIMI_K3_FIREWORKS: Model<'openai-completions'> = {
  id: "accounts/fireworks/models/kimi-k3",
  name: "accounts/fireworks/models/kimi-k3",
  provider: 'tailscale-aperture',
  baseUrl: APERTURE_BASE + "/v1",
  api: "openai-completions",
  reasoning: true,
  input: ["text"],
  cost: { input: 3.00, output: 15, cacheRead: 0.30, cacheWrite: 0 },
  contextWindow: 1_000_000,
  maxTokens: 8192,
  compat: {
    supportsDeveloperRole: false,
    maxTokensField: "max_tokens",
  },
}

export const GLM_52_FIREWORKS: Model<'openai-completions'> = {
  id: "accounts/fireworks/models/glm-5p2",
  name: "accounts/fireworks/models/glm-5p2",
  provider: 'tailscale-aperture',
  baseUrl: APERTURE_BASE,
  api: "openai-completions",
  reasoning: true,
  input: ["text"],
  cost: { input: 1.40, output: 4.40, cacheRead: 0.14, cacheWrite: 0 },
  contextWindow: 1_000_000,
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
  baseUrl: APERTURE_BASE + "/v1beta",
  api: 'google-generative-ai',
  reasoning: true,
  input: ["text"],
  cost: { input: 2, output: 12, cacheRead: 0, cacheWrite: 0 },
  contextWindow: 1000000,
  maxTokens: 8192,
}

export default function (pi: any) {
  pi.registerProvider("executor", {
    apiKey: "-",
    baseUrl: APERTURE_BASE,
    models: [KIMI_K3_FIREWORKS]
  });

  // pi.registerProvider("advisor", {
  //   apiKey: "-",
  //   baseUrl: APERTURE_BASE + "/v1beta",
  //   models: [GEMINI_31_PRO_AI_STUDIO]
  // });
  //
  // pi.registerTool({
  //   name: "ask_advisor",
  //   description:
  //     `Consult advisor for high-level reasoning, planning, or decisions ` +
  //     `that require deeper intelligence. Use this when you are unsure about an approach, ` +
  //     `need a second opinion, or the task involves significant complexity or risk.`,
  //   parameters: {
  //     type: "object",
  //     properties: {
  //       question: {
  //         type: "string",
  //         description: "The question or problem to send to the advisor.",
  //       },
  //       context: {
  //         type: "string",
  //         description: "Relevant background context the advisor needs to answer well.",
  //       },
  //     },
  //     required: ["question"],
  //   },
  //   execute: async (_toolCallId: string, params: { question: string; context?: string }, signal: AbortSignal) => {
  //     const text = await callAdvisor(params.question, signal, params.context);
  //     return { content: [{ type: "text", text }] };
  //   },
  // });
}
