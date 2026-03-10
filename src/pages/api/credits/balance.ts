// Get user's credit balance
import type { NextApiRequest, NextApiResponse } from 'next';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from header
    const apiKey = req.headers['x-api-key'] as string;
    
    if (!apiKey || !apiKey.startsWith('oma-')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // TODO: Look up user credits from database
    // For now, return mock data
    
    const balance = {
      credits: 50000,
      bonusCredits: 5000,
      totalCredits: 55000,
      usedThisMonth: 12500,
      estimatedCost: '$12.50',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    };

    return res.status(200).json({
      success: true,
      balance
    });

  } catch (error: any) {
    console.error('Balance check error:', error);
    return res.status(500).json({ 
      error: 'Failed to check balance',
      details: error.message 
    });
  }
}
