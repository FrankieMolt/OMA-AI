import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI LLM Gateway - 38 Models
 * 
 * Powered by Venice AI infrastructure
 * Privacy-first, zero data retention for private models
 */

const VENICE_API_URL = 'https://api.venice.ai/api/v1';
const VENICE_API_KEY = process.env.VENICE_API_KEY || '';

// All 38 models with real pricing
const MODELS: Record<string, {
  id: string;
  provider: 'venice';
  inputPrice: number;
  outputPrice: number;
  context: number;
  privacy: 'private' | 'anonymized';
  tier: 'budget' | 'standard' | 'premium';
  bestFor: string;
}> = {
  // Budget Tier (< $0.50/M input)
  'nemotron-3-nano-30b': {
    id: 'nvidia-nemotron-3-nano-30b-a3b',
    provider: 'venice',
    inputPrice: 0.07,
    outputPrice: 0.30,
    context: 128000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Simple Q&A, quick tasks'
  },
  'gpt-oss-120b': {
    id: 'openai-gpt-oss-120b',
    provider: 'venice',
    inputPrice: 0.07,
    outputPrice: 0.30,
    context: 128000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Open source alternative'
  },
  'gemma-3-27b': {
    id: 'google-gemma-3-27b-it',
    provider: 'venice',
    inputPrice: 0.12,
    outputPrice: 0.20,
    context: 198000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Lightweight tasks'
  },
  'glm-4.7-flash': {
    id: 'zai-org-glm-4.7-flash',
    provider: 'venice',
    inputPrice: 0.13,
    outputPrice: 0.50,
    context: 128000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Fast, cheap, private'
  },
  'glm-4.7-flash-heretic': {
    id: 'olafangensan-glm-4.7-flash-heretic',
    provider: 'venice',
    inputPrice: 0.14,
    outputPrice: 0.80,
    context: 128000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Uncensored, cheap'
  },
  'llama-3.2-3b': {
    id: 'llama-3.2-3b',
    provider: 'venice',
    inputPrice: 0.15,
    outputPrice: 0.60,
    context: 128000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Simple tasks, fast'
  },
  'qwen-3-235b': {
    id: 'qwen3-235b-a22b-instruct-2507',
    provider: 'venice',
    inputPrice: 0.15,
    outputPrice: 0.75,
    context: 128000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Balanced quality/cost'
  },
  'venice-uncensored': {
    id: 'venice-uncensored',
    provider: 'venice',
    inputPrice: 0.20,
    outputPrice: 0.90,
    context: 32000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Uncensored, no filters'
  },
  'grok-code-fast-1': {
    id: 'grok-code-fast-1',
    provider: 'venice',
    inputPrice: 0.25,
    outputPrice: 1.87,
    context: 256000,
    privacy: 'anonymized',
    tier: 'budget',
    bestFor: 'Fast coding'
  },
  'qwen-3-coder-turbo': {
    id: 'qwen3-coder-480b-a35b-instruct-turbo',
    provider: 'venice',
    inputPrice: 0.35,
    outputPrice: 1.50,
    context: 256000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Code generation, fast'
  },
  'qwen-3-next-80b': {
    id: 'qwen3-next-80b',
    provider: 'venice',
    inputPrice: 0.35,
    outputPrice: 1.90,
    context: 256000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'General purpose'
  },
  'qwen-3.5-35b': {
    id: 'qwen3-5-35b-a3b',
    provider: 'venice',
    inputPrice: 0.31,
    outputPrice: 2.50,
    context: 256000,
    privacy: 'private',
    tier: 'budget',
    bestFor: 'Balanced tasks'
  },

  // Standard Tier ($0.40-$1.10/M input)
  'deepseek-v3.2': {
    id: 'deepseek-v3.2',
    provider: 'venice',
    inputPrice: 0.40,
    outputPrice: 1.00,
    context: 160000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Best value, excellent quality'
  },
  'minimax-m2.1': {
    id: 'minimax-m21',
    provider: 'venice',
    inputPrice: 0.40,
    outputPrice: 1.60,
    context: 198000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Balanced performance'
  },
  'minimax-m2.5': {
    id: 'minimax-m25',
    provider: 'venice',
    inputPrice: 0.40,
    outputPrice: 1.60,
    context: 198000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Latest MiniMax'
  },
  'qwen-3-235b-thinking': {
    id: 'qwen3-235b-a22b-thinking-2507',
    provider: 'venice',
    inputPrice: 0.45,
    outputPrice: 3.50,
    context: 128000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Complex reasoning'
  },
  'grok-4.1-fast': {
    id: 'grok-41-fast',
    provider: 'venice',
    inputPrice: 0.50,
    outputPrice: 1.25,
    context: 256000,
    privacy: 'anonymized',
    tier: 'standard',
    bestFor: 'X AI fast model'
  },
  'glm-4.7': {
    id: 'zai-org-glm-4.7',
    provider: 'venice',
    inputPrice: 0.55,
    outputPrice: 2.65,
    context: 198000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Chinese/English bilingual'
  },
  'glm-4.6': {
    id: 'zai-org-glm-4.6',
    provider: 'venice',
    inputPrice: 0.85,
    outputPrice: 2.75,
    context: 198000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'General purpose'
  },
  'gemini-3-flash': {
    id: 'gemini-3-flash-preview',
    provider: 'venice',
    inputPrice: 0.70,
    outputPrice: 3.75,
    context: 256000,
    privacy: 'anonymized',
    tier: 'standard',
    bestFor: 'Google fast model'
  },
  'llama-3.3-70b': {
    id: 'llama-3.3-70b',
    provider: 'venice',
    inputPrice: 0.70,
    outputPrice: 2.80,
    context: 128000,
    privacy: 'private',
    tier: 'standard',
    bestFor: "Meta's best open model"
  },
  'kimi-k2-thinking': {
    id: 'kimi-k2-thinking',
    provider: 'venice',
    inputPrice: 0.75,
    outputPrice: 3.20,
    context: 256000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Complex reasoning'
  },
  'kimi-k2.5': {
    id: 'kimi-k2-5',
    provider: 'venice',
    inputPrice: 0.75,
    outputPrice: 3.75,
    context: 256000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Premium quality'
  },
  'qwen-3-coder-480b': {
    id: 'qwen3-coder-480b-a35b-instruct',
    provider: 'venice',
    inputPrice: 0.75,
    outputPrice: 3.00,
    context: 256000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Code specialist'
  },
  'hermes-3-405b': {
    id: 'hermes-3-llama-3.1-405b',
    provider: 'venice',
    inputPrice: 1.10,
    outputPrice: 3.00,
    context: 128000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Uncensored, large'
  },
  'glm-5': {
    id: 'zai-org-glm-5',
    provider: 'venice',
    inputPrice: 1.00,
    outputPrice: 3.20,
    context: 198000,
    privacy: 'private',
    tier: 'standard',
    bestFor: 'Latest GLM'
  },

  // Premium Tier ($2+/M input)
  'gemini-3-pro': {
    id: 'gemini-3-pro-preview',
    provider: 'venice',
    inputPrice: 2.50,
    outputPrice: 15.00,
    context: 198000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: "Google's best"
  },
  'gemini-3.1-pro': {
    id: 'gemini-3-1-pro-preview',
    provider: 'venice',
    inputPrice: 2.50,
    outputPrice: 15.00,
    context: 1000000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'Massive context'
  },
  'gpt-5.2': {
    id: 'openai-gpt-52',
    provider: 'venice',
    inputPrice: 2.19,
    outputPrice: 17.50,
    context: 256000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'OpenAI latest'
  },
  'gpt-5.2-codex': {
    id: 'openai-gpt-52-codex',
    provider: 'venice',
    inputPrice: 2.19,
    outputPrice: 17.50,
    context: 256000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'Code specialist'
  },
  'gpt-5.3-codex': {
    id: 'openai-gpt-53-codex',
    provider: 'venice',
    inputPrice: 2.19,
    outputPrice: 17.50,
    context: 400000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'Latest code model'
  },
  'claude-sonnet-4.5': {
    id: 'claude-sonnet-4-5',
    provider: 'venice',
    inputPrice: 3.75,
    outputPrice: 18.75,
    context: 198000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'Anthropic balanced'
  },
  'claude-sonnet-4.6': {
    id: 'claude-sonnet-4-6',
    provider: 'venice',
    inputPrice: 3.60,
    outputPrice: 18.00,
    context: 1000000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'Claude + 1M context'
  },
  'claude-opus-4.5': {
    id: 'claude-opus-4-5',
    provider: 'venice',
    inputPrice: 6.00,
    outputPrice: 30.00,
    context: 198000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'Expert analysis'
  },
  'claude-opus-4.6': {
    id: 'claude-opus-4-6',
    provider: 'venice',
    inputPrice: 6.00,
    outputPrice: 30.00,
    context: 1000000,
    privacy: 'anonymized',
    tier: 'premium',
    bestFor: 'Most capable Claude'
  },
};

// Aliases for common use cases
const ALIASES: Record<string, string> = {
  'default': 'deepseek-v3.2',
  'cheap': 'glm-4.7-flash',
  'fast': 'glm-4.7-flash',
  'code': 'qwen-3-coder-turbo',
  'premium': 'kimi-k2.5',
  'uncensored': 'venice-uncensored',
  'best': 'claude-opus-4.6',
  'smart': 'claude-sonnet-4.6'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - List all models
  if (req.method === 'GET') {
    const modelList = Object.entries(MODELS).map(([alias, model]) => ({
      id: alias,
      model_id: model.id,
      privacy: model.privacy,
      tier: model.tier,
      pricing: {
        input: model.inputPrice,
        output: model.outputPrice,
        unit: 'per 1M tokens'
      },
      context: model.context,
      best_for: model.bestFor
    }));

    return res.json({
      success: true,
      total: modelList.length,
      models: modelList,
      aliases: ALIASES,
      default_model: 'deepseek-v3.2',
      privacy_info: {
        private: 'Zero data retention, runs on Venice infrastructure',
        anonymized: 'Proxied through Venice, your identity hidden from provider'
      }
    });
  }

  // POST - Chat completion
  const { 
    prompt, 
    model = 'default', 
    max_tokens = 1000, 
    temperature = 0.7,
    web_search = false,
    uncensored = false
  } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  // Resolve alias
  const modelAlias = ALIASES[model] || model;
  const modelConfig = MODELS[modelAlias];

  if (!modelConfig) {
    return res.status(400).json({ 
      error: 'Unknown model',
      available: Object.keys(MODELS),
      aliases: ALIASES
    });
  }

  if (!VENICE_API_KEY) {
    return res.json({
      success: false,
      error: 'VENICE_API_KEY not configured',
      model: modelAlias,
      setup: 'Set VENICE_API_KEY environment variable at https://venice.ai/settings/api'
    });
  }

  try {
    const veniceRequest: any = {
      model: modelConfig.id,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: Number(max_tokens),
      temperature: Number(temperature)
    };

    // Venice-specific features
    veniceRequest.venice_parameters = {};
    
    if (web_search) {
      veniceRequest.venice_parameters.enable_web_search = 'on';
    }
    
    if (uncensored) {
      veniceRequest.venice_parameters.include_venice_system_prompt = false;
    }

    const response = await fetch(`${VENICE_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VENICE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(veniceRequest)
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({
        success: false,
        error: 'Venice API error',
        details: error
      });
    }

    const result = await response.json();

    // Calculate cost
    const usage = result.usage || {};
    const inputCost = (usage.prompt_tokens || 0) * (modelConfig.inputPrice / 1000000);
    const outputCost = (usage.completion_tokens || 0) * (modelConfig.outputPrice / 1000000);
    const totalCost = inputCost + outputCost;

    return res.json({
      success: true,
      response: result.choices[0].message.content,
      model: modelAlias,
      model_id: modelConfig.id,
      privacy: modelConfig.privacy,
      tier: modelConfig.tier,
      usage: {
        prompt_tokens: usage.prompt_tokens,
        completion_tokens: usage.completion_tokens,
        total_tokens: usage.total_tokens
      },
      cost: {
        input_usd: inputCost.toFixed(6),
        output_usd: outputCost.toFixed(6),
        total_usd: totalCost.toFixed(6)
      },
      timestamp: Date.now()
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: 'Venice API unavailable',
      message: error.message
    });
  }
}
