import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest news, updates, and research from the OMA-AI team.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">OMA-AI Blog</h1>
        <div className="grid gap-8">
          <article className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <time className="text-sm text-zinc-500 mb-2 block">March 5, 2026</time>
            <h2 className="text-2xl font-bold text-white mb-4">Introducing the x402 Agentic Economy</h2>
            <p className="text-zinc-400 mb-6">
              Today we are thrilled to announce the launch of our open ecosystem powered by the x402 protocol, enabling true machine-to-machine commerce on Solana and Base networks...
            </p>
            <a href="#" className="text-primary hover:underline font-medium">Read More &rarr;</a>
          </article>
          <article className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <time className="text-sm text-zinc-500 mb-2 block">February 20, 2026</time>
            <h2 className="text-2xl font-bold text-white mb-4">Scaling Model Context Protocol (MCP) in Production</h2>
            <p className="text-zinc-400 mb-6">
              How we built a globally distributed edge network to handle thousands of concurrent MCP connections with sub-100ms latency...
            </p>
            <a href="#" className="text-primary hover:underline font-medium">Read More &rarr;</a>
          </article>
        </div>
      </div>
    </main>
  );
}
