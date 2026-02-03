// Analytics utility for monitoring usage
import { db } from '@/lib/db';
import { analytics } from '@/lib/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { logger } from '@/lib/logger';

export interface AnalyticsEvent {
  event: string;
  userId?: number;
  sessionId?: string;
  data?: Record<string, unknown>;
  timestamp?: Date;
  ip?: string;
  userAgent?: string;
}

export class AnalyticsManager {
  async trackEvent(event: AnalyticsEvent) {
    try {
      await db.insert(analytics).values({
        event: event.event,
        userId: event.userId || null,
        sessionId: event.sessionId || null,
        data: event.data || {},
        timestamp: event.timestamp || new Date(),
        ip: event.ip || null,
        userAgent: event.userAgent || null,
      });
    } catch (error) {
      logger.warn('Analytics tracking failed', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async trackPageView(
    path: string,
    userId?: number,
    sessionId?: string,
    data?: Record<string, unknown>
  ) {
    const extraData = data && typeof data === 'object' ? data : {};
    await this.trackEvent({
      event: 'page_view',
      userId,
      sessionId,
      data: { path, ...extraData },
    });
  }

  async trackApiCall(
    endpoint: string,
    method: string,
    status: number,
    duration: number,
    userId?: number
  ) {
    await this.trackEvent({
      event: 'api_call',
      userId,
      data: { endpoint, method, status, duration },
    });
  }

  async trackUserAction(action: string, userId: number, data?: Record<string, unknown>) {
    const extraData = data && typeof data === 'object' ? data : {};
    await this.trackEvent({
      event: 'user_action',
      userId,
      data: { action, ...extraData },
    });
  }

  async getAnalytics(
    filters: {
      event?: string;
      userId?: number;
      dateFrom?: Date;
      dateTo?: Date;
      limit?: number;
    } = {}
  ) {
    const conditions = [];

    if (filters.event) {
      conditions.push(eq(analytics.event, filters.event));
    }

    if (filters.userId !== undefined) {
      conditions.push(eq(analytics.userId, filters.userId));
    }

    if (filters.dateFrom) {
      conditions.push(sql`${analytics.timestamp} >= ${filters.dateFrom}`);
    }

    if (filters.dateTo) {
      conditions.push(sql`${analytics.timestamp} <= ${filters.dateTo}`);
    }

    const query = db
      .select()
      .from(analytics)
      .where(conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined)
      .orderBy(desc(analytics.timestamp))
      .limit(filters.limit || 100);

    return await query;
  }

  async getStats(timeframe: 'day' | 'week' | 'month' = 'week') {
    const now = new Date();
    const timeframeMap = {
      day: 1,
      week: 7,
      month: 30,
    };

    const dateFrom = new Date(now.getTime() - timeframeMap[timeframe] * 24 * 60 * 60 * 1000);

    const events = await this.getAnalytics({ dateFrom });

    return {
      totalEvents: events.length,
      uniqueUsers: new Set(events.map((e) => e.userId).filter(Boolean)).size,
      pageViews: events.filter((e) => e.event === 'page_view').length,
      apiCalls: events.filter((e) => e.event === 'api_call').length,
      userActions: events.filter((e) => e.event === 'user_action').length,
      topPages: this.getTopItems(
        events.filter((e) => e.event === 'page_view') as Array<Record<string, unknown>>,
        'data.path'
      ),
      topEndpoints: this.getTopItems(
        events.filter((e) => e.event === 'api_call') as Array<Record<string, unknown>>,
        'data.endpoint'
      ),
      timeframe,
    };
  }

  private getTopItems(events: Array<Record<string, unknown>>, path: string, limit = 5) {
    const counts: Record<string, number> = {};

    events.forEach((event) => {
      const key = this.getNestedValue(event, path);
      if (typeof key === 'string') {
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([item, count]) => ({ item, count }));
  }

  private getNestedValue(obj: Record<string, unknown>, path: string) {
    return path.split('.').reduce<unknown>((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }
}

export const analyticsManager = new AnalyticsManager();
