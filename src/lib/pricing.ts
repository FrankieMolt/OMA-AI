/**
 * OMA-AI Pricing Configuration
 * 
 * x402 micropayment pricing per endpoint (in USDC micro-units)
 */

// X402 Micropayment pricing (per request in USDC)
export const X402_PRICING: Record<string, { price: number; description: string }> = {
  '/api/health': { price: 0, description: 'Health check' },
  '/api/llms': { price: 0, description: 'List models' },
  '/api/prices': { price: 0, description: 'Crypto prices' },
  '/api/weather': { price: 2, description: 'Weather data (micro-USDC)' },  // ~$0.000002
  '/api/crypto': { price: 2, description: 'Crypto prices' },
  '/api/search': { price: 5, description: 'Web search' },
  '/api/scrape': { price: 8, description: 'Web scraping' },
  '/api/llm': { price: 10, description: 'LLM inference budget tier' },
  '/api/embeddings': { price: 10, description: 'Text embeddings' },
  '/api/compute': { price: 20, description: 'Compute services' },
  '/api/marketplace': { price: 30, description: 'Marketplace data' },
};

// Token pricing per 1M tokens (input/output in USDC micro-units)
export const TOKEN_PRICING: Record<string, { input: number; output: number }> = {
  // Budget tier
  'nemotron-3-nano-30b': { input: 70, output: 150 },
  'glm-4.7-flash': { input: 100, output: 200 },
  'gemma-3-27b': { input: 80, output: 180 },
  'llama-3.2-3b': { input: 60, output: 120 },
  'venice-uncensored': { input: 120, output: 250 },
  // Standard tier
  'deepseek-v3.2': { input: 600, output: 1500 },
  'llama-3.3-70b': { input: 1000, output: 4000 },
  'kimi-k2.5': { input: 1100, output: 5500 },
  'qwen-3-coder': { input: 1100, output: 4500 },
  // Premium tier
  'gpt-5.2': { input: 3000, output: 24000 },
  'claude-opus-4.6': { input: 8000, output: 42000 },
  'claude-sonnet-4.6': { input: 5000, output: 25000 },
  'gemini-3.1-pro': { input: 2190, output: 10950 },
};

export function calculateCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = TOKEN_PRICING[model];
  if (!pricing) return 0;
  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (outputTokens / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}

export function getX402Price(endpoint: string): number {
  return X402_PRICING[endpoint]?.price ?? 1;
}

export function calculateRevenueSplit(amount: number) {
  const platformFee = Math.floor(amount * 0.10);
  const publisherRevenue = amount - platformFee;
  return { total: amount, platformFee, publisherRevenue, split: { platform: 10, publisher: 90 } };
}

export function getVolumeDiscount(tokensPerMonth: number): number {
  if (tokensPerMonth >= 100_000_000) return 0.30;
  if (tokensPerMonth >= 50_000_000) return 0.20;
  if (tokensPerMonth >= 10_000_000) return 0.10;
  return 0;
}

export function estimateMonthlyCost(requestsPerDay: number, avgTokensPerRequest: number, model: string): number {
  const monthlyTokens = requestsPerDay * 30 * avgTokensPerRequest;
  const baseCost = calculateCost(model, monthlyTokens * 0.7, monthlyTokens * 0.3);
  return baseCost * (1 - getVolumeDiscount(monthlyTokens));
}

export type Model = keyof typeof TOKEN_PRICING;
