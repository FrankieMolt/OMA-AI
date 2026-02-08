-- OMA-AI Real Services - OpenRouter, Zai, Anthropic Direct
-- Date: 2026-02-08
-- This migration adds real AI model services to OMA-AI marketplace

-- ============================================
-- OPENROUTER SERVICE
-- ============================================
INSERT INTO services (
  type,
  name,
  description,
  price_per_use,
  x402_endpoint,
  seller_wallet,
  capabilities,
  tags,
  status
) VALUES (
  'model',
  'OpenRouter Aggregator',
  'Unified access to GPT-4, Claude, Gemini, Llama, and 50+ other AI models through OpenRouter''s unified API. Supports OpenAI, Anthropic, Google, Meta, Mistral, Cohere, and more. One API key for all providers.',
  0.002,  -- $0.002 per request (OpenRouter takes 2.5% fee)
  'https://openrouter.ai/api/v1/chat/completions',
  '0xoma_router_payout_wallet',  -- OMA-AI''s wallet to receive payments
  ARRAY['llm', 'gpt-4', 'gpt-3.5', 'claude', 'gemini', 'gemini-flash', 'llama', 'anthropic', 'openai', 'google', 'meta', 'mistral', 'cohere'],
  ARRAY['aggregator', 'unified', 'multi-model', 'production-ready', 'fast', 'low-latency'],
  'active'
);

-- ============================================
-- ZAI SERVICE
-- ============================================
INSERT INTO services (
  type,
  name,
  description,
  price_per_use,
  x402_endpoint,
  seller_wallet,
  capabilities,
  tags,
  status
) VALUES (
  'model',
  'Zai V3',
  'Zai''s high-performance large language model optimized for speed and cost. Features ultra-fast response times and competitive pricing.',
  0.0008,  -- $0.0008 per 1K tokens (very cheap!)
  'https://api.zai.ai/v1/chat',
  '0xzai_payout_wallet',  -- OMA-AI''s wallet to receive payments
  ARRAY['llm', 'zai', 'gemini-flash', 'fast', 'ultra-fast', 'low-cost'],
  ARRAY['production-ready', 'scalable'],
  'active'
);

-- ============================================
-- ANTHROPIC DIRECT SERVICE
-- ============================================
INSERT INTO services (
  type,
  name,
  description,
  price_per_use,
  x402_endpoint,
  seller_wallet,
  capabilities,
  tags,
  status
) VALUES (
  'model',
  'Anthropic Direct',
  'Direct access to Anthropic''s Claude 3, Opus, Haiku models via Anthropic API. No aggregator overhead, lowest latency possible.',
  0.015,  -- $0.015 per 1K tokens (Claude Opus pricing)
  'https://api.anthropic.com/v1/messages',
  '0xanthropic_direct_payout_wallet',  -- OMA-AI''s wallet to receive payments
  ARRAY['llm', 'claude', 'claude-3-opus', 'claude-haiku', 'anthropic', 'direct', 'ultra-fast', 'premium'],
  ARRAY['production-ready', 'low-latency', 'no-overhead'],
  'active'
);

-- ============================================
-- TOGETHER AI SERVICE (Gemini Flash)
-- ============================================
INSERT INTO services (
  type,
  name,
  description,
  price_per_use,
  x402_endpoint,
  seller_wallet,
  capabilities,
  tags,
  status
) VALUES (
  'model',
  'Gemini Flash',
  'Google''s ultra-fast large language model with 128K+ context for big tasks. Perfect for complex code analysis and long documentation generation.',
  0.001,  -- $0.001 per 1K tokens (for large context)
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  '0xgemini_payout_wallet',  -- OMA-AI''s wallet to receive payments
  ARRAY['llm', 'gemini-flash', 'glm', 'google', 'gemini', 'ultra-large-context', 'production-ready', 'cost-effective'],
  ARRAY['gemini-flash', 'glm', 'google', 'fast'],
  'active'
);

-- ============================================
-- CREATE CATEGORIES FOR THESE SERVICES
-- ============================================

-- Get category IDs (these should exist from initial seed)
-- We'll reference these by slug in tags

-- ============================================
-- INDEX UPDATES
-- ============================================

-- Add indexes for new services
CREATE INDEX IF NOT EXISTS idx_services_type ON services(type);
CREATE INDEX IF NOT EXISTS idx_services_name ON services(name);

-- ============================================
-- RLS POLICIES FOR NEW SERVICES
-- ============================================

-- Enable public read for new services
CREATE POLICY IF NOT EXISTS "Public read new LLM services" ON services
  FOR SELECT USING (true);

-- Allow anyone to insert new services (for now)
CREATE POLICY IF NOT EXISTS "Anyone can create LLM services" ON services
  FOR INSERT WITH CHECK (true);

-- ============================================
-- SUMMARY
-- ============================================

SELECT 'Added 4 real AI model services:' as status;
SELECT name AS service_name, type AS service_type FROM services WHERE name IN ('OpenRouter Aggregator', 'Zai V3', 'Anthropic Direct', 'Gemini Flash');
