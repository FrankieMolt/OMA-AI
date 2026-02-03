import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle, TrendingUp, Zap, Shield, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
        >
          ← Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Transparent, crypto-native pricing for all OMA services
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <PricingCard
          title="Free Tier"
          price="0%"
          description="Perfect for getting started"
          features={[
            'Access to free listings',
            'Standard support',
            'Basic analytics',
            'Community access',
          ]}
          cta="Get Started Free"
          popular={false}
        />
        <PricingCard
          title="Pro"
          price="2.5%"
          description="For serious builders"
          features={[
            'All free tier features',
            'Priority support',
            'Advanced analytics',
            'API access',
            'Custom branding',
            'A2A protocol access',
          ]}
          cta="Start Pro Trial"
          popular={true}
        />
        <PricingCard
          title="Enterprise"
          price="Custom"
          description="For large organizations"
          features={[
            'All pro features',
            'Dedicated support',
            'Custom integrations',
            'SLA guarantees',
            'White-label solution',
            'On-premise deployment',
          ]}
          cta="Contact Sales"
          popular={false}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Service Fees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <FeeItem
                service="Marketplace Listings"
                fee="2.5% per transaction"
                description="Only charged when you make a sale"
              />
              <FeeItem
                service="LLM Gateway"
                fee="0.00001 - 0.00015 USDC / 1K tokens"
                description="Depending on model selection"
              />
              <FeeItem
                service="Agent Execution"
                fee="Variable (set by agent provider)"
                description="OMA doesn't take a cut on agent runs"
              />
              <FeeItem
                service="x402 Payments"
                fee="Gas fees only"
                description="Standard Solana network fees apply"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-info" />
              Volume Discounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <DiscountTier volume="$0 - $1,000" discount="Standard rate" />
              <DiscountTier volume="$1,000 - $10,000" discount="10% discount" />
              <DiscountTier volume="$10,000 - $50,000" discount="20% discount" />
              <DiscountTier volume="$50,000+" discount="Custom pricing" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Volume discounts are calculated monthly and automatically applied to eligible
              accounts.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-success" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Supported Currencies</h4>
              <div className="space-y-2">
                <CurrencyItem
                  name="USDC (SOL)"
                  icon="🪙"
                  description="Stablecoin on Solana, primary payment method"
                  recommended={true}
                />
                <CurrencyItem
                  name="SOL"
                  icon="◎"
                  description="Native Solana token, accepted by some services"
                  recommended={false}
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Payment Protocol</h4>
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <p className="text-sm">
                  <strong className="text-primary">x402 Protocol</strong> - HTTP 402 Payment
                  Required standard
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Non-custodial payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Instant settlement on Solana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Transparent on-chain records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>Zero KYC requirements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FAQItem
              question="Do I pay OMA for every agent run?"
              answer="No! OMA only charges a 2.5% fee on marketplace sales. Agent execution payments go directly to the agent provider."
            />
            <FAQItem
              question="Can I accept payments in other currencies?"
              answer="Currently, OMA supports USDC on Solana. We're exploring additional currencies based on community demand."
            />
            <FAQItem
              question="Are there any hidden fees?"
              answer="No. All fees are transparent and disclosed upfront. The only additional cost is standard Solana gas fees."
            />
            <FAQItem
              question="How do I qualify for volume discounts?"
              answer="Volume discounts are automatically calculated based on your monthly transaction volume. No application needed."
            />
            <FAQItem
              question="Can I get a refund?"
              answer="Payments on blockchain are irreversible. However, we work with service providers to resolve disputes and may facilitate refunds in certain cases."
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/dashboard/create">
            Start Earning
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  popular,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}) {
  return (
    <Card className={`relative ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground ml-2">fee</span>}
        </div>
        <p className="text-muted-foreground mt-2">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={popular ? 'default' : 'outline'}>
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}

function FeeItem({
  service,
  fee,
  description,
}: {
  service: string;
  fee: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
      <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium text-sm">{service}</p>
        <p className="text-sm text-primary font-semibold">{fee}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function DiscountTier({ volume, discount }: { volume: string; discount: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-sm">{volume}</span>
      <Badge variant={discount === 'Custom pricing' ? 'secondary' : 'outline'}>{discount}</Badge>
    </div>
  );
}

function CurrencyItem({
  name,
  icon,
  description,
  recommended,
}: {
  name: string;
  icon: string;
  description: string;
  recommended: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg ${recommended ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}`}
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{name}</p>
          {recommended && <Badge className="text-xs">Recommended</Badge>}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b pb-4 last:border-0 last:pb-0">
      <p className="font-medium mb-2">{question}</p>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  );
}
