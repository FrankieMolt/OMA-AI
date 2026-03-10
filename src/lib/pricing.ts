/**
 * OMA-AI Pricing Configuration
 * 
 * Unified pricing for X402 micropayments + Stripe subscriptions
 */

// X402 Micropayment pricing (per request in USDC)
export const X402_PRICING = {
  // Free endpoints
  '/api/health': { price: 0, description: 'Health check' },
  '/api/llms': { price: 0, description: 'List models' },
  '/api/prices': { price: 0, description: 'Crypto prices' },
  
  // Low-cost endpoints
  '/api/weather': { price: 0.002, description: 'Weather data' },
  '/api/crypto': { price: 0.002, description: 'Crypto prices' },
  '/api/search': { price: 0.005, description: 'Web search' },
  '/api/scrape': { price: 0.008, description: 'Web scraping' },
  
  // Medium-cost endpoints
  '/api/llm': { price: 0.01, description: 'LLM inference (budget tier)' },
  '/api/embeddings': { price: 0.01, description: 'Text embeddings' },
  '/api/compute': { price: 0.02, description: 'Compute services' },
  
  // High-cost endpoints
  '/api/llm-premium': { price: 0.05, description: 'LLM inference (premium tier)' },
  '/api/marketplace': { price: 0.03, description: 'Marketplace data' },
} as const;

// Stripe Subscription pricing (monthly)
export const STRIPE_PRICING = {
  free: {
    name: 'Free',
    price: 0,
    tokens: 100_000, // 100K tokens
    requests: 1_000, // 1K requests
    features: [
      '100K tokens/month',
      '1K API requests',
      'Budget models only',
      'Community support',
      'Rate limit: 5 RPM'
    ],
    stripeProductId: null,
    stripePriceId: null
  },
  
  starter: {
    name: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_PRICE_STARTER || 'price_starter_monthly',
    tokens: 1_000_000, // 1M tokens
    requests: 10_000, // 10K requests
    features: [
      '1M tokens/month',
      '10K API requests',
      'All budget models',
      'Email support',
      'Rate limit: 20 RPM',
      'Priority queue'
    ],
    stripeProductId: 'prod_starter',
    stripePriceId: 'price_starter_monthly'
  },
  
  pro: {
    name: 'Pro',
    price: 99,
    priceId: process.env.STRIPE_PRICE_PRO || 'price_pro_monthly',
    tokens: 10_000_000, // 10M tokens
    requests: 100_000, // 100K requests
    features: [
      '10M tokens/month',
      '100K API requests',
      'All models including premium',
      'Priority support',
      'Rate limit: 60 RPM',
      'Priority queue',
      'Custom fine-tuning',
      'Webhooks'
    ],
    popular: true,
    stripeProductId: 'prod_pro',
    stripePriceId: 'price_pro_monthly'
  },
  
  enterprise: {
    name: 'Enterprise',
    price: 299,
    priceId: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise_monthly',
    tokens: 100_000_000, // 100M tokens
    requests: 1_000_000, // 1M requests
    features: [
      '100M tokens/month',
      '1M API requests',
      'All models unlimited',
      '24/7 phone support',
      'Rate limit: 200 RPM',
      'Highest priority',
      'Custom models',
      'Dedicated infrastructure',
      'SLA guarantee',
      'Custom integrations'
    ],
    stripeProductId: 'prod_enterprise',
    stripePriceId: 'price_enterprise_monthly'
  }
} as const;

// Token pricing per 1M tokens (input/output)
export const TOKEN_PRICING = {
  // Budget tier ($0.07-0.20/1M tokens)
  'nemotron-3-nano-30b': { input: 0.07, output: 0.15 },
  'glm-4.7-flash': { input: 0.10, output: 0.20 },
  'gemma-3-27b': { input: 0.08, output: 0.18 },
  'llama-3.2-3b': { input: 0.06, output: 0.12 },
  'venice-uncensored': { input: 0.12, output: 0.25 },
  
  // Standard tier ($0.40-1.10/1M tokens)
  'deepseek-v3.2': { input: 0.60, output: 1.50 },
  'llama-3.3-70b': { input: 1.00, output: 4.00 },
  'kimi-k2.5': { input: 1.10, output: 5.50 },
  'qwen-3-coder': { input: 1.10, output: 4.50 },
  
  // Premium tier ($2.19-8.00/1M tokens)
  'gpt-5.2': { input: 3.00, output: 24.00 },
  'claude-opus-4.6': { input: 8.00, output: 42.00 },
  'claude-sonnet-4.6': { input: 5.00, output: 25.00 },
  'gemini-3.1-pro': { input: 2.19, output: 10.95 },
} as const;

// Calculate cost for API call
export function calculateCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = TOKEN_PRICING[model as keyof typeof TOKEN_PRICING];
  if (!pricing) return 0;
  
  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (outputTokens / 1_000_000) * pricing.output;
  
  return inputCost + outputCost;
}

// Get X402 price for endpoint
export function getX402Price(endpoint: string): number {
  return X402_PRICING[endpoint as keyof typeof X402_PRICING]?.price || 0.001;
}

// Get subscription tier
export function getTier(tier: string) {
  return STRIPE_PRICING[tier as keyof typeof STRIPE_PRICING] || STRIPE_PRICING.free;
}

// Revenue split (90/10)
export function calculateRevenueSplit(amount: number) {
  const platformFee = amount * 0.10;
  const publisherRevenue = amount - platformFee;
  
  return {
    total: amount,
    platformFee,
    publisherRevenue,
    split: { platform: 10, publisher: 90 }
  };
}

// Volume discounts
export function getVolumeDiscount(tokensPerMonth: number): number {
  if (tokensPerMonth >= 100_000_000) return 0.30; // 30% off
  if (tokensPerMonth >= 50_000_000) return 0.20;  // 20% off
  if (tokensPerMonth >= 10_000_000) return 0.10;  // 10% off
  return 0;
}

// Estimate monthly cost
export function estimateMonthlyCost(
  requestsPerDay: number,
  avgTokensPerRequest: number,
  model: string
): number {
  const monthlyTokens = requestsPerDay * 30 * avgTokensPerRequest;
  const baseCost = calculateCost(model, monthlyTokens * 0.7, monthlyTokens * 0.3);
  const discount = getVolumeDiscount(monthlyTokens);
  
  return baseCost * (1 - discount);
}

export type Tier = keyof typeof STRIPE_PRICING;
export type Model = keyof typeof TOKEN_PRICING;
