import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI LLM Gateway - Powered by Venice AI
 * 
 * Venice AI: Privacy-first, uncensored, sovereign AI inference
 * API Docs: https://docs.venice.ai
 */

const VENICE_API_URL = 'https://api.venice.ai/api/v1';
const VENICE_API_KEY = process.env.VENICE_API_KEY || '';

// Default models by tier
const MODELS = {
  cheap: 'venice-small',           // $0.05/M tokens
  budget: 'qwen-3-235b',           // $0.14/M tokens
  mid: 'deepseek-v3.2',            // $0.25/M tokens
  high: 'kimi-k2.5',               // $0.50/M tokens
  premium: 'gpt-5.2',              // $2.19/M tokens
  default: 'deepseek-v3.2'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { prompt, model, tier, max_tokens = 1000, temperature = 0.7, web_search, uncensored, private_only } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  // If no Venice API key, return available options
  if (!VENICE_API_KEY) {
    return res.json({
      success: false,
      error: 'Venice API key not configured',
      message: 'Set VENICE_API_KEY environment variable',
      setup: {
        step1: 'Get API key at https://venice.ai/settings/api',
        step2: 'Set environment variable: VENICE_API_KEY=your_key',
        pricing: 'https://venice.ai/pricing'
      },
      features: ['privacy-first', 'uncensored', '35+ models', 'web search', 'multimodal']
    });
  }

  try {
    // Select model based on tier or explicit model
    const selectedModel = model 
      ? model 
      : MODELS[tier as keyof typeof MODELS] || MODELS.default;

    // Build Venice API request
    const veniceRequest: any = {
      model: selectedModel,
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: Number(max_tokens),
      temperature: Number(temperature)
    };

    // Optional features
    if (web_search === 'true') {
      veniceRequest.venice_parameters = veniceRequest.venice_parameters || {};
      veniceRequest.venice_parameters.enable_web_search = true;
    }

    if (uncensored === 'true') {
      veniceRequest.venice_parameters = veniceRequest.venice_parameters || {};
      veniceRequest.venice_parameters.include_venice_system_prompt = false;
    }

    if (private_only === 'true') {
      veniceRequest.venice_parameters = veniceRequest.venice_parameters || {};
      veniceRequest.venice_parameters.slip_forced_inference = true;
    }

    // Call Venice AI
    const veniceResponse = await fetch(`${VENICE_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VENICE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(veniceRequest)
    });

    if (!veniceResponse.ok) {
      const error = await veniceResponse.text();
      return res.status(veniceResponse.status).json({
        success: false,
        error: 'Venice API error',
        details: error
      });
    }

    const result = await veniceResponse.json();

    return res.json({
      success: true,
      response: result.choices[0].message.content,
      model: result.model,
      provider: 'venice-ai',
      usage: result.usage,
      features: {
        privacy: 'zero data retention',
        uncensored: uncensored === 'true',
        web_search: web_search === 'true'
      },
      timestamp: Date.now()
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: 'Venice AI service unavailable',
      message: error.message
    });
  }
}