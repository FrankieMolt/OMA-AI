import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { analyticsManager, AnalyticsEvent } from '@/lib/analytics';

// Track analytics events
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body: Partial<AnalyticsEvent> = await request.json();

    // Basic validation
    if (!body.event) {
      return NextResponse.json({ error: 'Event type is required' }, { status: 400 });
    }

    // Get client info
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create analytics event
    const sessionUser = session?.user as
      | { id?: string | number; role?: string; email?: string | null }
      | undefined;
    const sessionUserId = sessionUser?.id ? Number(sessionUser.id) : undefined;
    const bodyUserId =
      typeof body.userId === 'number'
        ? body.userId
        : typeof body.userId === 'string'
          ? Number(body.userId)
          : undefined;
    const resolvedUserId = Number.isFinite(sessionUserId)
      ? sessionUserId
      : Number.isFinite(bodyUserId)
        ? bodyUserId
        : undefined;

    const event: AnalyticsEvent = {
      event: body.event,
      userId: resolvedUserId,
      sessionId: body.sessionId,
      data: body.data || {},
      timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
      ip,
      userAgent,
    };

    // Track the event
    await analyticsManager.trackEvent(event);

    return NextResponse.json({
      success: true,
      event: body.event,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}

// Get analytics data (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as
      | { id?: string | number; role?: string; email?: string | null }
      | undefined;

    // Check if user is admin
    if (!sessionUser || sessionUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const event = searchParams.get('event');
    const userIdParam = searchParams.get('userId');
    const timeframe = searchParams.get('timeframe') as 'day' | 'week' | 'month';
    const userId = userIdParam ? Number(userIdParam) : undefined;
    const resolvedUserId = Number.isFinite(userId) ? userId : undefined;

    if (searchParams.has('stats')) {
      // Return stats overview
      const stats = await analyticsManager.getStats(timeframe || 'week');
      return NextResponse.json(stats);
    } else {
      // Return raw events
      const events = await analyticsManager.getAnalytics({
        event: event || undefined,
        userId: resolvedUserId,
        limit: 100,
      });

      return NextResponse.json({
        events,
        count: events.length,
      });
    }
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
