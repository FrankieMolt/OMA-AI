import { Metadata } from 'next';
import Link from 'next/link';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';
import { Zap, DollarSign, Lock, X, Rocket, Users, Globe, Code, CheckCircle2, BarChart3, Shield, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About OMA-AI | Premier MCP Marketplace for AI Agents',
  description: 'Learn about OMA-AI, the leading MCP marketplace. Discover our mission, team, and vision for agentic AI with x402 gasless payments.',
  keywords: ['OMA-AI', 'About', 'MCP marketplace', 'AI agents', 'Model Context Protocol'],
};

export default function AboutPage() {
  const stats = [
    { value: '19+', label: 'MCP Servers' },
    { value: '300+', label: 'MCP Tools' },
    { value: '13', label: 'Blog Posts' },
    { value: '5%', label: 'Platform Fee' },
    { value: '24/7', label: 'Uptime' },
    { value: 'x402', label: 'Payments' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">About OMA-AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Building the Future of
            <span className="block mt-2 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Agentic AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            OMA-AI is the premier MCP (Model Context Protocol) marketplace, empowering AI agents
            with the tools they need to perform complex tasks autonomously.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-4 text-center hover">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Mission */}
        <GlassCardPurple className="max-w-4xl mx-auto p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-purple-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-gray-200 leading-relaxed text-lg">
                We believe that AI agents should have universal access to the world&apos;s tools and services.
                OMA-AI exists to bridge the gap between AI assistants and external capabilities,
                enabling agents to read files, make HTTP requests, interact with databases,
                manage version control, and much more.
              </p>
            </div>
          </div>
          <p className="text-gray-200 leading-relaxed text-lg">
            By providing a standardized, secure, and monetizable marketplace for MCP tools,
            we&apos;re accelerating the development of the agentic AI ecosystem.
            Our goal is to make it easy for developers to publish, monetize, and scale their tools,
            while providing AI agents with reliable, performant, and cost-effective access.
          </p>
        </GlassCardPurple>

        {/* What We Do */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6 hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">MCP Marketplace</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Discover and integrate hundreds of MCP tools for your AI agents.
                    Filter by category, rating, and verification status to find the perfect tool.
                    Real-time search, pagination, and detailed metrics.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">Developer Platform</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Publish your own MCP tools and earn revenue from API calls.
                    Our 4-step wizard makes it easy to get your tools in the marketplace.
                    Track performance, manage pricing, and view analytics.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-amber-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">x402 Payments</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Gasless microtransactions powered by the x402 protocol.
                    Users pay per API call without worrying about gas fees.
                    Support for Base and Solana networks with automatic payouts.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">Multi-Chain Support</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Support for Base and Solana networks.
                    Connect your wallet and receive payouts in USDC.
                    Automatic monthly payouts when you reach the $10 minimum threshold.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Why OMA-AI */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose OMA-AI?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-white">5% Platform Fee</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Industry-leading low fees mean developers keep more of their revenue.
                Competitors charge 10-20%, we charge only 5%.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Gasless Payments</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Powered by x402 protocol, users don&apos;t pay gas fees.
                Makes micro-payments practical and affordable for all.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Official MCPs</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Official MCPs available out of the box, including Filesystem,
                Fetch, Git, Memory, and more. No fake or placeholder tools.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Better DX</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                4-step publish wizard, real-time analytics, and comprehensive
                documentation make building and monetizing MCPs easy.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-white">Secure</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Row Level Security, encrypted payments, and verified MCPs ensure
                your data and transactions are always protected.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-bold text-white">Open Source</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Core platform is open source, built on transparency and community collaboration.
                Fork, contribute, and build with us.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Technology */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Technology</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-6 hover">
              <h3 className="text-xl font-bold text-white mb-4">Model Context Protocol</h3>
              <p className="text-gray-300 leading-relaxed">
                Open standard for AI agent tool integration. Type-safe, flexible,
                and secure protocol for connecting agents to external capabilities.
                Standardizes how tools are discovered, called, and integrated.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <h3 className="text-xl font-bold text-white mb-4">x402 Protocol</h3>
              <p className="text-gray-300 leading-relaxed">
                ERC-3009 gasless payment protocol. Enables micro-transactions
                without wallet gas fees using delegated transfers.
                Random nonces, time-based auth, domain separation for security.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <h3 className="text-xl font-bold text-white mb-4">Supabase</h3>
              <p className="text-gray-300 leading-relaxed">
                PostgreSQL database with RLS (Row Level Security). Enterprise-grade
                security, real-time subscriptions, and auto-scaling.
                Handles users, MCPs, transactions, and analytics.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <h3 className="text-xl font-bold text-white mb-4">Next.js 15</h3>
              <p className="text-gray-300 leading-relaxed">
                Latest React framework with App Router. Server components,
                edge runtime, and optimized builds. Fast, SEO-friendly,
                and developer experience.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <h3 className="text-xl font-bold text-white mb-4">Tailwind CSS</h3>
              <p className="text-gray-300 leading-relaxed">
                Utility-first CSS framework. Rapid UI development, consistent design system,
                and automatic responsive design. Dark mode optimized.
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <h3 className="text-xl font-bold text-white mb-4">TypeScript</h3>
              <p className="text-gray-300 leading-relaxed">
                Type-safe JavaScript. Better developer experience, fewer bugs,
                and improved code maintainability. All components fully typed.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Roadmap */}
        <GlassCard className="max-w-4xl mx-auto p-8 mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Our Roadmap</h2>
          <div className="space-y-6">
            <RoadmapPhase
              quarter="Q2 2026"
              status="In Progress"
              items={[
                'Advanced MCP analytics dashboard',
                'Community reviews and ratings',
                'Developer portal enhancements',
                'MCP testing sandbox',
              ]}
            />
            <RoadmapPhase
              quarter="Q3 2026"
              status="Planned"
              items={[
                'Automated MCP security scanning',
                'Enterprise tier for teams',
                'Mobile app (iOS + Android)',
                'MCP marketplace API for developers',
              ]}
            />
            <RoadmapPhase
              quarter="Q4 2026"
              status="Planned"
              items={[
                'Cross-chain payment support (Polygon, Arbitrum)',
                'MCP versioning and updates',
                'AI-powered MCP recommendations',
                'Team collaboration features',
              ]}
            />
          </div>
        </GlassCard>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">The Team</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  N
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">NOSYT</h3>
                  <p className="text-purple-400">Founder & Lead Developer</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                AI researcher and blockchain developer with expertise in MCP protocol,
                x402 payments, and decentralized systems. Building the future of agentic AI.
              </p>
              <div className="flex gap-3 mt-4">
                <Link href="https://github.com/oma-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                ><Code size={16} />
                  <span className="text-sm">GitHub</span>
                </Link>
                <Link href="https://x.com/@nosytlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                ><X size={16} />
                  <span className="text-sm">Twitter</span>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-6 hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  A
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">OMA-AI Team</h3>
                  <p className="text-blue-400">Community Contributors</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                A growing community of developers, AI researchers, and enthusiasts
                contributing to the OMA-AI ecosystem. Open source contributors,
                MCP developers, and feedback from early users.
              </p>
              <div className="flex gap-3 mt-4">
                <Link href="https://discord.gg/oma-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >Join Discord
                </Link>
                <Link href="https://github.com/oma-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded-lg transition-colors"
                >Contribute
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* CTA */}
        <GlassCardPurple className="max-w-4xl mx-auto p-12 text-center">
          <div className="w-16 h-16 bg-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-8 h-8 text-purple-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Future?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Be part of the agentic AI revolution. Join our Discord, follow us on GitHub,
            and start building with MCPs today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://discord.gg/oma-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
            >Join Discord
            </Link>
            <Link href="https://github.com/oma-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-lg transition-colors"
            ><Code size={18} />
              Star on GitHub
            </Link>
            <Link
              href="/mcps"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold rounded-lg transition-colors"
            >
              Explore Marketplace
            </Link>
          </div>
        </GlassCardPurple>
      </div>
    </div>
  );
}

function RoadmapPhase({ quarter, status, items }: { quarter: string; status: string; items: string[] }) {
  return (
    <div className="border-t border-zinc-700 pt-6 first:border-t-0">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold text-white">{quarter}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          status === 'In Progress'
            ? 'bg-green-600/20 text-green-400'
            : 'bg-blue-600/20 text-blue-400'
        }`}>
          {status}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-gray-300">
            <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-purple-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
