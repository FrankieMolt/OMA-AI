import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix: string;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60 * 1000,
  maxRequests: 60,
  keyPrefix: 'ratelimit',
};

const strictConfig: RateLimitConfig = {
  windowMs: 60 * 1000,
  maxRequests: 20,
  keyPrefix: 'ratelimit-strict',
};

const authConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  keyPrefix: 'ratelimit-auth',
};

const memoryStore = new Map<string, { count: number; resetTime: number }>();

function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const ip = req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(
  req: NextRequest,
  config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const identifier = getClientIdentifier(req);
  const key = `${config.keyPrefix}:${identifier}`;
  const now = Date.now();

  const existing = memoryStore.get(key);

  if (!existing || now > existing.resetTime) {
    memoryStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime: now + config.windowMs };
  }

  if (existing.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: existing.resetTime };
  }

  existing.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - existing.count,
    resetTime: existing.resetTime,
  };
}

export function rateLimit(config?: Partial<RateLimitConfig>) {
  return function (req: NextRequest): NextResponse | null {
    const mergedConfig = { ...defaultConfig, ...config };
    const { allowed, remaining, resetTime } = checkRateLimit(req, mergedConfig);

    const headers = {
      'X-RateLimit-Limit': mergedConfig.maxRequests.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
    };

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            ...headers,
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    return null;
  };
}

export function strictRateLimit(req: NextRequest) {
  return rateLimit(strictConfig)(req);
}

export function authRateLimit(req: NextRequest) {
  return rateLimit(authConfig)(req);
}

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  config?: Partial<RateLimitConfig>
) {
  return async function (req: NextRequest): Promise<NextResponse> {
    const rateLimitResponse = rateLimit(config)(req);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    return handler(req);
  };
}

export function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (now > value.resetTime) {
      memoryStore.delete(key);
    }
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 60 * 1000);
}
