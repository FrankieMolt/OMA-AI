import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/wallet - Connect x402 wallet
export async function POST(request: NextRequest) {
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
      const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!ethAddressRegex.test(walletAddress)) {
        return NextResponse.json(
          { error: 'Invalid wallet address format' },
          { status: 400 }
        );
      }

      // TODO: Implement real signature verification
      // 1. Verify signature using ethers.js or viem
      // 2. Check if wallet address matches signature
      // 3. Get or create user profile
      // 4. Return token and user data

      // Demo mode: Accept any valid address
      const demoUser = {
        id: `user-${walletAddress.slice(0, 8)}`,
        email: null,
        fullName: `User ${walletAddress.slice(0, 6)}`,
        username: `user_${walletAddress.slice(0, 6)}`,
        role: 'user',
        wallet: walletAddress
      };

      return NextResponse.json({
        success: true,
        message: 'Wallet connected successfully',
        token: `wallet-token-${Date.now()}`,
        user: demoUser
      });
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
