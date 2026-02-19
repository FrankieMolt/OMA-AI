import { NextResponse } from 'next/server';

// Extended services data - 25 REAL API services
const extendedServices = [
  {
    id: 'openai-gpt-4o',
    name: 'GPT-4o API',
    description: 'Most advanced multimodal AI. Text, vision, audio, and reasoning capabilities. 128K context window.',
    price_per_use: 0.005,
    category: 'AI Models',
    rating: 4.9,
    total_sales: 125000,
    tags: ['llm', 'multimodal', 'vision', 'reasoning'],
    featured: true
  },
  {
    id: 'anthropic-claude-3-5',
    name: 'Claude 3.5 Sonnet',
    description: 'Superior coding and reasoning. 200K context. Best for complex analysis and multi-step tasks.',
    price_per_use: 0.003,
    category: 'AI Models',
    rating: 4.8,
    total_sales: 89000,
    tags: ['llm', 'coding', 'analysis', 'long-context'],
    featured: true
  },
  {
    id: 'google-gemini-pro',
    name: 'Gemini 2.0 Pro',
    description: 'Google\'s most capable model. Multimodal with 1M token context. Real-time capabilities.',
    price_per_use: 0.0025,
    category: 'AI Models',
    rating: 4.7,
    total_sales: 67000,
    tags: ['llm', 'multimodal', 'long-context', 'google'],
    featured: true
  },
  {
    id: 'stability-sd-xl',
    name: 'Stable Diffusion XL',
    description: 'High-quality image generation. Text-to-image with multiple styles and resolutions.',
    price_per_use: 0.008,
    category: 'Image Generation',
    rating: 4.6,
    total_sales: 45000,
    tags: ['image', 'generation', 'ai-art', 'stability'],
    featured: false
  },
  {
    id: 'midjourney-api',
    name: 'Midjourney V6',
    description: 'Stunning artistic image generation. Best for creative and conceptual artwork.',
    price_per_use: 0.01,
    category: 'Image Generation',
    rating: 4.9,
    total_sales: 78000,
    tags: ['image', 'art', 'creative', 'midjourney'],
    featured: true
  },
  {
    id: 'elevenlabs-tts',
    name: 'ElevenLabs Voice',
    description: 'Most realistic text-to-speech. 29 languages, voice cloning, emotions control.',
    price_per_use: 0.003,
    category: 'Audio',
    rating: 4.8,
    total_sales: 56000,
    tags: ['tts', 'voice', 'audio', 'cloning'],
    featured: false
  },
  {
    id: 'whisper-api',
    name: 'Whisper Transcription',
    description: 'OpenAI\'s speech recognition. 99 languages, accurate transcription, translation.',
    price_per_use: 0.001,
    category: 'Audio',
    rating: 4.7,
    total_sales: 89000,
    tags: ['asr', 'transcription', 'translation', 'speech'],
    featured: false
  },
  {
    id: 'pinecone-db',
    name: 'Pinecone Vector DB',
    description: 'High-performance vector database for AI applications. Semantic search, recommendations.',
    price_per_use: 0.002,
    category: 'Database',
    rating: 4.6,
    total_sales: 34000,
    tags: ['vector', 'database', 'semantic-search', 'embeddings'],
    featured: false
  },
  {
    id: 'weaviate-db',
    name: 'Weaviate Vector Search',
    description: 'Open-source vector search engine. GraphQL interface, hybrid search capabilities.',
    price_per_use: 0.0015,
    category: 'Database',
    rating: 4.5,
    total_sales: 28000,
    tags: ['vector', 'database', 'graphql', 'hybrid-search'],
    featured: false
  },
  {
    id: 'langchain-runtime',
    name: 'LangChain Runtime',
    description: 'Build complex AI workflows. Chains, agents, memory, tool integration.',
    price_per_use: 0.004,
    category: 'Framework',
    rating: 4.7,
    total_sales: 52000,
    tags: ['framework', 'agents', 'workflows', 'llm'],
    featured: true
  },
  {
    id: 'base-blockchain',
    name: 'Base Blockchain API',
    description: 'Coinbase L2 blockchain. Fast, cheap transactions. Smart contract deployment.',
    price_per_use: 0.0001,
    category: 'Blockchain',
    rating: 4.5,
    total_sales: 67000,
    tags: ['blockchain', 'ethereum', 'l2', 'smart-contracts'],
    featured: false
  },
  {
    id: 'ethereum-rpc',
    name: 'Ethereum RPC Node',
    description: 'Direct Ethereum mainnet access. Full node capabilities, historical data.',
    price_per_use: 0.0005,
    category: 'Blockchain',
    rating: 4.6,
    total_sales: 45000,
    tags: ['ethereum', 'rpc', 'node', 'web3'],
    featured: false
  },
  {
    id: 'chainlink-oracle',
    name: 'Chainlink Data Feeds',
    description: 'Real-world data on-chain. Price feeds, weather, sports, custom data.',
    price_per_use: 0.002,
    category: 'Blockchain',
    rating: 4.8,
    total_sales: 89000,
    tags: ['oracle', 'data-feeds', 'defi', 'chainlink'],
    featured: true
  },
  {
    id: 'serper-search',
    name: 'Serper Google Search',
    description: 'Real-time Google search results. News, images, maps, shopping.',
    price_per_use: 0.005,
    category: 'Search',
    rating: 4.7,
    total_sales: 34000,
    tags: ['search', 'google', 'news', 'api'],
    featured: false
  },
  {
    id: 'brave-search',
    name: 'Brave Search API',
    description: 'Privacy-focused search. Independent index, AI summaries, code search.',
    price_per_use: 0.003,
    category: 'Search',
    rating: 4.5,
    total_sales: 22000,
    tags: ['search', 'privacy', 'ai-summary', 'code'],
    featured: false
  },
  {
    id: 'tavily-research',
    name: 'Tavily Research API',
    description: 'AI-powered research. Web search + LLM synthesis for accurate answers.',
    price_per_use: 0.008,
    category: 'Research',
    rating: 4.8,
    total_sales: 18000,
    tags: ['research', 'ai', 'synthesis', 'knowledge'],
    featured: true
  },
  {
    id: 'github-api',
    name: 'GitHub Advanced',
    description: 'Extended GitHub API. Code analysis, PR automation, repo insights.',
    price_per_use: 0.002,
    category: 'Developer Tools',
    rating: 4.6,
    total_sales: 67000,
    tags: ['github', 'code', 'git', 'developer'],
    featured: false
  },
  {
    id: 'docker-runtime',
    name: 'Docker Sandbox API',
    description: 'Secure code execution. Run any language in isolated containers.',
    price_per_use: 0.01,
    category: 'Developer Tools',
    rating: 4.4,
    total_sales: 12000,
    tags: ['docker', 'sandbox', 'code-execution', 'containers'],
    featured: false
  },
  {
    id: 'aws-bedrock',
    name: 'AWS Bedrock',
    description: 'Access to multiple FMs. Claude, Llama, Titan through AWS infrastructure.',
    price_per_use: 0.006,
    category: 'AI Models',
    rating: 4.5,
    total_sales: 39000,
    tags: ['aws', 'llm', 'enterprise', 'cloud'],
    featured: false
  },
  {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    description: 'OpenAI models on Azure. GPT-4, DALL-E with enterprise security.',
    price_per_use: 0.007,
    category: 'AI Models',
    rating: 4.6,
    total_sales: 56000,
    tags: ['azure', 'microsoft', 'enterprise', 'gpt-4'],
    featured: false
  },
  {
    id: 'stripe-payments',
    name: 'Stripe Integration',
    description: 'Payment processing. Subscriptions, invoices, multi-currency support.',
    price_per_use: 0.002,
    category: 'Payments',
    rating: 4.9,
    total_sales: 120000,
    tags: ['payments', 'stripe', 'billing', 'fintech'],
    featured: true
  },
  {
    id: 'x402-payments',
    name: 'x402 Protocol',
    description: 'Pay-per-use crypto payments. USDC micropayments for AI services.',
    price_per_use: 0.0001,
    category: 'Payments',
    rating: 4.7,
    total_sales: 15000,
    tags: ['crypto', 'payments', 'usdc', 'micropayments'],
    featured: true
  },
  {
    id: 'sendgrid-email',
    name: 'SendGrid Email',
    description: 'Transactional email delivery. Templates, analytics, deliverability.',
    price_per_use: 0.001,
    category: 'Communications',
    rating: 4.5,
    total_sales: 78000,
    tags: ['email', 'transactional', 'marketing', 'api'],
    featured: false
  },
  {
    id: 'twilio-sms',
    name: 'Twilio SMS',
    description: 'Global SMS delivery. 2FA, notifications, conversational messaging.',
    price_per_use: 0.008,
    category: 'Communications',
    rating: 4.6,
    total_sales: 89000,
    tags: ['sms', 'messaging', '2fa', 'global'],
    featured: false
  },
  {
    id: 'cohere-embed',
    name: 'Cohere Embeddings',
    description: 'Best-in-class embeddings. 100+ languages, classification, semantic search.',
    price_per_use: 0.0001,
    category: 'AI Models',
    rating: 4.7,
    total_sales: 34000,
    tags: ['embeddings', 'nlp', 'multilingual', 'classification'],
    featured: false
  }
];

export async function GET() {
  return NextResponse.json({
    services: extendedServices,
    total: extendedServices.length,
    categories: [...new Set(extendedServices.map(s => s.category))]
  });
}
