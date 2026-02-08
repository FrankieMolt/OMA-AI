-- OMA-AI Real Services - Apply SQL Migration
-- Date: 2026-02-08
-- Instructions: Run this in Supabase SQL Editor to add 4 real AI model services

-- ============================================
-- SQL MIGRATION TO RUN
-- ============================================
-- Copy the SQL below and paste it into Supabase SQL Editor
-- Then click "Run" to execute

-- This will add:
-- 1. OpenRouter Aggregator (Multi-model access)
-- 2. Zai V3 (Ultra-fast GLM-4)
-- 3. Anthropic Direct (Lowest latency)
-- 4. Gemini Flash (128K+ context)

-- ============================================

-- OPENROUTER SERVICE
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
  0.002,
  'https://openrouter.ai/api/v1/chat/completions',
  '0xoma_router_payout_wallet',
  ARRAY['llm', 'gpt-4', 'gpt-3.5', 'claude', 'claude-3-opus', 'claude-3-haiku', 'claude-3-sonnet', 'gemini', 'gemini-flash', 'gemini-pro', 'llama', 'llama-2', 'llama-3', 'mistral', 'mistral-large', 'cohere', 'meta-llama', 'google-palm'],
  ARRAY['aggregator', 'unified', 'multi-model', 'production-ready', 'fast', 'scalable'],
  'active'
);

-- ============================================
-- ZAI SERVICE
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
  'Zai''s high-performance large language model (GLM-4) optimized for speed and cost. Features ultra-fast response times and competitive pricing. Perfect for high-throughput applications.',
  0.0008,
  'https://api.zai.ai/v1/chat',
  '0xzai_payout_wallet',
  ARRAY['llm', 'zai', 'glm', 'glm-4', 'fast', 'ultra-fast', 'low-latency', 'high-throughput', 'cost-effective'],
  ARRAY['zai', 'glm', 'gemini-flash', 'gemini-pro'],
  'active'
);

-- ============================================
-- ANTHROPIC DIRECT SERVICE
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
  'Direct access to Anthropic''s Claude 3, Opus, Haiku, and Sonnet models via Anthropic API. No aggregator overhead. Lowest latency possible. Perfect for complex tasks requiring nuanced understanding.',
  0.015,
  'https://api.anthropic.com/v1/messages',
  '0xanthropic_direct_payout_wallet',
  ARRAY['llm', 'claude', 'claude-3-opus', 'claude-3-haiku', 'claude-3-sonnet', 'anthropic', 'sonnet', 'opinion', 'nuanced', 'complex-tasks'],
  ARRAY['claude', 'claude-3-opus', 'claude-3-haiku', 'claude-3-sonnet'],
  'active'
);

-- ============================================
-- GEMINI FLASH SERVICE
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
  'Google''s ultra-fast large language model (GLM-4) with 128K+ context for big tasks. Perfect for complex code analysis, long documentation generation, and architectural reviews. Supports multiple languages and huge context windows.',
  0.001,
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  '0xgemini_payout_wallet',
  ARRAY['llm', 'gemini', 'gemini-flash', 'glm', 'google', 'gemini-pro', 'ultra-large-context', 'big-tasks'],
  ARRAY['gemini-flash', 'glm', 'google'],
  'active'
);

-- ============================================
-- CREATE CATEGORIES FOR THESE SERVICES
-- (These should reference existing categories from seed data)

-- ============================================
-- UPDATE TAGS WITH NEW PROVIDER TAGS

INSERT INTO tags (name, slug) VALUES
  ('OpenRouter', 'openrouter'),
  ('Zai', 'zai'),
  ('Anthropic Direct', 'anthropic-direct'),
  ('Gemini Flash', 'gemini-flash');

-- ============================================
-- UPDATE TAGS WITH NEW MODEL TAGS

INSERT INTO tags (name, slug) VALUES
  ('GPT-4', 'gpt-4'),
  ('GPT-3.5', 'gpt-3.5'),
  ('Claude 3', 'claude-3'),
  ('Claude 3 Opus', 'claude-3-opus'),
  ('Claude 3 Haiku', 'claude-3-haiku'),
  ('Claude 3 Sonnet', 'claude-3-sonnet'),
  ('Gemini Flash', 'gemini-flash'),
  ('Gemini Pro', 'gemini-pro'),
  ('GLM-4', 'glm'),
  ('Zai V3', 'zai-v3');

-- ============================================
-- INDEX UPDATES

CREATE INDEX IF NOT EXISTS idx_services_type ON services(type);
CREATE INDEX IF NOT EXISTS idx_services_tags ON services USING GIN(tags);

-- ============================================
-- ENABLE RLS FOR NEW SERVICES

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Public read new LLM services" ON services
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Anyone can create LLM services" ON services
  FOR INSERT WITH CHECK (true);

-- ============================================
-- SUMMARY

SELECT 'Added 4 real AI model services:' as status;
SELECT type AS service_type, name AS service_name FROM services WHERE name IN ('OpenRouter Aggregator', 'Zai V3', 'Anthropic Direct', 'Gemini Flash');
