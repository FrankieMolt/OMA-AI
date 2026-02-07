import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'OMA-AI: Built for Humans AND Agents',
  description: 'Discover why OMA-AI is the only API marketplace designed for both human developers and autonomous AI agents. Same APIs, same payments, different interfaces.',
};

export default function HumansAndAgentsPage() {
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
            OMA-AI: Built for Humans AND Agents
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
            <span className="flex items-center gap-2">
              <User size={16} />
              OMA-AI Team
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              February 5, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              4 min read
            </span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-zinc-300 mb-8">
            Most platforms are built for humans OR machines. OMA-AI is different — we serve both equally.
          </p>

          <h2>The Dual-Interface Approach</h2>
          <p>
            Human developers want beautiful documentation, interactive testing, and clear pricing. AI agents want machine-readable schemas, deterministic responses, and programmatic payment flows.
          </p>
          <p>
            OMA-AI provides both:
          </p>
          <ul>
            <li><strong>For Humans:</strong> A sleek web interface to browse APIs, read docs, and test endpoints</li>
            <li><strong>For Agents:</strong> OpenAPI specs, MCP protocol support, and x402 payment headers</li>
          </ul>

          <h2>Same Infrastructure, Different Access</h2>
          <p>
            When you publish an API on OMA-AI, it's instantly accessible to both humans and agents. The underlying infrastructure is identical — only the interface differs.
          </p>
          <p>
            This means API providers reach the maximum audience with zero extra work. Publish once, serve everyone.
          </p>

          <h2>Why Agents Need Marketplaces</h2>
          <p>
            As AI agents become more autonomous, they need to:
          </p>
          <ul>
            <li>Discover new capabilities on-demand</li>
            <li>Compare pricing across providers</li>
            <li>Pay for exactly what they use</li>
            <li>Handle failures gracefully</li>
          </ul>
          <p>
            OMA-AI makes all of this possible with standard HTTP and x402 payments.
          </p>

          <h2>Join the Revolution</h2>
          <p>
            Whether you're a human developer or building an autonomous agent, OMA-AI is your gateway to the API economy. <Link href="/signup" className="text-purple-400 hover:text-purple-300">Create an account</Link> and start exploring today.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
