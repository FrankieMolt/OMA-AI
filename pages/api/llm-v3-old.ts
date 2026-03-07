import type { NextApiRequest, NextApiResponse } from 'next';
import { checkCredits, deductCredits } from '../../lib/middleware/credits-middleware';

/**
 * OMA-AI LLM Gateway v3 - With Credits
 * 
 * Routes to local model first, falls back to cloud
 * Tracks credit usage
 */

const LOCAL_QWEN = 'http://localhost:8081/v1/chat/completions';
const VENICE_API_URL = 'https://api.venice.ai/api/v1';

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

  const { prompt, model = 'default', max_tokens = 1000, temperature = 0.7 } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  try {
    // Check credits (estimates 500 input + 500 output)
    const creditCheck = await checkCredits(req, model, 500, max_tokens);
    
    if (!creditCheck.allowed) {
      return res.status(402).json({ 
        error: creditCheck.error,
        creditsNeeded: creditCheck.creditsNeeded
      });
    }

    // Try local model first (if Qwen 3.5 4B)
    if (model === 'qwen-3.5-4b-local') {
      try {
        const localResponse = await fetch(LOCAL_QWEN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'qwen',
            messages: [{ role: 'user', content: prompt }],
            max_tokens,
            temperature
          })
        });

        if (localResponse.ok) {
          const result = await localResponse.json();
          const outputTokens = result.usage?.completion_tokens || max_tokens;
          
          // Deduct credits (FREE for local model)
          await deductCredits(
            req.headers['x-api-key'] as string,
            model,
            500,
            outputTokens,
            `req_${Date.now()}`
          );

          return res.json({
            success: true,
            response: result.choices[0].message.content,
            model: 'qwen-3.5-4b-local',
            provider: 'local',
            cost: { credits: 0, usd: '$0.00' },
            usage: result.usage
          });
        }
      } catch (error) {
        console.error('Local model failed, falling back to cloud:', error);
      }
    }

    // Use Venice AI for cloud models
    const veniceApiKey = process.env.VENICE_API_KEY;
    if (!veniceApiKey) {
      return res.status(500).json({ 
        error: 'VENICE_API_KEY not configured' 
      });
    }

    const veniceResponse = await fetch(`${VENICE_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${veniceApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: getVeniceModel(model),
        messages: [{ role: 'user', content: prompt }],
        max_tokens,
        temperature
      })
    });

    if (!veniceResponse.ok) {
      const error = await veniceResponse.text();
      return res.status(veniceResponse.status).json({
        error: 'Venice API error',
        details: error
      });
    }

    const result = await veniceResponse.json();
    const inputTokens = result.usage?.prompt_tokens || 500;
    const outputTokens = result.usage?.completion_tokens || max_tokens;

    // Deduct credits
    const deduction = await deductCredits(
      req.headers['x-api-key'] as string,
      model,
      inputTokens,
      outputTokens,
      `req_${Date.now()}`
    );

    return res.json({
      success: true,
      response: result.choices[0].message.content,
      model,
      provider: 'venice',
      cost: {
        credits: creditCheck.creditsNeeded,
        usd: `$${(creditCheck.creditsNeeded / 1000).toFixed(4)}`
      },
      usage: result.usage,
      remainingCredits: deduction.remainingCredits
    });

  } catch (error: any) {
    console.error('LLM v3 error:', error);
    return res.status(500).json({
      error: 'Failed to process request',
      details: error.message
    });
  }
}

function getVeniceModel(model: string): string {
  const modelMap: Record<string, string> = {
    'default': 'deepseek-v3.2',
    'cheap': 'zai-org-glm-4.7-flash',
    'fast': 'zai-org-glm-4.7-flash',
    'code': 'qwen3-coder-480b-a35b-instruct-turbo',
    'premium': 'claude-sonnet-4-6',
    'best': 'claude-opus-4-6'
  };
  
  return modelMap[model] || model;
}
