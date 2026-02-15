-- ============================================
-- OMA-AI SEED DATA
-- Real API Services
-- ============================================

-- Insert real API services
INSERT INTO services (id, name, description, category, provider, endpoint_url, price_per_call, price_type, rating, total_calls, tags, featured, icon_url, documentation_url) VALUES
(uuid_generate_v4(), 'GPT-4 Turbo', 'Advanced language model for complex reasoning and code generation', 'AI & ML', 'OpenAI', 'https://api.openai.com/v1/chat/completions', 0.01, 'per_call', 4.9, 1250000, ARRAY['llm', 'chat', 'code'], true, 'https://cdn.openai.com/logo.png', 'https://platform.openai.com/docs/models/gpt-4-turbo'),
(uuid_generate_v4(), 'Claude 3.5 Sonnet', 'Anthropic''s most capable AI assistant for analysis and writing', 'AI & ML', 'Anthropic', 'https://api.anthropic.com/v1/messages', 0.015, 'per_call', 4.8, 850000, ARRAY['llm', 'analysis', 'writing'], true, 'https://www.anthropic.com/images/icons/apple-touch-icon.png', 'https://docs.anthropic.com'),
(uuid_generate_v4(), 'GitHub MCP Server', 'Connect your agents to GitHub repositories, issues, and PRs', 'MCP Servers', 'Model Context Protocol', 'mcp://github', 0, 'free', 4.9, 500000, ARRAY['mcp', 'github', 'dev-tools'], true, 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', 'https://github.com/modelcontextprotocol/servers'),
(uuid_generate_v4(), 'Brave Search MCP', 'Enable web search capabilities using Brave Search API', 'MCP Servers', 'Brave Software', 'mcp://brave-search', 0.001, 'per_call', 4.8, 200000, ARRAY['mcp', 'search', 'web'], false, 'https://brave.com/static-assets/images/brave-logo.svg', 'https://github.com/modelcontextprotocol/servers'),
(uuid_generate_v4(), 'Flux.1 Image Generator', 'Create stunning images from text descriptions', 'AI & ML', 'Black Forest Labs', 'https://api.flux.ai/v1/generate', 0.02, 'per_call', 4.7, 600000, ARRAY['image', 'generation', 'creative'], true, 'https://flux.ai/logo.png', 'https://docs.flux.ai'),
(uuid_generate_v4(), 'x402 Payment Gateway', 'Accept crypto payments via x402 protocol on Base network', 'Finance', 'OMA Network', 'https://api.oma-ai.com/v1/x402', 0.002, 'per_call', 4.9, 1800000, ARRAY['crypto', 'payments', 'base'], true, 'https://oma-ai.com/logo.png', 'https://docs.oma-ai.com/x402'),
(uuid_generate_v4(), 'Context7 Memory', 'Long-term memory and context storage for AI agents', 'AI & ML', 'Upstash', 'mcp://context7', 0.0001, 'per_call', 4.6, 950000, ARRAY['memory', 'context', 'storage'], false, 'https://upstash.com/logo.png', 'https://github.com/upstash/context7-mcp'),
(uuid_generate_v4(), 'Solana RPC', 'High-performance Solana blockchain RPC endpoints', 'Blockchain', 'Helius', 'https://api.helius.dev/v1/rpc', 0.001, 'per_call', 4.8, 750000, ARRAY['blockchain', 'solana', 'rpc'], false, 'https://solana.com/logo.png', 'https://docs.helius.dev'),
(uuid_generate_v4(), 'ElevenLabs TTS', 'High-quality text-to-speech synthesis', 'AI & ML', 'ElevenLabs', 'https://api.elevenlabs.io/v1/text-to-speech', 0.005, 'per_call', 4.7, 400000, ARRAY['audio', 'tts', 'voice'], false, 'https://elevenlabs.io/logo.png', 'https://docs.elevenlabs.io'),
(uuid_generate_v4(), 'Replicate ML', 'Run open-source ML models with one API', 'AI & ML', 'Replicate', 'https://api.replicate.com/v1/predictions', 0.01, 'per_call', 4.6, 300000, ARRAY['ml', 'models', 'inference'], false, 'https://replicate.com/logo.png', 'https://replicate.com/docs'),
(uuid_generate_v4(), 'Perplexity AI', 'Real-time AI-powered search and answers', 'AI & ML', 'Perplexity', 'https://api.perplexity.ai/v1/chat', 0.005, 'per_call', 4.7, 550000, ARRAY['search', 'qa', 'research'], false, 'https://perplexity.ai/logo.png', 'https://docs.perplexity.ai'),
(uuid_generate_v4(), 'OpenRouter', 'Unified API for 100+ AI models', 'AI & ML', 'OpenRouter', 'https://openrouter.ai/api/v1/chat', 0.001, 'per_call', 4.8, 1200000, ARRAY['llm', 'multi-model', 'routing'], true, 'https://openrouter.ai/logo.png', 'https://openrouter.ai/docs');

-- Insert sample tasks/bounties
INSERT INTO tasks (id, title, description, category, difficulty, reward_usd, status, tags, requirements) VALUES
(uuid_generate_v4(), 'Build Solana Token Tracker Bot', 'Create a Discord bot that tracks Solana token prices and alerts users on significant changes', 'Bot Development', 'hard', 250.00, 'open', ARRAY['discord', 'solana', 'bot'], 'Experience with Discord.js and Solana web3.js'),
(uuid_generate_v4(), 'Implement x402 Payment Flow', 'Integrate x402 crypto payments into an existing Next.js app', 'Integration', 'medium', 150.00, 'open', ARRAY['x402', 'crypto', 'nextjs'], 'Knowledge of Base network and USDC'),
(uuid_generate_v4(), 'Create MCP Server for Weather API', 'Build an MCP server that connects to OpenWeatherMap API', 'MCP Development', 'easy', 75.00, 'open', ARRAY['mcp', 'weather', 'api'], 'TypeScript/Node.js experience'),
(uuid_generate_v4(), 'Optimize React Performance', 'Audit and optimize React app performance, reduce bundle size', 'Performance', 'medium', 100.00, 'open', ARRAY['react', 'performance', 'optimization'], 'React profiling and bundle analysis'),
(uuid_generate_v4(), 'Build AI Agent Task Runner', 'Create an autonomous agent that completes tasks on the web', 'AI Agents', 'hard', 500.00, 'open', ARRAY['ai', 'agents', 'automation'], 'Experience with AI APIs and browser automation'),
(uuid_generate_v4(), 'Write API Documentation', 'Document 10 REST API endpoints with examples', 'Documentation', 'easy', 50.00, 'open', ARRAY['docs', 'api', 'markdown'], 'Technical writing experience');

-- ============================================
-- SPENDTHRONE SEED DATA
-- ============================================

-- Insert categories
INSERT INTO categories (id, name, slug, description) VALUES
(uuid_generate_v4(), 'Tech & Gadgets', 'tech-gadgets', 'Latest technology and electronic gadgets'),
(uuid_generate_v4(), 'Home & Living', 'home-living', 'Premium home goods and lifestyle products'),
(uuid_generate_v4(), 'Lifestyle', 'lifestyle', 'Curated lifestyle products for modern living'),
(uuid_generate_v4(), 'Gaming', 'gaming', 'Gaming accessories and entertainment'),
(uuid_generate_v4(), 'Kitchen', 'kitchen', 'Premium kitchen appliances and tools'),
(uuid_generate_v4(), 'Fitness', 'fitness', 'Health and fitness equipment');

-- Insert products
INSERT INTO products (id, name, slug, description, short_description, category, price, original_price, image_url, rating, review_count, in_stock, tags, features, affiliate_url) VALUES
(uuid_generate_v4(), 'Sony WH-1000XM5 Headphones', 'sony-wh1000xm5-headphones', 'Industry-leading noise canceling headphones with exceptional sound quality', 'Premium noise-canceling headphones', 'Tech & Gadgets', 349.99, 399.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 4.9, 2847, true, ARRAY['audio', 'wireless', 'noise-canceling'], ARRAY['30-hour battery', 'Multipoint connection', 'Speak-to-chat'], 'https://www.amazon.com/s?k=sony+wh1000xm5'),
(uuid_generate_v4(), 'Anker 737 PowerCore', 'anker-737-powercore', 'High-capacity portable charger with 25,600mAh and 140W output', '25,600mAh 140W portable charger', 'Tech & Gadgets', 129.99, NULL, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800', 4.7, 1523, true, ARRAY['portable', 'charging', 'power-bank'], ARRAY['140W max output', 'USB-C & USB-A', 'LED display'], 'https://www.amazon.com/s?k=anker+737+powercore'),
(uuid_generate_v4(), 'BenQ ScreenBar Halo', 'benq-screenbar-halo', 'Premium monitor light bar with wireless controller', 'Monitor light bar with wireless control', 'Tech & Gadgets', 179.99, 199.99, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800', 4.8, 892, true, ARRAY['lighting', 'monitor', 'desk'], ARRAY['Wireless controller', 'Auto-dimming', 'No screen glare'], 'https://www.amazon.com/s?k=benq+screenbar+halo'),
(uuid_generate_v4(), 'DJI Mini 4 Pro Drone', 'dji-mini-4-pro', 'Ultra-lightweight drone with 4K camera and obstacle sensing', 'Compact 4K drone with obstacle avoidance', 'Tech & Gadgets', 759.00, NULL, 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800', 4.9, 1156, true, ARRAY['drone', 'camera', '4k'], ARRAY['Under 250g', '47-min flight time', 'O4 transmission'], 'https://www.amazon.com/s?k=dji+mini+4+pro'),
(uuid_generate_v4(), 'Senville Aura Smart AC', 'senville-aura-smart-ac', 'Smart mini-split air conditioner with WiFi control', 'Smart mini-split AC with WiFi', 'Home & Living', 899.00, 999.00, 'https://images.unsplash.com/photo-1631567091046-3b31a31d1f76?w=800', 4.6, 342, true, ARRAY['smart-home', 'ac', 'cooling'], ARRAY['WiFi control', 'Energy efficient', 'Quiet operation'], 'https://www.amazon.com/s?k=senville+aura'),
(uuid_generate_v4(), 'Philips Hue Starter Kit', 'philips-hue-starter-kit', 'Smart LED bulbs with color control and automation', 'Smart color LED bulbs (3 pack)', 'Home & Living', 199.99, NULL, 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 4.7, 2341, true, ARRAY['smart-home', 'lighting', 'led'], ARRAY['16M colors', 'Voice control', 'Schedules'], 'https://www.amazon.com/s?k=philips+hue+starter+kit'),
(uuid_generate_v4(), 'LEGO Technic Set', 'lego-technic-set', 'Advanced LEGO Technic building set for adults', 'Advanced Technic building set', 'Lifestyle', 149.99, NULL, 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800', 4.8, 1876, true, ARRAY['lego', 'building', 'toys'], ARRAY['2000+ pieces', 'Motorized', 'For adults'], 'https://www.amazon.com/s?k=lego+technic'),
(uuid_generate_v4(), 'Lomi Kitchen Composter', 'lomi-kitchen-composter', 'Electric kitchen composter that turns waste into dirt', 'Electric kitchen composter', 'Kitchen', 499.00, NULL, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 4.5, 567, true, ARRAY['kitchen', 'compost', 'eco'], ARRAY['3hr cycle', 'Odorless', 'Carbon filter'], 'https://www.amazon.com/s?k=lomi+composter');

-- ============================================
-- LETHOMETRY SEED DATA
-- ============================================

-- Insert experiments
INSERT INTO experiments (id, title, slug, description, category, content, questions) VALUES
(uuid_generate_v4(), 'Moral Trolley Problem', 'moral-trolley-problem', 'Explore ethical decision-making through the classic trolley dilemma', 'Ethics', '<p>You stand beside a lever that can divert a runaway trolley. Five people are tied to the main track, one person to the side track. Do you pull the lever?</p>', '[{"question": "Would you pull the lever to save 5 people at the cost of 1?", "options": ["Yes", "No", "Undecided"]}]'),
(uuid_generate_v4(), 'Ebbinghaus Memory Curve', 'memory-ebbinghaus', 'Test your memory retention over time', 'Psychology', '<p>Memorize a series of nonsense syllables and test your recall at intervals. This experiment demonstrates the forgetting curve.</p>', '[{"question": "How many items can you recall after 1 minute?", "type": "number"}]'),
(uuid_generate_v4(), 'Risk Assessment Test', 'risk-assessment', 'Evaluate your risk tolerance and decision-making under uncertainty', 'Psychology', '<p>Choose between guaranteed rewards and probabilistic gains to assess your risk profile.</p>', '[{"question": "Would you take $50 guaranteed or 50% chance of $120?", "options": ["$50 guaranteed", "50% of $120"]}]'),
(uuid_generate_v4(), 'Pascals Wager', 'pascals-wager', 'Philosophical analysis of belief and expected value', 'Philosophy', '<p>Should you believe in God? Pascal argued that the expected value of belief is infinite if God exists.</p>', '[{"question": "Does expected value justify belief?", "options": ["Yes", "No", "Its more complex"]}]'),
(uuid_generate_v4(), 'Ship of Theseus', 'ship-of-theseus', 'Explore the nature of identity and persistence', 'Philosophy', '<p>If you replace every plank of a ship, is it still the same ship? What about when you rebuild the original from the old planks?</p>', '[{"question": "Which ship is the \"real\" Ship of Theseus?", "options": ["The repaired ship", "The rebuilt ship", "Neither", "Both"]}]');
