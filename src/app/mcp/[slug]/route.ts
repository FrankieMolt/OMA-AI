/**
 * Dynamic MCP Server — Real MCP Protocol Implementation
 * Implements JSON-RPC 2.0 over SSE (Server-Sent Events)
 *
 * Supports:
 * - tools/list: List all available tools
 * - tools/call: Execute a tool
 * - resources/list: List resources
 * - prompts/list: List prompts
 * - initialize: MCP handshake
 * - ping: Keepalive
 */

import { NextRequest } from 'next/server';

interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties?: Record<string, { type: string; description?: string }>;
    required?: string[];
  };
}

// Built-in tools (work without external APIs)
const BUILT_IN_TOOLS: Record<string, Tool> = {
  // Core utilities
  'hello': {
    name: 'hello',
    description: 'Returns a personalized greeting message',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Name to greet' } },
      required: ['name'],
    },
  },
  'echo': {
    name: 'echo',
    description: 'Echoes back the input text',
    inputSchema: {
      type: 'object',
      properties: { message: { type: 'string', description: 'Message to echo' } },
      required: ['message'],
    },
  },
  'time': {
    name: 'time',
    description: 'Returns current server time in multiple formats',
    inputSchema: { type: 'object', properties: {} },
  },
  'health': {
    name: 'health',
    description: 'Health check for the OMA-AI MCP server',
    inputSchema: { type: 'object', properties: {} },
  },
  'list_mcps': {
    name: 'list_mcps',
    description: 'List all MCPs available in the OMA-AI marketplace',
    inputSchema: { type: 'object', properties: {} },
  },
  'search_mcp': {
    name: 'search_mcp',
    description: 'Search MCPs in the OMA-AI marketplace by keyword',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Search query' } },
      required: ['query'],
    },
  },
  'mcp_info': {
    name: 'mcp_info',
    description: 'Get details about a specific MCP by slug',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', description: 'MCP slug (e.g. jupiter-swap-mcp)' } },
      required: ['slug'],
    },
  },
  // Trading & DeFi tools
  'solana_price': {
    name: 'solana_price',
    description: 'Get current Solana price in USD from Binance',
    inputSchema: { type: 'object', properties: {} },
  },
  'price_check': {
    name: 'price_check',
    description: 'Check current crypto prices from Binance',
    inputSchema: {
      type: 'object',
      properties: { symbol: { type: 'string', description: 'Crypto symbol (e.g. BTCUSDT, ETHUSDT, SOLUSDT, BONKUSDT)' } },
      required: ['symbol'],
    },
  },
  'trending_tokens': {
    name: 'trending_tokens',
    description: 'Get trending Solana memecoins from pump.fun',
    inputSchema: { type: 'object', properties: {} },
  },
  'market_stats': {
    name: 'market_stats',
    description: 'Get crypto market stats — market cap, volume, BTC dominance',
    inputSchema: { type: 'object', properties: {} },
  },
};

// Execute a tool
async function executeTool(name: string, args: Record<string, unknown>) {
  const now = new Date().toISOString();

  switch (name) {
    case 'hello': {
      const n = (args.name as string) || 'World';
      return { greeting: `Hello, ${n}! 👋 Welcome to OMA-AI — the MCP Marketplace.` };
    }

    case 'echo':
      return { echo: args.message, received_at: now };

    case 'time':
      return {
        iso: now,
        unix_ms: Date.now(),
        unix_s: Math.floor(Date.now() / 1000),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        utc_offset: new Date().getTimezoneOffset(),
      };

    case 'health':
      return {
        status: 'healthy',
        server: 'OMA-AI Dynamic MCP',
        version: '1.0.0',
        timestamp: now,
        uptime: '100%',
      };

    case 'list_mcps': {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key) throw new Error('Supabase not configured');
        const supabase = createClient(url, key);
        const { data, error } = await supabase
          .from('mcp_servers')
          .select('name,slug,category,pricing_usdc,x402_enabled,verified')
          .eq('status', 'active')
          .limit(20);
        if (error) throw error;
        return {
          count: data?.length || 0,
          mcps: (data || []).map((m) => ({
            name: m.name,
            slug: m.slug,
            category: m.category,
            price: m.pricing_usdc === 0 ? 'Free' : `${m.pricing_usdc} USDC`,
            x402: m.x402_enabled ? 'Yes' : 'No',
            verified: m.verified ? '✓ Verified' : 'Unverified',
          })),
        };
      } catch (e) {
        return { error: String(e), mcps: [] };
      }
    }

    case 'search_mcp': {
      const query = ((args.query as string) || '').toLowerCase();
      if (!query) return { error: 'Query required' };
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data } = await supabase
          .from('mcp_servers')
          .select('name,slug,description,category,pricing_usdc')
          .eq('status', 'active')
          .ilike('name', `%${query}%`)
          .limit(10);
        return { query, results: data || [], count: data?.length || 0 };
      } catch (e) {
        return { error: String(e) };
      }
    }

    case 'mcp_info': {
      const slug = args.slug as string;
      if (!slug) return { error: 'slug required' };
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data } = await supabase
          .from('mcp_servers')
          .select('*')
          .eq('slug', slug)
          .single();
        if (!data) return { error: `MCP not found: ${slug}` };
        return {
          name: data.name,
          slug: data.slug,
          description: data.description,
          category: data.category,
          author: data.author,
          version: data.version,
          endpoint: data.mcp_endpoint,
          pricing: data.pricing_usdc === 0 ? 'Free' : `${data.pricing_usdc} USDC/call`,
          x402_enabled: data.x402_enabled,
          verified: data.verified,
          documentation: data.documentation_url,
          repository: data.repository_url,
        };
      } catch (e) {
        return { error: String(e) };
      }
    }

    case 'solana_price': {
      try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT');
        const data = await res.json();
        const price = parseFloat(data.price);
        return { symbol: 'SOL', price_usd: price, source: 'Binance', timestamp: new Date().toISOString() };
      } catch (e) {
        return { error: `Binance error: ${String(e)}` };
      }
    }

    case 'price_check': {
      const symbol = ((args.symbol as string) || '').toUpperCase();
      if (!symbol) return { error: 'symbol required' };
      const pair = symbol.includes('USDT') ? symbol : `${symbol}USDT`;
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`);
        if (!res.ok) return { error: `Symbol not found: ${symbol}` };
        const data = await res.json();
        return { symbol: data.symbol.replace('USDT',''), price_usdt: parseFloat(data.price), pair: data.symbol, source: 'Binance', timestamp: new Date().toISOString() };
      } catch (e) {
        return { error: String(e) };
      }
    }

    case 'trending_tokens': {
      try {
        const res = await fetch('https://api.dexscreener.com/v1/tokens?key=trending&chain=solana&limit=10&sort=volume&order=desc', { headers: { 'Accept': 'application/json' } });
        if (!res.ok) return { trending: null, error: 'dexscreener API unavailable' };
        const data = await res.json();
        const tokens = ((data.pairs || data.data?.pairs || []) as Array<{ baseToken: { name: string; symbol: string }; liquidity: { usd: number }; priceUsd: string }>).slice(0, 5).map(t => ({
          name: t.baseToken?.name, symbol: t.baseToken?.symbol, liquidity: t.liquidity?.usd ? `$${(t.liquidity.usd/1000).toFixed(0)}K` : 'N/A', price_usd: t.priceUsd,
        }));
        return { count: tokens.length, tokens, timestamp: new Date().toISOString(), source: 'DexScreener' };
      } catch (e) {
        return { trending: null, error: String(e) };
      }
    }

    case 'market_stats': {
      try {
        const [globalRes, btcRes] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/global'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
        ]);
        const global = await globalRes.json().catch(() => null);
        const btc = await btcRes.json().catch(() => null);
        return {
          total_market_cap: global?.data?.total_market_cap?.usd ? `$${(global.data.total_market_cap.usd/1e12).toFixed(2)}T` : 'N/A',
          btc_dominance: global?.data?.market_cap_percentage?.btc ? `${global.data.market_cap_percentage.btc.toFixed(1)}%` : 'N/A',
          btc_price: btc?.price ? `$${parseFloat(btc.price).toLocaleString()}` : 'N/A',
          active_cryptos: global?.data?.active_cryptocurrencies || 'N/A',
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        return { error: String(e) };
      }
    }

    default:
      return { error: `Unknown tool: "${name}". Available tools: ${Object.keys(BUILT_IN_TOOLS).join(', ')}` };
  }
}

// GET: SSE connection
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const send = (data: unknown) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {}
      };

      // Send connection event
      send({ type: 'connected', mcp: slug, timestamp: Date.now() });

      // Send initialize response
      send({
        jsonrpc: '2.0',
        id: null,
        result: {
          protocolVersion: '1.0',
          capabilities: { tools: {}, resources: {}, prompts: {} },
          serverInfo: { name: `oma-ai/${slug}`, version: '1.0.0' },
        },
      });

      // Keep connection alive with ping every 25s
      const ping = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'ping', timestamp: Date.now() })}\n\n`));
        } catch {
          clearInterval(ping);
        }
      }, 25000);

      // Clean up on close
      request.signal.addEventListener('abort', () => clearInterval(ping));
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-MCP-Server': slug,
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// POST: JSON-RPC requests
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const body = (await request.json()) as MCPRequest;
    const { jsonrpc, id, method } = body;

    if (jsonrpc !== '2.0') {
      return Response.json(
        { jsonrpc: '2.0', id, error: { code: -32600, message: 'Invalid Request' } },
        { status: 400 }
      );
    }

    // MCP protocol methods
    if (method === 'initialize') {
      return Response.json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '1.0',
          capabilities: { tools: {}, resources: {}, prompts: {} },
          serverInfo: { name: `oma-ai/${slug}`, version: '1.0.0' },
        },
      });
    }

    if (method === 'tools/list') {
      const tools = Object.values(BUILT_IN_TOOLS);
      return Response.json({ jsonrpc: '2.0', id, result: { tools } });
    }

    if (method === 'tools/call') {
      const { name, arguments: toolArgs = {} } = (body.params || {}) as {
        name: string;
        arguments?: Record<string, unknown>;
      };

      if (!name) {
        return Response.json({
          jsonrpc: '2.0',
          id,
          error: { code: -32602, message: 'Missing tool name' },
        });
      }

      const result = await executeTool(name, toolArgs);

      return Response.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        },
      });
    }

    if (method === 'resources/list') {
      return Response.json({ jsonrpc: '2.0', id, result: { resources: [] } });
    }

    if (method === 'prompts/list') {
      return Response.json({
        jsonrpc: '2.0',
        id,
        result: {
          prompts: [
            {
              name: 'search_mcp',
              description: 'Search for an MCP in the marketplace',
              arguments: [{ name: 'query', description: 'What kind of MCP are you looking for?' }],
            },
            {
              name: 'get_mcp_info',
              description: 'Get details about a specific MCP',
              arguments: [{ name: 'slug', description: 'The MCP slug (e.g. jupiter-swap-mcp)' }],
            },
          ],
        },
      });
    }

    if (method === 'ping') {
      return Response.json({ jsonrpc: '2.0', id, result: {} });
    }

    // Unknown method
    return Response.json({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  } catch (e) {
    return Response.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32603, message: `Internal error: ${String(e)}` },
      },
      { status: 500 }
    );
  }
}
