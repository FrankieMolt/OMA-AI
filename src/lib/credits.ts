// OMA-AI Credits System
// Real, sustainable pricing based on actual costs with premium agent markups

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

// Credit packages - Optimized for Agentic Economy
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    credits: 10000,  
    price: 10,
    bonus: 0,
    description: 'Try it out'
  },
  {
    id: 'pro',
    credits: 50000,  
    price: 45,
    bonus: 5000,     
    description: 'Most popular',
    popular: true
  },
  {
    id: 'elite',
    credits: 100000, 
    price: 95,
    bonus: 25000,    
    description: 'Best value'
  },
  {
    id: 'sovereign',
    credits: 1000000, 
    price: 750,
    bonus: 250000,    
    description: 'Enterprise tier'
  }
];

// Model costs in credits (1 credit = $0.001 USD)
// Markup applied: 3x-5x for profitability
export const MODEL_COSTS: Record<string, ModelCreditCost> = {
  // Reasoning
  'claude-3-7-sonnet': {
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    inputCredits: 3.50,    
    outputCredits: 15.00   
  },
  'deepseek-v3.2': {
    name: 'DeepSeek V3.2',
    provider: 'DeepSeek',
    inputCredits: 0.85,
    outputCredits: 2.50
  },
  
  // Uncensored
  'venice-uncensored': {
    name: 'Venice Llama 3.1 405B',
    provider: 'Venice AI',
    inputCredits: 0.50,
    outputCredits: 1.80
  },
  
  // Standard
  'gpt-4o': {
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputCredits: 3.00,
    outputCredits: 12.00
  },
  'llama-3-3-70b': {
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    inputCredits: 1.50,
    outputCredits: 5.00
  },
  
  // Code
  'qwen-2-5-coder': {
    name: 'Qwen 2.5 Coder 32B',
    provider: 'Alibaba',
    inputCredits: 1.20,
    outputCredits: 4.80
  },

  // Google
  'glm-5v-turbo': {
    name: 'GLM-5 Vision Turbo',
    provider: 'Google/Zhipu',
    inputCredits: 2.00,
    outputCredits: 8.00
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
    return Math.ceil((inputTokens * 1.0 + outputTokens * 2.0) / 1000);
  }
  
  const inputCredits = (inputTokens / 1000) * costs.inputCredits;
  const outputCredits = (outputTokens / 1000) * costs.outputCredits;
  
  return Math.ceil(inputCredits + outputCredits);
}

// Estimate cost in USD
export function estimateUSD(credits: number): string {
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

export const CREDITS_EXPIRE_DAYS = 0; // Credits NEVER expire in the Agentic Web
