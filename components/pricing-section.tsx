'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Crown, 
  Building2, 
  Check, 
  Sparkles,
  ArrowRight,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out',
    icon: Sparkles,
    tokens: '100K',
    requests: '1K',
    features: [
      '100K tokens/month',
      '1K API requests',
      'Budget models',
      'Community support',
      '5 RPM rate limit'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'For hobbyists & small projects',
    icon: Zap,
    tokens: '1M',
    requests: '10K',
    features: [
      '1M tokens/month',
      '10K API requests',
      'All budget models',
      'Email support',
      '20 RPM rate limit',
      'Priority queue'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    description: 'For professionals & teams',
    icon: Crown,
    tokens: '10M',
    requests: '100K',
    features: [
      '10M tokens/month',
      '100K API requests',
      'All models + premium',
      'Priority support',
      '60 RPM rate limit',
      'Priority queue',
      'Custom fine-tuning',
      'Webhooks'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    description: 'For large-scale applications',
    icon: Building2,
    tokens: '100M',
    requests: '1M',
    features: [
      '100M tokens/month',
      '1M API requests',
      'Unlimited all models',
      '24/7 phone support',
      '200 RPM rate limit',
      'Highest priority',
      'Custom models',
      'Dedicated infrastructure',
      'SLA guarantee',
      'Custom integrations'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'free') {
      // Redirect to signup
      window.location.href = '/api/auth/signup';
      return;
    }

    if (planId === 'enterprise') {
      // Open contact form
      window.location.href = 'mailto:sales@oma-ai.com';
      return;
    }

    // For paid plans, initiate Stripe checkout
    setIsConnecting(true);
    try {
      const response = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planId,
          billing_period: billingPeriod
        })
      });
      
      const { checkout_url } = await response.json();
      if (checkout_url) {
        window.location.href = checkout_url;
      }
    } catch (error) {
      console.error('Failed to start checkout:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Start free, scale as you grow. No hidden fees.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={cn(
              "text-sm",
              billingPeriod === 'monthly' ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(p => p === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-primary/20 rounded-full transition-colors"
            >
              <motion.div
                animate={{ x: billingPeriod === 'yearly' ? 28 : 4 }}
                className="absolute top-1 w-5 h-5 bg-primary rounded-full"
              />
            </button>
            <span className={cn(
              "text-sm",
              billingPeriod === 'yearly' ? "text-foreground" : "text-muted-foreground"
            )}>
              Yearly <span className="text-green-500">(Save 20%)</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl border p-6 transition-all",
                plan.popular 
                  ? "border-primary bg-gradient-to-b from-primary/10 to-transparent scale-105" 
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  plan.popular ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  <plan.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    ${billingPeriod === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}
                  </span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{plan.tokens} tokens</span>
                  <span>{plan.requests} requests</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isConnecting}
                className={cn(
                  "w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {plan.price === 0 ? (
                  <>
                    <Wallet className="w-4 h-4" />
                    {plan.cta}
                  </>
                ) : (
                  <>
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* X402 Micropayments Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Pay Per Request with X402
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Don't want a subscription? Use X402 micropayments to pay per API call with USDC on Base or Solana. 
                Perfect for occasional usage or testing.
              </p>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No commitment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Pay only what you use</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant settlement</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground">
            Need more? <a href="mailto:sales@oma-ai.com" className="text-primary hover:underline">Contact us</a> for custom enterprise solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
