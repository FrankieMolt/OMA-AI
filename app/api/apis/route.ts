import { NextRequest, NextResponse } from 'next/server';

// In-memory store (replace with Supabase later)
let apis: any[] = [
  {
    id: 'frankie-crypto',
    name: 'Frankie Crypto API',
    description: 'Real-time cryptocurrency prices for BTC, ETH, SOL',
    url: 'https://frankie-prod.life.conway.tech',
    price: 0.01,
    category: 'crypto',
    owner: 'Frankie',
    rating: 4.8,
    calls: 1700,
    featured: true
  },
  {
    id: 'polymarket-prediction',
    name: 'Polymarket Prediction API',
    description: 'Prediction market data and odds from Polymarket',
    url: 'https://polymarket.example.com',
    price: 0.10,
    category: 'predictions',
    owner: 'Frankie',
    rating: 4.5,
    calls: 450,
    featured: true
  }
];

export async function GET() {
  return NextResponse.json({ apis, count: apis.length });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.url || !data.price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newAPI = {
      id: `api-${Date.now()}`,
      name: data.name,
      description: data.description || '',
      url: data.url,
      price: parseFloat(data.price),
      category: data.category || 'general',
      owner: data.owner || 'Anonymous',
      rating: 0,
      calls: 0,
      featured: false,
      createdAt: new Date().toISOString()
    };

    apis.push(newAPI);
    
    return NextResponse.json({ success: true, api: newAPI });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create API' }, { status: 500 });
  }
}
