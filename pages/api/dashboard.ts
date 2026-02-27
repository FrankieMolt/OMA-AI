import type { NextApiRequest, NextApiResponse } from 'next';

interface DashboardResponse {
  success: boolean;
  user?: {
    id: string;
    email?: string;
    wallet_address?: string;
  };
  api_keys?: Array<{
    id: string;
    name: string;
    created_at: string;
  }>;
  stats?: {
    total_calls: number;
    calls_today: number;
    calls_this_month: number;
  };
  earnings?: {
    total: number;
    pending: number;
    paid: number;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardResponse>
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Return demo dashboard data
    return res.status(200).json({
      success: true,
      user: {
        id: 'user_demo',
        email: 'user@example.com'
      },
      api_keys: [
        {
          id: 'key_1',
          name: 'Default Key',
          created_at: new Date().toISOString()
        }
      ],
      stats: {
        total_calls: 1247,
        calls_today: 42,
        calls_this_month: 342
      },
      earnings: {
        total: 12.47,
        pending: 2.34,
        paid: 10.13
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to load dashboard' 
    });
  }
}
