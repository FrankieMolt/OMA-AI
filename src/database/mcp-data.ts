/**
 * Consolidated MCP Fallback Data
 * Single source of truth — imported by api/mcp/list/route.ts and api/marketplace/route.ts
 */

export interface MCPRecord {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  long_description?: string;
  author: string;
  author_email?: string;
  repository_url?: string;
  website_url?: string;
  documentation_url?: string;
  logo_url?: string;
  version?: string;
  mcp_endpoint: string;
  transport?: string;
  pricing_usdc: number;
  x402_enabled: boolean;
  verified: boolean;
  status?: string;
  rating: number;
  total_calls: number;
  success_rate: number;
  avg_latency_ms?: number;
  tags?: string[];
  tools?: string[];
  created_at?: string;
  updated_at?: string;
}

export const MCP_DATA: MCPRecord[] = [
  {
    id: '1', name: 'Anthropic Claude MCP', slug: 'anthropic-claude-mcp',
    category: 'AI/ML', description: 'Access Claude 4 Opus and Sonnet models via MCP protocol.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/claude',
    pricing_usdc: 0.015, x402_enabled: true, verified: true,
    rating: 4.9, total_calls: 45230, success_rate: 99.7,
    tags: ['ai', 'claude', 'anthropic', 'llm'], tools: ['chat', 'completion', 'analyze'],
  },
  {
    id: '2', name: 'OpenAI GPT MCP', slug: 'openai-gpt-mcp',
    category: 'AI/ML', description: 'Access GPT-5 and o3 models via MCP protocol.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/openai',
    pricing_usdc: 0.020, x402_enabled: true, verified: true,
    rating: 4.8, total_calls: 38920, success_rate: 99.5,
    tags: ['ai', 'openai', 'gpt', 'llm'], tools: ['chat', 'completion', 'embeddings'],
  },
  {
    id: '3', name: 'Cohere Command MCP', slug: 'cohere-command-mcp',
    category: 'AI/ML', description: 'Enterprise-grade language models optimized for RAG, search, and classification.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/cohere',
    pricing_usdc: 0.012, x402_enabled: true, verified: true,
    rating: 4.6, total_calls: 18540, success_rate: 99.2,
    tags: ['ai', 'cohere', 'rag', 'search'], tools: ['chat', 'embeddings', 'classify'],
  },
  {
    id: '4', name: 'Solana RPC MCP', slug: 'solana-rpc-mcp',
    category: 'Blockchain', description: 'Direct Solana blockchain access via RPC.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/solana',
    pricing_usdc: 0.005, x402_enabled: true, verified: true,
    rating: 4.7, total_calls: 29870, success_rate: 99.8,
    tags: ['solana', 'blockchain', 'rpc', 'defi'], tools: ['get_account', 'send_transaction'],
  },
  {
    id: '5', name: 'Ethereum Web3 MCP', slug: 'ethereum-web3-mcp',
    category: 'Blockchain', description: 'Ethereum and EVM chain access. Wallet balances, contract calls, ENS resolution.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/ethereum',
    pricing_usdc: 0.008, x402_enabled: true, verified: true,
    rating: 4.5, total_calls: 22100, success_rate: 99.4,
    tags: ['ethereum', 'web3', 'evm', 'wallet'], tools: ['get_balance', 'call_contract', 'resolve_ens'],
  },
  {
    id: '6', name: 'GitHub MCP', slug: 'github-mcp',
    category: 'Developer Tools', description: 'GitHub API integration. Issues, PRs, repos, Actions, code search.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/github',
    pricing_usdc: 0.003, x402_enabled: true, verified: true,
    rating: 4.8, total_calls: 52340, success_rate: 99.9,
    tags: ['github', 'git', 'devops', 'ci'], tools: ['get_repo', 'list_issues', 'create_pr'],
  },
  {
    id: '7', name: 'Filesystem MCP', slug: 'filesystem-mcp',
    category: 'Developer Tools', description: 'Read, write, and manage files. Glob patterns, syntax highlighting.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/filesystem',
    pricing_usdc: 0.001, x402_enabled: true, verified: true,
    rating: 4.4, total_calls: 41200, success_rate: 99.6,
    tags: ['filesystem', 'files', 'io', 'developer'], tools: ['read_file', 'write_file', 'glob'],
  },
  {
    id: '8', name: 'PostgreSQL MCP', slug: 'postgresql-mcp',
    category: 'Data', description: 'PostgreSQL database access. Query execution, schema inspection.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/postgres',
    pricing_usdc: 0.010, x402_enabled: true, verified: true,
    rating: 4.3, total_calls: 15670, success_rate: 99.1,
    tags: ['postgresql', 'database', 'sql', 'data'], tools: ['query', 'get_schema', 'list_tables'],
  },
  {
    id: '9', name: 'Puppeteer MCP', slug: 'puppeteer-mcp',
    category: 'Automation', description: 'Browser automation via Puppeteer. Screenshot, form submission, scraping.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/puppeteer',
    pricing_usdc: 0.015, x402_enabled: true, verified: true,
    rating: 4.5, total_calls: 21340, success_rate: 98.7,
    tags: ['browser', 'automation', 'scraping', 'puppeteer'], tools: ['navigate', 'screenshot', 'click'],
  },
  {
    id: '10', name: 'Slack MCP', slug: 'slack-mcp',
    category: 'Communication', description: 'Slack workspace integration. Send messages, manage channels.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/slack',
    pricing_usdc: 0.008, x402_enabled: true, verified: true,
    rating: 4.2, total_calls: 9870, success_rate: 99.3,
    tags: ['slack', 'messaging', 'chatbot', 'team'], tools: ['send_message', 'list_channels'],
  },
  {
    id: '11', name: 'Weather MCP', slug: 'weather-mcp',
    category: 'Utilities', description: 'Real-time weather data. Current conditions, forecasts, alerts.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/weather',
    pricing_usdc: 0.002, x402_enabled: true, verified: true,
    rating: 4.1, total_calls: 12450, success_rate: 99.5,
    tags: ['weather', 'forecast', 'meteorology'], tools: ['get_current', 'get_forecast'],
  },
  {
    id: '12', name: 'Tavily Search MCP', slug: 'tavily-search-mcp',
    category: 'Search', description: 'Web search and news aggregation. Semantic relevance scoring.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/tavily',
    pricing_usdc: 0.005, x402_enabled: true, verified: true,
    rating: 4.4, total_calls: 34560, success_rate: 99.7,
    tags: ['search', 'web', 'news', 'research'], tools: ['search', 'get_news'],
  },
  {
    id: '13', name: 'Vercel MCP', slug: 'vercel-mcp',
    category: 'DevOps', description: 'Vercel platform management. Deployments, projects, environment variables.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/vercel',
    pricing_usdc: 0.006, x402_enabled: true, verified: true,
    rating: 4.6, total_calls: 18920, success_rate: 99.6,
    tags: ['vercel', 'deploy', 'devops', 'hosting'], tools: ['deploy', 'get_project', 'set_env'],
  },
  {
    id: '14', name: 'Docker MCP', slug: 'docker-mcp',
    category: 'DevOps', description: 'Docker container management. Images, containers, logs, stats.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/docker',
    pricing_usdc: 0.007, x402_enabled: true, verified: true,
    rating: 4.3, total_calls: 11230, success_rate: 99.2,
    tags: ['docker', 'containers', 'devops', 'infrastructure'], tools: ['list_containers', 'get_logs'],
  },
  {
    id: '15', name: 'Memory MCP', slug: 'memory-mcp',
    category: 'AI Agents', description: 'Persistent memory store for AI agents. Entity tracking, relationship mapping.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/memory',
    pricing_usdc: 0.004, x402_enabled: true, verified: true,
    rating: 4.7, total_calls: 28760, success_rate: 99.8,
    tags: ['memory', 'ai-agent', 'context', 'persistence'], tools: ['remember', 'recall', 'search_memory'],
  },
  {
    id: '16', name: 'Sequential Thinking MCP', slug: 'sequential-thinking-mcp',
    category: 'AI Agents', description: 'Structured problem-solving through multi-step reasoning chains.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/thinking',
    pricing_usdc: 0.003, x402_enabled: true, verified: true,
    rating: 4.8, total_calls: 39240, success_rate: 99.9,
    tags: ['thinking', 'reasoning', 'problem-solving'], tools: ['think', 'branch', 'critique'],
  },
  {
    id: '17', name: 'Coolify MCP', slug: 'coolify-mcp',
    category: 'Infrastructure', description: 'Self-hosting platform management. Deploy apps, manage databases, SSL.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/coolify',
    pricing_usdc: 0.009, x402_enabled: true, verified: true,
    rating: 4.5, total_calls: 8760, success_rate: 99.4,
    tags: ['coolify', 'infrastructure', 'self-hosting', 'devops'], tools: ['deploy', 'get_status', 'restart'],
  },
  {
    id: '18', name: 'Alpha Vantage MCP', slug: 'alpha-vantage-mcp',
    category: 'Finance', description: 'Stock market data, crypto prices, FX rates, and economic indicators.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/alpha-vantage',
    pricing_usdc: 0.006, x402_enabled: true, verified: true,
    rating: 4.2, total_calls: 14320, success_rate: 99.0,
    tags: ['finance', 'stocks', 'crypto', 'market-data'], tools: ['get_quote', 'get_daily', 'get_crypto'],
  },
  {
    id: '19', name: 'Helius MCP', slug: 'helius-mcp',
    category: 'Blockchain', description: 'Solana blockchain indexing and analytics via Helius. Enhanced RPC, DAS.',
    author: 'OMA-AI Team', mcp_endpoint: 'https://api.oma-ai.com/mcp/helius',
    pricing_usdc: 0.010, x402_enabled: true, verified: true,
    rating: 4.9, total_calls: 56780, success_rate: 99.9,
    tags: ['solana', 'helius', 'blockchain', 'indexing', 'web3'], tools: ['get_asset', 'get_transactions'],
  },
];

export function getMCPBySlug(slug: string): MCPRecord | undefined {
  return MCP_DATA.find(m => m.slug === slug);
}

export function getMCPByCategory(category: string): MCPRecord[] {
  return MCP_DATA.filter(m => m.category === category);
}

export function getCategories(): string[] {
  return [...new Set(MCP_DATA.map(m => m.category))];
}

export function searchMCPs(query: string): MCPRecord[] {
  const q = query.toLowerCase();
  return MCP_DATA.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.description.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    (m.tags || []).some(t => t.toLowerCase().includes(q))
  );
}
