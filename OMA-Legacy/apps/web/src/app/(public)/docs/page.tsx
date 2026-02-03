import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Book,
  Code,
  CreditCard,
  Shield,
  Zap,
  Users,
  Globe,
  Search,
  Star,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Documentation - OpenMarketAccess',
  description:
    'Complete technical documentation for OpenMarketAccess. Learn about AI agents, x402 payments, A2A protocol, and MCP servers.',
  keywords: [
    'documentation',
    'API',
    'x402',
    'A2A protocol',
    'MCP servers',
    'AI agents',
    'blockchain',
  ],
  openGraph: {
    title: 'Documentation - OpenMarketAccess',
    description:
      'Complete technical documentation for building AI agents and decentralized marketplaces.',
    type: 'website',
  },
};

export default function DocsPage() {
  const quickStartItems = [
    {
      title: 'Quick Start Guide',
      description: 'Deploy your first AI agent in 5 minutes',
      href: '/docs/quick-start',
      icon: Zap,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Agent Development',
      description: 'Build and configure AI agents',
      href: '/docs/agent-development',
      icon: Code,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      title: 'Wallet Integration',
      description: 'Connect wallets and manage payments',
      href: '/docs/wallet-guide',
      icon: CreditCard,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const coreConcepts = [
    {
      title: 'x402 Protocol',
      description: 'HTTP 402 micropayments for AI services',
      href: '/docs/x402',
      icon: CreditCard,
      featured: true,
      difficulty: 'Intermediate',
    },
    {
      title: 'A2A Protocol',
      description: 'Agent-to-agent communication standard',
      href: '/docs/a2a',
      icon: Users,
      featured: true,
      difficulty: 'Advanced',
    },
    {
      title: 'MCP Servers',
      description: 'Model Context Protocol for tool integration',
      href: '/docs/mcp-servers',
      icon: Shield,
      featured: false,
      difficulty: 'Intermediate',
    },
    {
      title: 'Blink Agents',
      description: 'Instant AI agent deployment',
      href: '/docs/blink-agents',
      icon: Zap,
      featured: false,
      difficulty: 'Beginner',
    },
  ];

  const resources = [
    {
      title: 'API Reference',
      href: '/docs/api-reference',
      description: 'Complete API documentation',
    },
    { title: 'Pricing Guide', href: '/docs/pricing', description: 'Cost structures and billing' },
    {
      title: 'Troubleshooting',
      href: '/docs/troubleshooting',
      description: 'Common issues and solutions',
    },
    {
      title: 'x402scan Explorer',
      href: 'https://www.x402scan.com',
      description: 'x402 ecosystem explorer',
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm backdrop-blur-md animate-fade-in-up-3d">
            <Book className="w-4 h-4 mr-2" />
            OMA Developer Network
          </Badge>

          <h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary/80 to-accent/80 bg-clip-text text-transparent mb-8 tracking-tight animate-fade-in-up-3d font-display"
            style={{ animationDelay: '0.1s' }}
          >
            Build the Future of <br />
            Autonomous AI
          </h1>

          <p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up-3d"
            style={{ animationDelay: '0.2s' }}
          >
            Complete references for the OpenMarketAccess Protocol. Learn to build, deploy, and
            monetize autonomous agents using x402 and MemVid.
          </p>

          {/* Search - Massive & Glowing */}
          <div
            className="max-w-2xl mx-auto mb-12 animate-fade-in-up-3d"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Ask the documentation (e.g., 'How do I implement x402 payment?')"
                  className="pl-14 h-16 text-lg bg-surface border-none text-foreground placeholder:text-muted-foreground focus:ring-0 rounded-xl shadow-2xl"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <Badge variant="outline" className="border-border/60 text-muted-foreground bg-surface/80">
                    Ctrl K
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up-3d"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground px-10 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-glow btn-magnetic"
            >
              <Link href="/docs/quick-start">
                <Zap className="w-5 h-5 mr-2" />
                Quick Start Guide
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border/60 bg-surface/50 hover:bg-surface/80 text-muted-foreground px-10 py-6 text-lg font-medium rounded-full backdrop-blur-md group"
            >
              <Link href="/docs/api-reference">
                <Code className="w-5 h-5 mr-2" />
                API Reference
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-4 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Quick Start Guides</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running with OpenMarketAccess in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickStartItems.map((item, index) => (
              <Card
                key={index}
                className="bg-surface/50 border-border/60 hover:bg-surface/70 hover:scale-105 transition-all duration-300 group glass-card-hover"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={item.href}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group-hover:bg-primary transition-colors">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Core Concepts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master the fundamental technologies powering OpenMarketAccess
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreConcepts.map((concept, index) => (
              <Card
                key={index}
                className={`bg-surface/50 border-border/60 hover:bg-surface/70 transition-all duration-300 ${
                  concept.featured ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-foreground/5 rounded-lg flex items-center justify-center">
                      <concept.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      {concept.featured && (
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-border/60 text-muted-foreground">
                        {concept.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="text-foreground text-xl">{concept.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={concept.href}>
                    <Button
                      variant="outline"
                      className="w-full border-border/60 text-muted-foreground hover:bg-surface/80 hover:text-foreground group"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Additional Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed with OpenMarketAccess
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                target={resource.external ? '_blank' : undefined}
              >
                <Card className="bg-surface/50 border-border/60 hover:bg-surface/70 hover:scale-105 transition-all duration-300 h-full group">
                  <CardHeader>
                    <div className="w-8 h-8 bg-foreground/5 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <CardTitle className="text-foreground text-lg group-hover:text-primary transition-colors">
                      {resource.title}
                      {resource.external && (
                        <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-display">Join the Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect with other developers building the future of autonomous AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold shadow-neon"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Discord
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 text-muted-foreground hover:bg-surface/80 px-8 py-4 text-lg font-semibold"
            >
              <Globe className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
