import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';
import { checkRateLimit, createRateLimitResponse, addSecurityHeaders } from '@/lib/security';

// GET /api/services - List all services with optional filtering
export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = await checkRateLimit(request, 60, 60 * 1000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.resetTime!);
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = (searchParams.get('search') || '').toLowerCase();
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  // Unified Real Data (Used as fallback or primary if Supabase is empty)
  const realWorldServices = [
    {
      id: 'gpt-4-o',
      name: 'GPT-4o API',
      description: 'OpenAI\'s most advanced multimodal model for reasoning, vision, and high-speed interaction. Powers autonomous agents with text, image, and code understanding.',
      price_per_use: 0.005,
      type: 'model',
      seller_wallet: '0x8888888888888888888888888888888888888888',
      capabilities: ['text-generation', 'vision', 'reasoning', 'code-generation'],
      tags: ['llm', 'openai', 'multimodal', 'autonomous'],
      rating: 4.9,
      total_sales: 125000,
      status: 'active',
      featured: true,
      categories: { name: 'AI Models' }
    },
    {
      id: 'claude-3-5-sonnet',
      name: 'Claude 3.5 Sonnet',
      description: 'Anthropic\'s latest model offering unmatched coding capabilities and nuanced reasoning. Ideal for complex multi-step agent workflows.',
      price_per_use: 0.003,
      type: 'model',
      seller_wallet: '0x7777777777777777777777777777777777777777',
      capabilities: ['coding', 'writing', 'analysis', 'tool-use'],
      tags: ['llm', 'anthropic', 'coding', 'agents'],
      rating: 4.8,
      total_sales: 89000,
      status: 'active',
      featured: true,
      categories: { name: 'AI Models' }
    },
    {
      id: 'gemini-2-flash',
      name: 'Gemini 2.0 Flash',
      description: 'Google\'s fastest multimodal model optimized for real-time agent responses. 1M token context window for complex workflows.',
      price_per_use: 0.001,
      type: 'model',
      seller_wallet: '0x9999999999999999999999999999999999999999',
      capabilities: ['text-generation', 'vision', 'long-context'],
      tags: ['llm', 'google', 'fast', 'multimodal'],
      rating: 4.7,
      total_sales: 67000,
      status: 'active',
      featured: true,
      categories: { name: 'AI Models' }
    },
    {
      id: 'flux-1-dev',
      name: 'FLUX.1 [dev]',
      description: 'State-of-the-art image generation API with high fidelity and text rendering. Perfect for creative agents and design automation.',
      price_per_use: 0.02,
      type: 'api',
      seller_wallet: '0x6666666666666666666666666666666666666666',
      capabilities: ['image-generation', 'text-rendering'],
      tags: ['creative', 'art', 'diffusion', 'design'],
      rating: 4.7,
      total_sales: 45000,
      status: 'active',
      featured: false,
      categories: { name: 'Image Generation' }
    },
    {
      id: 'brave-search',
      name: 'Brave Search API',
      description: 'Privacy-focused search engine API for giving agents real-time web access. No tracking, unbiased results.',
      price_per_use: 0.001,
      type: 'api',
      seller_wallet: '0x5555555555555555555555555555555555555555',
      capabilities: ['web-search', 'real-time-data'],
      tags: ['search', 'data', 'real-time', 'privacy'],
      rating: 4.6,
      total_sales: 220000,
      status: 'active',
      featured: false,
      categories: { name: 'Search & Data' }
    },
    {
      id: 'github-mcp',
      name: 'GitHub MCP Server',
      description: 'Connect your agents to GitHub repositories, issues, and PRs via Model Context Protocol. Enable autonomous code review and CI/CD.',
      price_per_use: 0,
      type: 'mcp',
      seller_wallet: '0x4444444444444444444444444444444444444444',
      capabilities: ['repository-access', 'issue-management', 'pr-review'],
      tags: ['mcp', 'github', 'dev-tools', 'automation'],
      rating: 4.9,
      total_sales: 150000,
      status: 'active',
      featured: true,
      categories: { name: 'MCP Servers' }
    },
    {
      id: 'context7-mcp',
      name: 'Context7 MCP Server',
      description: 'Advanced context management for long-running agent sessions. Persistent memory and semantic search.',
      price_per_use: 0.002,
      type: 'mcp',
      seller_wallet: '0x4343434343434343434343434343434343434343',
      capabilities: ['context-management', 'semantic-search', 'memory'],
      tags: ['mcp', 'context', 'memory', 'agents'],
      rating: 4.8,
      total_sales: 89000,
      status: 'active',
      featured: true,
      categories: { name: 'MCP Servers' }
    },
    {
      id: 'stripe-payment-mcp',
      name: 'Stripe Payments MCP',
      description: 'Enable your agents to create invoices, manage subscriptions, and process payments autonomously.',
      price_per_use: 0.05,
      type: 'mcp',
      seller_wallet: '0x3333333333333333333333333333333333333333',
      capabilities: ['billing', 'payments', 'subscriptions'],
      tags: ['finance', 'mcp', 'stripe', 'payments'],
      rating: 4.5,
      total_sales: 12000,
      status: 'active',
      featured: false,
      categories: { name: 'Finance' }
    },
    {
      id: 'tavily-ai-search',
      name: 'Tavily AI Search',
      description: 'AI-optimized search engine designed specifically for LLMs and autonomous agents. Returns structured, cited results.',
      price_per_use: 0.002,
      type: 'api',
      seller_wallet: '0x2222222222222222222222222222222222222222',
      capabilities: ['web-research', 'summarization', 'citations'],
      tags: ['search', 'agentic-web', 'ai-search', 'research'],
      rating: 4.8,
      total_sales: 56000,
      status: 'active',
      featured: true,
      categories: { name: 'Search & Data' }
    },
    {
      id: 'deepgram-nova-2',
      name: 'Deepgram Nova-2',
      description: 'The world\'s fastest and most accurate speech-to-text API for real-time audio analysis. 300x faster than competitors.',
      price_per_use: 0.004,
      type: 'api',
      seller_wallet: '0x1111111111111111111111111111111111111111',
      capabilities: ['speech-to-text', 'audio-intelligence', 'diarization'],
      tags: ['audio', 'nlp', 'stt', 'voice'],
      rating: 4.7,
      total_sales: 78000,
      status: 'active',
      featured: false,
      categories: { name: 'Audio & Speech' }
    },
    {
      id: 'elevenlabs-tts',
      name: 'ElevenLabs Voice AI',
      description: 'Premium text-to-speech with emotion and intonation. Clone voices or use 1000+ pre-made voices for agent communication.',
      price_per_use: 0.01,
      type: 'api',
      seller_wallet: '0x0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b',
      capabilities: ['text-to-speech', 'voice-cloning', 'multilingual'],
      tags: ['audio', 'tts', 'voice', 'agents'],
      rating: 4.9,
      total_sales: 95000,
      status: 'active',
      featured: true,
      categories: { name: 'Audio & Speech' }
    },
    {
      id: 'supabase-mcp',
      name: 'Supabase MCP Server',
      description: 'Direct database access for agents. Query, insert, update data with full RLS support and real-time subscriptions.',
      price_per_use: 0.001,
      type: 'mcp',
      seller_wallet: '0x5252525252525252525252525252525252525252',
      capabilities: ['database', 'storage', 'auth', 'realtime'],
      tags: ['mcp', 'database', 'supabase', 'postgres'],
      rating: 4.7,
      total_sales: 67000,
      status: 'active',
      featured: true,
      categories: { name: 'MCP Servers' }
    },
    {
      id: 'perplexity-sonar',
      name: 'Perplexity Sonar API',
      description: 'Real-time web search with citations built for AI. Agents get up-to-date information with source attribution.',
      price_per_use: 0.002,
      type: 'api',
      seller_wallet: '0x5050505050505050505050505050505050505050',
      capabilities: ['web-search', 'citations', 'real-time'],
      tags: ['search', 'research', 'citations', 'agents'],
      rating: 4.6,
      total_sales: 43000,
      status: 'active',
      featured: false,
      categories: { name: 'Search & Data' }
    },
    {
      id: 'replicate-api',
      name: 'Replicate Model Hub',
      description: 'Run 1000+ open-source AI models with one API. Image, video, audio, and text models from the community.',
      price_per_use: 0.01,
      type: 'api',
      seller_wallet: '0x5252525252525252525252525252525252525252',
      capabilities: ['image-generation', 'video', 'audio', 'multimodal'],
      tags: ['models', 'open-source', 'replicate', 'hub'],
      rating: 4.5,
      total_sales: 56000,
      status: 'active',
      featured: false,
      categories: { name: 'AI Models' }
    },
    {
      id: 'slack-mcp',
      name: 'Slack MCP Server',
      description: 'Let agents communicate on Slack. Send messages, read channels, manage threads autonomously.',
      price_per_use: 0.003,
      type: 'mcp',
      seller_wallet: '0x5151515151515151515151515151515151515151',
      capabilities: ['messaging', 'channels', 'threads'],
      tags: ['mcp', 'slack', 'communication', 'team'],
      rating: 4.6,
      total_sales: 34000,
      status: 'active',
      featured: false,
      categories: { name: 'Communication' }
    }
  ];

  // Logic to handle database or demo data
  let services = [];
  let total = 0;

  if (isSupabaseEnabled) {
    try {
      let query = supabase!.from('services').select('*', { count: 'exact' });
      
      if (category && category !== 'all') {
        // Since we don't have categories table joined in the fallback, 
        // we'll filter by name or assume a schema for now
        // This is a bit tricky without knowing the exact schema
      }
      
      const { data, count, error } = await query;
      
      if (!error && data && data.length > 0) {
        services = data;
        total = count || data.length;
      } else {
        // Fallback to realWorldServices if DB is empty
        services = realWorldServices;
        total = realWorldServices.length;
      }
    } catch (err) {
      services = realWorldServices;
      total = realWorldServices.length;
    }
  } else {
    services = realWorldServices;
    total = realWorldServices.length;
  }

  // Client-side filtering for demo/fallback data
  let filteredServices = services;
  if (category && category !== 'all') {
    filteredServices = filteredServices.filter(s => 
      s.categories?.name === category || s.category === category
    );
  }
  if (search) {
    filteredServices = filteredServices.filter(s => 
      s.name.toLowerCase().includes(search) || 
      s.description.toLowerCase().includes(search) ||
      s.tags.some((t: string) => t.toLowerCase().includes(search))
    );
  }

  // Pagination
  const paginatedServices = filteredServices.slice(offset, offset + limit);

  const response = NextResponse.json({ 
    services: paginatedServices, 
    total: filteredServices.length 
  });
  
  return addSecurityHeaders(response);
}
