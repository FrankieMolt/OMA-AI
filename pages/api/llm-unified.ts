import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI Unified LLM Gateway
 * 
 * Routes requests to Venice AI (primary) or OpenRouter (fallback)
 * Handles rate limiting, billing, and markup pricing
 */

// Redis for rate limiting (use Upstash in production)
const RATE_LIMIT_ENABLED = process.env.RATE_LIMIT_ENABLED === 'true';

// Provider configs
const VENICE_API_URL = 'https://api.venice.ai/api/v1';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';

// Model routing: which provider to use
const MODEL_PROVIDERS: Record<string, 'venice' | 'openrouter'> = {
  // Venice-only models (privacy-first)
  'venice-uncensored': 'venice',
  'deepseek-v3.2': 'venice',
  'glm-4.7-flash': 'venice',
  'glm-4.7': 'venice',
  'llama-3.3-70b': 'venice',
  'kimi-k2.5': 'venice',
  'qwen-3-coder': 'venice',
  
  // OpenRouter models (wider selection)
  'claude-opus-4.6': 'openrouter',  // Cheaper on OR
  'claude-sonnet-4.6': 'openrouter', // Cheaper on OR
  'gpt-5.3-codex': 'openrouter',
  
  // Free models (OpenRouter)
  'free': 'openrouter',
  'step-3.5-flash': 'openrouter',
};

// OMA-AI Pricing (with markup) - per 1M tokens
const OMA_PRICING: Record<string, { input: number; output: number; tier: string }> = {
  // Budget tier (50-60% markup)
  'nemotron-3-nano': { input: 0.12, output: 0.50, tier: 'budget' },
  'glm-4.7-flash': { input: 0.20, output: 0.80, tier: 'budget' },
  'gemma-3-27b': { input: 0.20, output: 0.35, tier: 'budget' },
  'venice-uncensored': { input: 0.35, output: 1.50, tier: 'budget' },
  'llama-3.2-3b': { input: 0.25, output: 1.00, tier: 'budget' },
  
  // Standard tier (40-50% markup)
  'deepseek-v3.2': { input: 0.60, output: 1.50, tier: 'standard' },
  'llama-3.3-70b': { input: 1.00, output: 4.00, tier: 'standard' },
  'kimi-k2.5': { input: 1.10, output: 5.50, tier: 'standard' },
  'qwen-3-coder': { input: 1.10, output: 4.50, tier: 'standard' },
  'minimax-m2.5': { input: 0.60, output: 2.40, tier: 'standard' },
  
  // Premium tier (30-40% markup)
  'gpt-5.2': { input: 3.00, output: 24.00, tier: 'premium' },
  'gpt-5.3-codex': { input: 3.00, output: 24.00, tier: 'premium' },
  'claude-sonnet-4.6': { input: 5.00, output: 25.00, tier: 'premium' },
  'claude-opus-4.6': { input: 8.00, output: 42.00, tier: 'premium' },
  'gemini-3.1-pro': { input: 3.50, output: 21.00, tier: 'premium' },
  
  // Free tier
  'free': { input: 0, output: 0, tier: 'free' },
};

// Venice model ID mapping
const VENICE_MODELS: Record<string, string> = {
  'deepseek-v3.2': 'deepseek-v3.2',
  'glm-4.7-flash': 'zai-org-glm-4.7-flash',
  'glm-4.7': 'zai-org-glm-4.7',
  'llama-3.3-70b': 'llama-3.3-70b',
  'kimi-k2.5': 'kimi-k2-5',
  'qwen-3-coder': 'qwen3-coder-480b-a35b-instruct-turbo',
  'venice-uncensored': 'venice-uncensored',
};

// OpenRouter model ID mapping
const OPENROUTER_MODELS: Record<string, string> = {
  'claude-opus-4.6': 'anthropic/claude-opus-4.6',
  'claude-sonnet-4.6': 'anthropic/claude-sonnet-4.6',
  'gpt-5.3-codex': 'openai/gpt-5.3-codex',
  'free': 'openrouter/free',
  'step-3.5-flash': 'stepfun/step-3.5-flash:free',
};

// User tiers for rate limiting
const USER_TIERS = {
  free: { rpm: 5, rpd: 50, tokensPerDay: 100000 },
  starter: { rpm: 20, rpd: 500, tokensPerDay: 1000000 },
  pro: { rpm: 60, rpd: 5000, tokensPerDay: 10000000 },
  enterprise: { rpm: 200, rpd: 50000, tokensPerDay: 100000000 },
};

interface UserAccount {
  id: string;
  tier: keyof typeof USER_TIERS;
  balance: number;  // USD balance
  tokensUsed: number;
  lastReset: string;  // ISO date
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string, tier: keyof typeof USER_TIERS): { allowed: boolean; remaining: number; resetIn: number } {
  const limits = USER_TIERS[tier];
  const now = Date.now();
  const minuteKey = `${userId}:${Math.floor(now / 60000)}`;
  const entry = rateLimitStore.get(minuteKey);
  
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(minuteKey, { count: 1, resetAt: now + 60000 });
    return { allowed: true, remaining: limits.rpm - 1, resetIn: 60000 };
  }
  
  if (entry.count >= limits.rpm) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }
  
  entry.count++;
  return { allowed: true, remaining: limits.rpm - entry.count, resetIn: entry.resetAt - now };
}

async function callVeniceAPI(model: string, messages: any[], options: any) {
  const veniceModelId = VENICE_MODELS[model] || model;
  
  const response = await fetch(`${VENICE_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VENICE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: veniceModelId,
      messages,
      max_tokens: options.max_tokens || 1000,
      temperature: options.temperature || 0.7,
      venice_parameters: {
        enable_web_search: options.web_search ? 'auto' : 'off',
        include_venice_system_prompt: options.uncensored ? false : true,
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Venice API error: ${response.status}`);
  }
  
  return response.json();
}

async function callOpenRouterAPI(model: string, messages: any[], options: any) {
  const orModelId = OPENROUTER_MODELS[model] || model;
  
  const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://oma-ai.com',
      'X-Title': 'OMA-AI',
    },
    body: JSON.stringify({
      model: orModelId,
      messages,
      max_tokens: options.max_tokens || 1000,
      temperature: options.temperature || 0.7,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }
  
  return response.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // GET - List models with OMA-AI pricing
  if (req.method === 'GET') {
    const models = Object.entries(OMA_PRICING).map(([id, pricing]) => ({
      id,
      pricing: {
        input: pricing.input,
        output: pricing.output,
        unit: 'per 1M tokens',
      },
      tier: pricing.tier,
      provider: MODEL_PROVIDERS[id] || 'venice',
    }));
    
    return res.json({
      success: true,
      total: models.length,
      models,
      tiers: USER_TIERS,
      default_model: 'deepseek-v3.2',
    });
  }
  
  // POST - Chat completion
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing API key' });
  }
  
  const apiKey = authHeader.slice(7);
  
  // TODO: Validate API key and get user account
  // For now, assume free tier
  const userAccount: UserAccount = {
    id: 'user_' + apiKey.slice(0, 8),
    tier: 'starter',
    balance: 10.00,
    tokensUsed: 0,
    lastReset: new Date().toISOString().split('T')[0],
  };
  
  // Rate limit check
  const rateLimit = checkRateLimit(userAccount.id, userAccount.tier);
  if (!rateLimit.allowed) {
    res.setHeader('X-RateLimit-Remaining', '0');
    res.setHeader('X-RateLimit-Reset', rateLimit.resetIn.toString());
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: Math.ceil(rateLimit.resetIn / 1000),
    });
  }
  
  res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());
  
  const { model = 'deepseek-v3.2', prompt, messages, max_tokens, temperature, web_search, uncensored } = req.body;
  
  if (!prompt && !messages) {
    return res.status(400).json({ error: 'Missing prompt or messages' });
  }
  
  // Validate model
  const pricing = OMA_PRICING[model];
  if (!pricing) {
    return res.status(400).json({
      error: 'Unknown model',
      available: Object.keys(OMA_PRICING),
    });
  }
  
  // Check if user can afford this model
  if (pricing.tier !== 'free' && userAccount.balance <= 0) {
    return res.status(402).json({
      error: 'Insufficient balance',
      balance: userAccount.balance,
      model_tier: pricing.tier,
    });
  }
  
  const requestMessages = messages || [{ role: 'user', content: prompt }];
  const provider = MODEL_PROVIDERS[model] || 'venice';
  
  try {
    let result;
    
    if (provider === 'venice') {
      result = await callVeniceAPI(model, requestMessages, { max_tokens, temperature, web_search, uncensored });
    } else {
      result = await callOpenRouterAPI(model, requestMessages, { max_tokens, temperature });
    }
    
    // Calculate OMA-AI price (with markup)
    const usage = result.usage || {};
    const inputTokens = usage.prompt_tokens || 0;
    const outputTokens = usage.completion_tokens || 0;
    
    const omaInputCost = (inputTokens / 1000000) * pricing.input;
    const omaOutputCost = (outputTokens / 1000000) * pricing.output;
    const omaTotalCost = omaInputCost + omaOutputCost;
    
    // Deduct from balance
    userAccount.balance -= omaTotalCost;
    userAccount.tokensUsed += inputTokens + outputTokens;
    
    return res.json({
      success: true,
      response: result.choices[0].message.content,
      model,
      provider,
      tier: pricing.tier,
      usage: {
        prompt_tokens: inputTokens,
        completion_tokens: outputTokens,
        total_tokens: inputTokens + outputTokens,
      },
      billing: {
        input_cost: omaInputCost.toFixed(6),
        output_cost: omaOutputCost.toFixed(6),
        total_cost: omaTotalCost.toFixed(6),
        balance_remaining: userAccount.balance.toFixed(2),
      },
      rate_limit: {
        remaining: rateLimit.remaining,
        tier: userAccount.tier,
      },
    });
    
  } catch (error: any) {
    // Fallback to other provider on failure
    console.error(`${provider} error:`, error.message);
    
    // Try fallback provider
    const fallbackProvider = provider === 'venice' ? 'openrouter' : 'venice';
    
    try {
      let result;
      if (fallbackProvider === 'venice') {
        result = await callVeniceAPI(model, requestMessages, { max_tokens, temperature });
      } else {
        result = await callOpenRouterAPI(model, requestMessages, { max_tokens, temperature });
      }
      
      const usage = result.usage || {};
      const inputTokens = usage.prompt_tokens || 0;
      const outputTokens = usage.completion_tokens || 0;
      const omaTotalCost = ((inputTokens / 1000000) * pricing.input) + ((outputTokens / 1000000) * pricing.output);
      
      return res.json({
        success: true,
        response: result.choices[0].message.content,
        model,
        provider: fallbackProvider,
        fallback: true,
        tier: pricing.tier,
        usage: {
          prompt_tokens: inputTokens,
          completion_tokens: outputTokens,
          total_tokens: inputTokens + outputTokens,
        },
        billing: {
          total_cost: omaTotalCost.toFixed(6),
        },
      });
      
    } catch (fallbackError: any) {
      return res.status(503).json({
        error: 'Both providers failed',
        primary_error: error.message,
        fallback_error: fallbackError.message,
      });
    }
  }
}
