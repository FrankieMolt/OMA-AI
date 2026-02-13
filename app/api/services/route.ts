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
      description: 'OpenAI\'s most advanced multimodal model for reasoning, vision, and high-speed interaction.',
      price_per_use: 0.005,
      type: 'model',
      seller_wallet: '0x8888888888888888888888888888888888888888',
      capabilities: ['text-generation', 'vision', 'reasoning'],
      tags: ['llm', 'openai', 'multimodal'],
      rating: 4.9,
      total_sales: 12500,
      status: 'active',
      featured: true,
      categories: { name: 'AI Models' }
    },
    {
      id: 'claude-3-5-sonnet',
      name: 'Claude 3.5 Sonnet',
      description: 'Anthropic\'s latest model offering unmatched coding capabilities and nuanced reasoning.',
      price_per_use: 0.003,
      type: 'model',
      seller_wallet: '0x7777777777777777777777777777777777777777',
      capabilities: ['coding', 'writing', 'analysis'],
      tags: ['llm', 'anthropic', 'coding'],
      rating: 4.8,
      total_sales: 8900,
      status: 'active',
      featured: true,
      categories: { name: 'AI Models' }
    },
    {
      id: 'flux-1-dev',
      name: 'FLUX.1 [dev]',
      description: 'State-of-the-art image generation API with high fidelity and text rendering capabilities.',
      price_per_use: 0.02,
      type: 'api',
      seller_wallet: '0x6666666666666666666666666666666666666666',
      capabilities: ['image-generation'],
      tags: ['creative', 'art', 'diffusion'],
      rating: 4.7,
      total_sales: 4500,
      status: 'active',
      featured: false,
      categories: { name: 'Image Generation' }
    },
    {
      id: 'brave-search',
      name: 'Brave Search API',
      description: 'Privacy-focused search engine API for giving agents real-time web access.',
      price_per_use: 0.001,
      type: 'api',
      seller_wallet: '0x5555555555555555555555555555555555555555',
      capabilities: ['web-search'],
      tags: ['search', 'data', 'real-time'],
      rating: 4.6,
      total_sales: 22000,
      status: 'active',
      featured: false,
      categories: { name: 'Search & Data' }
    },
    {
      id: 'github-mcp',
      name: 'GitHub MCP Server',
      description: 'Connect your agents to GitHub repositories, issues, and PRs via Model Context Protocol.',
      price_per_use: 0,
      type: 'service',
      seller_wallet: '0x4444444444444444444444444444444444444444',
      capabilities: ['repository-access', 'issue-management'],
      tags: ['mcp', 'github', 'dev-tools'],
      rating: 4.9,
      total_sales: 15000,
      status: 'active',
      featured: true,
      categories: { name: 'MCP Servers' }
    },
    {
      id: 'stripe-payment-mcp',
      name: 'Stripe Payments MCP',
      description: 'Enable your agents to create invoices and manage customer subscriptions.',
      price_per_use: 0.05,
      type: 'service',
      seller_wallet: '0x3333333333333333333333333333333333333333',
      capabilities: ['billing', 'payments'],
      tags: ['finance', 'mcp', 'stripe'],
      rating: 4.5,
      total_sales: 1200,
      status: 'active',
      featured: false,
      categories: { name: 'Finance' }
    },
    {
      id: 'tavily-ai-search',
      name: 'Tavily AI Search',
      description: 'AI-optimized search engine designed specifically for LLMs and autonomous agents.',
      price_per_use: 0.002,
      type: 'api',
      seller_wallet: '0x2222222222222222222222222222222222222222',
      capabilities: ['web-research', 'summarization'],
      tags: ['search', 'agentic-web', 'ai-search'],
      rating: 4.8,
      total_sales: 5600,
      status: 'active',
      featured: true,
      categories: { name: 'Search & Data' }
    },
    {
      id: 'deepgram-nova-2',
      name: 'Deepgram Nova-2',
      description: 'The world\'s fastest and most accurate speech-to-text API for real-time audio analysis.',
      price_per_use: 0.004,
      type: 'api',
      seller_wallet: '0x1111111111111111111111111111111111111111',
      capabilities: ['speech-to-text', 'audio-intelligence'],
      tags: ['audio', 'nlp', 'stt'],
      rating: 4.7,
      total_sales: 7800,
      status: 'active',
      featured: false,
      categories: { name: 'Audio & Speech' }
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
