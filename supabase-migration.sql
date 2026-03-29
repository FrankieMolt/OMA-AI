-- OMA-AI MCP Marketplace — Supabase SQL Migration
-- Run this in your Supabase SQL Editor after creating the project at supabase.com
-- Project URL: Create at https://supabase.com/dashboard/new
-- Then run: npx supabase link --project-ref <your-project-ref>

-- ============================================================
-- STEP 1: Create tables
-- ============================================================

CREATE TABLE IF NOT EXISTS mcp_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT[],
  description TEXT,
  long_description TEXT,
  author TEXT,
  author_email TEXT,
  repository_url TEXT,
  website_url TEXT,
  documentation_url TEXT,
  logo_url TEXT,
  version TEXT,
  mcp_endpoint TEXT NOT NULL,
  transport TEXT DEFAULT 'sse',
  pricing_usdc NUMERIC DEFAULT 0,
  x402_enabled BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  rating NUMERIC,
  total_calls INTEGER DEFAULT 0,
  success_rate NUMERIC,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STEP 2: Enable RLS
-- ============================================================

ALTER TABLE mcp_servers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read mcp_servers" ON mcp_servers
  FOR SELECT USING (true);

CREATE POLICY "Service role write mcp_servers" ON mcp_servers
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- STEP 3: Seed MCP servers (28 entries)
-- ============================================================

INSERT INTO mcp_servers (slug, name, category, description, author, repository_url, version, mcp_endpoint, transport, pricing_usdc, x402_enabled, verified, rating, total_calls, tags)
VALUES
  ('jupiter-swap-mcp', 'Jupiter Swap MCP', ARRAY['blockchain'], 'Solana DEX aggregator. Best rates across Raydium, Orca, Marinade, Jupiter.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/jupiter-swap-mcp', 'sse', 0, true, true, 4.9, 1247, ARRAY['solana','dex','swap','defi']),
  ('helius-mcp', 'Helius MCP', ARRAY['blockchain'], 'Full Solana RPC suite — getBlock, getSignaturesForAddress, DAS API, webhooks.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/helius-mcp', 'sse', 0, true, true, 4.9, 893, ARRAY['solana','rpc','webhook','das']),
  ('pumpfun-sniper', 'pump.fun Sniper MCP', ARRAY['blockchain'], 'Score pump.fun tokens before buying. Dev wallet analysis, RugCheck, honeypot detection.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/pumpfun-sniper', 'sse', 0.005, true, true, 4.8, 562, ARRAY['pump.fun','solana','meme','snipe','rugcheck']),
  ('trade-router', 'TradeRouter MCP', ARRAY['blockchain'], 'MEV-protected Jupiter swaps, trailing orders, DCA, and limit orders on Solana.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/trade-router', 'sse', 0, true, true, 4.9, 734, ARRAY['solana','mev','dca','limit-order','jupiter']),
  ('vercel-mcp', 'Vercel MCP', ARRAY['infrastructure'], 'Deploy, manage, and monitor Vercel projects. Env vars, builds, rollbacks.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/vercel-mcp', 'sse', 0, true, true, 4.7, 445, ARRAY['vercel','deploy','ci','infrastructure']),
  ('coolify-mcp', 'Coolify MCP', ARRAY['infrastructure'], 'Self-host databases, Redis, Docker containers. Full Coolify API via MCP.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/coolify-mcp', 'sse', 0, true, true, 4.7, 312, ARRAY['coolify','docker','self-host','database','redis']),
  ('github-mcp', 'GitHub MCP', ARRAY['developer-tools'], 'Code, PRs, issues, workflows. Full GitHub API for AI agents.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/github-mcp', 'sse', 0.001, true, true, 4.9, 2103, ARRAY['github','git','pr','issues','ci']),
  ('anthropic-claude-mcp', 'Anthropic Claude MCP', ARRAY['ai'], 'Claude 3.5/3.7 Sonnet with vision, structured outputs, extended thinking.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/anthropic-claude-mcp', 'sse', 0.015, true, true, 4.9, 1892, ARRAY['anthropic','claude','ai','vision','llm']),
  ('browser-automation-mcp', 'Browser Automation MCP', ARRAY['automation'], 'Headless Chrome control — navigate, click, type, screenshot via MCP.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/browser-automation-mcp', 'sse', 0, true, true, 4.6, 678, ARRAY['browser','automation','chrome','puppeteer','screenshot']),
  ('postgresql-mcp', 'PostgreSQL MCP', ARRAY['data'], 'Query, insert, update PostgreSQL. AI agents can talk directly to databases.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/postgresql-mcp', 'sse', 0.005, true, true, 4.7, 445, ARRAY['postgresql','database','sql','query']),
  ('openai-gpt-mcp', 'OpenAI GPT MCP', ARRAY['ai'], 'GPT-4o, o1, o3-mini via MCP. Structured outputs, vision, function calling.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/openai-gpt-mcp', 'sse', 0.01, true, true, 4.8, 1234, ARRAY['openai','gpt','ai','llm','vision']),
  ('figma-mcp', 'Figma MCP', ARRAY['design'], 'Read Figma files, extract components, styles, and export assets via MCP.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/figma-mcp', 'sse', 0, true, true, 4.5, 234, ARRAY['figma','design','ui','components']),
  ('fetch-mcp', 'Fetch MCP', ARRAY['utilities'], 'Web fetch — HTML, Markdown, JSON, YouTube transcripts. AI agents read the web.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/fetch-mcp', 'sse', 0, true, true, 4.8, 3456, ARRAY['fetch','web','scraping','youtube','http']),
  ('docker-mcp', 'Docker MCP', ARRAY['infrastructure'], 'Manage Docker containers, images, volumes, networks via MCP.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/docker-mcp', 'sse', 0, true, true, 4.6, 567, ARRAY['docker','containers','devops','infrastructure']),
  ('exa-search-mcp', 'Exa Search MCP', ARRAY['ai'], 'AI-powered web search. Natural language queries, full-text extraction, citations.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/exa-search-mcp', 'sse', 0, true, true, 4.7, 890, ARRAY['search','ai','exa','web','citations']),
  ('email-mcp', 'Email MCP', ARRAY['communication'], 'Send transactional emails via SMTP, SES, or Resend. AI agents notify users.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/email-mcp', 'sse', 0, true, true, 4.6, 345, ARRAY['email','smtp','ses','resend','notifications']),
  ('cohere-command-mcp', 'Cohere Command MCP', ARRAY['ai'], 'Cohere Command R/R+ for AI agents. 200k context, reranking, embeddings.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/cohere-command-mcp', 'sse', 0.005, true, true, 4.7, 567, ARRAY['cohere','ai','embeddings','rerank','llm']),
  ('stable-diffusion-mcp', 'Stable Diffusion MCP', ARRAY['images'], 'Image generation via Stable Diffusion 3, Flux, ComfyUI. Inpaint, outpaint.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/stable-diffusion-mcp', 'sse', 0.002, true, true, 4.6, 432, ARRAY['stable-diffusion','image-generation','flux','ai-art']),
  ('searxng-mcp', 'SearXNG MCP', ARRAY['utilities'], 'Private, bias-free web search. 100+ engines, no tracking, no ads.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/searxng-mcp', 'sse', 0, true, true, 4.5, 234, ARRAY['search','privacy','searxng','bias-free']),
  ('alpha-vantage-mcp', 'Alpha Vantage MCP', ARRAY['finance'], 'Stock market data, crypto prices, FX rates, and economic indicators.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/alpha-vantage-mcp', 'sse', 0, true, true, 4.6, 345, ARRAY['stocks','crypto','fx','finance','alpha-vantage']),
  ('ethereum-web3-mcp', 'Ethereum Web3 MCP', ARRAY['blockchain'], 'Ethereum and EVM chain access. Wallet balances, contract calls, ENS resolution.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/ethereum-web3-mcp', 'sse', 0, true, true, 4.7, 456, ARRAY['ethereum','evm','web3','defi','ens']),
  ('filesystem-mcp', 'Filesystem MCP', ARRAY['utilities'], 'Read, write, and manage files. Glob patterns, syntax highlighting.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/filesystem-mcp', 'sse', 0, true, true, 4.5, 234, ARRAY['filesystem','files','read','write']),
  ('memory-mcp', 'Memory MCP', ARRAY['ai'], 'Persistent memory store for AI agents. Entity tracking, relationship mapping.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/memory-mcp', 'sse', 0, true, true, 4.8, 789, ARRAY['memory','vector','persistence','ai']),
  ('sequential-thinking-mcp', 'Sequential Thinking MCP', ARRAY['ai'], 'Structured problem-solving through multi-step reasoning chains.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/sequential-thinking-mcp', 'sse', 0, true, true, 4.7, 456, ARRAY['thinking','reasoning','ai','chain-of-thought']),
  ('slack-mcp', 'Slack MCP', ARRAY['communication'], 'Send messages, manage channels, handle webhooks. AI agents in your Slack.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/slack-mcp', 'sse', 0, true, true, 4.5, 234, ARRAY['slack','messaging','webhook','team-communication']),
  ('solana-rpc-mcp', 'Solana RPC MCP', ARRAY['blockchain'], 'Direct Solana RPC access. Faster than Helius for high-throughput agents.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/solana-rpc-mcp', 'sse', 0, true, true, 4.6, 345, ARRAY['solana','rpc','blockchain']),
  ('tavily-search-mcp', 'Tavily Search MCP', ARRAY['ai'], 'AI-optimized web search with citation. Built for LLM grounding and RAG.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/tavily-search-mcp', 'sse', 0, true, true, 4.7, 567, ARRAY['tavily','search','rag','ai','citations']),
  ('weather-mcp', 'Weather MCP', ARRAY['utilities'], 'Current weather, 7-day forecasts, historical data. Global coverage via Open-Meteo.', 'OMA-AI Team', 'https://github.com/FrankieMolt/OMA-AI', '1.0.0', 'https://www.oma-ai.com/mcp/weather-mcp', 'sse', 0, true, true, 4.6, 890, ARRAY['weather','forecast','meteo','utilities'])
ON CONFLICT (slug) DO UPDATE SET
  name=EXCLUDED.name,
  description=EXCLUDED.description,
  pricing_usdc=EXCLUDED.pricing_usdc,
  x402_enabled=EXCLUDED.x402_enabled,
  verified=EXCLUDED.verified,
  rating=EXCLUDED.rating,
  total_calls=EXCLUDED.total_calls,
  updated_at=NOW();

-- ============================================================
-- STEP 4: Create indexes for performance
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_mcp_servers_slug ON mcp_servers(slug);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_category ON mcp_servers USING GIN(category);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_rating ON mcp_servers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_price ON mcp_servers(pricing_usdc);
