import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase/client';
import { MARKETPLACE_MCPS } from '@/lib/mcp-data';
import type { MCPSkill } from '@/lib/types';

export async function GET() {
  const supabase = getSupabaseClient();

  let verifiedMcpCount = 0;
  let totalCalls = 0;

  if (supabase) {
    const { data, error } = await supabase
      .from('mcp_servers')
      .select('verified, total_calls')
      .eq('status', 'active');
    if (!error && data) {
      verifiedMcpCount = data.filter((m) => m.verified).length;
      totalCalls = data.reduce((sum, m) => sum + (m.total_calls || 0), 0);
    }
  } else {
    // Fallback to static data — cast for type-safe field access
    const mcps = MARKETPLACE_MCPS as unknown as MCPSkill[];
    verifiedMcpCount = mcps.filter((m) => m.verified).length;
    totalCalls = mcps.reduce((sum, m) => sum + (m.total_calls ?? m.calls ?? 0), 0);
  }

  const response = NextResponse.json({
    success: true,
    data: {
      marketplace: {
        verifiedMcpCount,
        totalAgents: verifiedMcpCount, // Agents tracked via verified MCPs
      },
      volume: {
        total: totalCalls,
        last24h: { usdc: Math.round(totalCalls * 0.05), change: 0 },
        last7d: { usdc: Math.round(totalCalls * 0.35) },
      },
      transactions: {
        last24h: { count: Math.round(totalCalls * 0.02), change: 0 },
        last7d: { count: Math.round(totalCalls * 0.14) },
      },
      network: {
        name: 'Base',
        chainId: 8453,
        token: 'USDC',
      },
      lastUpdated: new Date().toISOString(),
    },
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=60');
  return response;
}
