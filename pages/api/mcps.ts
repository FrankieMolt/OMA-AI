import type { NextApiRequest, NextApiResponse } from 'next';

// MCP Servers marketplace data (simulated - in production from Supabase)
const MCP_SERVERS = [
  {
    id: 'price-mcp',
    name: 'Price MCP Server',
    description: 'Real-time cryptocurrency pricing data for AI agents',
    category: 'finance',
    price: 0.001,
    provider: 'Huramkin',
    downloads: 1250,
    rating: 4.8,
    tags: ['crypto', 'price', 'finance', 'real-time'],
    features: ['Real-time prices', 'Multi-chain', 'Historical data'],
    x402_enabled: true
  },
  {
    id: 'weather-mcp',
    name: 'Weather MCP Server',
    description: 'Weather forecasts and conditions for any location',
    category: 'data',
    price: 0.002,
    provider: 'OMA-AI',
    downloads: 890,
    rating: 4.6,
    tags: ['weather', 'forecast', 'location'],
    features: ['7-day forecast', 'Hourly data', 'Alerts'],
    x402_enabled: true
  },
  {
    id: 'search-mcp',
    name: 'Web Search MCP',
    description: 'Enable your AI agent to search the web in real-time',
    category: 'utilities',
    price: 0.005,
    provider: 'OMA-AI',
    downloads: 2100,
    rating: 4.9,
    tags: ['search', 'web', 'research', 'AI'],
    features: ['Brave Search API', 'Image search', 'News search'],
    x402_enabled: true
  },
  {
    id: 'github-mcp',
    name: 'GitHub MCP Server',
    description: 'Manage repositories, issues, and PRs from your AI agent',
    category: 'development',
    price: 0.003,
    provider: 'Smithery',
    downloads: 3400,
    rating: 4.7,
    tags: ['github', 'dev', 'repository', 'CI/CD'],
    features: ['Repo management', 'Issues', 'PRs', 'Actions'],
    x402_enabled: false
  },
  {
    id: 'gmail-mcp',
    name: 'Gmail MCP Server',
    description: 'Read, send, and manage emails from your AI agent',
    category: 'productivity',
    price: 0.004,
    provider: 'Smithery',
    downloads: 1800,
    rating: 4.5,
    tags: ['email', 'gmail', 'productivity'],
    features: ['Send emails', 'Read inbox', 'Labels', 'Drafts'],
    x402_enabled: false
  },
  {
    id: 'slack-mcp',
    name: 'Slack MCP Server',
    description: 'Post messages and manage Slack from your AI agent',
    category: 'productivity',
    price: 0.003,
    provider: 'Smithery',
    downloads: 950,
    rating: 4.4,
    tags: ['slack', 'messaging', 'team'],
    features: ['Send messages', 'Channels', 'DMs', 'Files'],
    x402_enabled: false
  },
  {
    id: 'database-mcp',
    name: 'Database MCP Server',
    description: 'Query and manage databases from your AI agent',
    category: 'development',
    price: 0.01,
    provider: 'OMA-AI',
    downloads: 650,
    rating: 4.3,
    tags: ['database', 'sql', 'postgres', 'mysql'],
    features: ['PostgreSQL', 'MySQL', 'Query builder', 'Schema'],
    x402_enabled: true
  },
  {
    id: 'llm-mcp',
    name: 'LLM Gateway MCP',
    description: 'Access multiple LLM providers through one unified API',
    category: 'ai',
    price: 0.02,
    provider: 'OMA-AI',
    downloads: 4200,
    rating: 4.9,
    tags: ['AI', 'LLM', 'GPT', 'Claude', 'Gemini'],
    features: ['GPT-4', 'Claude 3', 'Gemini Pro', 'Streaming'],
    x402_enabled: true
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  const { category, search, sort, x402 } = req.query;

  let servers = [...MCP_SERVERS];

  // Filter by category
  if (category && category !== 'all') {
    servers = servers.filter(s => s.category === category);
  }

  // Filter by search
  if (search) {
    const q = (search as string).toLowerCase();
    servers = servers.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Filter by x402
  if (x402 === 'true') {
    servers = servers.filter(s => s.x402_enabled);
  }

  // Sort
  if (sort === 'downloads') {
    servers.sort((a, b) => b.downloads - a.downloads);
  } else if (sort === 'price') {
    servers.sort((a, b) => a.price - b.price);
  } else if (sort === 'rating') {
    servers.sort((a, b) => b.rating - a.rating);
  }

  const categories = [...new Set(MCP_SERVERS.map(s => s.category))];

  res.json({
    success: true,
    count: servers.length,
    total: MCP_SERVERS.length,
    servers,
    categories,
    filters: {
      category: category || 'all',
      search: search || '',
      sort: sort || 'downloads',
      x402_only: x402 === 'true'
    }
  });
}