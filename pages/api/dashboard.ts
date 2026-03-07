import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { authenticate } from '../../lib/auth-middleware';
import { checkTokenBudget, getTierLimits } from '../../lib/rate-limiter';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * OMA-AI User Dashboard
 * 
 * Returns comprehensive usage stats, billing info, API keys
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authenticate user
  await authenticate(req, res, async (user) => {
    try {
      // Get token budget
      const tokenBudget = await checkTokenBudget(user.id);

      // Get usage history (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: usageHistory } = await supabase
        .from('usage_logs')
        .select('date, tokens_used, cost, endpoint')
        .eq('user_id', user.id)
        .gte('date', thirtyDaysAgo.toISOString())
        .order('date', { ascending: false });

      // Get recent API calls
      const { data: recentCalls } = await supabase
        .from('api_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      // Get billing history
      const { data: billingHistory } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      // Calculate stats
      const totalCost = usageHistory?.reduce((sum, day) => sum + (day.cost || 0), 0) || 0;
      const avgDailyTokens = usageHistory && usageHistory.length > 0
        ? Math.round(tokenBudget.used / 30)
        : 0;

      // Tier limits
      const tierLimits = getTierLimits(user.tier);

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          wallet_address: user.wallet_address,
          tier: user.tier,
          created_at: user.created_at,
          last_active: user.last_active
        },
        usage: {
          tokens: tokenBudget,
          requests_today: recentCalls?.length || 0,
          avg_daily_tokens: avgDailyTokens,
          total_cost_30d: totalCost
        },
        limits: tierLimits,
        api_key: {
          key: user.api_key,
          created_at: user.created_at,
          // Never show full key, just prefix
          preview: user.api_key.substring(0, 12) + '...'
        },
        billing: {
          balance: user.balance,
          history: billingHistory || []
        },
        history: {
          usage: usageHistory || [],
          recent_calls: recentCalls || []
        }
      });

    } catch (error) {
      console.error('Dashboard error:', error);
      return res.status(500).json({ 
        error: 'Failed to load dashboard' 
      });
    }
  });
}
