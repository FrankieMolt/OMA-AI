import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Introducing the OMA-AI MCP Marketplace | OMA-AI Blog',
  description: 'Discover how the Model Context Protocol is revolutionizing AI agent tool integration with the OMA-AI marketplace.',
  keywords: ['MCP', 'Model Context Protocol', 'OMA-AI', 'AI agents', 'marketplace'],
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <article className="container mx-auto px-4 max-w-4xl py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/20 text-violet-300 text-sm font-medium rounded-full mb-4">
            <span>📢 Announcement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Introducing the OMA-AI MCP Marketplace
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <span>OMA-AI Team</span>
            <span>•</span>
            <span>March 10, 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Today, we're thrilled to announce the launch of the <strong>OMA-AI MCP Marketplace</strong>—the premier
            destination for discovering, integrating, and monetizing MCP (Model Context Protocol) tools for AI agents.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What is MCP?</h2>
          <p className="text-gray-300 leading-relaxed">
            The Model Context Protocol is an open standard that enables AI agents to connect to external tools and data sources.
            Think of MCP as a universal API that allows AI assistants like Claude Desktop, OpenAI agents, and other
            AI systems to access capabilities beyond their built-in features.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 my-8">
            <p className="text-violet-300 font-semibold mb-4">Key Benefits of MCP:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Standardized Interface:</strong> One protocol for all tools</li>
              <li><strong>Type-Safe:</strong> Schema definitions for inputs/outputs</li>
              <li><strong>Flexible Transport:</strong> Supports stdio, SSE, and WebSocket</li>
              <li><strong>Secure:</strong> Built-in authentication and authorization</li>
              <li><strong>Scalable:</strong> Handle millions of API calls</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Introducing OMA-AI</h2>
          <p className="text-gray-300 leading-relaxed">
            OMA-AI is built on a simple mission: <strong>Give AI agents universal access to the world's tools and services.</strong>
            Our marketplace provides a centralized platform where developers can discover high-quality MCPs and where creators can
            monetize their tools through a transparent, low-fee system.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What Sets OMA-AI Apart?</h2>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">1. 5% Platform Fee (Industry Best)</h3>
          <p className="text-gray-300 leading-relaxed">
            Most platforms charge 10-20% in fees. We've committed to just 5%, meaning developers keep more of their revenue.
            For every $100 earned, you receive <strong>$95</strong> instead of $80-90.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">2. Gasless Payments via x402</h3>
          <p className="text-gray-300 leading-relaxed">
            Built on the x402 protocol, our payment system enables micro-transactions without gas fees. Users can pay for
            API calls per-use without worrying about wallet gas, making micro-payments practical and affordable.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">3. Official MCPs Included</h3>
          <p className="text-gray-300 leading-relaxed">
            We're shipping with 7 official MCPs available out of the box:
          </p>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <span className="text-2xl">📁</span>
              <h4 className="font-semibold text-white mt-2">Filesystem</h4>
              <p className="text-sm text-gray-400 mt-1">Read/write files, directories</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <span className="text-2xl">🌐</span>
              <h4 className="font-semibold text-white mt-2">Fetch</h4>
              <p className="text-sm text-gray-400 mt-1">HTTP requests, web fetching</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <span className="text-2xl">🔀</span>
              <h4 className="font-semibold text-white mt-2">Git</h4>
              <p className="text-sm text-gray-400 mt-1">Version control operations</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <span className="text-2xl">🧠</span>
              <h4 className="font-semibold text-white mt-2">Memory</h4>
              <p className="text-sm text-gray-400 mt-1">Persistent storage for agents</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">4. Better Developer Experience</h3>
          <p className="text-gray-300 leading-relaxed">
            Our 4-step publish wizard makes it easy to get your MCPs listed. Real-time analytics help you understand usage patterns,
            and comprehensive documentation provides everything you need to get started.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">5. Multi-Chain Support</h3>
          <p className="text-gray-300 leading-relaxed">
            Receive payouts in USDC on either Base or Solana networks. Connect your preferred wallet and get paid monthly.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Getting Started</h2>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">For Users</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300">
            <li>Create your free account at <a href="https://www.oma-ai.com/signup" className="text-violet-400 hover:underline">oma-ai.com/signup</a></li>
            <li>Browse the <a href="/mcps" className="text-violet-400 hover:underline">MCP marketplace</a></li>
            <li>Connect your wallet for x402 payments</li>
            <li>Start using MCPs in your AI agents</li>
          </ol>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">For Developers</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300">
            <li>Sign up and complete your profile</li>
            <li>Visit the <a href="/publish" className="text-violet-400 hover:underline">Publish MCP</a> page</li>
            <li>Complete the 4-step wizard</li>
            <li>Submit for review</li>
            <li>Start earning from API calls!</li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What's Next?</h2>
          <p className="text-gray-300 leading-relaxed">
            This is just the beginning. Our roadmap includes advanced MCP analytics, a testing sandbox, mobile apps,
            and AI-powered recommendations for discovering the perfect MCPs for your use case.
          </p>

          <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl p-8 my-8">
            <h3 className="text-2xl font-bold text-white mb-4">Join the Revolution</h3>
            <p className="text-gray-300 mb-6">
              Be part of the future of agentic AI. Join thousands of developers already building and monetizing
              MCP tools on OMA-AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/mcps"
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-semibold"
              >
                Explore MCPs
              </Link>
              <Link
                href="/publish"
                className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-semibold"
              >
                Publish Your MCP
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Resources</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><a href="/docs" className="text-violet-400 hover:underline">Documentation</a></li>
            <li><a href="/docs/FAQ" className="text-violet-400 hover:underline">FAQ</a></li>
            <li><a href="https://github.com/FrankieMolt/OMA-AI" className="text-violet-400 hover:underline">GitHub Repository</a></li>
            <li><a href="https://discord.gg/oma-ai" className="text-violet-400 hover:underline">Discord Community</a></li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Blog
            </Link>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/intent/tweet?text=Check%20out%20the%20new%20OMA-AI%20MCP%20Marketplace!%20oma-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Share on Twitter
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
