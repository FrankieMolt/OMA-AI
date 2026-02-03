import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, transactions } from '@/lib/db/schema';
import { solanaService } from '@/lib/solana';
import { TREASURY_WALLET_ADDRESS } from '@/lib/constants';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { signature, listingId, amount, buyerAddress } = body;

    if (!signature || !amount || !buyerAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: signature, amount, buyerAddress' },
        { status: 400 }
      );
    }

    // 1. Verify Transaction on Chain
    const verification = await solanaService.verifyPaymentTransaction(
      signature,
      TREASURY_WALLET_ADDRESS,
      amount.toString()
    );

    if (!verification.valid) {
      console.error('Payment verification failed:', verification.error);
      return NextResponse.json(
        { error: 'Payment verification failed', details: verification.error },
        { status: 400 }
      );
    }

    // 2. Resolve User (In a real app, from session. Here: Default Admin/User)
    let userId = 0;

    // Try to find user by wallet
    const userByWallet = await db
      .select()
      .from(users)
      .where(eq(users.solanaWalletAddress, buyerAddress))
      .limit(1);

    if (userByWallet.length > 0) {
      userId = userByWallet[0].id;
    } else {
      // Fallback: Get first user (Admin)
      const userResults = await db.select().from(users).limit(1);
      if (userResults.length > 0) {
        userId = userResults[0].id;
      } else {
        // Create default user if DB is empty
        try {
          const newUser = await db
            .insert(users)
            .values({
              email: 'admin@oma.ai',
              name: 'OMA Admin',
              password: 'hashed_password_placeholder',
              role: 'admin',
              solanaWalletAddress: buyerAddress,
            })
            .returning();
          userId = newUser[0].id;
        } catch (e) {
          console.warn('Failed to create default user, using ID 1', e);
          userId = 1;
        }
      }
    }

    // 3. Persist Transaction
    await db.insert(transactions).values({
      userId,
      type: 'purchase',
      amount: amount.toString(),
      description: `Purchase of listing ${listingId || 'unknown'}`,
      solanaTxId: signature,
      status: 'confirmed',
    });

    // 4. Success Response
    return NextResponse.json({
      success: true,
      txId: signature,
      verifiedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Purchase Verification Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Server Error', message: errorMessage },
      { status: 500 }
    );
  }
}
