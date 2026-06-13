import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, created_at')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's API usage
    const { data: usage, error: usageError } = await supabase
      .from('mcp_usage')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(100);

    if (usageError) {
      console.error('[Usage API] Error fetching usage:', usageError);
    }

    // Calculate usage stats
    const totalCalls = usage?.length || 0;
    const totalCost = usage?.reduce((sum, u) => sum + (u.cost || 0), 0) || 0;
    const uniqueMCPs = new Set(usage?.map(u => u.mcp_id) || []).size;

    // Get usage by MCP
    const usageByMCP = usage?.reduce((acc, u) => {
      const key = u.mcp_id || 'unknown';
      if (!acc[key]) {
        acc[key] = { calls: 0, cost: 0 };
      }
      acc[key].calls += 1;
      acc[key].cost += u.cost || 0;
      return acc;
    }, {} as Record<string, { calls: number; cost: number }>) || {};

    // Get usage by date (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentUsage = usage?.filter(u => 
      new Date(u.timestamp) >= thirtyDaysAgo
    ) || [];

    const dailyUsage = recentUsage.reduce((acc, u) => {
      const date = new Date(u.timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { calls: 0, cost: 0 };
      }
      acc[date].calls += 1;
      acc[date].cost += u.cost || 0;
      return acc;
    }, {} as Record<string, { calls: number; cost: number }>);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        memberSince: user.created_at
      },
      stats: {
        totalCalls,
        totalCost,
        uniqueMCPs,
        averageCostPerCall: totalCalls > 0 ? totalCost / totalCalls : 0
      },
      usageByMCP,
      dailyUsage,
      recentCalls: usage?.slice(0, 20) || []
    }, { status: 200 });

  } catch (error) {
    console.error('[Usage API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
