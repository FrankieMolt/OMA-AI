import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { apiListings, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: 'Base URL not configured' }, { status: 500 });
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'User email not available' }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
    });

    const { listingId, credits } = await request.json();
    const listingIdValue = Number(listingId);
    const creditsValue = Number(credits);

    if (
      !Number.isFinite(listingIdValue) ||
      !Number.isInteger(listingIdValue) ||
      !Number.isFinite(creditsValue) ||
      !Number.isInteger(creditsValue) ||
      creditsValue <= 0
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get listing details
    const [listing] = await db
      .select()
      .from(apiListings)
      .where(eq(apiListings.id, listingIdValue))
      .limit(1);

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Get user details
    const [user] = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate price (assuming $0.01 per credit for demo)
    const amount = creditsValue * 100;

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${listing.title} - ${creditsValue} Credits`,
              description: `Purchase ${creditsValue} credits for ${listing.title}`,
            },
            unit_amount: Math.round(amount / creditsValue),
          },
          quantity: creditsValue,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/marketplace/${listing.slug}`,
      metadata: {
        userId: user.id.toString(),
        listingId: listingIdValue.toString(),
        credits: creditsValue.toString(),
      },
    });

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
