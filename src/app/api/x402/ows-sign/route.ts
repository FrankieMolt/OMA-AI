/**
 * OWS-Native x402 Payment Signing Endpoint
 *
 * Uses Open Wallet Standard for local, policy-gated signing.
 * Keys encrypted at rest, decrypted only in signing path, wiped after use.
 * Never exposes raw private keys.
 *
 * Falls back to /api/x402/sign if OWS is not configured.
 */

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { isOWSConfigured, getOWSEVMAddress, signEVMPaymentWithOWS } from '@/lib/x402/services/ows-evm';
import { buildX402Payload } from '@/lib/x402/services/payment';
import { USDC_CONTRACTS, CHAIN_IDS } from '@/lib/x402/services/evm';

export const dynamic = 'force-dynamic';

/**
 * GET: Health check — reports OWS wallet status
 */
export async function GET() {
  if (!isOWSConfigured()) {
    return NextResponse.json({
      ows: false,
      status: 'OWS wallet "oma-treasury" not found — run `ows wallet create --name oma-treasury`',
      docs: 'https://docs.openwallet.sh',
    });
  }

  const address = getOWSEVMAddress();
  return NextResponse.json({
    ows: true,
    wallet: 'oma-treasury',
    address,
    network: 'base',
    chainId: 8453,
    usdcAddress: USDC_CONTRACTS.base,
    message: 'OWS treasury wallet ready for x402 signing',
  });
}

/**
 * POST: Sign x402 payment using OWS
 *
 * Body: {
 *   amount: string       — amount in micro-USDC
 *   mcp_id: string       — MCP server ID
 *   network?: string     — network name (default: base)
 *   pay_to?: string      — recipient address (default: OMA_AI_PAYMENT_WALLET env)
 *   caller_address?: string
 *   caller_signature?: string
 * }
 */
export async function POST(request: NextRequest) {
  // Verify OWS is configured
  if (!isOWSConfigured()) {
    return NextResponse.json(
      {
        error: 'OWS not configured',
        code: 'OWS_NOT_CONFIGURED',
        hint: 'Run: ows wallet create --name oma-treasury',
        docs: 'https://docs.openwallet.sh',
      },
      { status: 503 }
    );
  }

  try {
    // Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON', code: 'INVALID_JSON' }, { status: 400 });
    }

    const {
      amount,
      mcp_id,
      network = 'base',
      pay_to,
      caller_address,
      caller_signature,
    } = body as Record<string, unknown>;

    if (!amount || !mcp_id) {
      return NextResponse.json(
        { error: 'Missing required: amount, mcp_id', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    // Get chain details
    const chainId = CHAIN_IDS[network as string];
    if (!chainId) {
      return NextResponse.json(
        { error: `Unsupported network: ${network}`, code: 'UNSUPPORTED_NETWORK' },
        { status: 400 }
      );
    }

    const assetContract = USDC_CONTRACTS[network as keyof typeof USDC_CONTRACTS];
    if (!assetContract) {
      return NextResponse.json(
        { error: `No USDC contract for network: ${network}`, code: 'UNSUPPORTED_NETWORK' },
        { status: 400 }
      );
    }

    // Get OWS treasury address
    const fromAddress = getOWSEVMAddress();
    if (!fromAddress) {
      return NextResponse.json(
        { error: 'Could not derive OWS wallet address', code: 'ADDRESS_ERROR' },
        { status: 500 }
      );
    }

    // Determine recipient
    const payTo = (pay_to as string) || process.env.OMA_AI_PAYMENT_WALLET || process.env.NEXT_PUBLIC_WALLET_ADDRESS;
    if (!payTo) {
      return NextResponse.json(
        { error: 'No payTo address — set OMA_AI_PAYMENT_WALLET or NEXT_PUBLIC_WALLET_ADDRESS',
          code: 'PAYTO_NOT_SET' },
        { status: 500 }
      );
    }

    // Validate amount
    let amountBigInt: bigint;
    try {
      amountBigInt = BigInt(amount as string);
    } catch {
      return NextResponse.json({ error: 'Invalid amount', code: 'INVALID_AMOUNT' }, { status: 400 });
    }

    if (amountBigInt <= BigInt(0)) {
      return NextResponse.json({ error: 'Amount must be positive', code: 'INVALID_AMOUNT' }, { status: 400 });
    }

    // Generate nonce and timestamps
    const nonce = '0x' + randomBytes(32).toString('hex');
    const now = Math.floor(Date.now() / 1000);
    const validAfter = now;
    const validBefore = now + 300; // 5-minute window

    // Sign with OWS (policy-gated, memory-hardened)
    const signature = await signEVMPaymentWithOWS({
      fromAddress,
      payTo,
      amountBigInt,
      validAfter,
      validBefore,
      nonce,
      chainId,
      assetContract,
    });

    // Build response payload
    const payload = buildX402Payload({
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
      token: 'USDC',
      amountBigInt,
    });

    return NextResponse.json(payload);

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[x402/ows-sign] Error:', err);
    return NextResponse.json(
      { error: msg, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
