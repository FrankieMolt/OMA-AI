import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');
  
  // Mock marketplace data
  const services = [
    {
      id: 'srv_1',
      name: 'Text Generation',
      description: 'Generate high-quality text content',
      type: 'ai',
      price: 0.01,
      capabilities: ['text', 'writing'],
      seller_wallet: '0x0000000000000000000000000000000000000000',
      status: 'active',
      total_sales: 156
    },
    {
      id: 'srv_2',
      name: 'Image Generation',
      description: 'Create images from text prompts',
      type: 'ai',
      price: 0.05,
      capabilities: ['image', 'generation'],
      seller_wallet: '0x0000000000000000000000000000000000000000',
      status: 'active',
      total_sales: 89
    },
    {
      id: 'srv_3',
      name: 'Web Search',
      description: 'Search and retrieve web information',
      type: 'search',
      price: 0.005,
      capabilities: ['search', 'web'],
      seller_wallet: '0x0000000000000000000000000000000000000000',
      status: 'active',
      total_sales: 342
    },
    {
      id: 'srv_4',
      name: 'Data Analysis',
      description: 'Analyze and process data',
      type: 'analysis',
      price: 0.02,
      capabilities: ['data', 'analysis'],
      seller_wallet: '0x0000000000000000000000000000000000000000',
      status: 'active',
      total_sales: 67
    },
    {
      id: 'srv_5',
      name: 'Code Generation',
      description: 'Generate and debug code',
      type: 'dev',
      price: 0.03,
      capabilities: ['code', 'programming'],
      seller_wallet: '0x0000000000000000000000000000000000000000',
      status: 'active',
      total_sales: 123
    }
  ];

  const filtered = type ? services.filter(s => s.type === type) : services;

  return NextResponse.json({
    services: filtered
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    id: `srv_${Date.now()}`,
    name: body.name,
    description: body.description,
    type: body.type || 'service',
    price: body.price || 0.01,
    capabilities: body.capabilities || [],
    seller_wallet: body.seller_wallet || '0x0000000000000000000000000000000000000000',
    status: 'pending',
    total_sales: 0,
    created_at: new Date().toISOString()
  });
}
