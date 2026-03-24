import { NextRequest, NextResponse } from 'next/server';

const MCP_DATA = [
  {
    id: '1',
    name: 'Anthropic Claude MCP',
    slug: 'anthropic-claude-mcp',
    category: 'AI/ML',
    description: 'Access Claude 4 Opus and Sonnet models via MCP protocol. Advanced reasoning, code generation, and analysis.',
    long_description: 'Connect to Anthropic Claude models for advanced AI capabilities including complex reasoning, code generation, document analysis, and multi-turn conversations.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.015,
    x402_enabled: true,
    verified: true,
    rating: 4.9,
    total_calls: 45230,
    success_rate: 99.7,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/claude',
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'OpenAI GPT MCP',
    slug: 'openai-gpt-mcp',
    category: 'AI/ML',
    description: 'Access GPT-5 and o3 models via MCP protocol. Fast inference, multimodal capabilities.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.020,
    x402_enabled: true,
    verified: true,
    rating: 4.8,
    total_calls: 38920,
    success_rate: 99.5,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/openai',
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Cohere Command MCP',
    slug: 'cohere-command-mcp',
    category: 'AI/ML',
    description: 'Enterprise-grade language models optimized for RAG, search, and classification.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.008,
    x402_enabled: true,
    verified: true,
    rating: 4.6,
    total_calls: 12450,
    success_rate: 99.2,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/cohere',
    created_at: '2026-01-20T00:00:00Z',
  },
  {
    id: '4',
    name: 'Stable Diffusion MCP',
    slug: 'stable-diffusion-mcp',
    category: 'AI/ML',
    description: 'Generate and edit images with SDXL and SD3. ControlNet, img2img, and upscaling.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.025,
    x402_enabled: true,
    verified: true,
    rating: 4.7,
    total_calls: 28100,
    success_rate: 98.9,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/stability',
    created_at: '2026-01-18T00:00:00Z',
  },
  {
    id: '5',
    name: 'PostgreSQL Query MCP',
    slug: 'postgres-query-mcp',
    category: 'Data & Databases',
    description: 'Execute SQL queries, manage schemas, and run migrations on PostgreSQL databases.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.005,
    x402_enabled: true,
    verified: true,
    rating: 4.8,
    total_calls: 67800,
    success_rate: 99.8,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/postgres',
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: '6',
    name: 'Redis Cache MCP',
    slug: 'redis-cache-mcp',
    category: 'Data & Databases',
    description: 'High-performance caching, pub/sub, and rate limiting with Redis.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.001,
    x402_enabled: true,
    verified: true,
    rating: 4.7,
    total_calls: 89200,
    success_rate: 99.9,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/redis',
    created_at: '2026-01-12T00:00:00Z',
  },
  {
    id: '7',
    name: 'CoinGecko Prices MCP',
    slug: 'coingecko-prices-mcp',
    category: 'Finance & Crypto',
    description: 'Real-time crypto prices, market data, and historical charts. 10,000+ tokens.',
    author: 'OMA-AI Team',
    pricing_usdc: 0,
    x402_enabled: true,
    verified: true,
    rating: 4.9,
    total_calls: 156000,
    success_rate: 99.9,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/coingecko',
    created_at: '2026-01-08T00:00:00Z',
  },
  {
    id: '8',
    name: 'Jupiter Swap MCP',
    slug: 'jupiter-swap-mcp',
    category: 'Finance & Crypto',
    description: 'Solana DEX aggregator for token swaps. Best rates across all liquidity sources.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.002,
    x402_enabled: true,
    verified: true,
    rating: 4.8,
    total_calls: 43200,
    success_rate: 99.6,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/jupiter',
    created_at: '2026-02-01T00:00:00Z',
  },
  {
    id: '9',
    name: 'GitHub Integration MCP',
    slug: 'github-integration-mcp',
    category: 'Developer Tools',
    description: 'Full GitHub API access. Repos, issues, PRs, actions, code search, and more.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.001,
    x402_enabled: true,
    verified: true,
    rating: 4.9,
    total_calls: 94500,
    success_rate: 99.8,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/github',
    created_at: '2026-01-05T00:00:00Z',
  },
  {
    id: '10',
    name: 'Weather API MCP',
    slug: 'weather-api-mcp',
    category: 'Utilities',
    description: 'Real-time weather data and 14-day forecasts for any location. Free tier available.',
    author: 'OMA-AI Team',
    pricing_usdc: 0,
    x402_enabled: true,
    verified: true,
    rating: 4.9,
    total_calls: 112000,
    success_rate: 99.9,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/weather',
    created_at: '2026-01-06T00:00:00Z',
  },
  {
    id: '11',
    name: 'Exa Web Search MCP',
    slug: 'exa-web-search-mcp',
    category: 'Web & Search',
    description: 'AI-powered web search with semantic understanding. Better than traditional search APIs.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.004,
    x402_enabled: true,
    verified: true,
    rating: 4.8,
    total_calls: 52100,
    success_rate: 99.1,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/exa',
    created_at: '2026-01-14T00:00:00Z',
  },
  {
    id: '12',
    name: 'S3 Storage MCP',
    slug: 's3-storage-mcp',
    category: 'Utilities',
    description: 'S3-compatible object storage. Upload, download, list, and manage files.',
    author: 'OMA-AI Team',
    pricing_usdc: 0.002,
    x402_enabled: true,
    verified: true,
    rating: 4.7,
    total_calls: 34600,
    success_rate: 99.7,
    mcp_endpoint: 'https://api.oma-ai.com/mcp/s3',
    created_at: '2026-01-17T00:00:00Z',
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Try Supabase first if configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data: mcp } = await supabase
        .from('mcp_servers')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();

      if (mcp) {
        const { data: tools } = await supabase
          .from('mcp_tools')
          .select('*')
          .eq('mcp_server_id', mcp.id);

        return NextResponse.json({
          success: true,
          data: { ...mcp, tools: tools || [] },
        });
      }
    } catch (error) {
      console.log('Supabase not available, using fallback data');
    }
  }

  // Fallback to local data
  const skill = MCP_DATA.find(m => m.slug === slug);
  
  if (!skill) {
    return NextResponse.json(
      { success: false, error: 'MCP not found', data: null },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: { ...skill, tools: [] },
  });
}
