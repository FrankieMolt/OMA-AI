-- OMA-AI Supabase Database Schema
-- Run this in Supabase SQL Editor after creating project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- USERS TABLE
-- ===========================================
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- API KEYS TABLE
-- ===========================================
CREATE TABLE api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    key_hash TEXT NOT NULL,  -- SHA-256 hash, never store plain text
    key_prefix TEXT NOT NULL, -- First 8 chars for display (e.g., "oma_live_xxxx")
    name TEXT,
    permissions JSONB DEFAULT '[]'::jsonb,
    rate_limit INTEGER DEFAULT 1000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE,
    revoked BOOLEAN DEFAULT FALSE
);

-- Index for fast key lookup
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);

-- ===========================================
-- API LISTINGS TABLE
-- ===========================================
CREATE TABLE apis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    endpoint TEXT NOT NULL,
    method TEXT DEFAULT 'GET',
    pricing_type TEXT DEFAULT 'per_call', -- per_call, subscription, free
    price_usd DECIMAL(10, 6) DEFAULT 0, -- Price per call in USD
    category TEXT,
    tags TEXT[],
    x402_enabled BOOLEAN DEFAULT FALSE,
    documentation_url TEXT,
    status TEXT DEFAULT 'pending', -- pending, active, suspended
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- MCP SERVERS TABLE
-- ===========================================
CREATE TABLE mcp_servers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    server_url TEXT NOT NULL,
    config_schema JSONB, -- JSON Schema for configuration
    category TEXT,
    downloads INTEGER DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    x402_enabled BOOLEAN DEFAULT FALSE,
    x402_price_usd DECIMAL(10, 6) DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- USAGE LOGS TABLE
-- ===========================================
CREATE TABLE usage_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
    api_id UUID REFERENCES apis(id) ON DELETE SET NULL,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    payment_amount_usd DECIMAL(10, 6) DEFAULT 0,
    payment_tx_hash TEXT, -- Blockchain tx hash for x402
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX idx_usage_logs_api_key ON usage_logs(api_key_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at);

-- ===========================================
-- EARNINGS TABLE (for publishers)
-- ===========================================
CREATE TABLE earnings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    api_id UUID REFERENCES apis(id) ON DELETE CASCADE,
    amount_usd DECIMAL(10, 6) NOT NULL,
    platform_fee_usd DECIMAL(10, 6) NOT NULL,
    net_earnings_usd DECIMAL(10, 6) NOT NULL,
    tx_hash TEXT, -- Blockchain transaction hash
    status TEXT DEFAULT 'pending', -- pending, paid
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE apis ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

-- API keys: users can only see their own
CREATE POLICY "Users can view own API keys" ON api_keys
    FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can insert own API keys" ON api_keys
    FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);

-- APIs: public can view active, owners can manage
CREATE POLICY "Public can view active APIs" ON apis
    FOR SELECT USING (status = 'active');

CREATE POLICY "Owners can manage APIs" ON apis
    FOR ALL USING (owner_id::text = auth.uid()::text);

-- Earnings: owners can view
CREATE POLICY "Users can view own earnings" ON earnings
    FOR SELECT USING (user_id::text = auth.uid()::text);

-- ===========================================
-- FUNCTIONS
-- ===========================================

-- Function to get API usage stats
CREATE OR REPLACE FUNCTION get_api_usage(
    p_api_key_id UUID,
    p_start_date TIMESTAMP WITH TIME ZONE,
    p_end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE (
    total_calls BIGINT,
    total_cost DECIMAL,
    avg_response_time DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_calls,
        COALESCE(SUM(payment_amount_usd), 0) as total_cost,
        COALESCE(AVG(response_time_ms), 0) as avg_response_time
    FROM usage_logs
    WHERE api_key_id = p_api_key_id
    AND created_at BETWEEN p_start_date AND p_end_date;
END;
$$ LANGUAGE plpgsql;

-- Function to get publisher earnings
CREATE OR REPLACE FUNCTION get_publisher_earnings(
    p_user_id UUID,
    p_start_date TIMESTAMP WITH TIME ZONE,
    p_end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE (
    total_earnings DECIMAL,
    total_fees DECIMAL,
    api_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(net_earnings_usd), 0) as total_earnings,
        COALESCE(SUM(platform_fee_usd), 0) as total_fees,
        COUNT(DISTINCT api_id)::BIGINT as api_count
    FROM earnings
    WHERE user_id = p_user_id
    AND created_at BETWEEN p_start_date AND p_end_date
    AND status = 'paid';
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- INSERT SAMPLE DATA (Optional)
-- ===========================================

-- Example API listing
INSERT INTO apis (name, description, endpoint, pricing_type, price_usd, category, tags, status)
VALUES (
    'Premium Crypto Prices',
    'Real-time cryptocurrency prices with market cap and volume',
    'https://oma-ai.com/api/premium-price',
    'per_call',
    0.001,
    'finance',
    ARRAY['crypto', 'price', 'market-data'],
    'active'
) ON CONFLICT DO NOTHING;

-- Example MCP server
INSERT INTO mcp_servers (name, description, server_url, category, x402_enabled, x402_price_usd)
VALUES (
    'PostgreSQL MCP',
    'Connect to PostgreSQL databases from AI agents',
    'https://mcp.oma-ai.com/postgresql',
    'database',
    TRUE,
    0.002
) ON CONFLICT DO NOTHING;

SELECT 'Database schema created successfully!' AS status;