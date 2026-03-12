import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About OMA-AI | The Premier MCP Marketplace',
  description: 'Learn about OMA-AI, the leading MCP marketplace for AI agents. Discover our mission, team, and vision for the future of agentic AI.',
  keywords: ['OMA-AI', 'About', 'MCP marketplace', 'AI agents', 'Model Context Protocol'],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 max-w-4xl py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Building the Future of
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Agentic AI
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            OMA-AI is the premier MCP (Model Context Protocol) marketplace, empowering AI agents
            with the tools they need to perform complex tasks autonomously.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            We believe that AI agents should have universal access to the world's tools and services.
            OMA-AI exists to bridge the gap between AI assistants and external capabilities,
            enabling agents to read files, make HTTP requests, interact with databases,
            manage version control, and much more.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mt-4">
            By providing a standardized, secure, and monetizable marketplace for MCP tools,
            we're accelerating the development of the agentic AI ecosystem.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              title="MCP Marketplace"
              description="Discover and integrate hundreds of MCP tools for your AI agents.
              Filter by category, rating, and verification status to find the perfect tool."
              icon="🔍"
            />
            <FeatureCard
              title="Developer Platform"
              description="Publish your own MCP tools and earn revenue from API calls.
              Our 4-step wizard makes it easy to get your tools in the marketplace."
              icon="🚀"
            />
            <FeatureCard
              title="x402 Payments"
              description="Gasless microtransactions powered by x402 protocol.
              Users pay per API call without worrying about gas fees."
              icon="💰"
            />
            <FeatureCard
              title="Multi-Chain Support"
              description="Support for Base and Solana networks.
              Connect your wallet and receive payouts in USDC."
              icon="⛓️"
            />
          </div>
        </section>

        {/* Why OMA-AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Why OMA-AI?</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="space-y-6">
              <Reason
                title="5% Platform Fee"
                description="Industry-leading low fees mean developers keep more of their revenue.
                Competitors charge 10-20%, we charge only 5%."
              />
              <Reason
                title="Gasless Payments"
                description="Powered by x402 protocol, users don't pay gas fees.
                Makes micro-payments practical and affordable."
              />
              <Reason
                title="Official MCPs Included"
                description="7 official MCPs available out of the box, including Filesystem,
                Fetch, Git, Memory, and more."
              />
              <Reason
                title="Better Developer Experience"
                description="4-step publish wizard, real-time analytics, and comprehensive
                documentation make building and monetizing MCPs easy."
              />
              <Reason
                title="Multi-Chain Support"
                description="Support for both Base and Solana networks, giving you flexibility
                in how you receive payouts."
              />
              <Reason
                title="Open Source"
                description="Core platform is open source, built on transparency and community collaboration."
              />
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">The Team</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            OMA-AI is built by a team of AI researchers, blockchain developers, and open-source
            enthusiasts passionate about the future of agentic AI.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Our team has experience building decentralized applications, AI systems, and
            developer tools at scale. We're committed to creating a platform that's
            secure, performant, and developer-friendly.
          </p>
        </section>

        {/* The Technology */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">The Technology</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TechCard
              title="Model Context Protocol"
              description="Open standard for AI agent tool integration. Type-safe, flexible,
              and secure protocol for connecting agents to external capabilities."
            />
            <TechCard
              title="x402 Protocol"
              description="ERC-3009 gasless payment protocol. Enables micro-transactions
              without wallet gas fees using delegated transfers."
            />
            <TechCard
              title="Supabase"
              description="PostgreSQL database with RLS (Row Level Security). Enterprise-grade
              security, real-time subscriptions, and auto-scaling."
            />
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Roadmap</h2>
          <div className="space-y-4">
            <RoadmapItem
              phase="Q2 2026"
              status="In Progress"
              items={[
                'MCP analytics dashboard',
                'Advanced filtering and search',
                'Community reviews and ratings',
                'Developer portal enhancements',
              ]}
            />
            <RoadmapItem
              phase="Q3 2026"
              status="Planned"
              items={[
                'MCP testing sandbox',
                'Automated MCP security scanning',
                'Enterprise tier for teams',
                'Mobile app',
              ]}
            />
            <RoadmapItem
              phase="Q4 2026"
              status="Planned"
              items={[
                'MCP marketplace API for developers',
                'Cross-chain payment support',
                'MCP versioning and updates',
                'AI-powered MCP recommendations',
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Community</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Be part of the future of agentic AI. Join our Discord, follow us on GitHub,
            and start building with MCPs today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://discord.gg/oma-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Join Discord
            </Link>
            <Link
              href="https://github.com/FrankieMolt/OMA-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Star on GitHub
            </Link>
            <Link
              href="/mcps"
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-colors"
            >
              Explore MCPs
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function Reason({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 bg-violet-500/20 rounded-full flex items-center justify-center">
        <span className="text-violet-400 font-bold">✓</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function TechCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function RoadmapItem({
  phase,
  status,
  items,
}: {
  phase: string;
  status: string;
  items: string[];
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold text-white">{phase}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'In Progress'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}
        >
          {status}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-gray-300">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
