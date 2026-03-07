-- OMA-AI Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  wallet_address TEXT,
  api_key TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'starter', 'pro', 'enterprise')),
  tokens_used BIGINT DEFAULT 0,
  tokens_limit BIGINT DEFAULT 100000,
  balance DECIMAL(10, 2) DEFAULT 0,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  banned_at TIMESTAMPTZ
);

-- API Logs table
CREATE TABLE IF NOT EXISTS api_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  cost DECIMAL(10, 6) DEFAULT 0,
  model TEXT,
  status_code INTEGER,
  response_time_ms INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage Logs (aggregated daily)
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  tokens_used BIGINT DEFAULT 0,
  cost DECIMAL(10, 2) DEFAULT 0,
  requests_count INTEGER DEFAULT 0,
  endpoint TEXT,
  UNIQUE(user_id, date, endpoint)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_id TEXT UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  tokens_purchased BIGINT,
  plan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Keys table (for multiple keys per user)
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  name TEXT,
  permissions JSONB DEFAULT '{}',
  last_used TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

-- Webhooks table
CREATE TABLE IF NOT EXISTS webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_api_key ON users(api_key);
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_api_logs_user_id ON api_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_api_logs_created_at ON api_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_date ON usage_logs(user_id, date);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view own logs" ON api_logs
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own usage" ON usage_logs
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Functions
CREATE OR REPLACE FUNCTION increment_token_usage(
  user_id UUID,
  token_count INTEGER
)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET tokens_used = tokens_used + token_count,
      last_active = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void AS $$
BEGIN
  UPDATE users
  SET tokens_used = 0
  WHERE tier != 'free';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create usage log on API call
CREATE OR REPLACE FUNCTION log_api_usage()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usage_logs (user_id, date, tokens_used, cost, requests_count, endpoint)
  VALUES (
    NEW.user_id,
    CURRENT_DATE,
    NEW.tokens_used,
    NEW.cost,
    1,
    NEW.endpoint
  )
  ON CONFLICT (user_id, date, endpoint)
  DO UPDATE SET
    tokens_used = usage_logs.tokens_used + EXCLUDED.tokens_used,
    cost = usage_logs.cost + EXCLUDED.cost,
    requests_count = usage_logs.requests_count + 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER api_log_trigger
AFTER INSERT ON api_logs
FOR EACH ROW
EXECUTE FUNCTION log_api_usage();

-- Sample data for testing (remove in production)
-- INSERT INTO users (email, password_hash, api_key, tier, tokens_limit)
-- VALUES 
--   ('test@oma-ai.com', 'hash_placeholder', 'oma-test123', 'pro', 10000000);

-- Comments
COMMENT ON TABLE users IS 'OMA-AI user accounts';
COMMENT ON TABLE api_logs IS 'Detailed API call logs';
COMMENT ON TABLE usage_logs IS 'Aggregated daily usage statistics';
COMMENT ON TABLE payments IS 'Payment and billing history';
COMMENT ON TABLE api_keys IS 'Additional API keys for users';
COMMENT ON TABLE webhooks IS 'User webhook configurations';
