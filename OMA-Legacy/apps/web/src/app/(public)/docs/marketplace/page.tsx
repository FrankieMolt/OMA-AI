import Link from 'next/link';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocsToc } from '@/components/docs/DocsToc';
import { ShoppingBag, Shield, Search, Filter, Coins, LayoutGrid, CheckCircle } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Marketplace Docs - OpenMarketAccess',
  description:
    'Learn how to use the OMA Marketplace to discover, buy, and sell AI agents and MCP servers.',
};

export default function MarketplaceDocsPage() {
  return (
    <div className="container mx-auto py-10 px-0 max-w-4xl">
      <Link
        href="/docs"
        className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
      >
        ← Back to Documentation
      </Link>

      <div className="mb-8">
        <Badge variant="outline" className="mb-4">
          Ecosystem
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">OMA Marketplace</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The central hub for discovering, acquiring, and monetizing AI capabilities.
        </p>
      </div>

      <DocsToc />

      <div className="prose prose-invert max-w-none space-y-12">
        <section id="overview">
          <p className="text-lg leading-relaxed">
            The OMA Marketplace is a decentralized app store for the AI era. It connects developers
            building powerful agents, APIs, and MCP servers with users who need those capabilities.
            All transactions are settled instantly on-chain via the x402 protocol.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  For Buyers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" /> Discover top-rated AI agents
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" /> Pay-per-use with no
                    subscriptions
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" /> Unified API key (your wallet)
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" /> Verified for security
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-success" />
                  For Sellers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-success" /> Instant global distribution
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-success" /> Keep 100% of revenue (promo
                    period)
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-success" /> Automatic x402 settlement
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-success" /> Built-in analytics and
                    feedback
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="browsing">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browsing & Discovery</h2>
          <p className="text-muted-foreground mb-4">
            The marketplace is organized to help you find exactly what you need.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 items-start p-4 bg-foreground/5 border border-border/60 rounded-lg">
              <Search className="h-6 w-6 text-info mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Smart Search</h3>
                <p className="text-sm text-muted-foreground">
                  Use semantic search to find agents by capability, not just keywords. Try searching
                  for &quot;agents that can analyze CSV files&quot; or &quot;tools for vector
                  database&quot;.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-foreground/5 border border-border/60 rounded-lg">
              <Filter className="h-6 w-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Filtering Categories</h3>
                <ul className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                  <li>
                    <strong>Agents:</strong> Autonomous entities that perform tasks
                  </li>
                  <li>
                    <strong>MCP Servers:</strong> Tools and data sources for LLMs
                  </li>
                  <li>
                    <strong>APIs:</strong> Standard REST endpoints
                  </li>
                  <li>
                    <strong>Skills:</strong> Specialized knowledge packs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="purchasing">
          <h2 className="text-2xl font-bold text-foreground mb-6">Purchasing &amp; Usage</h2>
          <p className="text-muted-foreground mb-4">
            OMA uses a &quot;Credits&quot; system backed by USDC to ensure fast, low-fee
            micro-transactions.
          </p>

          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle>Buying Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Top up your balance</p>
                  <p className="text-sm text-muted-foreground">
                    Deposit USDC from your Solana wallet into your OMA account.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Call the Agent</p>
                  <p className="text-sm text-muted-foreground">
                    When you use an agent or tool, the cost is automatically deducted.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Rate & Review</p>
                  <p className="text-sm text-muted-foreground">
                    Leave feedback to help others and earn reputation points.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="listing">
          <h2 className="text-2xl font-bold text-foreground mb-6">Listing Your Agent</h2>
          <p className="text-muted-foreground mb-6">
            Ready to monetize? You can list your agent in under 2 minutes.
          </p>

          <CodeBlock
            code={`# 1. Login to OMA CLI
oma login

# 2. Deploy your agent
oma deploy

# 3. Listing is created automatically!`}
            language="bash"
          />

          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all"
          >
            <LayoutGrid className="h-4 w-4" />
            Create Listing via Dashboard
          </Link>
        </section>

        <section id="verification">
          <h2 className="text-2xl font-bold text-foreground mb-6">Verification Badges</h2>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-success/10 border border-success/20">
            <Shield className="h-6 w-6 text-success mt-1" />
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                Verified Publisher
                <Badge className="bg-success/20 text-success hover:bg-success/30 border-success/50">
                  Verified
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Verified listings have passed our security audit and functional testing. They are
                guaranteed to work as described and contain no malicious code. Look for the blue
                checkmark next to the agent name.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
