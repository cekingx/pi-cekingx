# pi-cekingx Technical Architecture

## Overview

`pi-cekingx` is a pi agent harness extension that routes multiple LLM providers through a self-hosted Aperture proxy and implements the **Advisor–Executor** workflow pattern.

---

## Aperture Proxy

All model traffic is routed through a single Aperture gateway:

```
http://cekingx-ai.longhair-sole.ts.net
```

Aperture acts as a unified API gateway, translating provider-specific protocols so that pi sees normalized endpoints. No real API keys are needed — `"-"` is passed as a placeholder.

---

## Registered Providers

| Provider ID         | API Protocol         | Path suffix | Models                          |
|---------------------|----------------------|-------------|---------------------------------|
| `anthropic`         | `anthropic-messages` | (none)      | claude-opus-4.6, claude-sonnet-4.6 |
| `deepseek-aperture` | `openai-completions` | `/v1`       | deepseek-v3.2                   |
| `minimax-aperture`  | `openai-completions` | `/v1`       | minimax-m2.7                    |
| `advisor`           | `google-generative-ai` | (none)      | gemini-3.1-pro-preview          |

---

## Advisor–Executor Workflow

### Concept

Borrowed from Anthropic's advisor strategy: a cheaper, faster model handles the bulk of agentic work while a more capable model is consulted selectively for decisions that need deeper intelligence.

```
User
 │
 ▼
┌─────────────────────────────────────┐
│         Pi Agent Runtime            │
│                                     │
│  Active model: MODEL_EXECUTOR       │  ← does the work
│  (minimax/minimax-m2.7)             │
│                                     │
│  Has access to tool: ask_advisor    │
└──────────────┬──────────────────────┘
               │ calls tool when needed
               ▼
┌─────────────────────────────────────┐
│         ask_advisor tool            │
│                                     │
│  Sends question + context to        │
│  MODEL_ADVISOR (gemini-3.1-pro)     │
│  via Aperture (google-generative-ai)│
└──────────────┬──────────────────────┘
               │ returns advice as text
               ▼
       Executor continues task
```

### Constants

```
MODEL_EXECUTOR  =  accounts/fireworks/models/kimi-k2p6  (default active model)
MODEL_ADVISOR   =  gemini-3.1-pro-preview              (consulted on demand)
```

### When the Executor Should Call ask_advisor

- Ambiguous or conflicting requirements
- Architectural or design decisions with long-term consequences
- Tasks with significant risk (destructive operations, security-sensitive code)
- Situations where the executor is unsure of the best approach

### ask_advisor Tool Interface

```
Tool name:   ask_advisor
Parameters:
  question   string  (required) — the problem or question to resolve
  context    string  (optional) — relevant background the advisor needs

Returns:     plain text advice from MODEL_ADVISOR
```

### Advisor Call Flow

1. Executor decides it needs advice and calls `ask_advisor`
2. Tool constructs a single-turn Google Generative AI request to MODEL_ADVISOR
3. Request is sent directly to Aperture (`google-generative-ai` protocol)
4. Advisor response is returned as the tool result
5. Executor incorporates the advice and continues

---

## File Structure

```
pi-cekingx/
├── src/
│   ├── index.ts        — extension entry point; registers providers + ask_advisor tool
│   └── advisor.ts      — callAdvisor() function; makes HTTP call to MODEL_ADVISOR
├── docs/
│   └── technical-architecture.md
├── package.json        — pi.extensions points to src/index.ts
└── tsconfig.json
```

---

## Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Advisor call mechanism | Direct HTTP fetch to Aperture | Avoids dependency on pi internals; Aperture already handles auth and routing |
| Executor model | minimax-m2.7 | Large context (1M tokens), cost-effective for high-volume agentic steps |
| Advisor model | gemini-3.1-pro-preview | Large context (1M tokens), strong reasoning; called sparingly |
| OpenAI-compat providers | `/v1` suffix on baseUrl | Aperture's OpenAI-compatible endpoint lives at `/v1` |
| Anthropic provider | no suffix on baseUrl | Aperture's native Anthropic endpoint is at root |
