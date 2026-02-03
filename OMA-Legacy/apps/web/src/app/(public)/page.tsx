'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bot,
  Plug,
  Shield,
  Coins,
  Zap,
  ArrowRight,
  Sparkles,
  Workflow,
  Network,
  Share2,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import strings from '@/constants/text.json';

interface MarketplaceStats {
  totalListings: number;
  totalUsers: number;
  totalTransactions: number;
}

export default function Home() {
  const [stats, setStats] = useState<MarketplaceStats>({
    totalListings: 0,
    totalUsers: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Parallel fetch for improved performance
      const [listingsRes, usersRes] = await Promise.all([
        fetch('/api/listings?page=1&limit=1'),
        fetch('/api/analytics?stats=true'),
      ]);

      const listingsData = await listingsRes.json();
      const analyticsData = await usersRes.json();

      setStats({
        totalListings: listingsData.meta?.total || 18,
        totalUsers: analyticsData.uniqueUsers || 1,
        totalTransactions: analyticsData.totalEvents || 0,
      });
    } catch {
      // Fallback for demo/offline mode
      setStats({
        totalListings: 18,
        totalUsers: 1,
        totalTransactions: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-primary/5 to-transparent rounded-full opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 animate-float-3d">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80 font-medium">{strings.home.hero.badge}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-display">
            {strings.home.hero.title_start}{' '}
            <span className="text-neon block md:inline mt-2 md:mt-0">{strings.home.hero.title_highlight}</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            {strings.home.hero.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { label: strings.home.stats.active_agents, value: stats.totalListings, color: 'text-primary' },
              { label: strings.home.stats.developers, value: stats.totalUsers, color: 'text-foreground' },
              { label: strings.home.stats.transactions, value: stats.totalTransactions, color: 'text-accent' },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 glass-card-hover group">
                <div
                  className={`text-4xl font-bold ${stat.color} mb-2 font-mono group-hover:scale-110 transition-transform duration-300`}
                >
                  {loading ? (
                    <span className="opacity-50 text-2xl">...</span>
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </div>
                <div className="text-sm text-foreground/60 tracking-wider uppercase font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace">
              <Button size="lg" className="btn-magnetic px-8 py-6 text-lg font-semibold rounded-xl group shadow-neon hover:shadow-neon-hover">
                {strings.home.hero.cta_explore}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                size="lg"
                className="btn-magnetic border-border/50 hover:bg-foreground/5 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
              >
                {strings.home.hero.cta_docs}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">{strings.home.categories.title}</h2>
            <p className="text-foreground/60 text-lg">{strings.home.categories.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: strings.home.categories.items.agents.title,
                description: strings.home.categories.items.agents.description,
                href: '/agents',
                gradient: 'from-primary/20 to-primary/5',
                borderColor: 'group-hover:border-primary/40',
              },
              {
                icon: Plug,
                title: strings.home.categories.items.mcp.title,
                description: strings.home.categories.items.mcp.description,
                href: '/mcp',
                gradient: 'from-accent/20 to-accent/5',
                borderColor: 'group-hover:border-accent/40',
              },
              {
                icon: Users,
                title: strings.home.categories.items.crewai.title,
                description: strings.home.categories.items.crewai.description,
                href: '/marketplace?category=crewai',
                gradient: 'from-warning/20 to-warning/5',
                borderColor: 'group-hover:border-warning/40',
              },
              {
                icon: Workflow,
                title: strings.home.categories.items.langgraph.title,
                description: strings.home.categories.items.langgraph.description,
                href: '/marketplace?category=langgraph',
                gradient: 'from-info/20 to-info/5',
                borderColor: 'group-hover:border-info/40',
              },
              {
                icon: Share2,
                title: strings.home.categories.items.subagents.title,
                description: strings.home.categories.items.subagents.description,
                href: '/subagents',
                gradient: 'from-success/20 to-success/5',
                borderColor: 'group-hover:border-success/40',
              },
              {
                icon: Network,
                title: strings.home.categories.items.x402.title,
                description: strings.home.categories.items.x402.description,
                href: '/x402',
                gradient: 'from-secondary/40 to-secondary/10',
                borderColor: 'group-hover:border-secondary/40',
              },
            ].map((category, i) => (
              <div key={i}>
                <Link href={category.href}>
                  <Card
                    className={`glass-card-3d group cursor-pointer h-full bg-gradient-to-br ${category.gradient} border-border/40 ${category.borderColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-glow`}
                  >
                    <CardContent className="p-8 text-center h-full flex flex-col items-center justify-between">
                      <div className="w-16 h-16 mb-6 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        <category.icon className="w-8 h-8 text-foreground/90 group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-foreground/60 text-sm mb-6 leading-relaxed">{category.description}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        {strings.home.categories.browse} <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              {strings.home.features.title_start}{' '}
              <span className="text-primary">{strings.home.features.title_highlight}</span>
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">{strings.home.features.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Network,
                title: strings.home.features.items.discovery.title,
                description: strings.home.features.items.discovery.desc,
              },
              {
                icon: Share2,
                title: strings.home.features.items.a2a.title,
                description: strings.home.features.items.a2a.desc,
              },
              {
                icon: Coins,
                title: strings.home.features.items.x402.title,
                description: strings.home.features.items.x402.desc,
              },
              {
                icon: Shield,
                title: strings.home.features.items.trustless.title,
                description: strings.home.features.items.trustless.desc,
              },
              {
                icon: Zap,
                title: strings.home.features.items.liquidity.title,
                description: strings.home.features.items.liquidity.desc,
              },
              {
                icon: Plug,
                title: strings.home.features.items.modular.title,
                description: strings.home.features.items.modular.desc,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-8 group hover:bg-foreground/[0.08] transition-all duration-300 hover:border-primary/30"
              >
                <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
