import Link from 'next/link';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Zap,
  Globe,
  Shield,
  Coins,
  Cpu,
  Layers,
  Network,
  Lock,
  Code2,
} from 'lucide-react';
import { DocsToc } from '@/components/docs/DocsToc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Introduction - OpenMarketAccess',
  description:
    'What is OpenMarketAccess? Learn about the App Store for AI Agents and the future of programmatic digital intelligence.',
  keywords: [
    'AI marketplace',
    'x402 payments',
    'A2A protocol',
    'MCP servers',
    'Solana',
    'decentralized AI',
  ],
};

export default function IntroductionPage() {
  const features = [
    {
      icon: <Zap className="size-5 text-primary" />,
      title: 'Unified Marketplace',
      description: 'One place to find REST APIs, MCP Servers, and AI Agents',
    },
    {
      icon: <Coins className="size-5 text-success" />,
      title: 'x402 Payments',
      description: 'Programmatic micropayments via Solana - no credit cards needed',
    },
    {
      icon: <Cpu className="size-5 text-info" />,
      title: 'MCP Integration',
      description: 'Connect your tools to any AI model with Model Context Protocol',
    },
    {
      icon: <Globe className="size-5 text-accent" />,
      title: 'A2A Protocol',
      description: 'Agent-to-Agent communication standard (Linux Foundation)',
    },
    {
      icon: <Shield className="size-5 text-warning" />,
      title: 'Solana Blinks',
      description: 'Viral distribution through Solana Actions and Blink links',
    },
    {
      icon: <Layers className="size-5 text-accent" />,
      title: 'White-label Solutions',
      description: 'Reseller platform for agencies and enterprises',
    },
  ];

  const ecosystem = [
    {
      title: 'For Developers',
      description: 'Monetize your AI agents, APIs, and MCP servers with zero upfront costs',
      color: 'from-info/10 to-info/5',
      features: [
        'No platform fees for agent runs',
        'Keep 100% of x402 payments',
        'Automatic A2A integration',
        'Performance analytics dashboard',
      ],
    },
    {
      title: 'For Users',
      description: 'Access and pay for AI services instantly with your Solana wallet',
      color: 'from-success/10 to-success/5',
      features: [
        'Pay per use with USDC',
        'No subscription commitments',
        'Instant agent discovery',
        'Transparent pricing',
      ],
    },
    {
      title: 'For Enterprises',
      description: 'Build custom AI workflows with white-label solutions',
      color: 'from-accent/10 to-accent/5',
      features: ['Private agent networks', 'Custom billing', 'SLA guarantees', 'Dedicated support'],
    },
  ];

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
          Introduction
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">What is OpenMarketAccess?</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The &quot;App Store for AI Agents&quot; - democratizing access to digital intelligence
        </p>
      </div>

      <DocsToc />

      <div className="prose prose-invert max-w-none space-y-12">
        <section id="overview">
          <p className="text-lg leading-relaxed">
            OpenMarketAccess (OMA) is a revolutionary marketplace that enables developers to
            <strong> monetize</strong> their APIs, <strong>MCP servers</strong>, and{' '}
            <strong>AI agents</strong>
            through secure, blockchain-based micropayments. Built on the x402 payment protocol and
            Solana blockchain, OMA provides the infrastructure for the emerging agent economy.
          </p>

          <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-2">Vision</p>
            <p className="text-muted-foreground">
              We believe in a future where AI agents are autonomous, interoperable, and economically
              sustainable. OMA provides the marketplace infrastructure that enables this vision by
              connecting creators, consumers, and enterprises in a trusted, decentralized ecosystem.
            </p>
          </div>
        </section>

        <section id="key-features">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/20 transition-all"
              >
                <div className="shrink-0 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="ecosystem">
          <h2 className="text-2xl font-bold text-foreground mb-6">The OMA Ecosystem</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {ecosystem.map((item, i) => (
              <Card
                key={i}
                className={`bg-gradient-to-br ${item.color} border-border/60 hover:border-primary/20 transition-all`}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="architecture">
          <h2 className="text-2xl font-bold text-foreground mb-6">Platform Architecture</h2>
          <div className="space-y-6">
            <ArchitectureCard
              icon={<Network className="h-5 w-5 text-info" />}
              title="Decentralized Infrastructure"
              description="Built on Solana for fast, secure, and low-cost transactions"
              details={[
                'x402 Payment Protocol for micropayments',
                'A2A Protocol for agent communication',
                'MCP Integration for tool connectivity',
                'Solana Blinks for viral distribution',
              ]}
            />
            <ArchitectureCard
              icon={<Lock className="h-5 w-5 text-success" />}
              title="Security & Trust"
              description="Multi-layered security to protect users and creators"
              details={[
                'Non-custodial wallet integration',
                'On-chain transaction verification',
                'Sandboxed agent execution',
                'Reputation and rating systems',
              ]}
            />
            <ArchitectureCard
              icon={<Code2 className="h-5 w-5 text-accent" />}
              title="Developer Experience"
              description="Tools and SDKs to build and deploy agents quickly"
              details={[
                'Type-safe TypeScript SDKs',
                'Comprehensive documentation',
                'Testing and debugging tools',
                'Analytics and monitoring dashboard',
              ]}
            />
          </div>
        </section>

        <section id="how-it-works">
          <h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
          <div className="space-y-6">
            <StepCard
              number="1"
              title="Deploy Your Agent"
              description="Package your AI agent, API, or MCP server with our SDK. Add x402 payment headers."
            />
            <StepCard
              number="2"
              title="List on Marketplace"
              description="Create a listing with pricing, capabilities, and documentation. Set your own prices."
            />
            <StepCard
              number="3"
              title="Earn Revenue"
              description="Users discover and pay via Solana USDC. Revenue shares are settled automatically."
            />
          </div>
        </section>

        <section id="why-oma">
          <h2 className="text-2xl font-bold text-foreground mb-6">Why OMA?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <StatCard
              value="100+"
              label="LLM Models"
              description="Access through unified OpenRouter integration"
            />
            <StatCard
              value="<$0.01"
              label="Per Request"
              description="Solana's sub-cent fees enable true micropayments"
            />
            <StatCard
              value="<1s"
              label="Settlement"
              description="Near-instant payment confirmation"
            />
          </div>
        </section>

        <section id="getting-started">
          <h2 className="text-2xl font-bold text-foreground mb-6">Getting Started</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/docs/quick-start"
              className="flex gap-4 p-4 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/20 transition-all group"
            >
              <div className="shrink-0 mt-1">
                <Zap className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  Quick Start Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  Deploy your first agent in 5 minutes
                </p>
              </div>
            </Link>
            <Link
              href="/docs/agent-development"
              className="flex gap-4 p-4 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/20 transition-all group"
            >
              <div className="shrink-0 mt-1">
                <Code2 className="size-5 text-info" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  Agent Development
                </h3>
                <p className="text-sm text-muted-foreground">Build and deploy AI agents</p>
              </div>
            </Link>
            <Link
              href="/docs/x402"
              className="flex gap-4 p-4 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/20 transition-all group"
            >
              <div className="shrink-0 mt-1">
                <Coins className="size-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  x402 Protocol
                </h3>
                <p className="text-sm text-muted-foreground">Implement micropayments</p>
              </div>
            </Link>
            <Link
              href="/docs/wallet-guide"
              className="flex gap-4 p-4 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/20 transition-all group"
            >
              <div className="shrink-0 mt-1">
                <Shield className="size-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  Wallet Setup
                </h3>
                <p className="text-sm text-muted-foreground">Connect your Solana wallet</p>
              </div>
            </Link>
          </div>
        </section>

        <section id="next-steps" className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/docs/quick-start"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-neon"
            >
              Quick Start Guide
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border/60 rounded-lg hover:bg-foreground/5 transition-all"
            >
              Browse Marketplace
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 group">
      <div className="shrink-0 size-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center group-hover:scale-110 transition-transform shadow-neon-sm">
        {number}
      </div>
      <div className="pt-1">
        <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-surface/50 border border-border/60 text-center hover:border-primary/20 transition-all group">
      <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
        {value}
      </div>
      <div className="font-semibold text-foreground mb-1">{label}</div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ArchitectureCard({
  icon,
  title,
  description,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}) {
  return (
    <Card className="bg-surface/50 border-border/60 hover:border-primary/20 transition-all">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-1">{icon}</div>
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
