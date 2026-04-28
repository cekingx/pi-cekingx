import { callAdvisor } from "./advisor.js";

const APERTURE_BASE = "http://cekingx-ai.longhair-sole.ts.net";

export const MODEL_EXECUTOR = "accounts/fireworks/models/kimi-k2p6";
export const MODEL_ADVISOR  = "google/gemini-3.1-pro-preview";

export default function (pi: any) {
  pi.registerProvider("executor", {
    baseUrl: APERTURE_BASE + "/v1",
    apiKey: "-",
    api: "openai-completions",
    models: [
      {
        id: MODEL_EXECUTOR,
        name: MODEL_EXECUTOR,
        reasoning: false,
        input: ["text"],
        cost: { input: 0.95, output: 4, cacheRead: 0.16, cacheWrite: 0 },
        contextWindow: 262000,
      },
    ],
  });

  pi.registerProvider("advisor", {
    baseUrl: APERTURE_BASE + "/v1",
    apiKey: "-",
    api: "openai-completions",
    models: [
      {
        id: MODEL_ADVISOR,
        name: MODEL_ADVISOR,
        reasoning: false,
        input: ["text"],
        cost: { input: 2, output: 12, cacheRead: 0.2, cacheWrite: 0.375 },
        contextWindow: 1000000,
      },
    ],
  });

  pi.registerTool({
    name: "ask_advisor",
    description:
      `Consult ${MODEL_ADVISOR} for high-level reasoning, planning, or decisions ` +
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
