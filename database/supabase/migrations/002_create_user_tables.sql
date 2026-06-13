-- User Tables for OMA-AI
-- Add to existing MCP registry migration

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User wallets table
CREATE TABLE IF NOT EXISTS user_wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  chain VARCHAR(50) NOT NULL CHECK (chain IN ('base', 'solana')),
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, chain)
);

-- User API keys table
CREATE TABLE IF NOT EXISTS user_api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(255) NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User MCPs table (for tracking MCPs owned by user)
CREATE TABLE IF NOT EXISTS user_mcps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mcp_server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'owner' CHECK (role IN ('owner', 'contributor', 'tester')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, mcp_server_id)
);

-- User reviews table (for MCP reviews)
CREATE TABLE IF NOT EXISTS user_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mcp_server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, mcp_server_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_wallets_user_id ON user_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_wallets_chain ON user_wallets(chain);
CREATE INDEX IF NOT EXISTS idx_user_api_keys_user_id ON user_api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mcps_user_id ON user_mcps(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mcps_mcp_server_id ON user_mcps(mcp_server_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_user_id ON user_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_mcp_server_id ON user_reviews(mcp_server_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mcps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Users can manage their own wallets
CREATE POLICY "Users can view own wallets"
  ON user_wallets FOR ALL
  USING (auth.uid()::text = user_id::text);

-- Users can manage their own API keys
CREATE POLICY "Users can view own api keys"
  ON user_api_keys FOR ALL
  USING (auth.uid()::text = user_id::text);

-- Users can view their own MCPs
CREATE POLICY "Users can view own mcps"
  ON user_mcps FOR ALL
  USING (auth.uid()::text = user_id::text);

-- Anyone can read reviews
CREATE POLICY "Anyone can read reviews"
  ON user_reviews FOR SELECT
  USING (true);

-- Users can create their own reviews
CREATE POLICY "Users can create reviews"
  ON user_reviews FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

-- Users can update their own reviews
CREATE POLICY "Users can update reviews"
  ON user_reviews FOR UPDATE
  USING (auth.uid()::text = user_id::text);
