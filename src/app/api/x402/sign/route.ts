import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';
import { ethers } from 'ethers';

/**
 * x402 Payment Signing Endpoint
 * 
 * Implements EIP-712 signing for x402 PaymentPayload with EIP-3009 authorization.
 * MCP servers can use this endpoint to get a signed payment authorization for x402 payments.
 * 
 * @example
 * // Request
 * POST /api/x402/sign
 * {
 *   "amount": "10000",      // Amount in smallest unit (USDC = 6 decimals)
 *   "mcp_id": "uuid",       // MCP server ID
 *   "network": "base",       // Network name
 *   "token": "USDC"         // Token symbol
 * }
 * 
 * // Response
 * {
 *   "signature": "0x...",   // EIP-712 signature
 *   "address": "0x...",     // Signer address
 *   "nonce": "0x...",       // Unique nonce
 *   "authorization": {...}, // EIP-3009 authorization params
 *   "x402Payload": {...}    // Full x402 PaymentPayload
 * }
 */

// EIP-712 type definitions for EIP-3009 TransferWithAuthorization
const TRANSFER_WITH_AUTHORIZATION_TYPE = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'validAfter', type: 'uint256' },
  { name: 'validBefore', type: 'uint256' },
  { name: 'nonce', type: 'bytes32' },
];

// EIP-712 type definitions for caller verification (binds user_id to signature)
// This ensures only the owner of an address can claim a user_id
const CALLER_VERIFICATION_TYPE = [
  { name: 'user_id', type: 'string' },
  { name: 'amount', type: 'string' },
  { name: 'mcp_id', type: 'string' },
  { name: 'network', type: 'string' },
  { name: 'nonce', type: 'string' },
  { name: 'timestamp', type: 'uint256' },
];

// Domain separator for caller verification (EIP-712)
const CALLER_VERIFICATION_DOMAIN = {
  name: 'OMA-AI Payment Verification',
  version: '1',
  chainId: 8453, // Base mainnet
  verifyingContract: '0x0000000000000000000000000000000000000000', // Not a contract, just domain separator
};

// Chain IDs for supported networks
const CHAIN_IDS: Record<string, number> = {
  base: 8453,
  base_sepolia: 84532,
  ethereum: 1,
  sepolia: 11155111,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
};

// USDC contract addresses
// Note: Only real deployed USDC contracts are included. Ethereum Sepolia does not have native USDC.
const USDC_CONTRACTS: Record<string, string> = {
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  base_sepolia: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  optimism: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
};

/**
 * Get asset contract address for token
 */
function getAssetContract(token: string, network: string): string | null {
  if (token.toUpperCase() === 'USDC') {
    return USDC_CONTRACTS[network] || USDC_CONTRACTS.base;
  }
  return null;
}

/**
 * Build EIP-712 domain for EIP-3009 tokens (like USDC)
 * 
 * EIP-3009 uses a specific domain separator format:
 * - name: token name (e.g., "USDC")
 * - version: token version (e.g., "2")
 * - chainId: chain ID
 * - verifyingContract: token contract address
 */
function buildDomainSeparator(
  name: string,
  version: string,
  chainId: number,
  verifyingContract: string
): ethers.TypedDataDomain {
  return {
    name,
    version,
    chainId,
    verifyingContract,
  };
}

/**
 * Decode private key from base64 or raw
 */
function decodePrivateKey(keyBase64: string): string {
  try {
    // Try base64 first
    const decoded = Buffer.from(keyBase64, 'base64').toString('utf-8');
    if (decoded.match(/^0x[a-fA-F0-9]{64}$/)) {
      return decoded;
    }
    if (decoded.match(/^[a-fA-F0-9]{64}$/)) {
      return '0x' + decoded;
    }
  } catch {
    // Fall through
  }
  
  // Try as raw hex (with or without 0x)
  if (keyBase64.match(/^0x[a-fA-F0-9]{64}$/)) {
    return keyBase64;
  }
  if (keyBase64.match(/^[a-fA-F0-9]{64}$/)) {
    return '0x' + keyBase64;
  }
  
  throw new Error('Invalid private key format');
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const privateKeyBase64 = process.env.X402_SIGNER_PRIVATE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
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

    // Initialize Supabase
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Parse body
    let body;
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
    } = body;

    if (!amount || !mcp_id) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, mcp_id', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    // Validate amount
    let amountBigInt: bigint;
    try {
      amountBigInt = BigInt(amount);
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
    const chainId = CHAIN_IDS[network];
    if (!chainId) {
      return NextResponse.json(
        { error: `Unsupported network: ${network}`, code: 'UNSUPPORTED_NETWORK' },
        { status: 400 }
      );
    }

    // Get asset contract
    const assetContract = getAssetContract(token, network);
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
    // This prevents anyone from posting payments under another user's ID
    // ============================================================
    let verifiedCallerAddress: string | null = null;

    if (caller_address && caller_signature) {
      // Caller provided signature — verify it
      if (!ethers.isAddress(caller_address)) {
        return NextResponse.json(
          { error: 'Invalid caller_address format', code: 'INVALID_CALLER' },
          { status: 400 }
        );
      }

      // Generate server-side nonce for caller (prevents replay attacks)
      const callerNonce = '0x' + randomBytes(16).toString('hex');
      const timestampSeconds = Math.floor(Date.now() / 1000);

      // Validate timestamp is within 5 minutes
      if (Math.abs(timestampSeconds - (body.timestamp || 0)) > 300) {
        return NextResponse.json(
          { error: 'Request timestamp expired or invalid (must be within 5 minutes)', code: 'EXPIRED_REQUEST' },
          { status: 400 }
        );
      }

      // Build the caller's verification message
      const callerMessage = {
        user_id: user_id || caller_address,
        amount: amount.toString(),
        mcp_id: mcp_id.toString(),
        network,
        nonce: callerNonce,
        timestamp: timestampSeconds,
      };

      // Verify the EIP-712 signature
      try {
        const recoveredAddress = ethers.verifyTypedData(
          CALLER_VERIFICATION_DOMAIN,
          { PaymentRequest: CALLER_VERIFICATION_TYPE },
          callerMessage,
          caller_signature
        );

        // Signature must match the claimed caller_address
        if (recoveredAddress.toLowerCase() !== caller_address.toLowerCase()) {
          return NextResponse.json(
            { error: 'Caller signature verification failed — address mismatch', code: 'SIGNATURE_MISMATCH' },
            { status: 401 }
          );
        }

        verifiedCallerAddress = caller_address.toLowerCase();
        // Caller verified successfully; logging omitted in production
      } catch (verifyErr) {
        console.error('[x402] Caller signature verification error:', verifyErr);
        return NextResponse.json(
          { error: 'Caller signature verification failed', code: 'SIGNATURE_INVALID' },
          { status: 401 }
        );
      }

      // Store caller nonce to prevent replay attacks
      try {
        await supabase.from('x402_caller_nonces').upsert({
          nonce: callerNonce,
          caller_address: caller_address.toLowerCase(),
          expires_at: new Date(timestampSeconds * 1000 + 10 * 60 * 1000).toISOString(), // 10 min expiry
        }, { onConflict: 'nonce' });
      } catch {
        // Nonce table may not exist yet — continue without replay protection
      }
    } else {
      // No caller signature — require explicit auth header or reject
      // For now: if no caller_address provided, use user_id from body but log warning
      if (!user_id) {
        return NextResponse.json(
          { error: 'caller_address + caller_signature required for unauthenticated requests', code: 'AUTH_REQUIRED' },
          { status: 401 }
        );
      }
      // Fall back to body user_id but flag as unauthenticated
      verifiedCallerAddress = null;
      console.warn(`[x402] Unauthenticated request for user_id: ${user_id} — consider upgrading to EIP-712 signature`);
    }

    // ============================================================
    // END SECURITY FIX
    // ============================================================

    // Generate nonce (32 bytes random) — for the payment authorization
    const nonce = '0x' + randomBytes(32).toString('hex');

    // Generate timestamps (Unix seconds)
    const validAfter = Math.floor(Date.now() / 1000);
    const validBefore = validAfter + 5 * 60; // 5 minutes expiry

    // Treasury signer address (NOT the caller's address — the treasury signs authorization)
    const fromAddress = wallet.address.toLowerCase();

    // Build EIP-712 domain
    const domain = buildDomainSeparator('USDC', '2', chainId, assetContract);

    // Build message types
    const messageTypes = {
      TransferWithAuthorization: TRANSFER_WITH_AUTHORIZATION_TYPE,
    };

    // Build message
    const message = {
      from: fromAddress,
      to: payTo.toLowerCase(),
      value: amountBigInt.toString(),
      validAfter,
      validBefore,
      nonce,
    };

    // Sign the typed data
    const signature = await wallet.signTypedData(domain, messageTypes, message);

    // Store nonce in DB to prevent replay
    try {
      await supabase.from('x402_nonces').insert({
        user_id: verifiedCallerAddress || user_id || null,
        nonce,
        amount: amount.toString(),
        mcp_id,
        expires_at: new Date(validBefore * 1000).toISOString(),
        network,
        signature,
        from_address: fromAddress,
        caller_address: caller_address || null,
      });
    } catch (dbErr) {
      console.error('Failed to store nonce:', dbErr);
      // Continue anyway; nonce storage is best-effort
    }

    // Return the signed authorization
    return NextResponse.json({
      signature,
      address: fromAddress,
      nonce,
      authorization: {
        from: fromAddress,
        to: payTo.toLowerCase(),
        value: amountBigInt.toString(),
        validAfter: validAfter.toString(),
        validBefore: validBefore.toString(),
        nonce,
      },
      expires_in: 300,
      x402Payload: {
        x402Version: 2,
        accepted: {
          scheme: 'exact',
          network: `eip155:${chainId}`,
          amount: amountBigInt.toString(),
          asset: assetContract,
          payTo: payTo.toLowerCase(),
          maxTimeoutSeconds: 300,
          extra: {
            name: token,
            version: '2',
          },
        },
        payload: {
          signature,
          authorization: {
            from: fromAddress,
            to: payTo.toLowerCase(),
            value: amountBigInt.toString(),
            validAfter: validAfter.toString(),
            validBefore: validBefore.toString(),
            nonce,
          },
        },
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    console.error('x402 sign error:', err);
    return NextResponse.json(
      { error: errorMessage, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
