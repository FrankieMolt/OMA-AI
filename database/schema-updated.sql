-- =====================================================
-- OMA-AI SUPABASE DATABASE SCHEMA - UPDATED
-- Fixed with additional tables for credits, agent resale
-- Created: 2026-03-22
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: users (UPDATED - Added credits_balance)
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website_url TEXT,
  social_links JSONB DEFAULT '{}',
  credits_balance DECIMAL(20,6) DEFAULT 0,
  total_spent DECIMAL(20,6) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- =====================================================
-- TABLE: user_settings
-- =====================================================
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT FALSE,
  marketing_emails BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  theme TEXT DEFAULT 'dark',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: wallets
-- =====================================================
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  network TEXT NOT NULL,
  address TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, network, address)
);

CREATE INDEX idx_wallets_user ON wallets(user_id);
CREATE INDEX idx_wallets_network ON wallets(network);

-- =====================================================
-- TABLE: credits_packages
-- =====================================================
CREATE TABLE credits_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  price_usd DECIMAL(10,2) NOT NULL,
  bonus_credits INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default packages
INSERT INTO credits_packages (name, credits, price_usd, bonus_credits, sort_order) VALUES
  ('Starter', 100, 10.00, 0, 1),
  ('Basic', 500, 45.00, 25, 2),
  ('Pro', 1000, 80.00, 100, 3),
  ('Business', 5000, 350.00, 500, 4);

-- =====================================================
-- TABLE: credit_purchases
-- =====================================================
CREATE TABLE credit_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  package_id UUID REFERENCES credits_packages(id),
  credits INTEGER NOT NULL,
  amount_usd DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  tx_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: mcps
-- =====================================================
CREATE TABLE mcps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  repository_url TEXT,
  homepage_url TEXT,
  documentation_url TEXT,
  image_url TEXT,
  icon_url TEXT,
  mcp_type TEXT DEFAULT 'local',
  endpoint_url TEXT,
  transport TEXT DEFAULT 'stdio',
  price_model TEXT DEFAULT 'free',
  price_per_call DECIMAL(10,6),
  monthly_price DECIMAL(10,2),
  yearly_price DECIMAL(10,2),
  pricing JSONB DEFAULT '{}',
  tools JSONB NOT NULL,
  version TEXT DEFAULT '1.0.0',
  status TEXT DEFAULT 'pending',
  is_official BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  monthly_active_users INTEGER DEFAULT 0,
  total_calls INTEGER DEFAULT 0,
  total_earnings DECIMAL(20,6) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mcps_slug ON mcps(slug);
CREATE INDEX idx_mcps_category ON mcps(category);
CREATE INDEX idx_mcps_author ON mcps(author_id);
CREATE INDEX idx_mcps_status ON mcps(status);
CREATE INDEX idx_mcps_type ON mcps(mcp_type);
CREATE INDEX idx_mcps_rating ON mcps(rating DESC);

-- =====================================================
-- TABLE: mcp_tools
-- =====================================================
CREATE TABLE mcp_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  input_schema JSONB NOT NULL,
  price_per_use DECIMAL(10,6) DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mcp_tools_mcp ON mcp_tools(mcp_id);

-- =====================================================
-- TABLE: mcp_categories
-- =====================================================
CREATE TABLE mcp_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES mcp_categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: mcp_reviews
-- =====================================================
CREATE TABLE mcp_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  helpful_count INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mcp_id, user_id)
);

-- =====================================================
-- TABLE: transactions
-- =====================================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mcp_id UUID REFERENCES mcps(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  amount DECIMAL(20,6) NOT NULL,
  currency TEXT DEFAULT 'USDC',
  network TEXT NOT NULL,
  tx_hash TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_mcp ON transactions(mcp_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- =====================================================
-- TABLE: x402_nonces
-- =====================================================
CREATE TABLE x402_nonces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nonce TEXT UNIQUE NOT NULL,
  amount DECIMAL(20,6) NOT NULL,
  mcp_id UUID REFERENCES mcps(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  signature TEXT,
  network TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_x402_nonces_nonce ON x402_nonces(nonce);
CREATE INDEX idx_x402_nonces_expires ON x402_nonces(expires_at);

-- =====================================================
-- TABLE: usage_stats (Renamed from mcp_usage)
-- =====================================================
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
  tool_name TEXT,
  call_type TEXT,
  credits_used DECIMAL(10,6) DEFAULT 0,
  latency_ms INTEGER,
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usage_mcp ON usage_stats(mcp_id);
CREATE INDEX idx_usage_user ON usage_stats(user_id);
CREATE INDEX idx_usage_date ON usage_stats(date DESC);
CREATE INDEX idx_usage_api_key ON usage_stats(api_key_id);

-- =====================================================
-- TABLE: api_keys
-- =====================================================
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  scopes TEXT[] DEFAULT '{}',
  rate_limit INTEGER DEFAULT 1000,
  monthly_credit_limit INTEGER,
  credits_used_this_month INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_prefix ON api_keys(key_prefix);

-- =====================================================
-- TABLE: payouts
-- =====================================================
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mcp_id UUID REFERENCES mcps(id) ON DELETE SET NULL,
  amount DECIMAL(20,6) NOT NULL,
  currency TEXT DEFAULT 'USDC',
  network TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  tx_hash TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: agent_resale_markups
-- =====================================================
CREATE TABLE agent_resale_markups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_wallet_address TEXT NOT NULL,
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  markup_percent DECIMAL(5,2) DEFAULT 0,
  custom_price DECIMAL(10,6),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_resale_wallet ON agent_resale_markups(agent_wallet_address);
CREATE INDEX idx_agent_resale_mcp ON agent_resale_markups(mcp_id);

-- =====================================================
-- TABLE: notifications
-- =====================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: audit_logs
-- =====================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FUNCTIONS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mcps_updated_at BEFORE UPDATE ON mcps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mcp_reviews_updated_at BEFORE UPDATE ON mcp_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payouts_updated_at BEFORE UPDATE ON payouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA: MCP Categories
-- =====================================================
INSERT INTO mcp_categories (slug, name, description, icon, sort_order) VALUES
('data', 'Data & Databases', 'Database and data management tools', 'database', 1),
('ai-ml', 'AI & Machine Learning', 'AI models and ML tools', 'brain', 2),
('finance', 'Finance & Crypto', 'Financial data and blockchain tools', 'trending-up', 3),
('social', 'Social Media', 'Social media integrations', 'share-2', 4),
('communication', 'Communication', 'Email, SMS, and messaging', 'mail', 5),
('utility', 'Utilities', 'General purpose utilities', 'tool', 6),
('development', 'Development', 'Developer tools and automation', 'code', 7),
('storage', 'Storage & Files', 'File storage and management', 'folder', 8),
('analytics', 'Analytics & Monitoring', 'Analytics and monitoring tools', 'bar-chart', 9),
('security', 'Security', 'Security and authentication tools', 'lock', 10);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcps ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE x402_nonces ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_resale_markups ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can read all mcps" ON mcps FOR SELECT USING (status = 'approved');
CREATE POLICY "Authors can update own mcps" ON mcps FOR UPDATE USING (author_id::text = auth.uid()::text);
CREATE POLICY "Authors can insert own mcps" ON mcps FOR INSERT WITH CHECK (author_id::text = auth.uid()::text);

CREATE POLICY "Public can read api_keys" ON api_keys FOR SELECT USING (true);
CREATE POLICY "Users can manage own api_keys" ON api_keys FOR ALL USING (user_id::text = auth.uid()::text);

CREATE POLICY "Public can read usage_stats" ON usage_stats FOR SELECT USING (true);
CREATE POLICY "Authors can read their mcp usage" ON usage_stats FOR SELECT USING (
  EXISTS (SELECT 1 FROM mcps WHERE mcps.id = usage_stats.mcp_id AND mcps.author_id::text = auth.uid()::text)
);

COMMENT ON DATABASE postgres IS 'OMA-AI MCP Marketplace - Production Schema v2';

-- =====================================================
-- ADDITIONAL TABLES FOR MARKETPLACE MONETIZATION
-- =====================================================

-- TABLE: license_keys
-- For one-time purchase MCPs
CREATE TABLE license_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  license_type TEXT DEFAULT 'one-time',
  max_activations INTEGER,
  current_activations INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_license_keys_mcp ON license_keys(mcp_id);
CREATE INDEX idx_license_keys_user ON license_keys(user_id);
CREATE INDEX idx_license_keys_hash ON license_keys(key_hash);

-- TABLE: subscriptions
-- For monthly/yearly subscription MCPs
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active',
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_mcp ON subscriptions(mcp_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- TABLE: api_usage_logs
-- Detailed per-request logs for metering
CREATE TABLE api_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
  mcp_id UUID REFERENCES mcps(id) ON DELETE SET NULL,
  tool_name TEXT,
  request_id TEXT,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  credits_charged DECIMAL(10,6) DEFAULT 0,
  latency_ms INTEGER,
  status_code INTEGER,
  error_message TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_usage_logs_key ON api_usage_logs(api_key_id);
CREATE INDEX idx_api_usage_logs_mcp ON api_usage_logs(mcp_id);
CREATE INDEX idx_api_usage_logs_created ON api_usage_logs(created_at DESC);

-- TABLE: webhooks
-- For automated purchase notifications
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] DEFAULT '{}',
  secret_hash TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhooks_user ON webhooks(user_id);

-- RLS for new tables
ALTER TABLE license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own license_keys" ON license_keys FOR ALL USING (user_id::text = auth.uid()::text);
CREATE POLICY "Users can manage own subscriptions" ON subscriptions FOR ALL USING (user_id::text = auth.uid()::text);
CREATE POLICY "Users can view own api_usage_logs" ON api_usage_logs FOR SELECT USING (api_key_id IN (SELECT id FROM api_keys WHERE user_id::text = auth.uid()::text));
CREATE POLICY "Users can manage own webhooks" ON webhooks FOR ALL USING (user_id::text = auth.uid()::text);

COMMENT ON DATABASE postgres IS 'OMA-AI MCP Marketplace v2.1 - Full Monetization Support';
