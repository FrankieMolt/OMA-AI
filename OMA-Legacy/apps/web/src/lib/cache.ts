import { createClient } from 'redis';
import type { RedisClientType } from 'redis';
import { logger } from '@/lib/logger';

class CacheManager {
  private client: RedisClientType | null = null;
  private isConnected = false;
  private memoryCache = new Map<string, { value: unknown; expiresAt: number }>();
  private memoryCacheInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Use in-memory cache for development if Redis not available
    this.initializeCache();
    this.startMemoryCacheCleanup();
  }

  private async initializeCache() {
    // Skip Redis initialization during build/test to avoid logs
    if (process.env.NODE_ENV === 'test' || process.env.NEXT_PHASE === 'phase-production-build') {
      return;
    }

    try {
      // Try Redis first
      this.client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });

      this.client.on('error', (err: unknown) => {
        const errorMessage = err instanceof Error ? err.message : String(err);
        // Reduce log verbosity for connection failures in dev
        if (process.env.NODE_ENV !== 'development') {
          logger.warn('Redis connection failed, using in-memory cache', { error: errorMessage });
        }
        this.client = null;
        this.isConnected = false;
      });

      await this.client.connect();
      this.isConnected = true;
      logger.info('Redis cache connected');
    } catch {  
      // Silent fail in dev, fallback to memory
      this.client = null;
      this.isConnected = false;
    }
  }

  private startMemoryCacheCleanup(): void {
    // Clean up expired entries every 60 seconds
    this.memoryCacheInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.memoryCache.entries()) {
        if (entry.expiresAt < now) {
          this.memoryCache.delete(key);
        }
      }
    }, 60000);
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    try {
      if (this.isConnected && this.client) {
        const data = await this.client.get(key);
        if (typeof data === 'string') {
          return JSON.parse(data);
        }
        return null;
      }

      // Fallback to in-memory cache
      const entry = this.memoryCache.get(key);
      if (entry && entry.expiresAt > Date.now()) {
        return entry.value as T;
      }

      // Clean up expired entry
      if (entry) {
        this.memoryCache.delete(key);
      }

      return null;
    } catch (error) {
      logger.warn('Cache get error', {
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  }

  async set(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
    try {
      if (this.isConnected && this.client) {
        await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
      } else {
        // Fallback to in-memory cache
        this.memoryCache.set(key, {
          value,
          expiresAt: Date.now() + ttlSeconds * 1000,
        });
      }
    } catch (error) {
      logger.warn('Cache set error', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async del(key: string): Promise<void> {
    try {
      if (this.isConnected && this.client) {
        await this.client.del(key);
      } else {
        // Remove from in-memory cache
        this.memoryCache.delete(key);
      }
    } catch (error) {
      logger.warn('Cache del error', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Cleanup method for graceful shutdown
  cleanup(): void {
    if (this.memoryCacheInterval) {
      clearInterval(this.memoryCacheInterval);
      this.memoryCacheInterval = null;
    }
    this.memoryCache.clear();
  }

  generateKey(endpoint: string, params: Record<string, unknown>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce(
        (result, key) => {
          result[key] = params[key];
          return result;
        },
        {} as Record<string, unknown>
      );

    return `${endpoint}:${JSON.stringify(sortedParams)}`;
  }
}

export const cache = new CacheManager();

// Cache wrapper for API routes
export function withCache(
  handler: (request: Request, context?: unknown) => Promise<Response>,
  ttlSeconds = 300,
  cacheKey?: string
) {
  return async (request: Request, context?: unknown) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);

    const key = cacheKey || cache.generateKey(url.pathname, params);

    // Try cache first
    const cached = await cache.get(key);
    if (cached) {
      logger.debug('Cache hit', { key });
      return Response.json(cached);
    }

    // Execute handler
    const result = await handler(request, context);

    // Cache the result if successful
    if (result.status === 200) {
      try {
        const data = await result.clone().json();
        await cache.set(key, data, ttlSeconds);
        logger.debug('Cached response', { key, ttlSeconds });
      } catch {  
        // Ignore cache errors
      }
    }

    return result;
  };
}
