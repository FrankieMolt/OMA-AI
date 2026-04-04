import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Placeholder: Implement actual transaction fetching from database
    // This is a stub - integrate with your transaction storage system
    const transactions: any[] = [];

    return NextResponse.json({
      success: true,
      data: transactions.slice(offset, offset + limit),
      pagination: {
        total: transactions.length,
        limit,
        offset,
        hasMore: offset + limit < transactions.length
      }
    });
  } catch (error) {
    console.error('Transactions list API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions', success: false },
      { status: 500 }
    );
  }
}
