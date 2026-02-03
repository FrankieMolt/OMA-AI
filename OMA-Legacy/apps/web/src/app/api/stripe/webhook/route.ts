import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { users, transactions } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!stripeSecretKey || !endpointSecret) {
      return NextResponse.json({ error: 'Stripe webhook not configured' }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
    });

    const body = await request.text();
    const sig = (await headers()).get('stripe-signature');
    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`Webhook signature verification failed.`, errorMessage);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        // Get metadata from session
        const userId = session.metadata?.userId;
        const listingId = session.metadata?.listingId;
        const creditsRaw = session.metadata?.credits;
        const userIdValue = Number(userId);
        const listingIdValue = listingId ? Number(listingId) : null;
        const credits = Number(creditsRaw);

        if (Number.isFinite(userIdValue) && Number.isFinite(credits) && credits > 0) {
          // Add credits to user account
          await db
            .update(users)
            .set({
              credits: sql`${users.credits} + ${credits}`,
              updatedAt: new Date(),
            })
            .where(eq(users.id, userIdValue));

          // Record transaction
          await db.insert(transactions).values({
            userId: userIdValue,
            apiId: Number.isFinite(listingIdValue) ? listingIdValue : null,
            type: 'credit_purchase',
            amount: credits,
            description: `Purchased ${credits} credits`,
            metadata: {
              stripeSessionId: session.id,
              listingId: listingId ?? null,
            },
          });
        }
        break;

      default:
        console.warn(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
