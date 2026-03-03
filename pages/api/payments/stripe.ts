import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
});

/**
 * OMA-AI Stripe Payment Integration
 * 
 * Handles:
 * - Subscription creation
 * - One-time token purchases
 * - Webhook handling
 */

// Pricing plans
const PLANS = {
  starter: {
    name: 'Starter',
    price: 2900, // $29/month
    tokens: 1000000, // 1M tokens
    stripe_price_id: process.env.STRIPE_PRICE_STARTER || 'price_starter_monthly'
  },
  pro: {
    name: 'Pro',
    price: 9900, // $99/month
    tokens: 10000000, // 10M tokens
    stripe_price_id: process.env.STRIPE_PRICE_PRO || 'price_pro_monthly'
  },
  enterprise: {
    name: 'Enterprise',
    price: 29900, // $299/month
    tokens: 100000000, // 100M tokens
    stripe_price_id: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise_monthly'
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Webhook handler
  if (req.method === 'POST' && req.headers['stripe-signature']) {
    return handleWebhook(req, res);
  }

  // Create checkout session
  if (req.method === 'POST') {
    return createCheckoutSession(req, res);
  }

  // Get subscription status
  if (req.method === 'GET') {
    return getSubscriptionStatus(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function createCheckoutSession(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { plan, user_id, success_url, cancel_url } = req.body;

    if (!plan || !user_id) {
      return res.status(400).json({ 
        error: 'Plan and user_id required' 
      });
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];
    
    if (!selectedPlan) {
      return res.status(400).json({ 
        error: 'Invalid plan',
        available_plans: Object.keys(PLANS)
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: req.body.email,
      line_items: [
        {
          price: selectedPlan.stripe_price_id,
          quantity: 1
        }
      ],
      success_url: success_url || 'https://oma-ai.com/dashboard?success=true',
      cancel_url: cancel_url || 'https://oma-ai.com/pricing?canceled=true',
      metadata: {
        user_id,
        plan,
        tokens_included: selectedPlan.tokens.toString()
      }
    });

    return res.status(200).json({
      success: true,
      checkout_url: session.url,
      session_id: session.id
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleWebhook(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    const body = req.body;
    event = stripe.webhooks.constructEvent(
      JSON.stringify(body),
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const { user_id, plan, tokens_included } = session.metadata!;

      // Update user tier in Supabase
      // (This would call your internal API or directly update Supabase)
      console.log('Payment successful:', { user_id, plan, tokens_included });

      // TODO: Call upgradeTier function
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription cancelled:', subscription.id);
      // Downgrade user to free tier
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment failed:', invoice.id);
      // Notify user, maybe suspend account
      break;
    }
  }

  return res.status(200).json({ received: true });
}

async function getSubscriptionStatus(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { customer_id } = req.query;

    if (!customer_id) {
      return res.status(400).json({ error: 'customer_id required' });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer_id as string,
      status: 'active'
    });

    return res.status(200).json({
      success: true,
      subscriptions: subscriptions.data.map(sub => ({
        id: sub.id,
        status: sub.status,
        current_period_end: sub.current_period_end,
        plan: sub.items.data[0]?.price.nickname || 'Unknown'
      }))
    });

  } catch (error) {
    console.error('Subscription status error:', error);
    return res.status(500).json({ 
      error: 'Failed to get subscription status' 
    });
  }
}

export { PLANS };
