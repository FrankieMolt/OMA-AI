-- OMA-AI Database Schema
-- Real database tables for functional marketplace
-- Created: 2026-03-10

-- ============================================
-- MCP SKILLS REGISTRY
-- ============================================
CREATE TABLE IF NOT EXISTS mcp_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT[] NOT NULL,
  description TEXT,
  author TEXT,
  repository_url TEXT,
  documentation_url TEXT,
  mcp_endpoint TEXT NOT NULL,
  pricing_usdc NUMERIC(18,8) NOT NULL DEFAULT 0.000001,
  x402_enabled BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  rating NUMERIC(3,2) DEFAULT 0,
  total_calls INTEGER DEFAULT 0,
  success_rate NUMERIC(5,2) DEFAULT 100.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for MCP skills
CREATE INDEX IF NOT EXISTS idx_mcp_category ON mcp_skills USING GIN(category);
CREATE INDEX IF NOT EXISTS idx_mcp_rating ON mcp_skills(rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_mcp_total_calls ON mcp_skills(total_calls DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_mcp_verified ON mcp_skills(verified, rating DESC);
CREATE INDEX IF NOT EXISTS idx_mcp_pricing ON mcp_skills(pricing_usdc ASC);
CREATE INDEX IF NOT EXISTS idx_mcp_slug ON mcp_skills(slug);

-- ============================================
-- AGENT WALLETS
-- ============================================
CREATE TABLE IF NOT EXISTS agent_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  wallet_address TEXT NOT NULL,
  ens_name TEXT,
  chain_id INTEGER NOT NULL DEFAULT 8453, -- Base network
  balance_usdc NUMERIC(18,8) NOT NULL DEFAULT 0,
  total_earned NUMERIC(18,8) NOT NULL DEFAULT 0,
  total_spent NUMERIC(18,8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(agent_id, chain_id)
);

-- Indexes for agent wallets
CREATE INDEX IF NOT EXISTS idx_wallet_address ON agent_wallets(wallet_address);
CREATE INDEX IF NOT EXISTS idx_agent_id ON agent_wallets(agent_id);
CREATE INDEX IF NOT EXISTS idx_wallet_chain ON agent_wallets(chain_id);

-- ============================================
-- TRANSACTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_wallet TEXT NOT NULL,
  to_wallet TEXT NOT NULL,
  amount_usdc NUMERIC(18,8) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  tx_hash TEXT,
  skill_id UUID REFERENCES mcp_skills(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- Transaction status enum
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_status_check;
ALTER TABLE transactions ADD CONSTRAINT transactions_status_check
  CHECK (status IN ('pending', 'completed', 'failed', 'expired'));

-- Indexes for transactions
CREATE INDEX IF NOT EXISTS idx_tx_from_wallet ON transactions(from_wallet);
CREATE INDEX IF NOT EXISTS idx_tx_to_wallet ON transactions(to_wallet);
CREATE INDEX IF NOT EXISTS idx_tx_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_tx_created ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tx_skill ON transactions(skill_id);

-- ============================================
-- LLM MODELS REGISTRY
-- ============================================
CREATE TABLE IF NOT EXISTS llm_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  model_id TEXT NOT NULL,
  context_window INTEGER NOT NULL,
  pricing_input NUMERIC(18,8) NOT NULL DEFAULT 0,
  pricing_output NUMERIC(18,8) NOT NULL DEFAULT 0,
  pricing_usdc NUMERIC(18,8) NOT NULL,
  category TEXT NOT NULL,
  capabilities TEXT[],
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for LLM models
CREATE INDEX IF NOT EXISTS idx_llm_provider ON llm_models(provider);
CREATE INDEX IF NOT EXISTS idx_llm_slug ON llm_models(slug);
CREATE INDEX IF NOT EXISTS idx_llm_pricing ON llm_models(pricing_usdc ASC);
CREATE INDEX IF NOT EXISTS idx_llm_active ON llm_models(active, pricing_usdc ASC);

-- ============================================
-- USAGE METRICS
-- ============================================
CREATE TABLE IF NOT EXISTS usage_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES mcp_skills(id) ON DELETE SET NULL,
  wallet_address TEXT,
  api_endpoint TEXT,
  success BOOLEAN DEFAULT true,
  latency_ms INTEGER,
  tokens_used INTEGER DEFAULT 0,
  cost_usdc NUMERIC(18,8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for usage metrics
CREATE INDEX IF NOT EXISTS idx_usage_skill ON usage_metrics(skill_id);
CREATE INDEX IF NOT EXISTS idx_usage_wallet ON usage_metrics(wallet_address);
CREATE INDEX IF NOT EXISTS idx_usage_created ON usage_metrics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_success ON usage_metrics(success);

-- ============================================
-- AGENT PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS agent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  wallet_address TEXT,
  skills TEXT[],
  reputation_score NUMERIC(5,2) DEFAULT 50.00,
  total_tasks_completed INTEGER DEFAULT 0,
  total_earned NUMERIC(18,8) NOT NULL DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for agent profiles
CREATE INDEX IF NOT EXISTS idx_agent_profile_id ON agent_profiles(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_reputation ON agent_profiles(reputation_score DESC);
CREATE INDEX IF NOT EXISTS idx_agent_wallet ON agent_profiles(wallet_address);

-- ============================================
-- MARKETPLACE STATISTICS (Materialized View)
-- ============================================
CREATE MATERIALIZED VIEW IF NOT EXISTS marketplace_stats AS
SELECT
  (SELECT COUNT(*) FROM mcp_skills WHERE verified = true) as verified_mcp_count,
  (SELECT COUNT(*) FROM agent_wallets) as total_agents,
  (SELECT COALESCE(SUM(amount_usdc), 0) FROM transactions WHERE status = 'completed') as total_volume_usdc,
  (SELECT COALESCE(SUM(amount_usdc), 0) FROM transactions
   WHERE status = 'completed' AND created_at > NOW() - INTERVAL '24 hours') as volume_24h,
  (SELECT COALESCE(SUM(amount_usdc), 0) FROM transactions
   WHERE status = 'completed' AND created_at > NOW() - INTERVAL '7 days') as volume_7d,
  (SELECT COUNT(*) FROM transactions WHERE status = 'completed' AND created_at > NOW() - INTERVAL '24 hours') as tx_24h,
  (SELECT COUNT(*) FROM transactions WHERE status = 'completed' AND created_at > NOW() - INTERVAL '7 days') as tx_7d,
  NOW() as last_updated
WITH DATA;

-- Refresh stats every 5 minutes
CREATE OR REPLACE FUNCTION refresh_marketplace_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY marketplace_stats;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SAMPLE DATA SEEDING
-- ============================================

-- Insert sample MCP skills
INSERT INTO mcp_skills (name, slug, category, description, author, repository_url, mcp_endpoint, pricing_usdc, x402_enabled, verified, rating, total_calls) VALUES
  ('Exa Web Search', 'exa-web-search', ARRAY['search', 'ai'], 'High-quality semantic web search with AI-optimized query rewriting', 'oma-ai', 'https://github.com/oma-ai', 'https://oma-ai.com/mcp/exa-web-search', 0.0005, true, true, 4.5, 100),
  ('ByteOver Memory', 'byteover', ARRAY['storage', 'memory', 'ai'], 'Persistent agent context storage with semantic search and auto-curation', 'oma-ai', 'https://github.com/oma-ai', 'https://oma-ai.com/mcp/byteover', 0.001, true, true, 4.8, 150),
  ('Self-Improving Agent', 'self-improving-agent', ARRAY['ai', 'learning', 'optimization'], 'AI agents that learn from outputs and optimize future responses', 'oma-ai', 'https://github.com/oma-ai', 'https://oma-ai.com/mcp/self-improving-agent', 0.002, true, false, 4.2, 50),
  ('GitHub Repo Manager', 'github-repo-manager', ARRAY['dev', 'github'], 'GitHub repository management, code review, and CI monitoring', 'oma-ai', 'https://github.com/oma-ai', 'https://oma-ai.com/mcp/github-repo-manager', 0.0015, true, true, 4.0, 200),
  ('Smart Contract Auditor', 'smart-contract-auditor', ARRAY['blockchain', 'security', 'dev'], 'AI-powered smart contract security analysis and vulnerability detection', 'oma-ai', 'https://github.com/oma-ai', 'https://oma-ai.com/mcp/smart-contract-auditor', 0.005, true, false, 3.8, 25),
  ('Weather Forecaster', 'weather-forecaster', ARRAY['weather', 'data'], '7-day weather forecasts with precipitation and temperature data', 'oma-ai', 'https://github.com/oma-ai', 'https://oma-ai.com/mcp/weather-forecaster', 0.001, true, true, 4.1, 300)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample LLM models
INSERT INTO llm_models (provider, name, slug, model_id, context_window, pricing_input, pricing_output, pricing_usdc, category, capabilities) VALUES
  ('OpenAI', 'GPT-5 Turbo', 'gpt-5-turbo', 'gpt-5-turbo', 200000, 0.0000025, 0.000010, 0.0125, 'text', ARRAY['chat', 'code', 'reasoning']),
  ('Anthropic', 'Claude 4 Opus', 'claude-4-opus', 'claude-4-opus-20250219', 200000, 0.000015, 0.000075, 0.045, 'text', ARRAY['chat', 'code', 'reasoning', 'analysis']),
  ('Google', 'Gemini 2.5 Pro', 'gemini-2.5-pro', 'gemini-2.5-pro', 2000000, 0.00000125, 0.000005, 0.0025, 'text', ARRAY['chat', 'code', 'reasoning', 'multimodal']),
  ('DeepSeek', 'DeepSeek V3', 'deepseek-v3', 'deepseek-chat', 64000, 0.00000014, 0.00000028, 0.00014, 'text', ARRAY['chat', 'code', 'reasoning']),
  ('Meta', 'Llama 4', 'llama-4', 'llama-4-70b', 128000, 0.0000005, 0.000002, 0.001, 'text', ARRAY['chat', 'code', 'reasoning']),
  ('xAI', 'Grok 3', 'grok-3', 'grok-3', 131072, 0.000002, 0.00001, 0.006, 'text', ARRAY['chat', 'code', 'reasoning'])
ON CONFLICT (slug) DO NOTHING;

-- Insert sample agent profile
INSERT INTO agent_profiles (agent_id, name, description, wallet_address, skills, reputation_score, total_tasks_completed, total_earned, verified) VALUES
  ('oma-core', 'OMA Core Agent', 'The primary OpenMarketAccess protocol agent for handling x402 payments and MCP discovery', '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6', ARRAY['payments', 'mcp-discovery', 'transaction-verification'], 85.50, 1250, 150.75, true)
ON CONFLICT (agent_id) DO NOTHING;

-- ============================================
-- COMPLETED
-- ============================================

-- Refresh materialized view
REFRESH MATERIALIZED VIEW marketplace_stats;

COMMENT ON TABLE mcp_skills IS 'Registry of MCP skills available on the marketplace';
COMMENT ON TABLE agent_wallets IS 'Agent wallet addresses and balances on Base network';
COMMENT ON TABLE transactions IS 'Transaction records for x402 payments';
COMMENT ON TABLE llm_models IS 'Available LLM models with pricing';
COMMENT ON TABLE usage_metrics IS 'API usage metrics and statistics';
COMMENT ON TABLE agent_profiles IS 'Agent profiles with reputation and skills';
COMMENT ON MATERIALIZED VIEW marketplace_stats IS 'Real-time marketplace statistics';
