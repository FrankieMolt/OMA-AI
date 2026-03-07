// OMA-AI Credits System
// Real, sustainable pricing based on actual costs

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  bonus: number; // Extra credits
  popular?: boolean;
  description: string;
}

export interface ModelCreditCost {
  inputCredits: number;  // Credits per 1K input tokens
  outputCredits: number; // Credits per 1K output tokens
  name: string;
  provider: string;
}

// Credit packages - what users actually buy
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    credits: 10000,  // 10K credits
    price: 10,
    bonus: 0,
    description: 'Try it out'
  },
  {
    id: 'basic',
    credits: 50000,  // 50K credits
    price: 45,
    bonus: 5000,     // +10% bonus
    description: 'Most popular',
    popular: true
  },
  {
    id: 'pro',
    credits: 100000, // 100K credits
    price: 85,
    bonus: 15000,    // +15% bonus
    description: 'Best value'
  },
  {
    id: 'team',
    credits: 500000, // 500K credits
    price: 400,
    bonus: 100000,   // +20% bonus
    description: 'For teams'
  },
  {
    id: 'enterprise',
    credits: 1000000, // 1M credits
    price: 750,
    bonus: 250000,    // +25% bonus
    description: 'Volume discount'
  }
];

// Model costs in credits (based on actual API costs + 20% margin)
export const MODEL_COSTS: Record<string, ModelCreditCost> = {
  // Budget models (cheapest)
  'llama-3.2-1b': {
    name: 'Llama 3.2 1B',
    provider: 'Groq',
    inputCredits: 0.05,   // ~$0.05 per 1M tokens
    outputCredits: 0.08
  },
  'llama-3.2-3b': {
    name: 'Llama 3.2 3B',
    provider: 'Groq',
    inputCredits: 0.08,
    outputCredits: 0.12
  },
  
  // Standard models
  'llama-3.1-8b': {
    name: 'Llama 3.1 8B',
    provider: 'Groq',
    inputCredits: 0.15,
    outputCredits: 0.20
  },
  'gemma-2-9b': {
    name: 'Gemma 2 9B',
    provider: 'Groq',
    inputCredits: 0.18,
    outputCredits: 0.22
  },
  'mistral-7b': {
    name: 'Mistral 7B',
    provider: 'Groq',
    inputCredits: 0.12,
    outputCredits: 0.18
  },
  
  // Mid-tier models
  'llama-3.1-70b': {
    name: 'Llama 3.1 70B',
    provider: 'Groq',
    inputCredits: 0.80,
    outputCredits: 1.20
  },
  'qwen-2.5-72b': {
    name: 'Qwen 2.5 72B',
    provider: 'OpenRouter',
    inputCredits: 0.90,
    outputCredits: 1.30
  },
  'mixtral-8x7b': {
    name: 'Mixtral 8x7B',
    provider: 'Groq',
    inputCredits: 0.60,
    outputCredits: 0.90
  },
  
  // Premium models
  'claude-3.5-sonnet': {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputCredits: 3.00,    // ~$3/1M input
    outputCredits: 15.00   // ~$15/1M output
  },
  'claude-3-opus': {
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    inputCredits: 15.00,
    outputCredits: 75.00
  },
  'gpt-4o': {
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputCredits: 2.50,
    outputCredits: 10.00
  },
  'gpt-4-turbo': {
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    inputCredits: 10.00,
    outputCredits: 30.00
  },
  
  // Specialized models
  'gemini-2.0-flash': {
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    inputCredits: 0.10,
    outputCredits: 0.40
  },
  'gemini-1.5-pro': {
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    inputCredits: 1.25,
    outputCredits: 5.00
  },
  
  // Local models (FREE!)
  'qwen-3.5-4b-local': {
    name: 'Qwen 3.5 4B (Local)',
    provider: 'Local',
    inputCredits: 0,  // FREE
    outputCredits: 0
  }
};

// Calculate credits needed for a request
export function calculateCreditsNeeded(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = MODEL_COSTS[model];
  if (!costs) {
    // Default to mid-tier pricing
    return Math.ceil((inputTokens * 0.5 + outputTokens * 1.0) / 1000);
  }
  
  const inputCredits = (inputTokens / 1000) * costs.inputCredits;
  const outputCredits = (outputTokens / 1000) * costs.outputCredits;
  
  return Math.ceil(inputCredits + outputCredits);
}

// Estimate cost in USD
export function estimateUSD(credits: number): string {
  // Base rate: 1000 credits ≈ $1
  const usd = credits / 1000;
  return `$${usd.toFixed(2)}`;
}

// Get model display info
export function getModelInfo(modelId: string): ModelCreditCost | null {
  return MODEL_COSTS[modelId] || null;
}

// List all available models
export function listModels(): Array<{id: string} & ModelCreditCost> {
  return Object.entries(MODEL_COSTS).map(([id, info]) => ({
    id,
    ...info
  }));
}

// Credits never expire (or optional expiration)
export const CREDITS_EXPIRE_DAYS = 365; // 1 year

// Example usage calculations
export const EXAMPLE_COSTS = {
  'Simple chat (100 tokens)': {
    'llama-3.2-1b': 1,
    'claude-3.5-sonnet': 18,
    'gpt-4o': 13
  },
  'Code generation (500 tokens)': {
    'llama-3.2-1b': 5,
    'claude-3.5-sonnet': 90,
    'gpt-4o': 63
  },
  'Long conversation (2000 tokens)': {
    'llama-3.2-1b': 20,
    'claude-3.5-sonnet': 360,
    'gpt-4o': 250
  }
};
