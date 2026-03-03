import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI LLM Gateway v3 - Refactored
 * Routes to local model first, then cloud providers
 * Tracks credits (FREE for local models)
 */

// Configuration
const CONFIG = {
  local: {
    enabled: true,
    endpoint: 'http://localhost:8081/v1/chat/completions',
    healthCheck: 'http://localhost:8081/health',
    timeout: 120000, // 2 minutes for slow CPU inference
  },
  venice: {
    endpoint: 'https://api.venice.ai/api/v1/chat/completions',
    apiKey: process.env.VENICE_API_KEY,
    timeout: 30000,
  },
  openrouter: {
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: process.env.OPENROUTER_API_KEY,
    timeout: 30000,
  },
};

// Model routing
const MODEL_ROUTING: Record<string, { provider: string; model: string }> = {
  'qwen-3.5-4b-local': { provider: 'local', model: 'qwen' },
  'deepseek-v3.2': { provider: 'venice', model: 'deepseek-v3.2' },
  'deepseek-r1-671b': { provider: 'venice', model: 'deepseek-r1-671b' },
  'llama-3.2-1b': { provider: 'venice', model: 'llama-3.2-1b' },
  'llama-3.3-70b': { provider: 'venice', model: 'llama-3.3-70b' },
  'glm-4.7': { provider: 'openrouter', model: 'openrouter/z-ai/glm-4.7' },
  'qwen-3-coder': { provider: 'openrouter', model: 'openrouter/qwen/qwen3-coder-next' },
};

// Credit costs (per 1K tokens)
const CREDIT_COSTS: Record<string, { input: number; output: number }> = {
  'qwen-3.5-4b-local': { input: 0, output: 0 }, // FREE
  'deepseek-v3.2': { input: 0.30, output: 1.20 },
  'deepseek-r1-671b': { input: 0.60, output: 2.50 },
  'llama-3.2-1b': { input: 0.02, output: 0.08 },
  'llama-3.3-70b': { input: 0.45, output: 1.80 },
  'glm-4.7': { input: 0.10, output: 0.40 },
  'qwen-3-coder': { input: 0.15, output: 0.60 },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, model = 'qwen-3.5-4b-local', stream = false, max_tokens = 1000, temperature = 0.7 } = req.body;

  // Validate input
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array required' });
  }

  const apiKey = req.headers['x-api-key'] as string;
  if (!apiKey && model !== 'qwen-3.5-4b-local') {
    return res.status(401).json({ error: 'API key required for cloud models' });
  }

  try {
    // Get routing info
    const routing = MODEL_ROUTING[model];
    if (!routing) {
      return res.status(400).json({ 
        error: 'Invalid model',
        available: Object.keys(MODEL_ROUTING)
      });
    }

    // Route to appropriate provider
    let response;
    let provider = routing.provider;

    if (routing.provider === 'local') {
      // Check if local model is available
      const healthCheck = await fetch(CONFIG.local.healthCheck, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      }).catch(() => null);

      if (healthCheck?.ok) {
        response = await callLocal(routing.model, messages, max_tokens, temperature, stream);
      } else {
        // Fallback to Venice
        provider = 'venice';
        response = await callVenice('deepseek-v3.2', messages, max_tokens, temperature, stream);
      }
    } else if (routing.provider === 'venice') {
      response = await callVenice(routing.model, messages, max_tokens, temperature, stream);
    } else if (routing.provider === 'openrouter') {
      response = await callOpenRouter(routing.model, messages, max_tokens, temperature, stream);
    }

    if (!response) {
      return res.status(500).json({ error: 'Failed to get response' });
    }

    // Calculate credits
    const costs = CREDIT_COSTS[model] || { input: 0.10, output: 0.40 };
    const inputTokens = response.usage?.prompt_tokens || 0;
    const outputTokens = response.usage?.completion_tokens || 0;
    const totalCredits = (inputTokens * costs.input / 1000) + (outputTokens * costs.output / 1000);

    // Return response
    res.json({
      success: true,
      id: response.id || `llm-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model,
      provider,
      choices: response.choices,
      usage: {
        ...response.usage,
        credits: {
          input: (inputTokens * costs.input / 1000).toFixed(4),
          output: (outputTokens * costs.output / 1000).toFixed(4),
          total: totalCredits.toFixed(4),
        }
      },
      privacy: provider === 'local' ? '100% local, zero data retention' : 'cloud-based',
    });

  } catch (error: any) {
    console.error('LLM v3 error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message,
    });
  }
}

// Local model caller
async function callLocal(model: string, messages: any[], max_tokens: number, temperature: number, stream: boolean) {
  const response = await fetch(CONFIG.local.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      max_tokens,
      temperature,
      stream,
    }),
    signal: AbortSignal.timeout(CONFIG.local.timeout),
  });

  if (!response.ok) {
    throw new Error(`Local model error: ${response.status}`);
  }

  return response.json();
}

// Venice AI caller
async function callVenice(model: string, messages: any[], max_tokens: number, temperature: number, stream: boolean) {
  if (!CONFIG.venice.apiKey) {
    throw new Error('Venice API key not configured');
  }

  const response = await fetch(CONFIG.venice.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CONFIG.venice.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens,
      temperature,
      stream,
    }),
    signal: AbortSignal.timeout(CONFIG.venice.timeout),
  });

  if (!response.ok) {
    throw new Error(`Venice error: ${response.status}`);
  }

  return response.json();
}

// OpenRouter caller
async function callOpenRouter(model: string, messages: any[], max_tokens: number, temperature: number, stream: boolean) {
  if (!CONFIG.openrouter.apiKey) {
    throw new Error('OpenRouter API key not configured');
  }

  const response = await fetch(CONFIG.openrouter.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CONFIG.openrouter.apiKey}`,
      'HTTP-Referer': 'https://oma-ai.com',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens,
      temperature,
      stream,
    }),
    signal: AbortSignal.timeout(CONFIG.openrouter.timeout),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter error: ${response.status}`);
  }

  return response.json();
}
