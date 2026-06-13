import { NextRequest, NextResponse } from 'next/server';
import { getUserCredentials, getUserCredentialCount } from '@/lib/db/sqlite';

export const dynamic = 'force-dynamic';

function getWalletFromRequest(request: NextRequest): string | null {
  return request.headers.get('x-wallet-address') || null;
}

export async function GET(request: NextRequest) {
  try {
    const wallet = getWalletFromRequest(request);
    if (!wallet) {
      return NextResponse.json({ error: 'Missing X-Wallet-Address header' }, { status: 401 });
    }

    const credentials = getUserCredentials(wallet);
    return NextResponse.json({
      success: true,
      credentials,
      count: credentials.length,
    });
  } catch (error) {
    console.error('Credentials list error:', error);
    return NextResponse.json({ error: 'Failed to fetch credentials' }, { status: 500 });
  }
}
