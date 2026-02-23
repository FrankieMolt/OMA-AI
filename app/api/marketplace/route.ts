import { NextResponse } from 'next/server';

const apis = [
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
    id: 'polymarket',
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
      owner: data.owner || 'Anonymous',
      rating: 0,
      calls: 0,
      featured: false
    };
    apis.push(newAPI);
    return NextResponse.json({ success: true, api: newAPI });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create API' }, { status: 500 });
  }
}
