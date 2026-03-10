import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { authenticate } from '../../lib/auth-middleware';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * Usage Tracking Endpoint
 * 
 * GET - Get usage stats
 * POST - Log usage (internal)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    await authenticate(req, res, async (user) => {
      try {
        // Get last 30 days of usage
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: usage } = await supabase
          .from('usage_logs')
          .select('*')
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

        // Calculate totals
        const totalTokens = usage?.reduce((sum, day) => sum + (day.tokens_used || 0), 0) || 0;
        const totalCost = usage?.reduce((sum, day) => sum + (day.cost || 0), 0) || 0;
        const totalRequests = usage?.reduce((sum, day) => sum + (day.requests_count || 0), 0) || 0;

        return res.status(200).json({
          success: true,
          user: {
            id: user.id,
            tier: user.tier,
            tokens_used: user.tokens_used,
            tokens_limit: user.tokens_limit,
            tokens_remaining: user.tokens_limit - user.tokens_used
          },
          stats: {
            total_tokens_30d: totalTokens,
            total_cost_30d: totalCost.toFixed(4),
            total_requests_30d: totalRequests,
            avg_daily_tokens: Math.round(totalTokens / 30)
          },
          usage_history: usage || [],
          recent_calls: recentCalls || []
        });

      } catch (error) {
        console.error('Usage tracking error:', error);
        return res.status(500).json({ error: 'Failed to get usage stats' });
      }
    });
  }

  if (req.method === 'POST') {
    // Internal endpoint for logging usage
    const internalKey = req.headers['x-internal-key'];
    
    if (internalKey !== process.env.INTERNAL_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { user_id, endpoint, tokens, cost, model } = req.body;

      // Insert API log
      await supabase
        .from('api_logs')
        .insert({
          user_id,
          endpoint,
          tokens_used: tokens,
          cost,
          model,
          created_at: new Date().toISOString()
        });

      return res.status(200).json({ success: true });

    } catch (error) {
      console.error('Usage logging error:', error);
      return res.status(500).json({ error: 'Failed to log usage' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
