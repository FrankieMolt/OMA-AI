import { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI Credits-Only Pricing API
 * No subscriptions - Pay as you go with credits
 */

// Credit packages (1 credit ≈ $0.001)
const CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 10000,
    price: 10,
    bonus: 0,
    description: 'Perfect for trying out',
    features: ['10K credits', 'All models', 'No expiry', 'Priority support'],
  },
  {
    id: 'basic',
    name: 'Basic',
    credits: 55000,
    price: 45,
    bonus: 5000,
    description: 'Most popular',
    features: ['55K credits', '+5K bonus', 'All models', 'Priority support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 115000,
    price: 85,
    bonus: 15000,
    description: 'Best value',
    features: ['115K credits', '+15K bonus', 'All models', 'Priority support'],
  },
  {
    id: 'team',
    name: 'Team',
    credits: 600000,
    price: 400,
    bonus: 100000,
    description: 'For teams',
    features: ['600K credits', '+100K bonus', 'All models', 'Priority support', 'Team dashboard'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 1250000,
    price: 750,
    bonus: 250000,
    description: 'For enterprises',
    features: ['1.25M credits', '+250K bonus', 'All models', 'Priority support', 'Team dashboard', 'Custom models'],
  },
];

// Model costs (credits per 1K tokens)
const MODEL_COSTS = {
  // Local models (FREE)
  'qwen-3.5-4b-local': { input: 0, output: 0, name: 'Qwen 3.5 4B (Local)', provider: 'local' },
  'llama-3.2-3b-local': { input: 0, output: 0, name: 'Llama 3.2 3B (Local)', provider: 'local' },
  
  // Cloud models (Venice AI)
  'llama-3.2-1b': { input: 0.02, output: 0.08, name: 'Llama 3.2 1B', provider: 'venice' },
  'llama-3.3-70b': { input: 0.45, output: 1.80, name: 'Llama 3.3 70B', provider: 'venice' },
  'deepseek-v3.2': { input: 0.30, output: 1.20, name: 'DeepSeek v3.2', provider: 'venice' },
  'deepseek-r1-671b': { input: 0.60, output: 2.50, name: 'DeepSeek R1 671B', provider: 'venice' },
  'qwen-2.5-7b': { input: 0.06, output: 0.24, name: 'Qwen 2.5 7B', provider: 'venice' },
  'mistral-31-24b': { input: 0.20, output: 0.80, name: 'Mistral 31 24B', provider: 'venice' },
  
  // Premium models (OpenRouter)
  'gpt-4o': { input: 2.50, output: 10.00, name: 'GPT-4o', provider: 'openrouter' },
  'claude-3.5-sonnet': { input: 3.00, output: 15.00, name: 'Claude 3.5 Sonnet', provider: 'openrouter' },
  'claude-3-opus': { input: 15.00, output: 75.00, name: 'Claude 3 Opus', provider: 'openrouter' },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const { action } = req.query;
  
  try {
    switch (action) {
      case 'packages':
        return res.json({ success: true, packages: CREDIT_PACKAGES });
      
      case 'models':
        return res.json({ success: true, models: MODEL_COSTS });
      
      case 'calculate':
        const { model, inputTokens, outputTokens } = req.body;
        const costs = MODEL_COSTS[model as keyof typeof MODEL_COSTS];
        
        if (!costs) {
          return res.status(400).json({ error: 'Invalid model' });
        }
        
        const inputCost = (inputTokens / 1000) * costs.input;
        const outputCost = (outputTokens / 1000) * costs.output;
        const totalCost = inputCost + outputCost;
        
        return res.json({
          success: true,
          model,
          provider: costs.provider,
          inputCost,
          outputCost,
          totalCost,
          usdEquivalent: totalCost * 0.001,
        });
      
      default:
        return res.json({
          success: true,
          pricing: {
            type: 'credits',
            description: 'Pay as you go - No subscriptions',
            packages: CREDIT_PACKAGES,
            models: MODEL_COSTS,
            note: 'Local models are FREE (0 credits)',
          },
        });
    }
  } catch (error: any) {
    console.error('Pricing API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
