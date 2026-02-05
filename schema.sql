-- OMA-AI.COM Production Database Schema
-- Compatible with Supabase (PostgreSQL)
-- Generated: 2026-02-03

-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE service_type AS ENUM ('api', 'model', 'compute', 'agent', 'skill', 'prompt');
CREATE TYPE agent_status AS ENUM ('alive', 'dying', 'dead');

-- ============================================
-- TABLES
-- ============================================

-- 1. Marketplace Services
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type service_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_use DECIMAL(10, 6) NOT NULL,
    x402_endpoint TEXT NOT NULL,
    seller_wallet VARCHAR(255) NOT NULL,
    capabilities TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_sales INTEGER DEFAULT 0,
    total_revenue DECIMAL(10, 6) DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0
);

-- Index for search
CREATE INDEX idx_services_name ON services (name);
CREATE INDEX idx_services_type ON services (type);
CREATE INDEX idx_services_wallet ON services (seller_wallet);

-- 2. Transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    buyer_wallet VARCHAR(255) NOT NULL,
    seller_wallet VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 6) NOT NULL,
    fee DECIMAL(10, 6) NOT NULL,
    net_amount DECIMAL(10, 6) NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics
CREATE INDEX idx_transactions_seller ON transactions (seller_wallet);
CREATE INDEX idx_transactions_created ON transactions (created_at);

-- 3. Agents (Conway/Self-Sustaining)
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES agents(id),
    generation INTEGER DEFAULT 1,
    status agent_status DEFAULT 'alive',
    balance DECIMAL(10, 6) DEFAULT 0,
    rent_per_day DECIMAL(10, 6) DEFAULT 1.0,
    revenue_per_day DECIMAL(10, 6) DEFAULT 3.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_payment TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    children UUID[] DEFAULT '{}'
);

-- 4. Agent Logs (for Terminal View)
CREATE TABLE agent_logs (
    id BIGSERIAL PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    level VARCHAR(20) DEFAULT 'INFO',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional)
-- ============================================
-- INSERT INTO services (type, name, description, price_per_use, x402_endpoint, seller_wallet)
-- VALUES ('agent', 'Founder Agent', 'The genesis agent of OMA-AI', 0.0, 'http://localhost:4020', '0x000');

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS for Supabase Auth integration
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE agents ENABLE ROW LEVEL SECURITY;