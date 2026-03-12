-- MCP Registry Schema for OMA Marketplace
-- Use with Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- MCP Servers Table
CREATE TABLE mcp_servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    author VARCHAR(255) NOT NULL,
    author_email VARCHAR(255),
    repository_url TEXT,
    website_url TEXT,
    documentation_url TEXT,
    logo_url TEXT,
    version VARCHAR(50),
    mcp_endpoint TEXT NOT NULL,
    transport VARCHAR(50) NOT NULL CHECK (transport IN ('stdio', 'sse', 'websocket')),
    pricing_usdc DECIMAL(10, 8) NOT NULL DEFAULT 0.000,
    x402_enabled BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'disabled', 'rejected')),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_calls INTEGER DEFAULT 0,
    success_rate DECIMAL(5, 2) DEFAULT 0.00,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MCP Tools Table
CREATE TABLE mcp_tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mcp_server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    input_schema JSONB NOT NULL,
    pricing_usdc DECIMAL(10, 8) NOT NULL DEFAULT 0.000,
    total_calls INTEGER DEFAULT 0,
    success_rate DECIMAL(5, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(mcp_server_id, name)
);

-- MCP Usage Table
CREATE TABLE mcp_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mcp_server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
    mcp_tool_id UUID REFERENCES mcp_tools(id) ON DELETE SET NULL,
    user_id VARCHAR(255),
    call_success BOOLEAN NOT NULL,
    error_message TEXT,
    response_time_ms INTEGER,
    pricing_usdc DECIMAL(10, 8) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MCP Reviews Table
CREATE TABLE mcp_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mcp_server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(mcp_server_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_mcp_servers_slug ON mcp_servers(slug);
CREATE INDEX idx_mcp_servers_category ON mcp_servers(category);
CREATE INDEX idx_mcp_servers_author ON mcp_servers(author);
CREATE INDEX idx_mcp_servers_status ON mcp_servers(status);
CREATE INDEX idx_mcp_servers_verified ON mcp_servers(verified);
CREATE INDEX idx_mcp_servers_rating ON mcp_servers(rating DESC);
CREATE INDEX idx_mcp_tools_server_id ON mcp_tools(mcp_server_id);
CREATE INDEX idx_mcp_usage_server_id ON mcp_usage(mcp_server_id);
CREATE INDEX idx_mcp_usage_created_at ON mcp_usage(created_at DESC);
CREATE INDEX idx_mcp_reviews_server_id ON mcp_reviews(mcp_server_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_mcp_servers_updated_at
    BEFORE UPDATE ON mcp_servers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE mcp_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies (adjust based on your auth strategy)
CREATE POLICY "Anyone can view active MCP servers"
    ON mcp_servers FOR SELECT
    USING (status = 'active');

CREATE POLICY "Anyone can view MCP tools"
    ON mcp_tools FOR SELECT
    USING (true);

CREATE POLICY "Only registered users can create MCP servers"
    ON mcp_servers FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Only MCP authors can update their MCP"
    ON mcp_servers FOR UPDATE
    USING (true);

CREATE POLICY "Anyone can create usage logs"
    ON mcp_usage FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anyone can create reviews"
    ON mcp_reviews FOR INSERT
    WITH CHECK (true);
