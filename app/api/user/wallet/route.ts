import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';

// GET /api/user/wallet - List wallets
export async function GET(request: NextRequest) {
  // Demo Data
  if (!isSupabaseEnabled) {
    return NextResponse.json({
      wallets: [
        {
          id: 'w1',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          network: 'base',
          is_primary: true,
          label: 'Main Wallet'
        }
      ]
    });
  }
  
  // TODO: Real DB Fetch
  return NextResponse.json({ wallets: [] });
}

// POST /api/user/wallet - Add wallet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, signature, message } = body;

    // 1. Verify Signature (Crucial for security)
    // const recoveredAddress = verifyMessage(message, signature);
    // if (recoveredAddress !== address) throw new Error('Invalid signature');

    // 2. Add to DB
    
    return NextResponse.json({ success: true, message: 'Wallet added' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add wallet' }, { status: 500 });
  }
}

// DELETE /api/user/wallet - Remove wallet
export async function DELETE(request: NextRequest) {
    // Logic to remove wallet
    return NextResponse.json({ success: true });
}
