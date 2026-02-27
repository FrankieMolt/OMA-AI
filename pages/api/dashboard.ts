import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

interface DashboardResponse {
  success: boolean;
  user?: {
    id: string;
    email?: string;
    wallet_address?: string;
    created_at: string;
  };
  api_keys?: Array<{
    id: string;
    name: string;
    created_at: string;
    last_used?: string;
    is_active: boolean;
  }>;
  stats?: {
    total_calls: number;
    calls_today: number;
    calls_this_month: number;
    favorite_endpoints: Array<{ endpoint: string; count: number }>;
  };
  earnings?: {
    total: number;
    pending: number;
    paid: number;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Get user ID from header or query
    const userId = req.headers['x-user-id'] as string || req.query.user_id as string;

    if (!userId) {
      // Return demo data for unauthenticated users
      return res.status(200).json({
        success: true,
        user: {
          id: 'demo_user',
          created_at: new Date().toISOString()
        },
        api_keys: [
          {
            id: 'key_demo_1',
            name: 'Demo API Key',
            created_at: new Date().toISOString(),
            last_used: new Date().toISOString(),
            is_active: true
          }
        ],
        stats: {
          total_calls: 1247,
          calls_today: 42,
          calls_this_month: 342,
          favorite_endpoints: [
            { endpoint: '/api/prices', count: 523 },
            { endpoint: '/api/weather', count: 312 },
            { endpoint: '/api/search', count: 198 }
          ]
        },
        earnings: {
          total: 12.47,
          pending: 2.34,
          paid: 10.13
        }
      });
    }

    if (!supabase) {
      return res.status(200).json({
        success: true,
        user: {
          id: userId,
          created_at: new Date().toISOString()
        },
        api_keys: [],
        stats: {
          total_calls: 0,
          calls_today: 0,
          calls_this_month: 0,
          favorite_endpoints: []
        },
        earnings: {
          total: 0,
          pending: 0,
          paid: 0
        }
      });
    }

    // Get user
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Get API keys
    const { data: apiKeys } = await supabase
      .from('api_keys')
      .select('id, name, created_at, last_used, is_active')
      .eq('user_id', userId);

    // Get call stats
    const { count: totalCalls } = await supabase
      .from('api_calls')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get today's calls
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: callsToday } = await supabase
      .from('api_calls')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', today.toISOString());

    // Get this month's calls
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const { count: callsThisMonth } = await supabase
      .from('api_calls')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', monthStart.toISOString());

    // Get favorite endpoints
    const { data: endpointStats } = await supabase
      .from('api_calls')
      .select('endpoint')
      .eq('user_id', userId);

    const endpointCounts: Record<string, number> = {};
    endpointStats?.forEach(call => {
      endpointCounts[call.endpoint] = (endpointCounts[call.endpoint] || 0) + 1;
    });

    const favoriteEndpoints = Object.entries(endpointCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([endpoint, count]) => ({ endpoint, count }));

    // Get earnings
    const { data: payments } = await supabase
      .from('payments')
      .select('*')
      .eq('publisher_id', userId);

    const earnings = {
      total: payments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0,
      pending: payments?.filter(p => p.status === 'pending').reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0,
      paid: payments?.filter(p => p.status === 'completed').reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0
    };

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        wallet_address: user.wallet_address,
        created_at: user.created_at
      },
      api_keys: apiKeys || [],
      stats: {
        total_calls: totalCalls || 0,
        calls_today: callsToday || 0,
        calls_this_month: callsThisMonth || 0,
        favorite_endpoints: favoriteEndpoints
      },
      earnings
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}
