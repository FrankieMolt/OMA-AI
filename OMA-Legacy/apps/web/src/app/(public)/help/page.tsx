import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, CheckCircle, ArrowRight, Search, Mail } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      category: 'Getting Started',
      items: [
        {
          question: 'How do I create an account?',
          answer:
            "Sign up on the /register page. You'll need to provide your email and password. For development, you can use the demo account: admin@example.com / admin",
        },
        {
          question: 'How do I connect my Solana wallet?',
          answer:
            "Install a Solana wallet like Phantom or Solflare. Click the 'Connect Wallet' button in the dashboard. Your wallet address will be automatically detected.",
        },
        {
          question: 'How do I deposit USDC to buy credits?',
          answer:
            'Go to /dashboard/wallet and send USDC to your treasury wallet address. The transaction will be automatically verified and credits will be added to your account (1000 credits = $1 USD).',
        },
        {
          question: 'What is x402?',
          answer:
            'x402 is the HTTP 402 Payment Required standard for programmatic micropayments. It enables applications to request payment directly from user wallets without credit card forms.',
        },
      ],
    },
    {
      category: 'Credits & Billing',
      items: [
        {
          question: 'How much do credits cost?',
          answer:
            '1 credit = $0.001 USD. Most API calls cost between 10-100 credits depending on complexity. You can view your credit usage in the dashboard.',
        },
        {
          question: 'Can I withdraw my credits as USDC?',
          answer:
            'Yes! Go to /dashboard/wallet and use the withdraw function. USDC will be sent to your connected Solana wallet address.',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We currently only accept USDC on Solana. No credit cards or fiat payments. This enables instant settlement and low fees.',
        },
      ],
    },
    {
      category: 'API Integration',
      items: [
        {
          question: 'How do I add my API to OMA?',
          answer:
            'Register for an account, then go to /dashboard/create to list your API. Provide a name, description, pricing model, and endpoint URL.',
        },
        {
          question: 'What is the revenue share?',
          answer:
            'You keep 90% of all payments. OMA takes a 10% platform fee to cover infrastructure and development costs. Payouts are processed weekly to your connected wallet.',
        },
        {
          question: 'How do I integrate with x402?',
          answer:
            'Add the x402 payment requirement headers to your API responses. When an API request is made without payment, return HTTP 402 with payment details. See our x402 documentation for more details.',
        },
      ],
    },
    {
      category: 'Technical',
      items: [
        {
          question: 'Is my data secure?',
          answer:
            'Yes. We use PostgreSQL with encrypted connections. All transactions are verified on-chain via Solana. We never store private keys.',
        },
        {
          question: "What's the rate limit?",
          answer:
            'Default rate limit is 100 requests per minute. You can upgrade your account for higher limits. Rate limits reset every minute.',
        },
        {
          question: 'Do you support MCP servers?',
          answer:
            'Yes! You can list your MCP servers on our marketplace. They will be automatically discoverable by MCP-compatible clients.',
        },
      ],
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

      <div className="mb-8">
        <Badge variant="outline" className="mb-4">
          Help Center
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">How can we help you?</h1>
        <div className="relative">
          <div className="absolute top-0 right-0">
            <div className="flex gap-2">
              <Search className="size-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search help..."
                className="bg-background border border-border/60 rounded-lg py-2 pl-10 pr-4 w-80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <HelpCircle className="size-6 text-primary" />
              {category.category}
            </h2>

            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <Card key={itemIndex}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/60 text-center">
        <div className="mb-2">
          <CheckCircle className="size-6 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-lg">Still have questions?</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Check out our comprehensive documentation or reach out to our community Discord.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border/60 rounded-lg hover:bg-foreground/5 transition-all font-medium"
          >
            View Full Documentation
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="mailto:support@openmarketaccess.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
          >
            <Mail className="size-4" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
