import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Rate Limit Middleware
 * 
 * Enforces per-minute, per-day, and token limits
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
  const minute = 60000;
  const day = 86400000;

  // Check requests per minute
  const minuteKey = `${user.id}:rpm:${Math.floor(now / minute)}`;
  const minuteEntry = rateLimitStore.get(minuteKey);

  if (minuteEntry && minuteEntry.count >= limits.rpm) {
    const resetIn = minuteEntry.resetAt - now;
    res.setHeader('X-RateLimit-Limit', limits.rpm.toString());
    res.setHeader('X-RateLimit-Remaining', '0');
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetIn / 1000).toString());
    res.setHeader('Retry-After', Math.ceil(resetIn / 1000).toString());

    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: `Max ${limits.rpm} requests per minute`,
      retry_after: Math.ceil(resetIn / 1000),
      tier: user.tier,
      upgrade_url: 'https://oma-ai.com/pricing'
    });
  }

  // Check requests per day
  const dayKey = `${user.id}:rpd:${Math.floor(now / day)}`;
  const dayEntry = rateLimitStore.get(dayKey);

  if (dayEntry && dayEntry.count >= limits.rpd) {
    const resetIn = dayEntry.resetAt - now;
    res.setHeader('X-RateLimit-Limit', limits.rpd.toString());
    res.setHeader('X-RateLimit-Remaining', '0');
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetIn / 1000).toString());

    return res.status(429).json({
      error: 'Daily limit exceeded',
      message: `Max ${limits.rpd} requests per day`,
      retry_after: Math.ceil(resetIn / 1000),
      tier: user.tier
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
      upgrade_url: 'https://oma-ai.com/pricing'
    });
  }

  // Increment counters
  if (!minuteEntry) {
    rateLimitStore.set(minuteKey, { count: 1, resetAt: now + minute });
  } else {
    minuteEntry.count++;
  }

  if (!dayEntry) {
    rateLimitStore.set(dayKey, { count: 1, resetAt: now + day });
  } else {
    dayEntry.count++;
  }

  // Clean up old entries (every 100 requests)
  if (rateLimitStore.size > 10000) {
    const cutoff = now - (day * 2);
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < cutoff) {
        rateLimitStore.delete(key);
      }
    }
  }

  // Set headers
  const remaining = limits.rpm - (minuteEntry?.count || 1);
  res.setHeader('X-RateLimit-Limit', limits.rpm.toString());
  res.setHeader('X-RateLimit-Remaining', Math.max(0, remaining).toString());
  res.setHeader('X-RateLimit-Tier', user.tier);

  await next();
}

/**
 * Track Token Usage
 * 
 * Updates user's token count after API call
 */
export async function trackTokens(userId: string, tokens: number) {
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
