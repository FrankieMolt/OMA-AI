import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.oma-ai.com';

  try {
    const response = await fetch(`${API_URL}/services`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      throw new Error('Backend not available');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Marketplace API Error:', error);
    // Return empty array when backend not deployed
    return NextResponse.json({
      services: [],
      error: 'Backend unavailable'
    });
  }
}
