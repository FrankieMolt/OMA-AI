/**
 * Security utilities for API routes
 * Includes rate limiting, CORS validation, and security headers
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Validate Origin header to prevent CSRF attacks
 */
export function validateOrigin(request: NextRequest, allowedOrigins: string[]): boolean {
  const origin = request.headers.get('origin');

  // If no origin header (same-origin request), allow it
  if (!origin) return true;

  // Check if origin is in allowed list
  return allowedOrigins.some(allowed => {
    // Exact match or wildcard match
    if (allowed === '*') return true;
    if (allowed.endsWith('*')) {
      const prefix = allowed.slice(0, -1);
      return origin.startsWith(prefix);
    }
    return origin === allowed;
  });
}

/**
 * Add security headers to response
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy (basic)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  // HSTS in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  return response;
}

/**
 * Sanitize string input to prevent injection attacks
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, maxLength);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Ethereum/Base wallet address
 */
export function isValidWalletAddress(address: string): boolean {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

/**
 * Check if request is from a bot/crawler (basic detection)
 */
export function isLikelyBot(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  const botPatterns = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
    'python', 'java', 'go-http', 'httpie', 'postman'
  ];

  return botPatterns.some(pattern => userAgent.includes(pattern));
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
  // Try various headers for IP (behind proxy/load balancer)
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

/**
 * Rate limiter using in-memory storage (for development)
 * Note: Use Redis-based rate limiting in production
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class InMemoryRateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.store.entries()) {
        if (now > entry.resetTime) {
          this.store.delete(key);
        }
      }
    }, 60000);
  }

  /**
   * Check if request should be rate limited
   * @param identifier - Unique identifier (IP, user ID, etc.)
   * @param limit - Max requests allowed
   * @param windowMs - Time window in milliseconds
   */
  check(identifier: string, limit: number, windowMs: number): {
    success: boolean;
    remaining: number;
    resetTime: number;
  } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      // New window
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + windowMs
      };
      this.store.set(identifier, newEntry);
      return {
        success: true,
        remaining: limit - 1,
        resetTime: newEntry.resetTime
      };
    }

    if (entry.count >= limit) {
      // Rate limited
      return {
        success: false,
        remaining: 0,
        resetTime: entry.resetTime
      };
    }

    // Increment counter
    entry.count++;
    return {
      success: true,
      remaining: limit - entry.count,
      resetTime: entry.resetTime
    };
  }

  cleanup() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Singleton instance
let rateLimiterInstance: InMemoryRateLimiter | null = null;

export function getRateLimiter(): InMemoryRateLimiter {
  if (!rateLimiterInstance) {
    rateLimiterInstance = new InMemoryRateLimiter();
  }
  return rateLimiterInstance;
}

/**
 * Rate limiting middleware for API routes
 */
export async function checkRateLimit(
  request: NextRequest,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining?: number; resetTime?: number }> {
  const ip = getClientIP(request);
  const rateLimiter = getRateLimiter();

  return rateLimiter.check(ip, limit, windowMs);
}

/**
 * Create a rate-limited response
 */
export function createRateLimitResponse(resetTime: number): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(resetTime).toISOString(),
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
      }
    }
  );
}
