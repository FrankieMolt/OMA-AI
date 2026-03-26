import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

// Simple admin auth check (should be enhanced with proper role checking)
function isAdmin(req: Request): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  // Fail closed: deny if no key configured
  if (!adminKey) {
    console.error('[ADMIN] ADMIN_API_KEY not configured - denying access');
    return false;
  }
  const authHeader = req.headers.get('authorization');
  return authHeader === `Bearer ${adminKey}`;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get counts
    const [
      mcpsRes,
      pendingRes,
      usersRes,
      revenueRes,
      payoutsRes,
      agentsRes
    ] = await Promise.all([
      supabaseService.from('mcp_servers').select('*', { count: 'exact', head: true }),
      supabaseService.from('mcp_servers').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseService.from('users').select('*', { count: 'exact', head: true }),
      // Sum of recent transaction revenue (x402 payments)
      supabaseService.from('transactions').select('amount_usdc').eq('status', 'success').gte('created_at', new Date(Date.now() - 24*60*60*1000).toISOString()),
      supabaseService.from('payouts').select('amount_usdc').eq('status', 'completed'),
      supabaseService.from('ai_agents').select('*', { count: 'exact', head: true }).eq('status', 'active')
    ]);

    const totalMcps = mcpsRes.count || 0;
    const pendingMcps = pendingRes.count || 0;
    const totalUsers = usersRes.count || 0;
    const dailyRevenue = revenueRes.data?.reduce((sum, t) => sum + (t.amount_usdc || 0), 0) || 0;
    const totalPayouts = payoutsRes.data?.reduce((sum, p) => sum + (p.amount_usdc || 0), 0) || 0;
    const activeAgents = agentsRes.count || 0;

    return NextResponse.json({
      totalMcps,
      pendingMcps,
      totalUsers,
      dailyRevenue,
      totalPayouts,
      activeAgents
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/admin/stats] error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
