import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../lib/auth-middleware';
import { rateLimit, trackTokens } from '../../lib/rate-limiter';

/**
 * OMA-AI Secure LLM Gateway
 * 
 * Authenticated endpoint with rate limiting and usage tracking
 */

const VENICE_API_URL = 'https://api.venice.ai/api/v1';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';

// Model routing
const MODEL_PROVIDERS: Record<string, 'venice' | 'openrouter'> = {
  'deepseek-v3.2': 'venice',
  'glm-4.7-flash': 'venice',
  'llama-3.3-70b': 'venice',
  'kimi-k2.5': 'venice',
  'qwen-3-coder': 'venice',
  'venice-uncensored': 'venice',
  'claude-opus-4.6': 'openrouter',
  'claude-sonnet-4.6': 'openrouter',
  'gpt-5.2': 'openrouter',
};

// Pricing (per 1M tokens)
const PRICING: Record<string, { input: number; output: number }> = {
  'deepseek-v3.2': { input: 0.60, output: 1.50 },
  'glm-4.7-flash': { input: 0.20, output: 0.80 },
  'llama-3.3-70b': { input: 1.00, output: 4.00 },
  'kimi-k2.5': { input: 1.10, output: 5.50 },
  'qwen-3-coder': { input: 1.10, output: 4.50 },
  'venice-uncensored': { input: 0.35, output: 1.50 },
  'claude-opus-4.6': { input: 8.00, output: 42.00 },
  'claude-sonnet-4.6': { input: 5.00, output: 25.00 },
  'gpt-5.2': { input: 3.00, output: 24.00 },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authenticate
  await authenticate(req, res, async (user) => {
    // Rate limit
    await rateLimit(req, res, async () => {
      try {
        const { model, messages, max_tokens = 1000, temperature = 0.7, stream = false } = req.body;

        if (!model || !messages) {
          return res.status(400).json({ 
            error: 'model and messages required' 
          });
        }

        const provider = MODEL_PROVIDERS[model] || 'venice';
        const pricing = PRICING[model] || PRICING['glm-4.7-flash'];

        // Call provider
        const startTime = Date.now();
        let response;

        if (provider === 'venice') {
          response = await callVenice(model, messages, { max_tokens, temperature, stream });
        } else {
          response = await callOpenRouter(model, messages, { max_tokens, temperature, stream });
        }

        const responseTime = Date.now() - startTime;

        // Calculate tokens and cost
        const inputTokens = countTokens(messages);
        const outputTokens = response.usage?.completion_tokens || Math.ceil(max_tokens * 0.5);
        const totalTokens = inputTokens + outputTokens;
        
        const cost = (
          (inputTokens / 1000000 * pricing.input) +
          (outputTokens / 1000000 * pricing.output)
        );

        // Track usage
        await trackTokens(user.id, totalTokens);

        // Log API call
        await logApiCall(user.id, model, totalTokens, cost, responseTime);

        // Return response
        return res.status(200).json({
          ...response,
          usage: {
            prompt_tokens: inputTokens,
            completion_tokens: outputTokens,
            total_tokens: totalTokens
          },
          cost: {
            input: (inputTokens / 1000000 * pricing.input).toFixed(6),
            output: (outputTokens / 1000000 * pricing.output).toFixed(6),
            total: cost.toFixed(6)
          },
          tier: user.tier,
          remaining_tokens: user.tokens_limit - user.tokens_used - totalTokens
        });

      } catch (error) {
        console.error('LLM error:', error);
        return res.status(500).json({ 
          error: 'LLM request failed',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });
  });
}

async function callVenice(model: string, messages: any[], options: any) {
  const response = await fetch(`${VENICE_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VENICE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: options.max_tokens,
      temperature: options.temperature,
    }),
  });

  if (!response.ok) {
    throw new Error(`Venice API error: ${response.status}`);
  }

  return response.json();
}

async function callOpenRouter(model: string, messages: any[], options: any) {
  const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://oma-ai.com',
      'X-Title': 'OMA-AI',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: options.max_tokens,
      temperature: options.temperature,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  return response.json();
}

function countTokens(messages: any[]): number {
  // Rough estimation: ~4 chars per token
  const text = messages.map(m => m.content).join(' ');
  return Math.ceil(text.length / 4);
}

async function logApiCall(userId: string, model: string, tokens: number, cost: number, responseTime: number) {
  // This would insert into api_logs table
  // For now, just console log
  console.log('API Call:', {
    userId,
    model,
    tokens,
    cost: cost.toFixed(6),
    responseTime: `${responseTime}ms`
  });
}
