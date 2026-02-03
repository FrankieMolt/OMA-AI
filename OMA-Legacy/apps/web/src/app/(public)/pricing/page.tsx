import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: 'Free',
      priceUSD: 0,
      description: 'Perfect for testing and small projects',
      features: [
        '100 API calls/month',
        '1 MCP server listing',
        'Basic support',
        'Community access',
      ],
    },
    {
      name: 'Developer',
      price: '$5/mo',
      priceUSD: 5,
      description: 'For active developers and growing teams',
      features: [
        '5,000 API calls/month',
        '10 MCP server listings',
        'Priority support (24hr)',
        'Advanced analytics',
        'API rate limits: 1000/min',
      ],
    },
    {
      name: 'Professional',
      price: '$25/mo',
      priceUSD: 25,
      description: 'For production workloads and scaling applications',
      features: [
        '50,000 API calls/month',
        'Unlimited MCP server listings',
        '24/7 support',
        'Advanced analytics + exports',
        'API rate limits: 10,000/min',
        'Custom integrations',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceUSD: 0,
      description: 'For large-scale operations with custom needs',
      features: [
        'Unlimited everything',
        'Dedicated support',
        'Custom SLA',
        'White-label deployment',
        'On-premise or private cloud',
        'Revenue share: 95%',
      ],
      isEnterprise: true,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl">
      <Link
        href="/docs"
        className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
      >
        ← Back to Documentation
      </Link>

      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">
          Pricing
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pay only for what you use. 1000 credits = $1 USD. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        {tiers.map((tier, i) => (
          <Card
            key={i}
            className={`relative overflow-hidden glass-card border-border/60 ${tier.isEnterprise ? 'lg:col-span-4 border-primary/30 shadow-neon' : ''}`}
          >
            {!tier.isEnterprise && (
              <div className="absolute top-0 right-0 p-2 bg-primary text-primary-foreground font-bold text-sm">
                {tier.price}
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
              {!tier.isEnterprise && (
                <div className="text-3xl font-bold text-primary">{tier.price}</div>
              )}
              <p className="text-muted-foreground text-sm">{tier.description}</p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {!tier.isEnterprise && (
                <div className="pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground/80">Starting at</p>
                      <p className="text-2xl font-bold text-foreground">{tier.price}</p>
                    </div>
                    <Link
                      href={tier.name === 'Free' ? '/register' : '/dashboard/wallet'}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all"
                    >
                      Get Started
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              )}

              {tier.isEnterprise && (
                <div className="pt-4 border-t border-border/60">
                  <p className="text-sm text-muted-foreground/80 mb-2">Need a custom solution?</p>
                  <Link
                    href="mailto:sales@openmarketaccess.com"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border/60 rounded-lg hover:bg-foreground/5 transition-all text-center"
                  >
                    Contact Sales
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-2">Credits Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/60 rounded-lg mb-4">
              <Zap className="size-12 text-primary" />
              <div className="flex-1">
                <div>
                  <p className="text-3xl font-bold text-foreground mb-1">1000 credits</p>
                  <p className="text-muted-foreground">= $1 USD</p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Always the same rate</p>
                  <p className="text-foreground font-medium">No hidden fees</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-2">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Coins className="size-5 text-warning mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">USDC on Solana</p>
                <p className="text-sm text-muted-foreground">
                  Micropayments, instant settlement, low fees
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Coins className="size-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">OMA Credits</p>
                <p className="text-sm text-muted-foreground">
                  Pay once, use anytime. 1000 credits = $1
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="size-5 text-success mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">x402 Standard</p>
                <p className="text-sm text-muted-foreground">Programmatic payments via HTTP 402</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/10 border border-border/60">
        <h3 className="font-bold text-center mb-4">💡 Need help deciding?</h3>
        <p className="text-center text-muted-foreground mb-6">
          Compare the features and API call estimates for each tier. The Starter plan is great for
          getting started, while Developer and Professional offer more capacity and support for
          production workloads.
        </p>
        <div className="text-center">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all"
          >
            View Full Pricing Details
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
