import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'London';

  const response = NextResponse.json({
    success: true,
    city,
    temp_c: 18,
    temp_f: 64,
    humidity: 65,
    condition: 'Partly Cloudy',
    wind_kph: 12,
    last_updated: new Date().toISOString()
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=600');
  return response;
}
