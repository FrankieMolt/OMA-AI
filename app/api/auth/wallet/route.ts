import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, createRateLimitResponse, addSecurityHeaders, isValidWalletAddress } from '@/lib/security';
import { verifyMessage } from 'viem';

// POST /api/auth/wallet - Connect x402 wallet
export async function POST(request: NextRequest) {
  // Rate limiting: 10 attempts per 15 minutes
  const rateLimitResult = await checkRateLimit(request, 10, 15 * 60 * 1000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.resetTime!);
  }

  try {
    const body = await request.json();
    const { action, walletAddress, signature, message } = body;

    if (action === 'connect') {
      // Step 1: Request wallet connection
      const nonce = `oma-ai-${Date.now()}`;
      const challengeMessage = `Sign this message to connect to OMA-AI: ${nonce}`;

      return NextResponse.json({
        success: true,
        message: 'Challenge generated',
        nonce,
        challenge: challengeMessage
      });
    }

    if (action === 'verify') {
      // Step 2: Verify signature
      if (!walletAddress || !signature || !message) {
        return NextResponse.json(
          { error: 'Missing wallet address, signature, or message' },
          { status: 400 }
        );
      }

      // Validate wallet address format (Ethereum/Base)
      if (!isValidWalletAddress(walletAddress)) {
        return NextResponse.json(
          { error: 'Invalid wallet address format' },
          { status: 400 }
        );
      }

      // Verify signature using viem
      let isValid = false;
      try {
        isValid = await verifyMessage({
          address: walletAddress as `0x${string}`,
          message,
          signature: signature as `0x${string}`
        });
      } catch (err) {
        console.error('Signature verification failed:', err);
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }

      if (!isValid) {
        return NextResponse.json(
          { error: 'Signature verification failed' },
          { status: 401 }
        );
      }

      // Check if message contains expected challenge (prevent replay attacks)
      if (!message.includes('oma-ai') && !message.includes('OMA-AI')) {
        return NextResponse.json(
          { error: 'Invalid message format' },
          { status: 400 }
        );
      }

      // Get or create user profile
      // Note: In production, you would query your database here
      const demoUser = {
        id: `user-${walletAddress.slice(0, 8)}`,
        email: null,
        fullName: `User ${walletAddress.slice(0, 6)}`,
        username: `user_${walletAddress.slice(0, 6)}`,
        role: 'user',
        wallet: walletAddress
      };

      const response = NextResponse.json({
        success: true,
        message: 'Wallet connected successfully',
        token: `WALLET-AUTH-${Date.now()}`, // Use production JWT in real implementation
        user: demoUser
      });
      return addSecurityHeaders(response);
    }

    if (action === 'disconnect') {
      return NextResponse.json({
        success: true,
        message: 'Wallet disconnected'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Wallet auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/auth/wallet - Get wallet connection status
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        connected: false
      });
    }

    const token = authHeader.substring(7);

    // TODO: Validate token and get wallet info
    // For now, return demo status

    return NextResponse.json({
      connected: true,
      wallet: '0x1234567890abcdef1234567890abcdef12345678',
      network: 'base'
    });

  } catch (error) {
    console.error('Wallet status error:', error);
    return NextResponse.json(
      { connected: false },
      { status: 500 }
    );
  }
}
