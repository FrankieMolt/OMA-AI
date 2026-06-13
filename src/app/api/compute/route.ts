import { NextResponse } from 'next/server';

const AKASH_PRICING = {
  compute: {
    'aws-t3-small': { cpu: 2, ram: 2, price: 5.40, provider: 'AWS' },
    'akash-cpu-small': { cpu: 2, ram: 4, price: 4.50, provider: 'Akash' },
    'akash-cpu-medium': { cpu: 4, ram: 8, price: 9.00, provider: 'Akash' },
    'akash-gpu-a4000': { cpu: 4, ram: 16, gpu: 1, price: 45.00, provider: 'Akash' },
    'akash-gpu-a100': { cpu: 8, ram: 32, gpu: 1, price: 95.00, provider: 'Akash' },
    'akash-hpc': { cpu: 16, ram: 64, gpu: 4, price: 180.00, provider: 'Akash' }
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'list';

  if (action === 'list') {
    const response = NextResponse.json({
      success: true,
      providers: AKASH_PRICING.compute,
      savings: {
        'aws-t3-small': '17%',
        'akash-cpu-medium': '25%',
        'akash-gpu-a100': '45%'
      }
    });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    return response;
  }

  return NextResponse.json(
    { success: false, error: 'Invalid action' },
    { status: 400 }
  );
}
