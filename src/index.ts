export default function (pi: any) {
  const apertureBase = "http://cekingx-ai.longhair-sole.ts.net";

  pi.registerProvider("anthropic", {
    baseUrl: apertureBase,
    apiKey: "-",
    api: "anthropic-messages",
    models: [
      {
        id: "anthropic/claude-opus-4.6",
        name: "Claude Opus 4.6 (Aperture)",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 200000,
        maxTokens: 32000,
      },
    ],
  });

  pi.registerProvider("anthropic", {
    baseUrl: apertureBase,
    apiKey: "-",
    api: "anthropic-messages",
    models: [
      {
        id: "anthropic/claude-sonnet-4.6",
        name: "Claude Sonnet 4.6 (Aperture)",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 200000,
        maxTokens: 32000,
      },
    ],
  });

  pi.registerProvider("deepseek-aperture", {
    baseUrl: apertureBase + "/v1",
    apiKey: "-",
    api: "openai-completions",
    models: [
      {
        id: "deepseek/deepseek-v3.2",
        name: "DeepSeek 3.2 (Aperture)",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 8192,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
    ],
  });

  pi.registerProvider("minimax-aperture", {
    baseUrl: apertureBase + "/v1",
    apiKey: "-",
    api: "openai-completions",
    models: [
      {
        id: "minimax/minimax-m2.7",
        name: "MiniMax M2.7 (Aperture)",
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
  });

  pi.registerProvider("gemini-aperture", {
    baseUrl: apertureBase + "/v1",
    apiKey: "-",
    api: "openai-completions",
    models: [
      {
        id: "google/gemini-3.1-pro-preview",
        name: "Gemini 3.1 Pro Preview (Aperture)",
        reasoning: false,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 8192,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
    ],
  });
}
