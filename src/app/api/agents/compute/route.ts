import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Supported GPU compute providers and regions
const COMPUTE_PROVIDERS = [
  { id: 'akash', name: 'Akash Network', type: 'decentralized', status: 'coming_soon' },
  { id: 'vast', name: 'Vast.ai', type: 'marketplace', status: 'coming_soon' },
  { id: 'fluid', name: 'Fluid_stack', type: 'decentralized', status: 'coming_soon' },
];

const GPU_OPTIONS = [
  { id: 'a100-80gb', name: 'NVIDIA A100 80GB', price_per_hour: 2.50, provider: 'akash' },
  { id: 'h100-80gb', name: 'NVIDIA H100 80GB', price_per_hour: 3.20, provider: 'akash' },
  { id: 'a6000', name: 'NVIDIA RTX A6000', price_per_hour: 0.80, provider: 'vast' },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: 'coming_soon',
      message: 'GPU compute marketplace launching soon. Join the waitlist at /contact.',
      providers: COMPUTE_PROVIDERS,
      gpu_options: GPU_OPTIONS,
      features: [
        'Per-hour pricing with x402 micropayments',
        'Multi-provider GPU comparison',
        'One-click container deployment',
        'Automatic failover across providers',
      ],
      expected_launch: 'Q2 2026',
    },
  });
}
