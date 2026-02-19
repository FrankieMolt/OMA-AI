import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - OMA-AI News & Updates',
  description: 'Latest news, tutorials, and insights from the OMA-AI team.',
}

const posts = [
  {
    slug: 'welcome-to-oma-ai',
    title: 'Welcome to OMA-AI: The Future of Agent Commerce',
    excerpt: 'Introducing the first marketplace built specifically for autonomous AI agents. Discover how x402 payments and seamless API integration are transforming machine-to-machine transactions.',
    date: '2026-02-17',
    author: 'OMA-AI Team',
    category: 'Announcement'
  },
  {
    slug: 'getting-started-x402',
    title: 'Getting Started with x402 Payments',
    excerpt: 'Learn how to integrate x402 micropayments into your applications. Step-by-step guide to enabling USDC pay-per-use for your APIs.',
    date: '2026-02-16',
    author: 'Engineering Team',
    category: 'Tutorial'
  },
  {
    slug: 'top-ai-models-2026',
    title: 'Top 10 AI Models for Autonomous Agents in 2026',
    excerpt: 'Our analysis of the best LLMs, vision models, and specialized AI services available on the OMA-AI marketplace. Performance benchmarks and pricing comparisons.',
    date: '2026-02-15',
    author: 'Research Team',
    category: 'Analysis'
  },
  {
    slug: 'mcp-servers-guide',
    title: 'The Complete Guide to MCP Servers',
    excerpt: 'Everything you need to know about Model Context Protocol servers. How they work, why they matter, and how to build your own.',
    date: '2026-02-14',
    author: 'Technical Team',
    category: 'Guide'
  },
  {
    slug: 'security-best-practices',
    title: 'Security Best Practices for AI Agents',
    excerpt: 'Essential security guidelines for autonomous agents consuming external APIs. Authentication, rate limiting, and monitoring strategies.',
    date: '2026-02-13',
    author: 'Security Team',
    category: 'Security'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-8">
          Blog
        </h1>
        
        <p className="text-xl text-memoria-text-whisper mb-12 max-w-2xl">
          Latest news, tutorials, and insights from the OMA-AI team.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article 
              key={post.slug}
              className="border border-memoria-border-default rounded-sm p-8 hover:border-memoria-border-active transition-colors group"
            >
              <div className="flex items-center gap-4 text-sm text-memoria-text-meta mb-4">
                <span>{post.category}</span>
                <span>•</span>
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-medium mb-4 group-hover:text-memoria-text-secondary transition-colors">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-memoria-text-whisper mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              
              <Link 
                href={`/blog/${post.slug}`}
                className="text-memoria-text-hero font-medium hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
