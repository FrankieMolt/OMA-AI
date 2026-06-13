/**
 * Credits Purchase API — x402 EIP-3009 USDC Payment Flow
 *
 * POST: Initiate a credits purchase
 *   Body: { packageId, walletAddress, network?, userId? }
 *   Returns: { paymentRequirement, purchaseId }
 *
 * The client then submits the signed EIP-3009 authorization via POST to /api/credits/confirm
 */

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { createPaymentRequirement, encodePaymentRequirement, dollarsToMicroUnits } from '@/lib/x402/server';
import { supabaseService } from '@/lib/supabase/config';
import { CHAIN_IDS, getAssetContract } from '@/lib/x402/services/evm';
import { generateNonce, generateAuthorizationTimestamps } from '@/lib/x402/services/nonce';
import { ethers } from 'ethers';

const TREASURY_ADDRESS = process.env.OMA_AI_PAYMENT_WALLET || process.env.NEXT_PUBLIC_WALLET_ADDRESS || '0x1D74Eb7BeC21aa9bC6D23D664E40b97E74472D21';

// Credit packages mapping — mirrors credits page display
const CREDIT_PACKAGES: Record<string, { credits: number; bonus: number; price: number; name: string }> = {
  starter:    { credits: 5_000,   bonus: 0,       price: 10,  name: 'Starter' },
  growth:     { credits: 25_000,  bonus: 2_500,   price: 40,  name: 'Growth' },
  scale:      { credits: 100_000, bonus: 10_000,  price: 140, name: 'Scale' },
  enterprise: { credits: 500_000, bonus: 50_000,  price: 600, name: 'Enterprise' },
};

// POST /api/credits/purchase — initiate purchase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON', code: 'INVALID_JSON' }, { status: 400 });
    }

    const { packageId, walletAddress, network = 'base', userId } = body as {
      packageId?: string;
      walletAddress?: string;
      network?: string;
      userId?: string;
    };

    // Validate inputs
    if (!packageId || !CREDIT_PACKAGES[packageId]) {
      return NextResponse.json(
        { error: 'Invalid package ID', code: 'INVALID_PACKAGE', available: Object.keys(CREDIT_PACKAGES) },
        { status: 400 }
      );
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return NextResponse.json(
        { error: 'Valid wallet address required', code: 'INVALID_WALLET' },
        { status: 400 }
      );
    }

    const chainId = CHAIN_IDS[network as string];
    if (!chainId) {
      return NextResponse.json(
        { error: `Unsupported network: ${network}`, code: 'UNSUPPORTED_NETWORK' },
        { status: 400 }
      );
    }

    const pkg = CREDIT_PACKAGES[packageId]!;
    const totalCredits = pkg.credits + pkg.bonus;
    const amountMicrousdc = dollarsToMicroUnits(pkg.price);
    const assetContract = getAssetContract('USDC', network as string);

    if (!assetContract) {
      return NextResponse.json(
        { error: `No USDC contract for ${network}`, code: 'UNSUPPORTED_NETWORK' },
        { status: 400 }
      );
    }

    // Generate purchase record
    const purchaseId = randomBytes(16).toString('hex');
    const { validAfter, validBefore } = generateAuthorizationTimestamps(600); // 10-minute window

    // Store pending purchase in DB
    if (supabaseService) {
      try {
        await supabaseService.from('credit_purchases').insert({
          id: purchaseId,
          user_id: userId || walletAddress.toLowerCase(),
          package_id: packageId,
          wallet_address: walletAddress.toLowerCase(),
          network,
          amount_usdc: amountMicrousdc,
          credits_amount: totalCredits,
          status: 'pending',
          expires_at: new Date(validBefore * 1000).toISOString(),
          created_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        // Table may not exist — log and continue
        console.warn('[Credits Purchase] Could not insert purchase record:', dbErr);
      }
    }

    // Build payment requirement
    const paymentReq = createPaymentRequirement({
      recipientAddress: TREASURY_ADDRESS,
      network: network as 'base' | 'base-sepolia',
      price: pkg.price.toString(),
      description: `Credits purchase: ${pkg.name} package — ${totalCredits.toLocaleString()} credits`,
      expiresInMinutes: 10,
    });

    // Return payment requirement for client-side wallet signing
    return NextResponse.json({
      purchaseId,
      package: {
        id: packageId,
        name: pkg.name,
        credits: totalCredits,
        price: pkg.price,
      },
      payment: {
        amount: amountMicrousdc.toString(),
        amountDisplay: `$${pkg.price.toFixed(2)}`,
        asset: assetContract,
        network,
        chainId,
        recipient: TREASURY_ADDRESS,
        validAfter,
        validBefore,
      },
      paymentRequirement: paymentReq,
      encodedPaymentRequirement: encodePaymentRequirement(paymentReq),
      instructions: {
        step1: `Sign the EIP-3009 authorization in your wallet for $${pkg.price.toFixed(2)} USDC`,
        step2: 'Submit the signed authorization to confirm purchase',
        step3: 'Credits will be added to your account immediately',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Credits Purchase] Error:', err);
    return NextResponse.json({ error: msg, code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';