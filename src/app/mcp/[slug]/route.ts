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

// CoinGecko coin ID map
const COIN_IDS: Record<string, string> = {
  SOL: 'solana', BTC: 'bitcoin', ETH: 'ethereum', DOGE: 'dogecoin',
  BONK: 'bonk', RAY: 'raydium', WIF: 'dogwifcoin',
  JUP: 'jupiter-exchange-solana', MSOL: 'marinade-staked-sol',
  USDT: 'tether', USDC: 'usd-coin', ARB: 'arbitrum',
  OP: 'optimism', MATIC: 'matic-network',
};

// Built-in tools
const BUILT_IN_TOOLS: Record<string, Tool> = {
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
  // Trading & DeFi
  'solana_price': {
    name: 'solana_price',
    description: 'Get current Solana price in USD from CoinGecko',
    inputSchema: { type: 'object', properties: {} },
  },
  'price_check': {
    name: 'price_check',
    description: 'Check crypto prices from CoinGecko (SOL, BTC, ETH, DOGE, BONK, RAY, WIF, ARB, OP)',
    inputSchema: {
      type: 'object',
      properties: { symbol: { type: 'string', description: 'Crypto symbol (e.g. BTC, ETH, SOL, BONK)' } },
      required: ['symbol'],
    },
  },
  'trending_tokens': {
    name: 'trending_tokens',
    description: 'Get trending Solana memecoins',
    inputSchema: { type: 'object', properties: {} },
  },
  'market_stats': {
    name: 'market_stats',
    description: 'Get crypto market stats — total cap, BTC dominance',
    inputSchema: { type: 'object', properties: {} },
  },
  'trading_quote': {
    name: 'trading_quote',
    description: 'Get a Jupiter DEX swap quote for SOL/USDC',
    inputSchema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Amount in SOL' },
        input_mint: { type: 'string', description: 'Input mint (defaults to SOL)' },
        output_mint: { type: 'string', description: 'Output mint (defaults to USDC)' },
      },
    },
  },
};

// Execute a tool
async function executeTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'hello': {
      const n = (args.name as string) || 'World';
      return { greeting: `Hello, ${n}! Welcome to OMA-AI — the MCP Marketplace.` };
    }

    case 'echo':
      return { echo: args.message, received_at: new Date().toISOString() };

    case 'time':
      return {
        iso: new Date().toISOString(),
        unix_ms: Date.now(),
        unix_s: Math.floor(Date.now() / 1000),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

    case 'health':
      return {
        status: 'healthy',
        server: 'OMA-AI Dynamic MCP',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      };

    case 'list_mcps': {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );
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
            verified: m.verified ? 'Verified' : 'Unverified',
          })),
        };
      } catch (e) {
        return { error: String(e), mcps: [] };
      }
    }

    case 'search_mcp': {
      const query = ((args.query as string) || '').toLowerCase();
      if (!query) return { error: 'query required' };
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );
        const { data } = await supabase
          .from('mcp_servers')
          .select('name,slug,description,category,pricing_usdc')
          .eq('status', 'active')
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
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
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
        };
      } catch (e) {
        return { error: String(e) };
      }
    }

    // Trading tools
    case 'solana_price':
    case 'price_check': {
      const inputSymbol = ((args.symbol as string) || 'SOL') as string;
      const symbol = inputSymbol.toUpperCase().replace('USDT', '').replace('-USD', '');
      const coinId = COIN_IDS[symbol] || symbol.toLowerCase();
      try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`CoinGecko status: ${res.status}`);
        const data = await res.json();
        const priceData = data[coinId];
        if (!priceData) return {
          error: `Unknown symbol: ${symbol}`,
          hint: 'Supported: SOL, BTC, ETH, DOGE, BONK, RAY, WIF, ARB, OP',
        };
        return {
          symbol,
          price_usd: priceData.usd,
          change_24h: priceData.usd_24h_change != null ? `${priceData.usd_24h_change.toFixed(2)}%` : 'N/A',
          source: 'CoinGecko',
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        return { error: `CoinGecko: ${String(e)}` };
      }
    }

    case 'trending_tokens': {
      try {
        // Try Jupiter pump.fun first
        const res = await fetch(
          'https://frontend-api.pump.fun/v1/markets?limit=10&sort=volume&order=desc',
          { headers: { Accept: 'application/json' } },
        );
        if (!res.ok) throw new Error('pump.fun unavailable');
        const data = await res.json();
        const tokens = ((data as Array<{ name: string; symbol: string; marketCap: number; price: number; volume: number }>) || []).slice(0, 5).map((t) => ({
          name: t.name,
          symbol: t.symbol,
          market_cap_usd: t.marketCap ? `$${(t.marketCap / 1e6).toFixed(2)}M` : 'N/A',
          price_usd: t.price ? `$${t.price.toFixed(8)}` : 'N/A',
          volume_24h: t.volume ? `$${(t.volume / 1e6).toFixed(1)}M` : 'N/A',
        }));
        return { count: tokens.length, tokens, source: 'pump.fun', timestamp: new Date().toISOString() };
      } catch (e) {
        return { trending: null, error: `pump.fun: ${String(e)}` };
      }
    }

    case 'market_stats': {
      try {
        const [globalRes, btcRes] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/global'),
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
        ]);
        const global = await globalRes.json().catch(() => null);
        const btcData = await btcRes.json().catch(() => null);
        const btcPrice = btcData?.bitcoin?.usd;
        return {
          total_market_cap: global?.data?.total_market_cap?.usd
            ? `$${(global.data.total_market_cap.usd / 1e12).toFixed(2)}T`
            : 'N/A',
          btc_dominance: global?.data?.market_cap_percentage?.btc
            ? `${global.data.market_cap_percentage.btc.toFixed(1)}%`
            : 'N/A',
          eth_dominance: global?.data?.market_cap_percentage?.eth
            ? `${global.data.market_cap_percentage.eth.toFixed(1)}%`
            : 'N/A',
          btc_price_usd: btcPrice ? `$${btcPrice.toLocaleString()}` : 'N/A',
          active_cryptos: global?.data?.active_cryptocurrencies || 'N/A',
          markets: global?.data?.markets || 'N/A',
          source: 'CoinGecko',
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        return { error: String(e) };
      }
    }

    case 'trading_quote': {
      const amount = (args.amount as number) || 1;
      try {
        // Jupiter API for SOL → USDC quote
        const url = `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qNStxevVCvQeGKDzDuHGGCAj&amount=${amount * 1e9}&slippage=0.5`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Jupiter API: ${res.status}`);
        const data = await res.json();
        return {
          input: `${amount} SOL`,
          output_amount: data?.outAmount ? `${(parseInt(data.outAmount) / 1e6).toFixed(2)} USDC` : 'N/A',
          price_impact: data?.priceImpactPct || 'N/A',
         DEX: data?.DEX || 'Jupiter',
          source: 'Jupiter DEX Aggregator',
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        return { error: `Jupiter: ${String(e)}` };
      }
    }

    default:
      return { error: `Unknown tool: "${name}". Available: ${Object.keys(BUILT_IN_TOOLS).join(', ')}` };
  }
}

// GET: SSE connection for MCP clients
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {}
      };
      send({ type: 'connected', mcp: slug, timestamp: Date.now() });
      send({
        jsonrpc: '2.0', id: null,
        result: {
          protocolVersion: '1.0',
          capabilities: { tools: {}, resources: {}, prompts: {} },
          serverInfo: { name: `oma-ai/${slug}`, version: '1.0.0' },
        },
      });
      const ping = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'ping', timestamp: Date.now() })}\n\n`));
        } catch { clearInterval(ping); }
      }, 25000);
      _request.signal.addEventListener('abort', () => clearInterval(ping));
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-MCP-Server': slug,
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// POST: JSON-RPC handler
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const body = (await request.json()) as MCPRequest;
    const { jsonrpc, id, method } = body;

    if (jsonrpc !== '2.0') {
      return Response.json(
        { jsonrpc: '2.0', id, error: { code: -32600, message: 'Invalid Request' } },
        { status: 400 },
      );
    }

    switch (method) {
      case 'initialize':
        return Response.json({
          jsonrpc: '2.0', id,
          result: {
            protocolVersion: '1.0',
            capabilities: { tools: {}, resources: {}, prompts: {} },
            serverInfo: { name: `oma-ai/${slug}`, version: '1.0.0' },
          },
        });

      case 'tools/list':
        return Response.json({
          jsonrpc: '2.0', id,
          result: { tools: Object.values(BUILT_IN_TOOLS) },
        });

      case 'tools/call': {
        const { name, arguments: toolArgs = {} } = (body.params || {}) as {
          name: string; arguments?: Record<string, unknown>;
        };
        if (!name) {
          return Response.json({
            jsonrpc: '2.0', id,
            error: { code: -32602, message: 'Missing tool name' },
          });
        }
        const result = await executeTool(name, toolArgs);
        return Response.json({
          jsonrpc: '2.0', id,
          result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] },
        });
      }

      case 'resources/list':
        return Response.json({ jsonrpc: '2.0', id, result: { resources: [] } });

      case 'prompts/list':
        return Response.json({
          jsonrpc: '2.0', id,
          result: {
            prompts: [
              {
                name: 'search_mcp',
                description: 'Search for an MCP in the marketplace',
                arguments: [{ name: 'query', description: 'What kind of MCP are you looking for?' }],
              },
              {
                name: 'price_alert',
                description: 'Check crypto price and set an alert',
                arguments: [{ name: 'symbol', description: 'Crypto symbol (e.g. SOL, BTC)' }],
              },
            ],
          },
        });

      case 'ping':
        return Response.json({ jsonrpc: '2.0', id, result: {} });

      default:
        return Response.json({
          jsonrpc: '2.0', id,
          error: { code: -32601, message: `Method not found: ${method}` },
        });
    }
  } catch (e) {
    return Response.json(
      { jsonrpc: '2.0', id: null, error: { code: -32603, message: `Internal error: ${String(e)}` } },
      { status: 500 },
    );
  }
}
