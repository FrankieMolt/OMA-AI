import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyPayment, createPaymentRequirement } from '../../lib/x402-enhanced';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * Payment Status & X402 Activation Check
 * 
 * GET  - Check payment status for user
 * POST - Process X402 payment
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Payment');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Check payment status
  if (req.method === 'GET') {
    try {
      const userId = req.query.user_id as string;

      if (!userId) {
        return res.status(400).json({ error: 'user_id required' });
      }

      const { data: user } = await supabase
        .from('users')
        .select('id, tier, balance, tokens_used, tokens_limit')
        .eq('id', userId)
        .single();

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({
        success: true,
        payment_status: {
          tier: user.tier,
          balance: user.balance,
          tokens_used: user.tokens_used,
          tokens_remaining: user.tokens_limit - user.tokens_used,
          has_subscription: user.tier !== 'free',
          x402_enabled: true
        }
      });

    } catch (error) {
      console.error('Payment status error:', error);
      return res.status(500).json({ error: 'Failed to get payment status' });
    }
  }

  // POST - Process X402 payment
  if (req.method === 'POST') {
    try {
      const paymentHeader = req.headers['x-payment'] as string;

      if (!paymentHeader) {
        // Return payment requirement
        const { endpoint } = req.body;
        const requirement = createPaymentRequirement({ endpoint });

        return res.status(402).json({
          error: 'Payment Required',
          code: 'X402_PAYMENT_REQUIRED',
          payment: requirement,
          message: 'X402 payment required for this endpoint',
          x402_version: 1
        });
      }

      // Verify payment
      const verification = await verifyPayment(paymentHeader);

      if (!verification.valid) {
        return res.status(402).json({
          error: 'Payment Invalid',
          code: 'X402_PAYMENT_INVALID',
          message: verification.error
        });
      }

      // Payment successful
      return res.status(200).json({
        success: true,
        message: 'Payment verified',
        payment: verification.payment
      });

    } catch (error) {
      console.error('Payment processing error:', error);
      return res.status(500).json({ error: 'Payment processing failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
