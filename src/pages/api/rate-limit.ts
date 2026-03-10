import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI Rate Limiting Middleware
 * 
 * Usage-based rate limiting with tier support
 * Uses Upstash Redis in production, in-memory fallback
 */

// User tiers with limits
export const TIERS = {
  free: {
    name: 'Free',
    price: 0,
    limits: {
      requestsPerMinute: 5,
      requestsPerHour: 100,
      requestsPerDay: 50,
      tokensPerDay: 100000,
      tokensPerMonth: 1000000,
    },
    features: ['basic-models', 'community-support'],
  },
  starter: {
    name: 'Starter',
    price: 10,
    limits: {
      requestsPerMinute: 20,
      requestsPerHour: 500,
      requestsPerDay: 500,
      tokensPerDay: 1000000,
      tokensPerMonth: 10000000,
    },
    features: ['all-models', 'priority-support', 'web-search'],
  },
  pro: {
    name: 'Pro',
    price: 50,
    limits: {
      requestsPerMinute: 60,
      requestsPerHour: 2000,
      requestsPerDay: 5000,
      tokensPerDay: 10000000,
      tokensPerMonth: 100000000,
    },
    features: ['all-models', 'priority-support', 'web-search', 'uncensored', 'api-access'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 0, // Custom pricing
    limits: {
      requestsPerMinute: 200,
      requestsPerHour: 10000,
      requestsPerDay: 50000,
      tokensPerDay: 100000000,
      tokensPerMonth: 1000000000,
    },
    features: ['all-models', 'dedicated-support', 'sla', 'custom-models', 'on-premise'],
  },
};

// In-memory rate limit store (use Upstash Redis in production)
const rateLimitStore = new Map<string, {
  minute: { count: number; resetAt: number };
  hour: { count: number; resetAt: number };
  day: { count: number; resetAt: number };
  tokens: { used: number; resetAt: number };
}>();

interface RateLimitResult {
  allowed: boolean;
  remaining: {
    minute: number;
    hour: number;
    day: number;
    tokens: number;
  };
  resetIn: {
    minute: number;
    hour: number;
    day: number;
  };
  tier: string;
}

export function checkRateLimit(
  userId: string,
  tier: keyof typeof TIERS = 'free'
): RateLimitResult {
  const limits = TIERS[tier].limits;
  const now = Date.now();
  
  // Get or create entry
  let entry = rateLimitStore.get(userId);
  if (!entry) {
    entry = {
      minute: { count: 0, resetAt: now + 60000 },
      hour: { count: 0, resetAt: now + 3600000 },
      day: { count: 0, resetAt: now + 86400000 },
      tokens: { used: 0, resetAt: now + 86400000 },
    };
    rateLimitStore.set(userId, entry);
  }
  
  // Reset expired windows
  if (entry.minute.resetAt < now) {
    entry.minute = { count: 0, resetAt: now + 60000 };
  }
  if (entry.hour.resetAt < now) {
    entry.hour = { count: 0, resetAt: now + 3600000 };
  }
  if (entry.day.resetAt < now) {
    entry.day = { count: 0, resetAt: now + 86400000 };
    entry.tokens = { used: 0, resetAt: now + 86400000 };
  }
  
  // Check limits
  const minuteAllowed = entry.minute.count < limits.requestsPerMinute;
  const hourAllowed = entry.hour.count < limits.requestsPerHour;
  const dayAllowed = entry.day.count < limits.requestsPerDay;
  const allowed = minuteAllowed && hourAllowed && dayAllowed;
  
  // Increment if allowed
  if (allowed) {
    entry.minute.count++;
    entry.hour.count++;
    entry.day.count++;
  }
  
  return {
    allowed,
    remaining: {
      minute: limits.requestsPerMinute - entry.minute.count,
      hour: limits.requestsPerHour - entry.hour.count,
      day: limits.requestsPerDay - entry.day.count,
      tokens: limits.tokensPerDay - entry.tokens.used,
    },
    resetIn: {
      minute: entry.minute.resetAt - now,
      hour: entry.hour.resetAt - now,
      day: entry.day.resetAt - now,
    },
    tier: TIERS[tier].name,
  };
}

export function trackTokenUsage(userId: string, tokens: number): void {
  const entry = rateLimitStore.get(userId);
  if (entry) {
    entry.tokens.used += tokens;
  }
}

export function getUsageStats(userId: string): {
  requests: { minute: number; hour: number; day: number };
  tokens: { used: number; limit: number };
} | null {
  const entry = rateLimitStore.get(userId);
  if (!entry) return null;
  
  return {
    requests: {
      minute: entry.minute.count,
      hour: entry.hour.count,
      day: entry.day.count,
    },
    tokens: {
      used: entry.tokens.used,
      limit: 1000000, // Default to free tier
    },
  };
}

// API endpoint for rate limit status
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // GET - Show tier info and limits
  if (req.method === 'GET') {
    const { tier = 'free' } = req.query;
    
    return res.json({
      success: true,
      tiers: Object.entries(TIERS).map(([key, value]) => ({
        id: key,
        name: value.name,
        price: value.price,
        limits: value.limits,
        features: value.features,
      })),
      current_tier: tier,
      upgrade_url: '/pricing',
    });
  }
  
  // POST - Check rate limit for user
  const { userId, tier = 'free' } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  
  const result = checkRateLimit(userId, tier);
  const usage = getUsageStats(userId);
  
  return res.json({
    success: true,
    ...result,
    usage,
  });
}
