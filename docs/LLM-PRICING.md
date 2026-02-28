# OMA-AI LLM Pricing Strategy

> Comprehensive pricing with 40-60% markup for profitability

## Cost Basis vs Sell Price

### Budget Tier (50-60% Markup)

| Model | Venice Cost | OMA-AI Price | Margin |
|-------|-------------|--------------|--------|
| Nemotron 3 Nano | $0.07/$0.30 | $0.12/$0.50 | 60% |
| GLM 4.7 Flash | $0.13/$0.50 | $0.20/$0.80 | 54% |
| Gemma 3 27B | $0.12/$0.20 | $0.20/$0.35 | 67% |
| Venice Uncensored | $0.20/$0.90 | $0.35/$1.50 | 66% |
| Llama 3.2 3B | $0.15/$0.60 | $0.25/$1.00 | 60% |

### Standard Tier (40-50% Markup)

| Model | Venice Cost | OMA-AI Price | Margin |
|-------|-------------|--------------|--------|
| DeepSeek V3.2 | $0.40/$1.00 | $0.60/$1.50 | 50% |
| Llama 3.3 70B | $0.70/$2.80 | $1.00/$4.00 | 43% |
| Kimi K2.5 | $0.75/$3.75 | $1.10/$5.50 | 47% |
| Qwen 3 Coder | $0.75/$3.00 | $1.10/$4.50 | 47% |
| MiniMax M2.5 | $0.40/$1.60 | $0.60/$2.40 | 50% |

### Premium Tier (30-40% Markup)

| Model | Cost Basis | OMA-AI Price | Margin |
|-------|------------|--------------|--------|
| GPT-5.2 | $2.19/$17.50 | $3.00/$24.00 | 37% |
| GPT-5.3 Codex | $2.19/$17.50 | $3.00/$24.00 | 37% |
| Claude Sonnet 4.6 | $3.60/$18.00 | $5.00/$25.00 | 39% |
| Claude Opus 4.6 | $6.00/$30.00 | $8.00/$42.00 | 33% |
| Gemini 3.1 Pro | $2.50/$15.00 | $3.50/$21.00 | 40% |

## User Tiers & Rate Limits

| Tier | Price | RPM | RPD | Tokens/Day |
|------|-------|-----|-----|------------|
| Free | $0 | 5 | 50 | 100K |
| Starter | $10/mo | 20 | 500 | 1M |
| Pro | $50/mo | 60 | 5K | 10M |
| Enterprise | Custom | 200 | 50K | 100M+ |

## Provider Selection

**Primary: Venice AI**
- Privacy-first (zero retention)
- Unique models (Uncensored, GLM, DeepSeek)
- Decentralized GPU network

**Fallback: OpenRouter**
- Wider model selection
- Free tier models
- Cheaper on some premium models

## Revenue Projections

| Users | Avg Spend | Monthly Revenue | Profit (50%) |
|-------|-----------|-----------------|--------------|
| 100 | $10 | $1,000 | $500 |
| 500 | $15 | $7,500 | $3,750 |
| 2,000 | $20 | $40,000 | $20,000 |

## Hosting Costs (Vercel)

| Scale | Bandwidth | Functions | Est. Cost |
|-------|-----------|-----------|-----------|
| Small | <100GB | <1M | $20-50/mo |
| Medium | 100GB-1TB | 1-10M | $50-300/mo |
| Large | >1TB | >10M | $300-1500/mo |

## Profit Formula

```
Revenue = Users × AvgSpend
Cost = VeniceAPI + OpenRouterAPI + Vercel + Redis
Profit = Revenue - Cost

At 50% margin:
100 users @ $15 = $1,500 revenue → $750 profit
500 users @ $15 = $7,500 revenue → $3,750 profit
2000 users @ $20 = $40,000 revenue → $20,000 profit
```

## API Pricing Implementation

```typescript
const OMA_PRICING = {
  // Budget
  'glm-4.7-flash': { input: 0.20, output: 0.80, tier: 'budget' },
  'venice-uncensored': { input: 0.35, output: 1.50, tier: 'budget' },
  
  // Standard  
  'deepseek-v3.2': { input: 0.60, output: 1.50, tier: 'standard' },
  'kimi-k2.5': { input: 1.10, output: 5.50, tier: 'standard' },
  
  // Premium
  'claude-opus-4.6': { input: 8.00, output: 42.00, tier: 'premium' },
};
```
