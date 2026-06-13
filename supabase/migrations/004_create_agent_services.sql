-- Migration: 004_create_agent_services
-- Creates ai_agents and human_services tables for OMA-AI platform
-- Date: 2026-03-24

-- =============================================
-- AI Agents table (ai_agents)
-- =============================================
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE,
  did TEXT UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  creator_name TEXT,
  reputation_score NUMERIC(3,2) DEFAULT 0.00,
  total_tasks_completed INTEGER DEFAULT 0,
  total_earnings NUMERIC(15,6) DEFAULT 0,
  hourly_rate NUMERIC(10,4),
  capabilities JSONB DEFAULT '[]',
  pricing_model VARCHAR(50) DEFAULT 'free',
  avg_rating NUMERIC(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  avatar_url TEXT,
  status VARCHAR(50) DEFAULT 'active',
  verified BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]',
  mcp_server_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Human Services table (human_services)
-- =============================================
CREATE TABLE IF NOT EXISTS human_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES ai_agents(id) ON DELETE CASCADE,
  human_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location TEXT,
  price NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  requirements JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'open',
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Human Applications table (human_applications)
-- =============================================
CREATE TABLE IF NOT EXISTS human_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES human_services(id) ON DELETE CASCADE,
  human_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- AI Agent Reviews table (agent_reviews)
-- =============================================
CREATE TABLE IF NOT EXISTS agent_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES ai_agents(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX IF NOT EXISTS idx_ai_agents_wallet ON ai_agents(wallet_address);
CREATE INDEX IF NOT EXISTS idx_ai_agents_did ON ai_agents(did);
CREATE INDEX IF NOT EXISTS idx_ai_agents_status ON ai_agents(status);
CREATE INDEX IF NOT EXISTS idx_ai_agents_reputation ON ai_agents(reputation_score DESC);
CREATE INDEX IF NOT EXISTS idx_human_services_agent ON human_services(agent_id);
CREATE INDEX IF NOT EXISTS idx_human_services_status ON human_services(status);
CREATE INDEX IF NOT EXISTS idx_human_applications_service ON human_applications(service_id);
CREATE INDEX IF NOT EXISTS idx_human_applications_human ON human_applications(human_id);
CREATE INDEX IF NOT EXISTS idx_agent_reviews_agent ON agent_reviews(agent_id);

-- =============================================
-- Row Level Security
-- =============================================
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE human_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE human_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_reviews ENABLE ROW LEVEL SECURITY;

-- AI Agents policies
CREATE POLICY "Public can view active ai_agents" ON ai_agents
  FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can insert ai_agents" ON ai_agents
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own ai_agents" ON ai_agents
  FOR UPDATE USING (creator_id = auth.uid());

CREATE POLICY "Users can delete own ai_agents" ON ai_agents
  FOR DELETE USING (creator_id = auth.uid());

-- Human Services policies
CREATE POLICY "Public can view human_services" ON human_services
  FOR SELECT USING (status = 'open');

CREATE POLICY "Authenticated users can create human_services" ON human_services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Agents can update own human_services" ON human_services
  FOR UPDATE USING (agent_id IN (SELECT id FROM ai_agents WHERE creator_id = auth.uid()));

-- Human Applications policies
CREATE POLICY "Users can view own applications" ON human_applications
  FOR SELECT USING (human_id = auth.uid());

CREATE POLICY "Agents can view applications for their services" ON human_applications
  FOR SELECT USING (service_id IN (
    SELECT id FROM human_services WHERE agent_id IN (SELECT id FROM ai_agents WHERE creator_id = auth.uid())
  ));

CREATE POLICY "Users can create applications" ON human_applications
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own applications" ON human_applications
  FOR UPDATE USING (human_id = auth.uid());

-- Agent Reviews policies
CREATE POLICY "Public can view agent_reviews" ON agent_reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON agent_reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =============================================
-- Trigger for updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_agents_updated_at
  BEFORE UPDATE ON ai_agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_human_services_updated_at
  BEFORE UPDATE ON human_services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_human_applications_updated_at
  BEFORE UPDATE ON human_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
