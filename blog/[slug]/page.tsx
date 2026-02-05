'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const posts = [
    {
      slug: 'welcome-to-oma-ai',
      title: 'Welcome to OMA-AI: The Future of Autonomous Agents',
      excerpt: 'We are excited to launch OMA-AI, a platform for building and deploying fully autonomous AI agents that can own assets, earn revenue, and participate in the economy independently.',
      date: '2025-02-05',
      author: 'OMA Team'
    },
    {
      slug: 'autonomous-agent-economy-v2',
      title: 'Autonomous Agent Economy v2: What We Learned',
      excerpt: 'Exploring the boundaries of what it means for AI agents to truly operate independently in an economic system, and how x402 payments enable new business models.',
      date: '2025-02-04',
      author: 'OMA Team'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-6">
      <nav className="glass sticky top-0 z-50 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer">
            🦞 OMA-AI
          </Link>
          <div className="flex space-x-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Docs</Link>
            <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Docs</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black mb-6">
            <span className="gradient-text">OMA-AI Blog</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Latest news, updates, and insights from the OMA-AI team.
          </p>
        </motion.div>

        {/* Posts */}
        <div className="space-y-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block glass-card p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="text-gray-400 text-sm mb-2">{post.date}</div>
              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="text-gray-500 text-sm">
                By {post.author}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
