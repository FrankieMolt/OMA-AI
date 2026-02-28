import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI LLM Gateway
 * 
 * Multi-provider LLM access with privacy-first routing
 * Providers: Venice AI (primary), OpenRouter (fallback), NVIDIA (optional)
 * 
 * Pricing: https://oma-ai.com/docs/llm-pricing
 */

const VENICE_API_URL = 'https://api.venice.ai/api/v1';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1';

const VENICE_API_KEY = process.env.VENICE_API_KEY || '';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';

// Real model IDs with pricing (input/output per 1M tokens)
const MODELS: Record<string, {
  id: string;
  provider: 'venice' | 'openrouter' | 'nvidia';
  inputPrice: number;
  outputPrice: number;
  context: number;
  privacy: 'private' | 'anonymized';
}> = {
  // === VENICE AI MODELS (Privacy-First) ===
  'claude-opus-4-5': {
    id: 'claude-opus-4-5',
    provider: 'venice',
    inputPrice: 7.20,
    outputPrice: 36.00,
    context: 198000,
    privacy: 'anonymized'
  },
  'claude-sonnet-4-6': {
    id: 'claude-sonnet-4-6',
    provider: 'venice',
    inputPrice: 4.32,
    outputPrice: 21.60,
    context: 1000000,
    privacy: 'anonymized'
  },
  'deepseek-v3.2': {
    id: 'deepseek-v3.2',
    provider: 'venice',
    inputPrice: 0.50,
    outputPrice: 1.25,
    context: 160000,
    privacy: 'private'
  },
  'glm-4.7-flash': {
    id: 'zai-org-glm-4.7-flash',
    provider: 'venice',
    inputPrice: 0.17,
    outputPrice: 0.65,
    context: 128000,
    privacy: 'private'
  },
  'glm-5': {
    id: 'zai-org-glm-5',
    provider: 'venice',
    inputPrice: 1.25,
    outputPrice: 4.00,
    context: 198000,
    privacy: 'private'
  },
  'gpt-5.2': {
    id: 'openai-gpt-52',
    provider: 'venice',
    inputPrice: 2.63,
    outputPrice: 21.00,
    context: 256000,
    privacy: 'anonymized'
  },
  'kimi-k2.5': {
    id: 'kimi-k2-5',
    provider: 'venice',
    inputPrice: 0.94,
    outputPrice: 4.69,
    context: 256000,
    privacy: 'private'
  },
  'llama-3.3-70b': {
    id: 'llama-3.3-70b',
    provider: 'venice',
    inputPrice: 0.88,
    outputPrice: 3.50,
    context: 128000,
    privacy: 'private'
  },
  'minimax-m2.5': {
    id: 'minimax-m25',
    provider: 'venice',
    inputPrice: 0.52,
    outputPrice: 2.08,
    context: 198000,
    privacy: 'private'
  },
  'qwen-3-235b': {
    id: 'qwen3-235b-a22b-instruct-2507',
    provider: 'venice',
    inputPrice: 0.19,
    outputPrice: 0.94,
    context: 128000,
    privacy: 'private'
  },
  'qwen-3-coder': {
    id: 'qwen3-coder-480b-a35b-instruct',
    provider: 'venice',
    inputPrice: 0.94,
    outputPrice: 3.75,
    context: 256000,
    privacy: 'private'
  },
  'venice-uncensored': {
    id: 'venice-uncensored',
    provider: 'venice',
    inputPrice: 0.26,
    outputPrice: 1.17,
    context: 32000,
    privacy: 'private'
  },
  
  // === OPENROUTER MODELS (Cheapest) ===
  'llama-3.2-3b': {
    id: 'meta-llama/llama-3.2-3b-instruct',
    provider: 'openrouter',
    inputPrice: 0.03,
    outputPrice: 0.03,
    context: 131000,
    privacy: 'anonymized'
  },
  'llama-3.3-70b-free': {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    provider: 'openrouter',
    inputPrice: 0,
    outputPrice: 0,
    context: 128000,
    privacy: 'anonymized'
  },
  'qwen-3-coder-free': {
    id: 'qwen/qwen3-coder:free',
    provider: 'openrouter',
    inputPrice: 0,
    outputPrice: 0,
    context: 262000,
    privacy: 'anonymized'
  },
  'deepseek-v3.2-or': {
    id: 'deepseek/deepseek-v3.2',
    provider: 'openrouter',
    inputPrice: 0.31,
    outputPrice: 0.50,
    context: 163000,
    privacy: 'anonymized'
  },
  
  // === NVIDIA MODELS ===
  'qwen-3.5-397b': {
    id: 'qwen/qwen3.5-397b-a17b',
    provider: 'nvidia',
    inputPrice: 0.69,
    outputPrice: 4.38,
    context: 262000,
    privacy: 'anonymized'
  }
};

// Default model aliases
const ALIASES: Record<string, string> = {
  'default': 'deepseek-v3.2',
  'cheap': 'glm-4.7-flash',
  'code': 'qwen-3-coder',
  'premium': 'kimi-k2.5',
  'uncensored': 'venice-uncensored',
  'free': 'llama-3.3-70b-free'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET - list models
  if (req.method === 'GET') {
    const modelList = Object.entries(MODELS).map(([alias, model]) => ({
      id: alias,
      model_id: model.id,
      provider: model.provider,
      pricing: {
        input: `$${model.inputPrice}/M`,
        output: `$${model.outputPrice}/M`
      },
      context: model.context,
      privacy: model.privacy
    }));
    
    return res.json({
      success: true,
      models: modelList,
      aliases: ALIASES,
      default: 'deepseek-v3.2'
    });
  }

  // Handle POST - completion
  const { 
    prompt, 
    model = 'default', 
    max_tokens = 1000, 
    temperature = 0.7,
    web_search = false,
    uncensored = false,
    stream = false
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
      available: Object.keys(MODELS)
    });
  }

  // Check API keys
  const providerKey = modelConfig.provider === 'venice' ? VENICE_API_KEY :
                      modelConfig.provider === 'openrouter' ? OPENROUTER_API_KEY :
                      NVIDIA_API_KEY;

  if (!providerKey) {
    return res.json({
      success: false,
      error: `${modelConfig.provider.toUpperCase()}_API_KEY not configured`,
      model: modelAlias,
      setup: `Set ${modelConfig.provider.toUpperCase()}_API_KEY environment variable`
    });
  }

  try {
    // Build API URL based on provider
    const apiUrl = modelConfig.provider === 'venice' ? VENICE_API_URL :
                   modelConfig.provider === 'openrouter' ? OPENROUTER_API_URL :
                   NVIDIA_API_URL;

    // Build request
    const apiRequest: any = {
      model: modelConfig.id,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: Number(max_tokens),
      temperature: Number(temperature)
    };

    // Venice-specific features
    if (modelConfig.provider === 'venice') {
      apiRequest.venice_parameters = {};
      
      if (web_search) {
        apiRequest.venice_parameters.enable_web_search = 'on';
      }
      
      if (uncensored) {
        apiRequest.venice_parameters.include_venice_system_prompt = false;
      }
    }

    // Make API call
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${providerKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiRequest)
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({
        success: false,
        error: `${modelConfig.provider} API error`,
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
      provider: modelConfig.provider,
      privacy: modelConfig.privacy,
      usage: {
        prompt_tokens: usage.prompt_tokens,
        completion_tokens: usage.completion_tokens,
        total_tokens: usage.total_tokens
      },
      cost: {
        input: inputCost.toFixed(6),
        output: outputCost.toFixed(6),
        total: totalCost.toFixed(6)
      },
      timestamp: Date.now()
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: 'LLM service unavailable',
      message: error.message
    });
  }
}
