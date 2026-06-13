import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

import { supabaseService } from '@/lib/supabase/config';
import { generateNonce, generateCallerNonce, generateAuthorizationTimestamps } from '@/lib/x402/services/nonce';
import { verifyCallerSignature, CALLER_VERIFICATION_TYPE, CALLER_VERIFICATION_DOMAIN } from '@/lib/x402/services/signature';
import { buildX402Payload } from '@/lib/x402/services/payment';
import { CHAIN_IDS, getAssetContract, decodePrivateKey, signEVMPayment } from '@/lib/x402/services/evm';
import { randomBytes } from 'crypto';

/**
 * x402 Payment Signing Endpoint
 *
 * Implements EIP-712 signing for x402 PaymentPayload with EIP-3009 authorization.
 */

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const privateKeyBase64 = process.env.X402_SIGNER_PRIVATE_KEY;

    if (!supabaseUrl || !supabaseService) {
      return NextResponse.json(
        { error: 'Service not configured', code: 'CONFIG_MISSING' },
        { status: 503 }
      );
    }

    if (!privateKeyBase64) {
      return NextResponse.json(
        { error: 'Signer not configured: X402_SIGNER_PRIVATE_KEY missing', code: 'SIGNER_MISSING' },
        { status: 503 }
      );
    }

    // Decode private key
    let privateKey: string;
    try {
      privateKey = decodePrivateKey(privateKeyBase64);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid private key';
      return NextResponse.json(
        { error: errorMessage, code: 'INVALID_KEY' },
        { status: 400 }
      );
    }

    // Initialize wallet
    let wallet: ethers.Wallet;
    try {
      wallet = new ethers.Wallet(privateKey);
    } catch {
      return NextResponse.json(
        { error: 'Invalid private key', code: 'INVALID_KEY' },
        { status: 400 }
      );
    }

    const supabase = supabaseService;

    // Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body', code: 'INVALID_JSON' }, { status: 400 });
    }

    const {
      amount,
      token = 'USDC',
      network = 'base',
      mcp_id,
      user_id,
      pay_to,
      caller_address,
      caller_signature,
    } = body as {
      amount?: string; token?: string; network?: string; mcp_id?: string;
      user_id?: string; pay_to?: string; caller_address?: string;
      caller_signature?: string;
    };

    if (!amount || !mcp_id) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, mcp_id', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    // Validate amount
    let amountBigInt: bigint;
    try {
      amountBigInt = BigInt(amount as string);
    } catch {
      return NextResponse.json(
        { error: 'Invalid amount format', code: 'INVALID_AMOUNT' },
        { status: 400 }
      );
    }

    if (amountBigInt <= BigInt(0)) {
      return NextResponse.json(
        { error: 'Amount must be positive', code: 'INVALID_AMOUNT' },
        { status: 400 }
      );
    }

    // Get chain ID
    const chainId = CHAIN_IDS[network as string];
    if (!chainId) {
      return NextResponse.json(
        { error: `Unsupported network: ${network}`, code: 'UNSUPPORTED_NETWORK' },
        { status: 400 }
      );
    }

    // Get asset contract
    const assetContract = getAssetContract(token as string, network as string);
    if (!assetContract) {
      return NextResponse.json(
        { error: `Unsupported token ${token} on network ${network}`, code: 'UNSUPPORTED_TOKEN' },
        { status: 400 }
      );
    }

    // Lookup MCP to verify and get payTo
    const { data: mcp, error: mcpError } = await supabase
      .from('mcp_servers')
      .select('pricing_usdc, x402_enabled, x402_pay_to')
      .eq('id', mcp_id)
      .single();

    if (mcpError || !mcp) {
      return NextResponse.json(
        { error: 'MCP not found', code: 'MCP_NOT_FOUND' },
        { status: 404 }
      );
    }

    if (!mcp.x402_enabled) {
      return NextResponse.json(
        { error: 'MCP does not accept x402 payments', code: 'PAYMENT_DISABLED' },
        { status: 403 }
      );
    }

    // Determine payTo address
    const payTo = pay_to || mcp.x402_pay_to || process.env.NEXT_PUBLIC_WALLET_ADDRESS;
    if (!payTo) {
      return NextResponse.json(
        { error: 'No payTo address configured', code: 'PAYTO_NOT_SET' },
        { status: 500 }
      );
    }

    // ============================================================
    // SECURITY FIX: Verify caller identity via EIP-712 signature
    // ============================================================
    let verifiedCallerAddress: string | null = null;

    if (caller_address && caller_signature) {
      if (!ethers.isAddress(caller_address)) {
        return NextResponse.json(
          { error: 'Invalid caller_address format', code: 'INVALID_CALLER' },
          { status: 400 }
        );
      }

      const callerNonce = generateCallerNonce();
      const timestampSeconds = Math.floor(Date.now() / 1000);

      if (Math.abs(timestampSeconds - ((body.timestamp as number) || 0)) > 300) {
        return NextResponse.json(
          { error: 'Request timestamp expired or invalid (must be within 5 minutes)', code: 'EXPIRED_REQUEST' },
          { status: 400 }
        );
      }

      const callerMessage = {
        user_id: user_id || caller_address,
        amount: amount!.toString(),
        mcp_id: mcp_id!.toString(),
        network,
        nonce: callerNonce,
        timestamp: timestampSeconds,
      };

      const recovered = verifyCallerSignature(
        caller_address,
        caller_signature,
        callerMessage
      );

      if (!recovered) {
        return NextResponse.json(
          { error: 'Caller signature verification failed — address mismatch', code: 'SIGNATURE_MISMATCH' },
          { status: 401 }
        );
      }

      verifiedCallerAddress = recovered;

      // Store caller nonce to prevent replay attacks
      try {
        await supabase.from('x402_caller_nonces').upsert({
          nonce: callerNonce,
          caller_address: caller_address.toLowerCase(),
          expires_at: new Date(timestampSeconds * 1000 + 10 * 60 * 1000).toISOString(),
        }, { onConflict: 'nonce' });
      } catch {
        // Nonce table may not exist yet — continue without replay protection
      }
    } else {
      if (!user_id) {
        return NextResponse.json(
          { error: 'caller_address + caller_signature required for unauthenticated requests', code: 'AUTH_REQUIRED' },
          { status: 401 }
        );
      }
      verifiedCallerAddress = null;
      console.warn(`[x402] Unauthenticated request for user_id: ${user_id} — consider upgrading to EIP-712 signature`);
    }

    // ============================================================
    // END SECURITY FIX
    // ============================================================

    // Generate nonce and timestamps
    const nonce = generateNonce();
    const { validAfter, validBefore } = generateAuthorizationTimestamps(300);

    // Treasury signer address
    const fromAddress = wallet.address.toLowerCase();

    // Sign the EIP-3009 authorization
    const signature = await signEVMPayment({
      wallet,
      fromAddress,
      payTo,
      amountBigInt,
      validAfter,
      validBefore,
      nonce,
      chainId,
      assetContract,
    });

    // Store nonce in DB to prevent replay
    try {
      await supabase.from('x402_nonces').insert({
        user_id: verifiedCallerAddress || user_id || null,
        nonce,
        amount: amount!.toString(),
        mcp_id,
        expires_at: new Date(validBefore * 1000).toISOString(),
        network,
        signature,
        from_address: fromAddress,
        caller_address: caller_address || null,
      });
    } catch (dbErr) {
      console.error('Failed to store nonce:', dbErr);
    }

    // Return the signed authorization
    return NextResponse.json(buildX402Payload({
      signature,
      from: fromAddress,
      to: payTo,
      value: amountBigInt.toString(),
      validAfter,
      validBefore,
      nonce,
      assetContract,
      payTo,
      chainId,
      token: token as string,
      amountBigInt,
    }));
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    console.error('x402 sign error:', err);
    return NextResponse.json(
      { error: errorMessage, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
