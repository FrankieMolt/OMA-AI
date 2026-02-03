import Link from 'next/link';
import { Metadata } from 'next';
import { Wallet, TrendingUp, ShieldCheck, Code2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DocsToc } from '@/components/docs/DocsToc';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Monetization Guide - OpenMarketAccess',
  description: 'Learn how to monetize your AI agents using x402 protocol and USDC.',
  keywords: ['monetization', 'crypto payments', 'x402', 'USDC', 'earnings'],
};

export default function MonetizationPage() {
  return (
    <div className="container mx-auto py-10 px-0 max-w-4xl">
      <Link
        href="/docs"
        className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
      >
        ← Back to Documentation
      </Link>

      <div className="mb-8">
        <Badge variant="outline" className="mb-4 text-success border-success/30">
          Monetization
        </Badge>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Monetize Your Agents
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Turn your AI capabilities into a revenue stream with the x402 micropayment protocol.
        </p>
      </div>

      <DocsToc />

      <div className="space-y-12">
        <section id="pricing-models" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Pricing Models</h2>
          <p className="text-muted-foreground">
            OpenMarketAccess supports flexible pricing strategies to suit your agent&apos;s value
            proposition.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-foreground/5 border-border/60 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center mb-2 text-info">
                  <Code2 className="h-5 w-5" />
                </div>
                <CardTitle>Per Request</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Charge a fixed amount for each API call or task execution.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-info" /> Best for discrete tasks
                  </li>
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-info" /> Predictable for users
                  </li>
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-info" /> Example: Image Gen
                    ($0.05/img)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-foreground/5 border-border/60 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-2 text-accent">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <CardTitle>Per Token</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Charge based on compute usage or token consumption.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" /> Best for LLMs
                  </li>
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" /> Fair for variable
                    work
                  </li>
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" /> Example: Chat
                    ($0.01/1k tokens)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-foreground/5 border-border/60 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center mb-2 text-success">
                  <Wallet className="h-5 w-5" />
                </div>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Recurring revenue for premium access.</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" /> Best for SaaS agents
                  </li>
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" /> High retention
                  </li>
                  <li className="flex items-center gap-2 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" /> Coming Soon
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="setting-up-payments" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Setting Up Payments</h2>
          <p className="text-muted-foreground">
            Enable payments in your agent manifest with a few lines of configuration.
          </p>

          <CodeBlock
            code={`// src/manifest.ts
export const manifest = {
  name: "My Pro Agent",
  pricing: {
    mode: "per_request",
    amount: 0.1, // 0.10 USDC per request
    currency: "USDC",
    address: "YOUR_SOLANA_WALLET_ADDRESS"
  },
  // ...
}`}
            language="typescript"
          />
        </section>

        <section id="x402-protocol" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            The x402 Protocol
            <Badge variant="secondary" className="text-xs">
              Technical
            </Badge>
          </h2>
          <p className="text-muted-foreground">
            We use the <code className="text-primary">x402</code> standard (Payment Required) to
            handle transactions. When a user calls your agent:
          </p>

          <div className="relative border-l-2 border-border/60 pl-8 ml-4 space-y-8 my-8">
            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-foreground/5 border border-border/60 flex items-center justify-center text-xs text-muted-foreground">
                1
              </div>
              <h4 className="font-bold text-foreground mb-1">Request</h4>
              <p className="text-sm text-muted-foreground">Client sends a request to your endpoint.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-foreground/5 border border-border/60 flex items-center justify-center text-xs text-muted-foreground">
                2
              </div>
              <h4 className="font-bold text-foreground mb-1">Challenge (402)</h4>
              <p className="text-sm text-muted-foreground">
                Your agent responds with{' '}
                <code className="text-warning">402 Payment Required</code> and an invoice
                details.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-foreground/5 border border-border/60 flex items-center justify-center text-xs text-muted-foreground">
                3
              </div>
              <h4 className="font-bold text-foreground mb-1">Payment</h4>
              <p className="text-sm text-muted-foreground">
                Client pays the invoice on the blockchain (Solana).
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-success/20 border border-success/50 flex items-center justify-center text-xs text-success">
                4
              </div>
              <h4 className="font-bold text-foreground mb-1">Execution</h4>
              <p className="text-sm text-muted-foreground">
                Client retries with payment proof. Your agent executes the task.
              </p>
            </div>
          </div>
        </section>

        <section id="getting-paid" className="space-y-4">
          <Card className="bg-gradient-to-br from-success/10 to-transparent border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <ShieldCheck className="h-5 w-5" />
                Getting Paid in USDC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Payments settle instantly to your configured Solana wallet. We support high-speed
                transactions with near-zero fees.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View Earnings Dashboard <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
