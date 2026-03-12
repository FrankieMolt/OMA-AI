-- =====================================================
-- OMA-AI SUPABASE DATABASE SCHEMA
-- Comprehensive Schema for MCP Marketplace
-- Created: 2026-03-12 01:30 UTC
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: users
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
  network TEXT NOT NULL, -- 'base', 'solana', 'ethereum', etc.
  address TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, network, address)
);

-- Indexes for wallets
CREATE INDEX idx_wallets_user ON wallets(user_id);
CREATE INDEX idx_wallets_network ON wallets(network);

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
  price_tier TEXT DEFAULT 'free', -- 'free', 'low', 'medium', 'high'
  pricing JSONB DEFAULT '{}',
  tools JSONB NOT NULL,
  version TEXT DEFAULT '1.0.0',
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'archived'
  is_official BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  monthly_active_users INTEGER DEFAULT 0,
  total_calls INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for mcps
CREATE INDEX idx_mcps_slug ON mcps(slug);
CREATE INDEX idx_mcps_category ON mcps(category);
CREATE INDEX idx_mcps_author ON mcps(author_id);
CREATE INDEX idx_mcps_status ON mcps(status);
CREATE INDEX idx_mcps_featured ON mcps(is_featured);
CREATE INDEX idx_mcps_rating ON mcps(rating DESC);
CREATE INDEX idx_mcps_downloads ON mcps(downloads DESC);

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
-- TABLE: reviews
-- =====================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mcp_id, user_id)
);

-- Indexes for reviews
CREATE INDEX idx_reviews_mcp ON reviews(mcp_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating DESC);

-- =====================================================
-- TABLE: transactions
-- =====================================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mcp_id UUID REFERENCES mcps(id) ON DELETE SET NULL,
  amount DECIMAL(20,6) NOT NULL,
  currency TEXT DEFAULT 'USDC',
  network TEXT NOT NULL,
  tx_hash TEXT UNIQUE,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'failed', 'refunded'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for transactions
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_mcp ON transactions(mcp_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);

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

-- Indexes for x402_nonces
CREATE INDEX idx_x402_nonces_user ON x402_nonces(user_id);
CREATE INDEX idx_x402_nonces_nonce ON x402_nonces(nonce);
CREATE INDEX idx_x402_nonces_expires ON x402_nonces(expires_at);

-- =====================================================
-- TABLE: usage_stats
-- =====================================================
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT,
  call_count INTEGER DEFAULT 0,
  last_called_at TIMESTAMPTZ,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mcp_id, user_id, endpoint, date)
);

-- Indexes for usage_stats
CREATE INDEX idx_usage_mcp ON usage_stats(mcp_id);
CREATE INDEX idx_usage_user ON usage_stats(user_id);
CREATE INDEX idx_usage_date ON usage_stats(date DESC);

-- =====================================================
-- TABLE: api_keys
-- =====================================================
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  scopes TEXT[] DEFAULT '{}',
  rate_limit INTEGER DEFAULT 1000,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for api_keys
CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);

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
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for payouts
CREATE INDEX idx_payouts_user ON payouts(user_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_period ON payouts(period_end DESC);

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

-- Indexes for notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

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

-- Indexes for audit_logs
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mcps_updated_at BEFORE UPDATE ON mcps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usage_stats_updated_at BEFORE UPDATE ON usage_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payouts_updated_at BEFORE UPDATE ON payouts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA: MCP Categories
-- =====================================================
INSERT INTO mcp_categories (slug, name, description, icon, sort_order) VALUES
('data', 'Data & Databases', 'Database and data management tools', '📊', 1),
('ai-ml', 'AI & Machine Learning', 'AI models and ML tools', '🤖', 2),
('finance', 'Finance & Crypto', 'Financial data and blockchain tools', '💰', 3),
('social', 'Social Media', 'Social media integrations', '📱', 4),
('communication', 'Communication', 'Email, SMS, and messaging', '✉️', 5),
('utility', 'Utilities', 'General purpose utilities', '🔧', 6),
('development', 'Development', 'Developer tools and automation', '💻', 7),
('storage', 'Storage & Files', 'File storage and management', '📁', 8),
('analytics', 'Analytics & Monitoring', 'Analytics and monitoring tools', '📈', 9),
('security', 'Security', 'Security and authentication tools', '🔒', 10);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcps ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE x402_nonces ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can read all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- User settings policies
CREATE POLICY "Users can read own settings" ON user_settings FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own settings" ON user_settings FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own settings" ON user_settings FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Wallets policies
CREATE POLICY "Users can read own wallets" ON wallets FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own wallets" ON wallets FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own wallets" ON wallets FOR UPDATE USING (auth.uid()::text = user_id::text);

-- MCPs policies
CREATE POLICY "Public can read all mcps" ON mcps FOR SELECT USING (true);
CREATE POLICY "Authors can update own mcps" ON mcps FOR UPDATE USING (auth.uid()::text = author_id::text);
CREATE POLICY "Authors can insert own mcps" ON mcps FOR INSERT WITH CHECK (auth.uid()::text = author_id::text);

-- Reviews policies
CREATE POLICY "Public can read all reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Transactions policies
CREATE POLICY "Users can read own transactions" ON transactions FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- x402 Nonces policies
CREATE POLICY "Users can read own nonces" ON x402_nonces FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own nonces" ON x402_nonces FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Usage stats policies
CREATE POLICY "Users can read own usage" ON usage_stats FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Authors can read their mcp usage" ON usage_stats FOR SELECT USING (
  EXISTS (SELECT 1 FROM mcps WHERE mcps.id = usage_stats.mcp_id AND mcps.author_id::text = auth.uid()::text)
);

-- API keys policies
CREATE POLICY "Users can read own api keys" ON api_keys FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own api keys" ON api_keys FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own api keys" ON api_keys FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own api keys" ON api_keys FOR DELETE USING (auth.uid()::text = user_id::text);

-- Payouts policies
CREATE POLICY "Users can read own payouts" ON payouts FOR SELECT USING (auth.uid()::text = user_id::text);

-- Notifications policies
CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid()::text = user_id::text);

-- =====================================================
-- VIEWS
-- =====================================================

-- View: MCPs with author info
CREATE VIEW mcps_with_author AS
SELECT
  mcps.*,
  users.username AS author_username,
  users.display_name AS author_display_name,
  users.avatar_url AS author_avatar_url
FROM mcps
LEFT JOIN users ON mcps.author_id = users.id;

-- View: MCPs stats
CREATE VIEW mcps_stats AS
SELECT
  mcps.id,
  mcps.name,
  mcps.slug,
  mcps.category,
  mcps.downloads,
  mcps.rating,
  mcps.review_count,
  COUNT(DISTINCT reviews.id) AS total_reviews,
  AVG(reviews.rating) AS avg_rating,
  COUNT(DISTINCT usage_stats.user_id) AS unique_users,
  SUM(usage_stats.call_count) AS total_calls,
  COUNT(DISTINCT CASE WHEN usage_stats.date >= CURRENT_DATE - INTERVAL '30 days' THEN usage_stats.user_id END) AS active_users_30d
FROM mcps
LEFT JOIN reviews ON mcps.id = reviews.mcp_id
LEFT JOIN usage_stats ON mcps.id = usage_stats.mcp_id
GROUP BY mcps.id;

-- =====================================================
-- COMPLETED
-- =====================================================

COMMENT ON DATABASE postgres IS 'OMA-AI MCP Marketplace - Production Schema';
