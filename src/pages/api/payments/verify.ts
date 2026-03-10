/**
 * Payments Verification API
 * POST /api/payments/verify
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  verifyPayment,
  type PaymentRequest,
  type VerifiedPayment,
} from '@/lib/x402/verify';

// Mock payment records for MVP (replace with real database)
const PAYMENT_RECORDS: Record<string, any> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const paymentRequest: PaymentRequest = req.body;

    // Validate required fields
    if (!paymentRequest.from || !paymentRequest.to || !paymentRequest.amount ||
        !paymentRequest.nonce || !paymentRequest.deadline || !paymentRequest.skillId) {
      return res.status(400).json({
        error: 'Missing required payment fields',
        details: {
          from: paymentRequest.from ? 'present' : 'missing',
          to: paymentRequest.to ? 'present' : 'missing',
          amount: paymentRequest.amount ? 'present' : 'missing',
          nonce: paymentRequest.nonce ? 'present' : 'missing',
          deadline: paymentRequest.deadline ? 'present' : 'missing',
          skillId: paymentRequest.skillId ? 'present' : 'missing',
        },
      });
    }

    // Verify signature from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('x402 ')) {
      return res.status(401).json({
        error: 'Missing x402 signature',
        details: 'Expected Authorization header: x402 <signature>',
      });
    }

    const signature = authHeader.slice(5); // Remove 'x402 ' prefix

    // Verify payment
    const verification: VerifiedPayment = await verifyPayment(paymentRequest, signature);

    if (!verification.valid) {
      return res.status(402).json({
        error: 'Payment verification failed',
        details: verification.error,
        code: 'PAYMENT_VERIFICATION_FAILED',
      });
    }

    // Store payment record
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    PAYMENT_RECORDS[paymentId] = {
      id: paymentId,
      from: verification.from,
      to: verification.to,
      amountUsdc: verification.amountUsdc,
      nonce: verification.nonce.toString(),
      deadline: verification.deadline.toString(),
      skillId: verification.skillId,
      verifiedAt: new Date().toISOString(),
      signature,
    };

    // Return successful verification
    res.status(200).json({
      success: true,
      payment: {
        id: paymentId,
        from: verification.from,
        to: verification.to,
        amount: verification.amount,
        amountUsdc: verification.amountUsdc,
        nonce: verification.nonce,
        deadline: verification.deadline,
        skillId: verification.skillId,
        verifiedAt: new Date().toISOString(),
      },
      message: 'Payment verified successfully',
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      error: 'Failed to verify payment',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
