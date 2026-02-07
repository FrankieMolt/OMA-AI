-- OMA-AI Seed Data
-- Categories, tags, and initial data
-- Date: 2026-02-07

-- ============================================
-- SEED CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, icon, color, sort_order) VALUES
('AI & Machine Learning', 'ai-ml', 'Artificial intelligence and machine learning APIs', 'Brain', '#667eea', 1),
('Data & Analytics', 'data-analytics', 'Data processing, analytics, and visualization', 'Database', '#f093fb', 2),
('Blockchain & Crypto', 'blockchain', 'Blockchain, cryptocurrency, and Web3 services', 'Coins', '#4facfe', 3),
('Communication', 'communication', 'Messaging, email, and communication APIs', 'MessageSquare', '#10b981', 4),
('Developer Tools', 'developer-tools', 'Development and deployment tools', 'Code', '#f59e0b', 5),
('Finance & Payments', 'finance', 'Financial data, payments, and trading APIs', 'DollarSign', '#ef4444', 6),
('Gaming & Entertainment', 'gaming', 'Gaming, entertainment, and media APIs', 'Gamepad2', '#8b5cf6', 7),
('Image & Video', 'image-video', 'Image processing and video APIs', 'Image', '#ec4899', 8),
('Location & Maps', 'location-maps', 'Geolocation, mapping, and navigation APIs', 'MapPin', '#06b6d4', 9),
('Productivity', 'productivity', 'Productivity and workflow automation APIs', 'Zap', '#84cc16', 10),
('Security', 'security', 'Security, authentication, and compliance APIs', 'Shield', '#6366f1', 11),
('Social Media', 'social-media', 'Social media and networking APIs', 'Share2', '#14b8a6', 12)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SEED TAGS
-- ============================================
INSERT INTO tags (name, slug) VALUES
-- AI & ML Tags
('AI Agents', 'ai-agents'),
('Machine Learning', 'machine-learning'),
('Natural Language Processing', 'nlp'),
('Computer Vision', 'computer-vision'),
('Generative AI', 'generative-ai'),
('Large Language Models', 'llm'),
('GPT', 'gpt'),
('Claude', 'claude'),

-- Data Tags
('Analytics', 'analytics'),
('Big Data', 'big-data'),
('Data Mining', 'data-mining'),
('Visualization', 'visualization'),
('ETL', 'etl'),

-- Blockchain Tags
('Smart Contracts', 'smart-contracts'),
('DeFi', 'defi'),
('NFT', 'nft'),
('Web3', 'web3'),
('dApps', 'dapps'),
('Ethereum', 'ethereum'),
('Base', 'base'),
('Solana', 'solana'),

-- Developer Tags
('API Management', 'api-management'),
('DevOps', 'devops'),
('CI/CD', 'cicd'),
('Testing', 'testing'),
('Deployment', 'deployment'),
('Version Control', 'version-control'),

-- Finance Tags
('Trading', 'trading'),
('Payments', 'payments'),
('Banking', 'banking'),
('Crypto', 'crypto'),
('Stock Market', 'stock-market'),
('Forex', 'forex'),

-- Other Common Tags
('Real-time', 'real-time'),
('Scalable', 'scalable'),
('Secure', 'secure'),
('Fast', 'fast'),
('API First', 'api-first'),
('Open Source', 'open-source'),
('Enterprise', 'enterprise'),
('Free Tier', 'free-tier'),
('Production Ready', 'production-ready')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SEED SERVICES (Sample Data)
-- ============================================
INSERT INTO services (type, name, description, price_per_use, x402_endpoint, seller_wallet, capabilities, tags, status) VALUES
(
  'model',
  'GPT-4 Turbo',
  'Advanced large language model for complex reasoning, coding, and creative tasks.',
  0.01,
  'https://api.openai.com/v1/chat/completions',
  '0x1234567890abcdef1234567890abcdef12345678',
  ARRAY['text-generation', 'reasoning', 'coding', 'analysis'],
  ARRAY['llm', 'gpt', 'nlp', 'ai-agents', 'production-ready', 'scalable'],
  'active'
),
(
  'model',
  'Claude 3 Opus',
  'Highly capable AI assistant for nuanced understanding, analysis, and complex tasks.',
  0.015,
  'https://api.anthropic.com/v1/messages',
  '0xabcdef1234567890abcdef1234567890abcdef12',
  ARRAY['text-generation', 'reasoning', 'analysis', 'coding'],
  ARRAY['llm', 'claude', 'nlp', 'ai-agents', 'secure', 'fast'],
  'active'
),
(
  'api',
  'Image Recognition API',
  'Identify objects, scenes, and text in images with state-of-the-art accuracy.',
  0.001,
  'https://api.imagerecognition.com/v1/analyze',
  '0x567890abcdef1234567890abcdef1234567890ab',
  ARRAY['object-detection', 'scene-recognition', 'ocr'],
  ARRAY['computer-vision', 'ai', 'fast', 'scalable', 'production-ready'],
  'active'
),
(
  'api',
  'Natural Language Processing Suite',
  'Complete NLP toolkit: sentiment analysis, entity extraction, translation, and summarization.',
  0.0005,
  'https://api.nlp-suite.com/v1/process',
  '0x7890abcdef1234567890abcdef1234567890abcd',
  ARRAY['sentiment-analysis', 'ner', 'translation', 'summarization'],
  ARRAY['nlp', 'text-analysis', 'scalable', 'api-first', 'production-ready'],
  'active'
),
(
  'agent',
  'Research Assistant Agent',
  'Autonomous research agent that can search, analyze, and synthesize information from multiple sources.',
  0.05,
  'https://agents.research-assistant.com/v1/query',
  '0x90abcdef1234567890abcdef1234567890abcde',
  ARRAY['research', 'analysis', 'synthesis', 'citations'],
  ARRAY['ai-agents', 'research', 'analysis', 'scalable', 'secure'],
  'active'
),
(
  'agent',
  'Code Review Agent',
  'Automated code review with security checks, best practices enforcement, and improvement suggestions.',
  0.02,
  'https://agents.code-review.com/v1/analyze',
  '0xabcdef1234567890abcdef1234567890abcdef12',
  ARRAY['code-analysis', 'security-check', 'best-practices'],
  ARRAY['ai-agents', 'coding', 'security', 'production-ready'],
  'active'
),
(
  'compute',
  'Distributed Compute',
  'High-performance distributed computing for heavy workloads and parallel processing.',
  0.001,
  'https://compute.distributed.com/v1/execute',
  '0x1234567890abcdef1234567890abcdef12345678',
  ARRAY['distributed-processing', 'gpu-compute', 'parallel-execution'],
  ARRAY['scalable', 'fast', 'enterprise', 'production-ready'],
  'active'
),
(
  'skill',
  'Web Scraping Skill',
  'Advanced web scraping with JavaScript rendering, proxy rotation, and anti-detection.',
  0.002,
  'https://skills.scraping.com/v1/scrape',
  '0x567890abcdef1234567890abcdef1234567890ab',
  ARRAY['scraping', 'data-extraction', 'rendering'],
  ARRAY['scalable', 'fast', 'api-first', 'production-ready'],
  'active'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- SEED REVIEWS
-- ============================================
-- Get service IDs first (simplified approach)
-- In production, use proper foreign key references

-- Sample reviews (will be updated with actual service IDs)
INSERT INTO reviews (service_id, user_id, rating, title, comment, is_verified_purchase) VALUES
(
  (SELECT id FROM services WHERE name = 'GPT-4 Turbo' LIMIT 1),
  (SELECT id FROM users LIMIT 1),
  5,
  'Excellent LLM for complex tasks',
  'GPT-4 Turbo has been incredibly helpful for coding, writing, and complex reasoning tasks. The speed and accuracy are outstanding.',
  true
),
(
  (SELECT id FROM services WHERE name = 'Claude 3 Opus' LIMIT 1),
  (SELECT id FROM users LIMIT 1),
  5,
  'Nuanced understanding is impressive',
  'Claude excels at nuanced analysis and understanding context. It''s my go-to for research and complex discussions.',
  true
),
(
  (SELECT id FROM services WHERE name = 'Research Assistant Agent' LIMIT 1),
  (SELECT id FROM users LIMIT 1),
  4,
  'Great for automated research',
  'Saves hours of research time. Sometimes misses recent sources but overall very reliable.',
  true
)
ON CONFLICT DO NOTHING;

-- ============================================
-- SEED TASKS/BOUNTIES
-- ============================================
-- Get category IDs
INSERT INTO tasks (title, description, category_id, budget, currency, status, difficulty, deadline, created_by) VALUES
(
  'Build AI Agent for Task Management',
  'Create an autonomous AI agent that can manage tasks, prioritize work, and integrate with popular project management tools. The agent should be able to understand natural language instructions and execute complex workflows.',
  (SELECT id FROM categories WHERE slug = 'ai-ml' LIMIT 1),
  500.00,
  'USDC',
  'open',
  'expert',
  NOW() + INTERVAL '30 days',
  (SELECT id FROM users LIMIT 1)
),
(
  'Develop x402 Payment Integration Guide',
  'Write comprehensive documentation and code examples for integrating x402 payment protocol into web applications. Include examples for React, Python, and Go. Include error handling, webhooks, and testing guides.',
  (SELECT id FROM categories WHERE slug = 'developer-tools' LIMIT 1),
  250.00,
  'USDC',
  'open',
  'medium',
  NOW() + INTERVAL '14 days',
  (SELECT id FROM users LIMIT 1)
),
(
  'Create NLP Service for Sentiment Analysis',
  'Build a high-performance natural language processing API that can analyze sentiment from text in real-time. Must support multiple languages and provide confidence scores. Include Python and JavaScript SDKs.',
  (SELECT id FROM categories WHERE slug = 'data-analytics' LIMIT 1),
  750.00,
  'USDC',
  'open',
  'hard',
  NOW() + INTERVAL '45 days',
  (SELECT id FROM users LIMIT 1)
),
(
  'Design Logo and Brand Assets',
  'Create a modern, professional logo and brand assets for a new AI startup. Deliver logo in SVG, PNG, and vector formats. Include color palette, typography guide, and usage examples.',
  (SELECT id FROM categories WHERE slug = 'developer-tools' LIMIT 1),
  150.00,
  'USDC',
  'open',
  'easy',
  NOW() + INTERVAL '7 days',
  (SELECT id FROM users LIMIT 1)
),
(
  'Optimize Database Performance',
  'Analyze and optimize a PostgreSQL database with millions of records. Identify slow queries, recommend indexes, and implement performance improvements. Must maintain data integrity.',
  (SELECT id FROM categories WHERE slug = 'developer-tools' LIMIT 1),
  300.00,
  'USDC',
  'open',
  'hard',
  NOW() + INTERVAL '21 days',
  (SELECT id FROM users LIMIT 1)
)
ON CONFLICT DO NOTHING;

-- ============================================
-- UPDATE SERVICE STATISTICS
-- ============================================
-- Update service ratings based on reviews
UPDATE services s
SET
  rating = COALESCE(
    (SELECT AVG(r.rating) FROM reviews r WHERE r.service_id = s.id),
    0
  ),
  rating_count = COALESCE(
    (SELECT COUNT(*) FROM reviews r WHERE r.service_id = s.id),
    0
  );

-- Update total sales and revenue (simulated)
UPDATE services
SET total_sales = total_sales + FLOOR(RANDOM() * 100),
    total_revenue = total_revenue + (price_per_use * FLOOR(RANDOM() * 100))
WHERE total_sales = 0;

-- ============================================
-- SUMMARY
-- ============================================
-- Seeded:
-- - 12 categories
-- - 30+ tags
-- - 8 services
-- - 3 reviews
-- - 5 tasks/bounties

SELECT 'Seeding completed successfully!' as status;
