import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase-backed rate limiting.
 *
 * ✅  Uses Supabase `rate_limits` table — safe for multi-instance deployments.
 *    State is persisted in Postgres, not in-process memory.
 * ❌  Falls back to pass-through (no limiting) if Supabase is unavailable.
 *    Plan: add Redis as a fast-path fallback once OMA-AI reaches scale.
 *
 * Required Supabase table:
 *   rate_limits (user_id, key, window_start, count, expires_at)
 *   PRIMARY KEY (user_id, key, window_start)
 */
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Tier limits
const TIER_LIMITS = {
  free: {
    rpm: 5,           // Requests per minute
    rpd: 50,          // Requests per day
    tokensPerDay: 100000,
    tokensPerMonth: 1000000
  },
  starter: {
    rpm: 20,
    rpd: 500,
    tokensPerDay: 1000000,
    tokensPerMonth: 10000000
  },
  pro: {
    rpm: 60,
    rpd: 5000,
    tokensPerDay: 10000000,
    tokensPerMonth: 100000000
  },
  enterprise: {
    rpm: 200,
    rpd: 50000,
    tokensPerDay: 100000000,
    tokensPerMonth: 1000000000
  }
};

/**
 * Supabase-backed rate limit check
 * Persists across Vercel cold starts and multi-instance deployments
 */
async function checkSupabaseRateLimit(
  userId: string,
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; current: number; resetAt: number }> {
  if (!supabase) {
    // No Supabase — skip rate limiting (fail open for dev)
    return { allowed: true, current: 0, resetAt: Date.now() + windowMs };
  }

  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const resetAt = windowStart + windowMs;

  try {
    const { data, error } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('user_id', userId)
      .eq('key', key)
      .eq('window_start', windowStart)
      .single();

    if (error || !data) {
      // First request in this window
      await supabase.from('rate_limits').upsert({
        user_id: userId,
        key,
        window_start: windowStart,
        count: 1,
        expires_at: new Date(resetAt).toISOString(),
      }, { onConflict: 'user_id,key,window_start' });
      return { allowed: true, current: 1, resetAt };
    }

    if (data.count >= limit) {
      return { allowed: false, current: data.count, resetAt };
    }

    await supabase
      .from('rate_limits')
      .update({ count: data.count + 1 })
      .eq('user_id', userId)
      .eq('key', key)
      .eq('window_start', windowStart);

    return { allowed: true, current: data.count + 1, resetAt };
  } catch {
    // On error, fail open
    return { allowed: true, current: 0, resetAt: now + windowMs };
  }
}

/**
 * Rate Limit Middleware
 *
 * Enforces per-minute, per-day, and token limits via Supabase
 */
export async function rateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const limits = TIER_LIMITS[user.tier as keyof typeof TIER_LIMITS] || TIER_LIMITS.free;
  const now = Date.now();
  const MINUTE = 60_000;
  const DAY = 86_400_000;

  // Check requests per minute
  const rpmCheck = await checkSupabaseRateLimit(user.id, 'rpm', limits.rpm, MINUTE);

  if (!rpmCheck.allowed) {
    const resetIn = rpmCheck.resetAt - now;
    res.setHeader('X-RateLimit-Limit', limits.rpm.toString());
    res.setHeader('X-RateLimit-Remaining', '0');
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetIn / 1000).toString());
    res.setHeader('Retry-After', Math.ceil(resetIn / 1000).toString());
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: `Max ${limits.rpm} requests per minute`,
      retry_after: Math.ceil(resetIn / 1000),
      tier: user.tier,
      upgrade_url: 'https://oma-ai.com/pricing',
    });
  }

  // Check requests per day
  const rpdCheck = await checkSupabaseRateLimit(user.id, 'rpd', limits.rpd, DAY);

  if (!rpdCheck.allowed) {
    const resetIn = rpdCheck.resetAt - now;
    res.setHeader('X-RateLimit-Limit', limits.rpd.toString());
    res.setHeader('X-RateLimit-Remaining', '0');
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetIn / 1000).toString());
    return res.status(429).json({
      error: 'Daily limit exceeded',
      message: `Max ${limits.rpd} requests per day`,
      retry_after: Math.ceil(resetIn / 1000),
      tier: user.tier,
    });
  }

  // Check token usage
  if (user.tokens_used >= user.tokens_limit) {
    return res.status(402).json({
      error: 'Token limit exceeded',
      message: 'Upgrade your plan or add credits',
      tokens_used: user.tokens_used,
      tokens_limit: user.tokens_limit,
      tier: user.tier,
      upgrade_url: 'https://oma-ai.com/pricing',
    });
  }

  // Set rate limit headers
  const remainingRpm = Math.max(0, limits.rpm - rpmCheck.current);
  res.setHeader('X-RateLimit-Limit', limits.rpm.toString());
  res.setHeader('X-RateLimit-Remaining', remainingRpm.toString());
  res.setHeader('X-RateLimit-Tier', user.tier);

  await next();
}

/**
 * Track Token Usage
 * 
 * Updates user's token count after API call
 */
export async function trackTokens(userId: string, tokens: number) {
  if (!supabase) return;
  try {
    await supabase.rpc('increment_token_usage', {
      user_id: userId,
      token_count: tokens
    });
  } catch (error) {
    console.error('Token tracking error:', error);
  }
}

/**
 * Check Token Budget
 * 
 * Returns remaining tokens for user
 */
export async function checkTokenBudget(userId: string): Promise<{
  used: number;
  limit: number;
  remaining: number;
  percentage: number;
}> {
  if (!supabase) return { used: 0, limit: 0, remaining: 0, percentage: 0 };
  const { data: user } = await supabase
    .from('users')
    .select('tokens_used, tokens_limit')
    .eq('id', userId)
    .single();

  if (!user) {
    return { used: 0, limit: 0, remaining: 0, percentage: 0 };
  }

  const remaining = Math.max(0, user.tokens_limit - user.tokens_used);
  const percentage = (user.tokens_used / user.tokens_limit) * 100;

  return {
    used: user.tokens_used,
    limit: user.tokens_limit,
    remaining,
    percentage
  };
}

/**
 * Get Tier Limits
 */
export function getTierLimits(tier: string) {
  return TIER_LIMITS[tier as keyof typeof TIER_LIMITS] || TIER_LIMITS.free;
}

/**
 * Upgrade Tier
 */
export async function upgradeTier(userId: string, newTier: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const limits = TIER_LIMITS[newTier as keyof typeof TIER_LIMITS];

  if (!limits) {
    throw new Error('Invalid tier');
  }

  const { error } = await supabase
    .from('users')
    .update({
      tier: newTier,
      tokens_limit: limits.tokensPerMonth
    })
    .eq('id', userId);

  if (error) {
    throw error;
  }

  return { tier: newTier, limits };
}

export { TIER_LIMITS };
