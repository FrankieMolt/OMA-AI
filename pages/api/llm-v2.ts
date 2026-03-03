import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../lib/auth-middleware';
import { rateLimit, trackTokens } from '../lib/rate-limiter';
import { createPaymentRequirement } from '../lib/x402-enhanced';
import { calculateCost } from '../lib/pricing';

/**
 * OMA-AI LLM Endpoint v2
 * 
 * Features:
 * - User authentication (API key or session)
 * - Rate limiting (tier-based)
 * - Token tracking
 * - X402 payment support (for non-subscribers)
 * - Cost calculation
 */

const VENICE_API = 'https://api.venice.ai/api/v1';
const OPENROUTER_API = 'https://openrouter.ai/api/v1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-Payment');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Try authentication first
  const apiKey = req.headers['x-api-key'] as string;
  const authHeader = req.headers['authorization'];

  if (apiKey || authHeader) {
    // Authenticated flow
    await authenticate(req, res, async (user) => {
      // Apply rate limiting
      await rateLimit(req, res, async () => {
        await processLLMRequest(req, res, user);
      });
    });
  } else {
    // X402 payment flow (no auth)
    const paymentHeader = req.headers['x-payment'] as string;

    if (!paymentHeader) {
      // Return 402 with payment requirement
      const requirement = createPaymentRequirement({ endpoint: '/api/llm' });
      
      res.setHeader('X-Payment-Required', JSON.stringify(requirement));
      return res.status(402).json({
        error: 'Payment Required',
        code: 'X402_OR_AUTH_REQUIRED',
        message: 'Provide X-API-Key header or X-Payment for access',
        payment: requirement,
        auth: {
          signup: 'https://oma-ai.com/api/auth/signup',
          docs: 'https://oma-ai.com/docs/auth'
        }
      });
    }

    // Process X402 payment
    const { verifyPayment } = await import('../lib/x402-enhanced');
    const verification = await verifyPayment(paymentHeader);

    if (!verification.valid) {
      return res.status(402).json({
        error: 'Payment Invalid',
        code: 'X402_PAYMENT_INVALID',
        message: verification.error
      });
    }

    // Process without user context
    await processLLMRequest(req, res, null, verification.payment);
  }
}

async function processLLMRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  user: any,
  payment?: any
) {
  try {
    const { model, messages, max_tokens = 1000, temperature = 0.7 } = req.body;

    if (!model || !messages) {
      return res.status(400).json({ error: 'model and messages required' });
    }

    // Route to provider
    const provider = model.includes('claude') || model.includes('gpt') ? 'openrouter' : 'venice';
    const apiUrl = provider === 'venice' ? VENICE_API : OPENROUTER_API;
    const apiKey = provider === 'venice' 
      ? process.env.VENICE_API_KEY 
      : process.env.OPENROUTER_API_KEY;

    // Call LLM
    const startTime = Date.now();
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://oma-ai.com',
        'X-Title': 'OMA-AI'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens,
        temperature
      })
    });

    if (!response.ok) {
      throw new Error(`${provider} API error: ${response.status}`);
    }

    const data = await response.json();
    const responseTime = Date.now() - startTime;

    // Calculate tokens and cost
    const inputTokens = data.usage?.prompt_tokens || estimateTokens(messages);
    const outputTokens = data.usage?.completion_tokens || max_tokens;
    const totalTokens = inputTokens + outputTokens;
    const cost = calculateCost(model, inputTokens, outputTokens);

    // Track usage if authenticated
    if (user) {
      await trackTokens(user.id, totalTokens);
    }

    // Return response
    return res.status(200).json({
      ...data,
      usage: {
        prompt_tokens: inputTokens,
        completion_tokens: outputTokens,
        total_tokens: totalTokens
      },
      cost: {
        input: (inputTokens / 1_000_000 * (cost / totalTokens * inputTokens)).toFixed(6),
        output: (outputTokens / 1_000_000 * (cost / totalTokens * outputTokens)).toFixed(6),
        total: cost.toFixed(6)
      },
      meta: {
        provider,
        response_time_ms: responseTime,
        tier: user?.tier || 'x402',
        remaining_tokens: user ? user.tokens_limit - user.tokens_used - totalTokens : null,
        payment: payment ? { verified: true } : null
      }
    });

  } catch (error: any) {
    console.error('LLM error:', error);
    return res.status(500).json({
      error: 'LLM request failed',
      message: error.message
    });
  }
}

function estimateTokens(messages: any[]): number {
  const text = messages.map(m => m.content).join(' ');
  return Math.ceil(text.length / 4);
}
