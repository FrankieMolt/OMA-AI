import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({
    success: true,
    pricing: {
      free: {
        price: 0,
        requests_per_minute: 5,
        requests_per_hour: 100,
        features: ['basic models', 'community support']
      },
      starter: {
        price: 10,
        requests_per_minute: 20,
        requests_per_hour: 500,
        features: ['all models', 'priority support', 'web search']
      },
      pro: {
        price: 50,
        requests_per_minute: 60,
        requests_per_hour: 2000,
        features: ['all models', 'priority support', 'web search', 'uncensored']
      }
    }
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=3600');
  return response;
}
