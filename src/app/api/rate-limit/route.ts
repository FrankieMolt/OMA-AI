import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
      tiers: [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          limits: {
            requestsPerMinute: 5,
            requestsPerHour: 100,
            requestsPerDay: 50,
            tokensPerDay: 100000
          },
          features: ['basic-models', 'community-support']
        },
        {
          id: 'starter',
          name: 'Starter',
          price: 10,
          limits: {
            requestsPerMinute: 20,
            requestsPerHour: 500,
            requestsPerDay: 500,
            tokensPerDay: 1000000
          },
          features: ['all-models', 'priority-support', 'web-search']
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 50,
          limits: {
            requestsPerMinute: 60,
            requestsPerHour: 2000,
            requestsPerDay: 5000,
            tokensPerDay: 10000000
          },
          features: ['all-models', 'priority-support', 'web-search', 'uncensored', 'api-access']
        }
      ],
      currentTier: 'free',
      upgradeUrl: '/pricing'
    });
    // Intentionally public - rate limit tiers are not sensitive
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Cache-Control', 'public, max-age=3600');
    return response;
  } catch (error) {
    console.error('[GET /api/rate-limit] error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
