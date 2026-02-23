import { NextResponse } from 'next/server';
import { apiServices } from '@/lib/api-data';

export async function GET() {
  return NextResponse.json({ 
    apis: apiServices, 
    count: apiServices.length 
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newAPI = {
      id: `api-${Date.now()}`,
      name: data.name,
      description: data.description || '',
      url: data.url,
      price: parseFloat(data.price) || 0.01,
      category: data.category || 'general',
      provider: data.owner || 'Anonymous',
      rating: 0,
      calls: 0,
      featured: false,
      tags: data.tags || []
    };
    // Note: In production, this would save to database
    return NextResponse.json({ success: true, api: newAPI });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create API' }, { status: 500 });
  }
}
