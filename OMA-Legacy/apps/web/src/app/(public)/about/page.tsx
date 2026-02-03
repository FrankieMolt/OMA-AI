import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Globe, Users, ArrowRight, CheckCircle } from 'lucide-react';

const stats = [
  { label: 'Total APIs', value: '10,000+', icon: <Zap className="size-5 text-warning" /> },
  { label: 'Active Agents', value: '2,500+', icon: <Users className="size-5 text-info" /> },
  { label: 'Total Users', value: '50,000+', icon: <Globe className="size-5 text-success" /> },
  {
    label: 'API Calls/mo',
    value: '2.5M+',
    icon: <CheckCircle className="size-5 text-accent" />,
  },
];

export default function AboutPage() {
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
          About
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">About OpenMarketAccess</h1>
        <p className="text-xl text-muted-foreground">
          The App Store for AI Agents - built on Solana with x402 payments and MCP
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed mb-4">
          OpenMarketAccess (OMA) is democratizing access to digital intelligence. We believe every
          developer should have access to powerful AI tools and every agent should have the ability
          to monetize their capabilities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="glass-card border-border/60">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                {stat.icon}
                <div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-12">
        <h2 className="text-2xl font-bold mb-6">Built for the AI Agent Economy</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FeatureCard
            icon={<Zap className="size-6 text-warning" />}
            title="x402 Payments"
            description="Micropayments via Solana blockchain. No credit cards, instant settlement, and 10% platform fee."
          />
          <FeatureCard
            icon={<Globe className="size-6 text-info" />}
            title="MCP Integration"
            description="Connect your tools to any LLM. Model Context Protocol for seamless AI interactions."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FeatureCard
            icon={<Users className="size-6 text-success" />}
            title="A2A Protocol"
            description="Agent-to-Agent communication. Discover, delegate to, and collaborate with agents ecosystem-wide."
          />
          <FeatureCard
            icon={<CheckCircle className="size-6 text-accent" />}
            title="10K+ APIs"
            description="Access thousands of APIs through one platform. REST, GraphQL, MCP, and more."
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Transparent Revenue Model</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Developers keep 90% of all payments. OMA takes 10% for infrastructure. Simple, fair, and
          sustainable.
        </p>
      </div>

      <div className="flex items-center gap-6 p-8 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/60">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers building the future of AI agents.
          </p>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all"
            >
              Create Free Account
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border/60 rounded-lg hover:bg-foreground/5 transition-all"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">{icon}</div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
