import { NextResponse } from 'next/server';

const MCP_SKILLS = [
  {
    id: '1',
    name: 'Exa Web Search',
    slug: 'exa-web-search',
    category: ['search', 'ai'],
    description: 'High-quality semantic web search with AI-optimized query rewriting.',
    author: 'oma-ai',
    pricing_usdc: 0.0005,
    x402_enabled: true,
    verified: true,
    rating: 4.5,
    total_calls: 100,
    success_rate: 98.5
  },
  {
    id: '2',
    name: 'ByteOver Memory',
    slug: 'byteover',
    category: ['storage', 'memory', 'ai'],
    description: 'Persistent agent context storage with semantic search and auto-curation.',
    author: 'oma-ai',
    pricing_usdc: 0.001,
    x402_enabled: true,
    verified: true,
    rating: 4.8,
    total_calls: 150,
    success_rate: 99.2
  },
  {
    id: '3',
    name: 'Self-Improving Agent',
    slug: 'self-improving-agent',
    category: ['ai', 'learning'],
    description: 'AI agents that learn from outputs and optimize future responses.',
    author: 'oma-ai',
    pricing_usdc: 0.002,
    x402_enabled: true,
    verified: false,
    rating: 4.2,
    total_calls: 50,
    success_rate: 95
  },
  {
    id: '4',
    name: 'GitHub Repo Manager',
    slug: 'github-repo-manager',
    category: ['dev', 'github'],
    description: 'GitHub repository management, code review, and CI monitoring.',
    author: 'oma-ai',
    pricing_usdc: 0.0015,
    x402_enabled: true,
    verified: true,
    rating: 4.0,
    total_calls: 200,
    success_rate: 97
  },
  {
    id: '5',
    name: 'Weather Forecaster',
    slug: 'weather-forecaster',
    category: ['weather', 'data'],
    description: '7-day weather forecasts with precipitation and temperature data.',
    author: 'oma-ai',
    pricing_usdc: 0.001,
    x402_enabled: true,
    verified: true,
    rating: 4.1,
    total_calls: 300,
    success_rate: 99.5
  },
  {
    id: '6',
    name: 'Smart Contract Auditor',
    slug: 'smart-contract-auditor',
    category: ['blockchain', 'security'],
    description: 'AI-powered smart contract security analysis and vulnerability detection.',
    author: 'oma-ai',
    pricing_usdc: 0.005,
    x402_enabled: true,
    verified: false,
    rating: 3.8,
    total_calls: 25,
    success_rate: 92
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || 'all';
  const verified = searchParams.get('verified') === 'true';

  let filtered = MCP_SKILLS;

  if (category !== 'all') {
    filtered = filtered.filter(skill => skill.category.includes(category));
  }

  if (verified) {
    filtered = filtered.filter(skill => skill.verified);
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  const response = NextResponse.json({
    success: true,
    data: paginated,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      hasNextPage: start + limit < filtered.length,
      hasPrevPage: page > 1
    },
    filters: {
      categories: ['ai', 'blockchain', 'data', 'dev', 'learning', 'memory', 'search', 'security', 'storage', 'weather'],
      verifiedSkillsCount: MCP_SKILLS.filter(s => s.verified).length,
      totalSkills: MCP_SKILLS.length
    }
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300');
  return response;
}
