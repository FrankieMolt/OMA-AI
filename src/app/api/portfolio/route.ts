import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    const response = NextResponse.json(
      { success: false, error: "Connect wallet to view portfolio", walletRequired: true },
      { status: 400 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }

  const response = NextResponse.json({
    success: true,
    data: {
      wallet: {
        walletAddress: wallet,
        balanceUsdc: 0,
        totalEarned: 0,
        totalSpent: 0,
        netProfit: 0,
        totalTransactions: 0
      },
      transactions: [],
      timestamp: Date.now()
    },
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'no-cache');
  return response;
}
