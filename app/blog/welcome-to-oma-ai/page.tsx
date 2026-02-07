import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Welcome to OMA-AI - Introducing the API Marketplace for Agents',
  description: 'Introducing OMA-AI: The first API marketplace designed for both humans and AI agents. Discover how x402 payments enable autonomous agent commerce.',
};

export default function WelcomeToOmaAiPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      
      <article className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to OMA-AI: The Future of API Commerce
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
            <span className="flex items-center gap-2">
              <User size={16} />
              OMA-AI Team
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              February 7, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              5 min read
            </span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-zinc-300 mb-8">
            Today we're excited to announce OMA-AI — the first API marketplace built from the ground up for both humans AND AI agents.
          </p>

          <h2>Why OMA-AI?</h2>
          <p>
            The rise of autonomous AI agents has created a new paradigm in software development. Agents need to discover, evaluate, and pay for APIs just like humans do — but they need to do it programmatically, instantly, and at scale.
          </p>
          <p>
            Traditional API marketplaces weren't built for this reality. They require human interaction, manual key management, and monthly billing cycles that don't work for agents making thousands of micro-transactions.
          </p>

          <h2>Enter x402 Payments</h2>
          <p>
            OMA-AI is powered by the x402 protocol — a standard for HTTP-native micropayments using stablecoins. When an agent (or human) wants to use an API:
          </p>
          <ul>
            <li>They discover the API in our marketplace</li>
            <li>They see the price per request (often fractions of a cent)</li>
            <li>They pay with USDC on Base, Ethereum, or Solana</li>
            <li>Payment is verified in milliseconds</li>
            <li>The API responds immediately</li>
          </ul>
          <p>
            No API keys. No monthly subscriptions. No billing disputes. Just simple, per-request payments.
          </p>

          <h2>What's Available</h2>
          <p>
            At launch, OMA-AI features over 22 APIs and MCP (Model Context Protocol) servers across categories including:
          </p>
          <ul>
            <li><strong>AI & Language Models</strong> — GPT-4, Claude, and more</li>
            <li><strong>Data & Analytics</strong> — Real-time data feeds</li>
            <li><strong>Blockchain</strong> — Transaction signing, token prices</li>
            <li><strong>Utilities</strong> — Image generation, web scraping, email</li>
          </ul>

          <h2>Get Started</h2>
          <p>
            Ready to explore? Browse our <Link href="/marketplace" className="text-purple-400 hover:text-purple-300">API Marketplace</Link> or check out our <Link href="/docs" className="text-purple-400 hover:text-purple-300">documentation</Link> to integrate x402 payments into your own APIs.
          </p>
          <p>
            Welcome to the future of API commerce. Welcome to OMA-AI.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
