/**
 * OMA-AI LLM API Endpoint
 * Resells OpenRouter with markup
 */

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1';

// Our pricing (with markup)
const PRICING = {
  'llama-3.1-8b': { cost: 0.00002, sell: 0.005, name: 'Llama 3.1 8B' },
  'llama-3.1-70b': { cost: 0.00012, sell: 0.02, name: 'Llama 3.1 70B' },
  'llama-3.1-405b': { cost: 0.002, sell: 0.05, name: 'Llama 3.1 405B' },
  'gpt-4o-mini': { cost: 0.00015, sell: 0.01, name: 'GPT-4o Mini' },
  'gpt-4o': { cost: 0.0025, sell: 0.03, name: 'GPT-4o' },
  'claude-3.5-sonnet': { cost: 0.003, sell: 0.025, name: 'Claude 3.5 Sonnet' },
  'claude-3-haiku': { cost: 0.00025, sell: 0.008, name: 'Claude 3 Haiku' },
  'mistral-large': { cost: 0.002, sell: 0.02, name: 'Mistral Large' },
  'deepseek-v3': { cost: 0.00027, sell: 0.015, name: 'DeepSeek V3' },
  'qwen-2.5-72b': { cost: 0.00035, sell: 0.018, name: 'Qwen 2.5 72B' }
};

// Model mapping to OpenRouter
const MODEL_MAP = {
  'llama-3.1-8b': 'meta-llama/llama-3.1-8b-instruct:free',
  'llama-3.1-70b': 'meta-llama/llama-3.1-70b-instruct',
  'llama-3.1-405b': 'meta-llama/llama-3.1-405b-instruct',
  'gpt-4o-mini': 'openai/gpt-4o-mini',
  'gpt-4o': 'openai/gpt-4o',
  'claude-3.5-sonnet': 'anthropic/claude-3.5-sonnet',
  'claude-3-haiku': 'anthropic/claude-3-haiku',
  'mistral-large': 'mistralai/mistral-large',
  'deepseek-v3': 'deepseek/deepseek-chat',
  'qwen-2.5-72b': 'qwen/qwen-2.5-72b-instruct'
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Payment');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    // List available models
    return res.json({
      models: Object.entries(PRICING).map(([id, p]) => ({
        id,
        name: p.name,
        price_per_request: p.sell,
        markup: Math.round((p.sell / p.cost - 1) * 100) + '%'
      }))
    });
  }
  
  if (req.method === 'POST') {
    const { model, messages, ...params } = req.body;
    
    // Validate model
    if (!PRICING[model]) {
      return res.status(400).json({ error: 'Invalid model' });
    }
    
    const pricing = PRICING[model];
    
    // Check payment (for now, allow free preview)
    const payment = req.headers['x-payment'];
    if (!payment) {
      return res.status(402).json({
        error: 'Payment required',
        x402: {
          amount: pricing.sell,
          recipient: process.env.PAYMENT_ADDRESS,
          network: 'base-mainnet'
        }
      });
    }
    
    try {
      // Forward to OpenRouter
      const response = await fetch(`${OPENROUTER_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://oma-ai.com',
          'X-Title': 'OMA-AI'
        },
        body: JSON.stringify({
          model: MODEL_MAP[model],
          messages,
          ...params
        })
      });
      
      const data = await response.json();
      
      // Add payment info
      data.payment = {
        charged: pricing.sell,
        model
      };
      
      return res.json(data);
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
