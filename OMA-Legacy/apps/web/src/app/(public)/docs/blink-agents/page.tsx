'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Copy, CheckCircle, ArrowRight } from 'lucide-react';

export default function BlinkAgentsPage() {
  const codeExample = `// Generate a Blink URL for your agent
import { createBlink } from '@oma/sdk'

const blink = await createBlink({
  agentId: 'artemis-v2',
  name: 'Artemis AI Assistant',
  description: 'Advanced multi-modal AI assistant',
  url: 'https://artemis.oma.ai',
  icon: 'https://artemis.oma.ai/icon.png',
  actions: [
    {
      label: 'Chat with Artemis',
      href: 'https://artemis.oma.ai/chat'
    },
    {
      label: 'Subscribe ($9.99/mo)',
      href: 'https://artemis.oma.ai/subscribe'
    }
  ]
})

console.log(blink.url)
// Output: https://OMA_DOMAIN.xyz/actions/artemis-v2`;

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <Link
        href="/docs"
        className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
      >
        ← Back to Documentation
      </Link>

      <div className="mb-8">
        <Badge variant="outline" className="mb-4">
          Core Concept
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blink Agents</h1>
        <p className="text-xl text-muted-foreground">
          Viral distribution through Solana Actions and Blink links
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed mb-8">
          <strong>Blink</strong> is Solana&apos;s action specification that enables any website to
          display a transaction preview directly in a URL. When users share a Blink link, followers
          can see and interact with it directly in their wallet - no website visit required.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-6">Benefits</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <BenefitCard
            title="Viral Distribution"
            description="Each Blink is shareable on X, Discord, and any platform. Followers interact without leaving the app."
          />
          <BenefitCard
            title="Instant Monetization"
            description="Set up subscription or pay-per-use pricing. Users pay directly from their wallet."
          />
          <BenefitCard
            title="No Discovery Friction"
            description="Users don't need to visit your website. They discover and pay directly in their wallet."
          />
          <BenefitCard
            title="Trustless Interaction"
            description="All transactions are verified on-chain. No intermediary required."
          />
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Implementation</h2>

        <Card className="glass-card border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Create a Blink</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-foreground/[0.04] border border-border/60 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                <code className="text-primary">{codeExample}</code>
              </pre>
              <button
                className="absolute top-2 right-2 p-2 bg-foreground/5 hover:bg-foreground/10 rounded transition-colors"
                onClick={() => navigator.clipboard.writeText(codeExample)}
                title="Copy code to clipboard"
                aria-label="Copy code to clipboard"
              >
                <Copy className="size-4 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mt-12 mb-6">Best Practices</h2>

        <ul className="space-y-3 mb-12">
          <li className="flex items-start gap-3">
            <CheckCircle className="size-5 text-success shrink-0 mt-0.5" />
            <span>Use clear, descriptive titles that explain what your agent does</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="size-5 text-success shrink-0 mt-0.5" />
            <span>Include both free (discovery) and paid (monetized) action options</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="size-5 text-success shrink-0 mt-0.5" />
            <span>Add a recognizable icon that works at small sizes</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="size-5 text-success shrink-0 mt-0.5" />
            <span>Test your Blink on mobile - most users will discover it there</span>
          </li>
        </ul>

        <div className="flex gap-4">
          <Link
            href="/docs/a2a"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Next: A2A Protocol
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-foreground/[0.04] border border-border/60">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="size-4 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
