# OMA-AI LLM Pricing Model

> Cost analysis and markup strategy for all LLM providers

---

## Provider Comparison

### Venice AI (Privacy-First, Uncensored)

**Base URL:** `https://api.venice.ai/api/v1`

| Model | Model ID | Venice Cost | OMA Price | Markup | Privacy |
|-------|----------|-------------|-----------|--------|---------|
| **Claude Opus 4.5** | `claude-opus-4-5` | $6.00/$30.00 | $7.20/$36.00 | 20% | Anonymized |
| **Claude Sonnet 4.6** | `claude-sonnet-4-6` | $3.60/$18.00 | $4.32/$21.60 | 20% | Anonymized |
| **DeepSeek V3.2** | `deepseek-v3.2` | $0.40/$1.00 | $0.50/$1.25 | 25% | Private ✅ |
| **Gemini 3 Flash** | `gemini-3-flash-preview` | $0.70/$3.75 | $0.88/$4.69 | 25% | Anonymized |
| **GLM 4.7 Flash** | `zai-org-glm-4.7-flash` | $0.13/$0.50 | $0.17/$0.65 | 30% | Private ✅ |
| **GLM 5** | `zai-org-glm-5` | $1.00/$3.20 | $1.25/$4.00 | 25% | Private ✅ |
| **GPT-5.2** | `openai-gpt-52` | $2.19/$17.50 | $2.63/$21.00 | 20% | Anonymized |
| **Grok 4.1 Fast** | `grok-41-fast` | $0.50/$1.25 | $0.65/$1.63 | 30% | Anonymized |
| **Kimi K2.5** | `kimi-k2-5` | $0.75/$3.75 | $0.94/$4.69 | 25% | Private ✅ |
| **Llama 3.3 70B** | `llama-3.3-70b` | $0.70/$2.80 | $0.88/$3.50 | 25% | Private ✅ |
| **MiniMax M2.5** | `minimax-m25` | $0.40/$1.60 | $0.52/$2.08 | 30% | Private ✅ |
| **Qwen 3 235B** | `qwen3-235b-a22b-instruct-2507` | $0.15/$0.75 | $0.19/$0.94 | 25% | Private ✅ |
| **Qwen 3 Coder 480B** | `qwen3-coder-480b-a35b-instruct` | $0.75/$3.00 | $0.94/$3.75 | 25% | Private ✅ |
| **Qwen 3.5 35B** | `qwen3-5-35b-a3b` | $0.31/$2.50 | $0.39/$3.13 | 25% | Private ✅ |
| **Venice Uncensored** | `venice-uncensored` | $0.20/$0.90 | $0.26/$1.17 | 30% | Private ✅ |

*Format: Input/Output per 1M tokens*

---

### OpenRouter (Cheapest Options)

**Base URL:** `https://openrouter.ai/api/v1`

| Model | Model ID | OR Cost | OMA Price | Markup | Notes |
|-------|----------|---------|-----------|--------|-------|
| **Llama 3.2 3B** | `meta-llama/llama-3.2-3b-instruct` | $0.02/$0.02 | $0.03/$0.03 | 50% | FREE tier available |
| **Llama 3.3 70B** | `meta-llama/llama-3.3-70b-instruct` | $0.10/$0.32 | $0.13/$0.42 | 30% | FREE tier available |
| **GPT-5 Nano** | `openai/gpt-5-nano` | $0.05/$0.40 | $0.07/$0.52 | 30% | Fast, cheap |
| **GPT-5 Mini** | `openai/gpt-5-mini` | $0.25/$2.00 | $0.31/$2.50 | 25% | Balanced |
| **GPT-5.2** | `openai/gpt-5.2` | $1.75/$14.00 | $2.19/$17.50 | 25% | Full power |
| **Kimi K2.5** | `moonshotai/kimi-k2.5` | $0.45/$2.20 | $0.56/$2.75 | 25% | Great value |
| **DeepSeek V3.2** | `deepseek/deepseek-v3.2` | $0.25/$0.40 | $0.31/$0.50 | 25% | Very cheap |
| **MiniMax M2.5** | `minimax/minimax-m2.5` | $0.29/$1.20 | $0.36/$1.50 | 25% | Good value |
| **Qwen 3 Coder** | `qwen/qwen3-coder-next` | $0.12/$0.75 | $0.15/$0.94 | 25% | FREE tier |
| **Qwen 3.5 397B** | `qwen/qwen3.5-397b-a17b` | $0.55/$3.50 | $0.69/$4.38 | 25% | Largest |
| **GLM 5** | `z-ai/glm-5` | $0.95/$2.55 | $1.19/$3.19 | 25% | Chinese |

*Format: Input/Output per 1M tokens*

---

### NVIDIA NIM (High Performance)

**Base URL:** `https://integrate.api.nvidia.com/v1`

| Model | Model ID | NVIDIA Cost | OMA Price | Markup |
|-------|----------|-------------|-----------|--------|
| **Qwen 3.5 397B** | `qwen/qwen3.5-397b-a17b` | ~$0.55/$3.50 | $0.69/$4.38 | 25% |
| **Qwen 3 Coder 480B** | `qwen/qwen3-coder-480b-a35b-instruct` | ~$0.75/$3.00 | $0.94/$3.75 | 25% |
| **Kimi K2.5** | `moonshotai/kimi-k2.5` | ~$0.45/$2.20 | $0.56/$2.75 | 25% |
| **Nemotron Nano 12B VL** | `nvidia/nemotron-nano-12b-v2-vl` | FREE | $0.05/$0.10 | - |

---

## OMA-AI Tiers (Recommended)

### Tier 1: Budget ($0.01-0.05/call)

| Model | Use Case | Cost/Call |
|-------|----------|-----------|
| Llama 3.2 3B | Simple Q&A | $0.01 |
| GLM 4.7 Flash | Quick tasks | $0.02 |
| Venice Uncensored | Uncensored | $0.02 |
| Qwen 3 Coder Flash | Code | $0.03 |

### Tier 2: Standard ($0.05-0.15/call)

| Model | Use Case | Cost/Call |
|-------|----------|-----------|
| DeepSeek V3.2 | General purpose | $0.05 |
| MiniMax M2.5 | Balanced | $0.06 |
| Llama 3.3 70B | Open source | $0.08 |
| Qwen 3 Coder | Code generation | $0.08 |

### Tier 3: Premium ($0.15-0.50/call)

| Model | Use Case | Cost/Call |
|-------|----------|-----------|
| Kimi K2.5 | Complex tasks | $0.15 |
| Qwen 3.5 397B | Largest open | $0.20 |
| GPT-5.2 | Enterprise | $0.35 |
| Claude Sonnet 4.6 | Premium | $0.40 |

### Tier 4: Expert ($0.50+/call)

| Model | Use Case | Cost/Call |
|-------|----------|-----------|
| Claude Opus 4.5 | Expert analysis | $0.75 |
| GPT-5.2 Pro | Top tier | $1.00+ |

---

## Pricing Strategy

### Cost-Based Markup

| Tier | Markup | Reason |
|------|--------|--------|
| Budget | 40-50% | High volume, low margin |
| Standard | 25-30% | Competitive pricing |
| Premium | 20-25% | Quality over price |
| Expert | 15-20% | Enterprise customers |

### Revenue Share

| Stakeholder | Share |
|-------------|-------|
| **API Publisher** | 70% |
| **OMA-AI Platform** | 20% |
| **x402 Protocol Fee** | 10% |

---

## Free Tier Limits

| Model | Free Calls/Day | Notes |
|-------|----------------|-------|
| Llama 3.3 70B | 100 | Via OpenRouter |
| Qwen 3 Coder | 50 | Via OpenRouter |
| DeepSeek V3.2 | 50 | Via Venice |
| Venice Uncensored | 30 | Via Venice |

---

## Recommended Default Models

| Purpose | Model | Provider | Cost |
|---------|-------|----------|------|
| **Default** | DeepSeek V3.2 | Venice | $0.05/call |
| **Code** | Qwen 3 Coder | OpenRouter | $0.08/call |
| **Cheap** | GLM 4.7 Flash | Venice | $0.02/call |
| **Premium** | Kimi K2.5 | Venice | $0.15/call |
| **Uncensored** | Venice Uncensored | Venice | $0.02/call |

---

## Implementation Notes

1. **Venice API Key Required** - Get from https://venice.ai/settings/api
2. **OpenRouter API Key Optional** - For free tier models
3. **NVIDIA API Key Optional** - For hosted models
4. **x402 Payments** - Enable micropayments per call
5. **Rate Limiting** - Implement per-user limits
6. **Caching** - Cache common responses to reduce costs

---

*Last updated: 2026-02-28*
*Generated by Frankie 🧟*
