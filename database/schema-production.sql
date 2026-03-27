-- Production Supabase Schema (Synced 2026-03-27)
-- Tables confirmed via /rest/v1 API

-- =====================================================
-- CORE MCP MARKETPLACE TABLES
-- =====================================================

-- MCP Servers registry (confirmed: 19 records)
CREATE TABLE IF NOT EXISTS mcp_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT[], -- PostgreSQL array
  description TEXT,
  long_description TEXT,
  author TEXT DEFAULT 'OMA-AI Team',
  author_email TEXT,
  repository_url TEXT,
  website_url TEXT,
  documentation_url TEXT,
  logo_url TEXT,
  version TEXT DEFAULT '1.0.0',
  mcp_endpoint TEXT,
  transport TEXT DEFAULT 'sse', -- 'sse' | 'stdio' | 'streamable-http'
  pricing_usdc NUMERIC(10,6) DEFAULT 0,
  x402_enabled BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active', -- 'active' | 'inactive' | 'deprecated'
  rating NUMERIC(2,1) DEFAULT 0,
  total_calls INTEGER DEFAULT 0,
  success_rate NUMERIC(5,2) DEFAULT 0,
  tags TEXT[],
  x402_pay_to TEXT, -- Wallet address for payments
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (confirmed via API)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Keys for MCP access
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_hash TEXT UNIQUE NOT NULL, -- SHA-256 of key
  user_id UUID REFERENCES users(id),
  name TEXT,
  prefix TEXT DEFAULT 'oma-',
  scopes TEXT[], -- PostgreSQL array
  rate_limit INTEGER DEFAULT 60, -- RPM
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ
);

-- Transaction log for x402 payments
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_hash TEXT,
  from_address TEXT,
  to_address TEXT,
  amount NUMERIC(20,0), -- USDC micro-units
  endpoint TEXT,
  mcp_server_id UUID REFERENCES mcp_servers(id),
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending', -- 'pending' | 'confirmed' | 'failed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage statistics
CREATE TABLE IF NOT EXISTS usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  endpoint TEXT NOT NULL,
  calls INTEGER DEFAULT 0,
  tokens_used BIGINT DEFAULT 0,
  cost_usdc NUMERIC(20,0) DEFAULT 0,
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- x402 nonce tracking for payment verification
CREATE TABLE IF NOT EXISTS x402_nonces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nonce TEXT UNIQUE NOT NULL,
  caller TEXT NOT NULL, -- Wallet address
  requirement JSONB, -- Payment requirement
  used BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MCP Server tools (individual endpoints per MCP)
CREATE TABLE IF NOT EXISTS mcp_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  pricing_usdc NUMERIC(10,6) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews/ratings for MCP servers
CREATE TABLE IF NOT EXISTS mcp_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MCP categories (for marketplace filtering)
CREATE TABLE IF NOT EXISTS mcp_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

-- =====================================================
-- AGENT WALLET & COMMERCE TABLES
-- =====================================================

-- Agent profiles (for /api/agents)
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES users(id),
  description TEXT,
  capabilities TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Human services marketplace
CREATE TABLE IF NOT EXISTS human_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  provider_id UUID REFERENCES users(id),
  category TEXT,
  price_usdc NUMERIC(10,2),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FINANCIAL TABLES
-- =====================================================

-- Payout tracking
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  amount NUMERIC(20,0) NOT NULL, -- USDC micro-units
  wallet TEXT,
  status TEXT DEFAULT 'pending', -- 'pending' | 'processing' | 'completed' | 'failed'
  tx_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Credits/purchases (future use)
CREATE TABLE IF NOT EXISTS credit_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  amount NUMERIC(20,0),
  price_usdc NUMERIC(20,0),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_mcp_servers_status ON mcp_servers(status);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_category ON mcp_servers USING GIN(category);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_rating ON mcp_servers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_mcp ON transactions(mcp_server_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_user ON usage_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);
