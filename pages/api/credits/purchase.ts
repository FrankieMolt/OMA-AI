// Purchase credits via Stripe
import type { NextApiRequest, NextApiResponse } from 'next';
import { CREDIT_PACKAGES } from '../../../lib/credits';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packageId, userId } = req.body;

    if (!packageId || !userId) {
      return res.status(400).json({ 
        error: 'Missing packageId or userId' 
      });
    }

    // Find package
    const pkg = CREDIT_PACKAGES.find(p => p.id === packageId);
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Create Stripe checkout session
    // TODO: Use actual Stripe integration
    
    const checkoutSession = {
      id: `cs_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/${packageId}`,
      package: {
        id: pkg.id,
        credits: pkg.credits,
        bonus: pkg.bonus,
        total: pkg.credits + pkg.bonus,
        price: pkg.price
      },
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 min
    };

    return res.status(200).json({
      success: true,
      checkout: checkoutSession
    });

  } catch (error: any) {
    console.error('Purchase error:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
}
