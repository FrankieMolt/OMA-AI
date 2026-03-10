import type { NextApiRequest, NextApiResponse } from 'next';

// Full API listings (in production, this comes from Supabase)
const API_LISTINGS = [
  {
    id: 'crypto-price',
    name: 'Crypto Prices API',
    description: 'Real-time cryptocurrency prices from CoinGecko',
    category: 'crypto',
    price: 0,
    base_url: '/api/price',
    auth: 'api_key',
    rate_limit: '30/min',
    documentation: '/docs.html#price-api',
    provider: 'OMA-AI',
    endpoints: ['GET /api/price'],
    tags: ['crypto', 'bitcoin', 'ethereum', 'prices'],
    popularity: 100
  },
  {
    id: 'weather-api',
    name: 'Weather API',
    description: '7-day weather forecasts for any city',
    category: 'data',
    price: 0.002,
    base_url: '/api/weather',
    auth: 'api_key',
    rate_limit: '100/day',
    documentation: '/docs.html#weather-api',
    provider: 'OMA-AI',
    endpoints: ['GET /api/weather?city=London'],
    tags: ['weather', 'forecast', 'meteorology'],
    popularity: 85
  },
  {
    id: 'web-search',
    name: 'Web Search API',
    description: 'Brave-powered web search for AI agents',
    category: 'utilities',
    price: 0.005,
    base_url: '/api/search',
    auth: 'api_key',
    rate_limit: '50/day',
    documentation: '/docs.html#search-api',
    provider: 'OMA-AI',
    endpoints: ['GET /api/search?q=query'],
    tags: ['search', 'web', 'research'],
    popularity: 92
  },
  {
    id: 'ai-text',
    name: 'AI Text Generation',
    description: 'Generate text with GPT-4 and Claude',
    category: 'ai',
    price: 0.01,
    base_url: '/api/llm',
    auth: 'api_key',
    rate_limit: '20/day',
    documentation: '/docs.html#llm-api',
    provider: 'OMA-AI',
    endpoints: ['POST /api/llm'],
    tags: ['AI', 'LLM', 'GPT', 'text-generation'],
    popularity: 98
  },
  {
    id: 'embeddings',
    name: 'Text Embeddings API',
    description: 'Generate text embeddings for AI applications',
    category: 'ai',
    price: 0.01,
    base_url: '/api/embeddings',
    auth: 'api_key',
    rate_limit: '50/day',
    documentation: '/docs.html#embeddings-api',
    provider: 'OMA-AI',
    endpoints: ['POST /api/embeddings'],
    tags: ['AI', 'embeddings', 'vectors', 'ML'],
    popularity: 78
  },
  {
    id: 'compute-akash',
    name: 'Akash Compute API',
    description: 'Deploy cloud compute on Akash Network',
    category: 'infrastructure',
    price: 0,
    base_url: '/api/compute',
    auth: 'api_key',
    rate_limit: 'unlimited',
    documentation: '/compute.html',
    provider: 'OMA-AI',
    endpoints: ['GET /api/compute', 'POST /api/compute/deploy'],
    tags: ['compute', 'cloud', 'akash', 'decentralized'],
    popularity: 65
  },
  {
    id: 'marketplace',
    name: 'Public APIs Directory',
    description: 'Curated list of 16+ free public APIs',
    category: 'data',
    price: 0,
    base_url: '/api/marketplace',
    auth: 'none',
    rate_limit: '60/min',
    documentation: '/docs.html',
    provider: 'OMA-AI',
    endpoints: ['GET /api/marketplace'],
    tags: ['APIs', 'directory', 'free', 'curated'],
    popularity: 72
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  const { category, search, sort, free } = req.query;

  let apis = [...API_LISTINGS];

  // Filter by free
  if (free === 'true') {
    apis = apis.filter(a => a.price === 0);
  }

  // Filter by category
  if (category && category !== 'all') {
    apis = apis.filter(a => a.category === category);
  }

  // Search
  if (search) {
    const q = (search as string).toLowerCase();
    apis = apis.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.description.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Sort
  if (sort === 'popularity') {
    apis.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === 'price') {
    apis.sort((a, b) => a.price - b.price);
  } else if (sort === 'name') {
    apis.sort((a, b) => a.name.localeCompare(b.name));
  }

  const categories = [...new Set(API_LISTINGS.map(a => a.category))];

  res.json({
    success: true,
    count: apis.length,
    total: API_LISTINGS.length,
    apis,
    categories,
    platform: {
      name: 'OMA-AI',
      version: '1.0.0',
      revenue_share: '90%',
      x402_enabled: true
    }
  });
}