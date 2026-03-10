-- OMA-AI Row Level Security Policies
-- Enable RLS and create data isolation policies
-- Date: 2026-02-07

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SERVICES POLICIES
-- ============================================

-- Public read access for services (marketplace should be browsable)
CREATE POLICY "Public read access for services" ON services
  FOR SELECT USING (true);

-- Service owner can update their own services
CREATE POLICY "Service owner can update" ON services
  FOR UPDATE USING (auth.uid()::text = seller_wallet)
  WITH CHECK (auth.uid()::text = seller_wallet);

-- Service owner can delete their own services
CREATE POLICY "Service owner can delete" ON services
  FOR DELETE USING (auth.uid()::text = seller_wallet);

-- Anyone can create services (for demo mode - restrict in production)
CREATE POLICY "Anyone can create services" ON services
  FOR INSERT WITH CHECK (true);

-- ============================================
-- TRANSACTIONS POLICIES
-- ============================================

-- Transaction buyer or seller can read
CREATE POLICY "Transaction buyer/seller access" ON transactions
  FOR SELECT USING (
    auth.uid()::text = buyer_wallet OR
    auth.uid()::text = seller_wallet
  );

-- Only system can create transactions (marketplace logic)
CREATE POLICY "System can create transactions" ON transactions
  FOR INSERT WITH CHECK (true);

-- ============================================
-- AGENTS POLICIES
-- ============================================

-- Agent owner can read their own agents
CREATE POLICY "Agent owner access" ON agents
  FOR SELECT USING (auth.uid()::text = wallet_address);

-- Agent owner can update their own agents
CREATE POLICY "Agent owner can update" ON agents
  FOR UPDATE USING (auth.uid()::text = wallet_address)
  WITH CHECK (auth.uid()::text = wallet_address);

-- Agent owner can delete their own agents
CREATE POLICY "Agent owner can delete" ON agents
  FOR DELETE USING (auth.uid()::text = wallet_address);

-- Anyone can create agents (for demo mode - restrict in production)
CREATE POLICY "Anyone can create agents" ON agents
  FOR INSERT WITH CHECK (true);

-- ============================================
-- AGENT LOGS POLICIES
-- ============================================

-- Agent owner can read their own agent logs
CREATE POLICY "Agent logs owner access" ON agent_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM agents
      WHERE agents.id = agent_logs.agent_id
      AND agents.wallet_address = auth.uid()::text
    )
  );

-- System can create agent logs
CREATE POLICY "System can create agent logs" ON agent_logs
  FOR INSERT WITH CHECK (true);

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant anon role basic access for marketplace browsing
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON services TO anon;

-- Grant authenticated role full access
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON services TO authenticated;
GRANT ALL ON transactions TO authenticated;
GRANT ALL ON agents TO authenticated;
GRANT ALL ON agent_logs TO authenticated;
