// Deduct credits after API call
import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateCreditsNeeded } from '../../../lib/credits';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = req.headers['x-api-key'] as string;
    const { model, inputTokens, outputTokens, requestId } = req.body;

    if (!apiKey || !apiKey.startsWith('oma-')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    if (!model || !inputTokens || !outputTokens) {
      return res.status(400).json({ 
        error: 'Missing required fields: model, inputTokens, outputTokens' 
      });
    }

    // Calculate credits needed
    const creditsNeeded = calculateCreditsNeeded(model, inputTokens, outputTokens);

    // TODO: Check if user has enough credits
    // TODO: Deduct from database
    
    const deduction = {
      requestId: requestId || `req_${Date.now()}`,
      model,
      inputTokens,
      outputTokens,
      creditsUsed: creditsNeeded,
      estimatedCost: `$${(creditsNeeded / 1000).toFixed(4)}`,
      remainingCredits: 42500 - creditsNeeded, // Mock
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      deduction
    });

  } catch (error: any) {
    console.error('Deduction error:', error);
    return res.status(500).json({ 
      error: 'Failed to deduct credits',
      details: error.message 
    });
  }
}
