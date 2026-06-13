-- Agent Builder Database Schema
-- OMA-AI Visual Agent Builder
-- Created: 2026-03-12 08:25 UTC

-- Agents: Stores agent metadata and configuration
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  prompt TEXT NOT NULL,
  config JSONB NOT NULL, -- MCP connections, workflow, variables
  version INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'testing', 'active', 'inactive', 'archived')),
  pricing NUMERIC(10, 6) DEFAULT 0, -- Per call in USDC
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent Executions: Tracks agent execution analytics
CREATE TABLE IF NOT EXISTS agent_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('success', 'error', 'timeout')),
  duration_ms INTEGER,
  mcp_calls JSONB DEFAULT '[]', -- Which MCPs were called with results
  cost NUMERIC(10, 6) DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent Versions: Version history for agents
CREATE TABLE IF NOT EXISTS agent_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  version INTEGER NOT NULL,
  config JSONB NOT NULL,
  prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (agent_id, version)
);

-- Agent MCP Connections: Many-to-many relationship
CREATE TABLE IF NOT EXISTS agent_mcps (
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  mcp_id UUID REFERENCES mcps(id) ON DELETE CASCADE NOT NULL,
  configuration JSONB DEFAULT '{}', -- Tool-specific configuration
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (agent_id, mcp_id)
);

-- Agent Variables: Define variables used in agent
CREATE TABLE IF NOT EXISTS agent_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('string', 'number', 'boolean', 'json', 'array')),
  default_value TEXT,
  required BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_slug ON agents(slug);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_published_at ON agents(published_at);

CREATE INDEX IF NOT EXISTS idx_agent_executions_agent_id ON agent_executions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_executions_user_id ON agent_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_executions_created_at ON agent_executions(created_at);

CREATE INDEX IF NOT EXISTS idx_agent_versions_agent_id ON agent_versions(agent_id);

-- Enable Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_mcps ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_variables ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agents
CREATE POLICY "Users can view their own agents" ON agents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create agents" ON agents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agents" ON agents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agents" ON agents
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public can view active agents" ON agents
  FOR SELECT USING (status = 'active');

-- RLS Policies for agent_executions
CREATE POLICY "Users can view their own executions" ON agent_executions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create executions" ON agent_executions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for agent_versions
CREATE POLICY "Users can view their agent versions" ON agent_versions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_versions.agent_id AND agents.user_id = auth.uid())
  );

CREATE POLICY "Users can create versions for their agents" ON agent_versions
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_versions.agent_id AND agents.user_id = auth.uid())
  );

-- RLS Policies for agent_mcps
CREATE POLICY "Users can view their agent MCPs" ON agent_mcps
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_mcps.agent_id AND agents.user_id = auth.uid())
  );

CREATE POLICY "Users can add MCPs to their agents" ON agent_mcps
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_mcps.agent_id AND agents.user_id = auth.uid())
  );

CREATE POLICY "Users can remove MCPs from their agents" ON agent_mcps
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_mcps.agent_id AND agents.user_id = auth.uid())
  );

-- RLS Policies for agent_variables
CREATE POLICY "Users can view their agent variables" ON agent_variables
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_variables.agent_id AND agents.user_id = auth.uid())
  );

CREATE POLICY "Users can create variables for their agents" ON agent_variables
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_variables.agent_id AND agents.user_id = auth.uid())
  );

CREATE POLICY "Users can update their agent variables" ON agent_variables
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_variables.agent_id AND agents.user_id = auth.uid())
  );

CREATE POLICY "Users can delete their agent variables" ON agent_variables
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM agents WHERE agents.id = agent_variables.agent_id AND agents.user_id = auth.uid())
  );

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE agents IS 'AI agents built with MCPs';
COMMENT ON TABLE agent_executions IS 'Execution logs and analytics for agents';
COMMENT ON TABLE agent_versions IS 'Version history for agents';
COMMENT ON TABLE agent_mcps IS 'Many-to-many relationship between agents and MCPs';
COMMENT ON TABLE agent_variables IS 'Variables defined for agent configuration';

COMMENT ON COLUMN agents.config IS 'Agent configuration including MCP connections, workflow, and settings';
COMMENT ON COLUMN agents.status IS 'Agent lifecycle status: draft, testing, active, inactive, archived';
COMMENT ON COLUMN agent_executions.mcp_calls IS 'Array of MCP calls with results';
COMMENT ON COLUMN agent_mcps.configuration IS 'Tool-specific configuration for each MCP';
