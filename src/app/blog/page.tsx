import { Metadata } from 'next';
import Link from 'next/link';



export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the OMA-AI team',
};

// Hardcoded blog posts (read from docs/blog/*.md at build time)
// These are statically defined for production reliability
const BLOG_POSTS = [
  { slug: 'building-your-first-mcp', title: 'Building Your First MCP Server', description: 'Learn how to build a Model Context Protocol server from scratch and connect it to AI agents.', date: '2026-03-12', tags: ['Tutorial', 'MCP'] },
  { slug: 'how-to-monetize-your-mcps', title: 'How to Monetize Your MCPs with x402 Payments', description: 'A comprehensive guide to accepting gasless micropayments for your MCP services on Base network.', date: '2026-03-11', tags: ['Business', 'x402'] },
  { slug: 'mcp-security-checklist', title: 'MCP Security Best Practices Checklist', description: 'Essential security practices for deploying production-ready MCP servers with authentication and rate limiting.', date: '2026-03-10', tags: ['Security', 'Best Practices'] },
  { slug: 'multi-chain-wallet-management', title: 'Multi-Chain Wallet Management for AI Agents', description: 'Implementing unified wallet abstraction across Solana, Ethereum, and Base for autonomous AI agents.', date: '2026-03-09', tags: ['Wallets', 'Blockchain'] },
  { slug: 'oma-ai-2026-roadmap', title: 'OMA-AI 2026 Roadmap: Building the MCP Economy', description: 'Our vision for the future of AI agent monetization and the MCP marketplace ecosystem.', date: '2026-03-08', tags: ['Product', 'Roadmap'] },
  { slug: 'oma-ai-vs-competitors-2026', title: 'OMA-AI vs Competitors: A 2026 Comparison', description: 'How OMA-AI compares to other MCP marketplaces and AI agent platforms in features, pricing, and developer experience.', date: '2026-03-07', tags: ['Comparison', 'Marketplace'] },
  { slug: 'real-time-analytics-dashboard', title: 'Building a Real-Time Analytics Dashboard', description: 'Create live dashboards with streaming data from multiple AI agent interactions using OMA-AI MCPs.', date: '2026-03-06', tags: ['Tutorial', 'Analytics'] },
  { slug: 'security-best-practices-for-mcps', title: 'Security Best Practices for AI Agents', description: 'Protecting AI agents from prompt injection, data leakage, and unauthorized access in production deployments.', date: '2026-03-05', tags: ['Security', 'AI Agents'] },
  { slug: 'success-stories-real-revenue', title: 'Success Stories: Real Revenue from MCPs', description: 'Case studies of developers earning substantial revenue through the OMA-AI MCP marketplace.', date: '2026-03-04', tags: ['Business', 'Case Study'] },
  { slug: 'supabase-integration', title: 'Integrating OMA-AI with Supabase', description: 'Step-by-step guide to combining OMA-AI MCP marketplace with Supabase for full-stack AI applications.', date: '2026-03-03', tags: ['Tutorial', 'Integration'] },
  { slug: 'top-10-mcps-2026', title: 'Top 10 MCPs for AI Agents in 2026', description: 'Our curated list of the most powerful Model Context Protocol servers for building AI agents this year.', date: '2026-03-02', tags: ['MCP', 'AI Agents'] },
  { slug: 'understanding-x402-payments', title: 'Understanding x402: The Future of Micropayments', description: 'How x402 payment headers enable gasless, instant micropayments for AI services on any blockchain.', date: '2026-03-01', tags: ['x402', 'Payments'] },
  { slug: 'quick-start-5-minutes', title: 'Quick Start: OMA-AI in 5 Minutes', description: 'Get up and running with OMA-AI MCP marketplace in just 5 minutes with our beginner-friendly guide.', date: '2026-02-28', tags: ['Quick Start', 'Tutorial'] },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and updates from the OMA-AI team — {BLOG_POSTS.length} posts
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group block bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">by OMA-AI Team</span>
                <span className="text-primary text-sm font-semibold group-hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
