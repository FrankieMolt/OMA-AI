import { NextResponse } from 'next/server';
import { supabase, supabaseService } from '@/lib/supabase/client';

// Helper: extract and verify authenticated user from Bearer token
async function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.slice(7);
  try {
    // @ts-ignore
    const { data: { user }, error } = await supabaseService.auth.getUser(token);
    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://www.oma-ai.com';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      const response = NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
      response.headers.set('Access-Control-Allow-Origin', FRONTEND_URL);
      return response;
    }

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, credits_balance')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get all user's wallets
    const { data: wallets, error: walletError } = await supabase
      .from('user_wallets')
      .select('*')
      .eq('user_id', userId);

    if (walletError) {
      console.error('[Balance API] Error fetching wallets:', walletError);
    }

    // Calculate wallet balances
    const walletBalances = wallets?.map(w => ({
      chain: w.chain,
      address: w.address,
      isDefault: w.is_default,
      balance: w.balance || 0
    })) || [];

    // Calculate total balance (USDC equivalent)
    const totalBalance = (user.credits_balance || 0) + 
      walletBalances.reduce((sum, w) => sum + w.balance, 0);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email
      },
      balance: {
        credits: user.credits_balance || 0,
        wallets: walletBalances,
        totalUsdc: totalBalance
      },
      transactionLimit: 10000, // Default transaction limit
      creditLimit: 1000 // Default credit limit
    }, { status: 200 });

  } catch (error) {
    console.error('[Balance API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}

// Update balance (for authenticated users - self or admin)
export async function POST(request: Request) {
  try {
    // Auth check: require valid Bearer token
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { error: 'Unauthorized - valid session required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { userId, amount, type, description } = body;

    // Validate input
    if (!userId || amount === undefined || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, amount, type' },
        { status: 400 }
      );
    }

    if (!['credit', 'debit'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "credit" or "debit"' },
        { status: 400 }
      );
    }

    // Get current balance
    const { data: user, error: fetchError } = await supabaseService
      .from('users')
      .select('credits_balance')
      .eq('id', userId)
      .single();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const currentBalance = user.credits_balance || 0;
    const adjustment = type === 'credit' ? amount : -amount;
    const newBalance = currentBalance + adjustment;

    // Check if debit would result in negative balance
    if (type === 'debit' && newBalance < 0) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Update balance
    const { error: updateError } = await supabaseService
      .from('users')
      .update({ 
        credits_balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('[Balance API] Error updating balance:', updateError);
      return NextResponse.json(
        { error: 'Failed to update balance' },
        { status: 500 }
      );
    }

    // Log transaction
    const { error: logError } = await supabaseService
      .from('transactions')
      .insert({
        user_id: userId,
        amount,
        type,
        description: description || 'Balance adjustment',
        balance_before: currentBalance,
        balance_after: newBalance,
        created_at: new Date().toISOString()
      });

    if (logError) {
      console.error('[Balance API] Error logging transaction:', logError);
    }

    return NextResponse.json({
      success: true,
      balance: {
        credits: newBalance,
        previous: currentBalance,
        adjustment
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[Balance API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update balance' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
