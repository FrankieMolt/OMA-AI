import type { NextApiRequest, NextApiResponse } from 'next';

const LLM_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', context: 128000, input_price: 2.5, output_price: 10, tier: 'flagship', vision: true, streaming: true },
  { id: 'gpt-4o-mini', name: 'GPT-4o-mini', provider: 'OpenAI', context: 128000, input_price: 0.15, output_price: 0.6, tier: 'balanced', vision: true, streaming: true },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', context: 128000, input_price: 10, output_price: 30, tier: 'flagship', vision: true, streaming: true },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context: 200000, input_price: 3, output_price: 15, tier: 'flagship', vision: true, streaming: true },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', context: 200000, input_price: 0.25, output_price: 1.25, tier: 'balanced', vision: true, streaming: true },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', context: 200000, input_price: 15, output_price: 75, tier: 'flagship', vision: true, streaming: true },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', context: 1000000, input_price: 1.25, output_price: 5, tier: 'flagship', vision: true, streaming: true },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', context: 1000000, input_price: 0.075, output_price: 0.3, tier: 'balanced', vision: true, streaming: true },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Meta', context: 128000, input_price: 0.9, output_price: 0.9, tier: 'flagship', vision: false, streaming: true },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', provider: 'Meta', context: 128000, input_price: 0.2, output_price: 0.2, tier: 'balanced', vision: false, streaming: true },
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', context: 128000, input_price: 2, output_price: 6, tier: 'flagship', vision: false, streaming: true },
  { id: 'mistral-nemo', name: 'Mistral Nemo', provider: 'Mistral', context: 128000, input_price: 0.15, output_price: 0.15, tier: 'balanced', vision: false, streaming: true },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=300');

  const { provider, tier, search } = req.query;

  let models = [...LLM_MODELS];

  if (provider) {
    models = models.filter(m => m.provider.toLowerCase() === (provider as string).toLowerCase());
  }

  if (tier) {
    models = models.filter(m => m.tier === tier);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    models = models.filter(m => 
      m.name.toLowerCase().includes(q) || 
      m.provider.toLowerCase().includes(q)
    );
  }

  const providers = [...new Set(LLM_MODELS.map(m => m.provider))];

  res.json({
    success: true,
    count: models.length,
    total: LLM_MODELS.length,
    models,
    providers,
    tiers: ['flagship', 'balanced', 'cheap'],
    aggregation: {
      type: 'unified_api',
      format: 'openai_compatible',
      auth: 'api_key'
    }
  });
}