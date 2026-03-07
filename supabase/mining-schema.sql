# OMA-AI Miner Database Schema

```sql
-- Miners table
CREATE TABLE miners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL UNIQUE,
  model TEXT NOT NULL,
  hardware JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
  total_credits DECIMAL(18, 2) DEFAULT 0,
  total_requests INTEGER DEFAULT 0,
  current_stats JSONB DEFAULT '{}'
);

-- Credit transactions
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  miner_id UUID REFERENCES miners(id),
  user_id UUID REFERENCES auth.users(id),
  credits DECIMAL(18, 2) NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('mining', 'purchase', 'referral', 'bonus', 'withdrawal', 'usage')),
  description TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Inference logs
CREATE TABLE inference_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  miner_id UUID REFERENCES miners(id),
  request_id TEXT NOT NULL,
  tokens_generated INTEGER DEFAULT 0,
  response_time INTEGER DEFAULT 0, -- milliseconds
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  miner_id UUID REFERENCES miners(id),
  amount DECIMAL(18, 2) NOT NULL,
  wallet_address TEXT NOT NULL,
  token TEXT DEFAULT 'X402' CHECK (token IN ('X402', 'USDC')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  tx_hash TEXT
);

-- Model stakes
CREATE TABLE model_stakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  model TEXT NOT NULL,
  amount DECIMAL(18, 2) NOT NULL,
  staked_at TIMESTAMPTZ DEFAULT NOW(),
  unlocks_at TIMESTAMPTZ, -- 30-day lock
  rewards_earned DECIMAL(18, 2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unlocked', 'withdrawn'))
);

-- Privacy pools
CREATE TABLE privacy_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id TEXT NOT NULL,
  encrypted_request TEXT NOT NULL,
  pool_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE
);

-- RPC Functions

-- Add credits to miner
CREATE OR REPLACE FUNCTION add_credits(
  p_miner_id UUID,
  p_credits DECIMAL,
  p_source TEXT
)
RETURNS void AS $$
BEGIN
  -- Update miner balance
  UPDATE miners
  SET total_credits = total_credits + p_credits
  WHERE id = p_miner_id;
  
  -- Log transaction
  INSERT INTO credit_transactions (miner_id, credits, source)
  VALUES (p_miner_id, p_credits, p_source);
END;
$$ LANGUAGE plpgsql;

-- Deduct credits from miner
CREATE OR REPLACE FUNCTION deduct_credits(
  p_miner_id UUID,
  p_credits DECIMAL,
  p_source TEXT
)
RETURNS void AS $$
BEGIN
  -- Update miner balance
  UPDATE miners
  SET total_credits = total_credits - p_credits
  WHERE id = p_miner_id;
  
  -- Log transaction (negative)
  INSERT INTO credit_transactions (miner_id, credits, source)
  VALUES (p_miner_id, -p_credits, p_source);
END;
$$ LANGUAGE plpgsql;

-- Increment counter helper
CREATE OR REPLACE FUNCTION increment(count INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN count + 1;
END;
$$ LANGUAGE plpgsql;

-- Views

-- Active miners view
CREATE VIEW active_miners AS
SELECT 
  id,
  wallet_address,
  model,
  hardware,
  total_credits,
  total_requests,
  last_heartbeat,
  EXTRACT(EPOCH FROM (NOW() - last_heartbeat)) / 60 as minutes_since_heartbeat
FROM miners
WHERE status = 'active'
  AND last_heartbeat > NOW() - INTERVAL '15 minutes';

-- Leaderboard view
CREATE VIEW miner_leaderboard AS
SELECT 
  wallet_address,
  model,
  total_credits,
  total_requests,
  RANK() OVER (ORDER BY total_credits DESC) as rank
FROM miners
WHERE status = 'active'
ORDER BY total_credits DESC
LIMIT 100;

-- Indexes
CREATE INDEX idx_miners_wallet ON miners(wallet_address);
CREATE INDEX idx_miners_status ON miners(status);
CREATE INDEX idx_transactions_miner ON credit_transactions(miner_id);
CREATE INDEX idx_transactions_timestamp ON credit_transactions(timestamp DESC);
CREATE INDEX idx_inference_miner ON inference_logs(miner_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
```
