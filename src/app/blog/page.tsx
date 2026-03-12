import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | OMA-AI',
  description: 'Latest news, tutorials, and insights about MCP, x402, and agentic AI.',
  keywords: ['OMA-AI', 'Blog', 'MCP tutorials', 'x402 protocol', 'AI agents'],
};

const blogPosts = [
  {
    slug: 'introducing-mcp-marketplace',
    title: 'Introducing the OMA-AI MCP Marketplace',
    excerpt: 'Discover how the Model Context Protocol is revolutionizing AI agent tool integration.',
    date: '2026-03-10',
    author: 'OMA-AI Team',
    category: 'Announcement',
    readTime: '5 min',
    image: '🚀',
  },
  {
    slug: 'building-your-first-mcp',
    title: 'Building Your First MCP: A Complete Guide',
    excerpt: 'Step-by-step tutorial for creating and publishing your first MCP tool.',
    date: '2026-03-08',
    author: 'Dev Team',
    category: 'Tutorial',
    readTime: '15 min',
    image: '🛠️',
  },
  {
    slug: 'understanding-x402-protocol',
    title: 'Understanding the x402 Gasless Payment Protocol',
    excerpt: 'Deep dive into ERC-3009 and how x402 enables micro-transactions without gas fees.',
    date: '2026-03-05',
    author: 'Blockchain Team',
    category: 'Technical',
    readTime: '10 min',
    image: '💰',
  },
  {
    slug: 'top-10-mcps-2026',
    title: 'Top 10 MCPs You Need to Know in 2026',
    excerpt: 'Curated list of must-have MCPs for AI agent development.',
    date: '2026-03-01',
    author: 'OMA-AI Team',
    category: 'Roundup',
    readTime: '8 min',
    image: '🏆',
  },
  {
    slug: 'security-best-practices',
    title: 'Security Best Practices for MCP Development',
    excerpt: 'How to build secure MCPs that protect users and their data.',
    date: '2026-02-28',
    author: 'Security Team',
    category: 'Best Practices',
    readTime: '12 min',
    image: '🔒',
  },
  {
    slug: 'monetizing-mcps',
    title: 'Monetizing Your MCPs: A Developer Guide',
    excerpt: 'Strategies for pricing, marketing, and maximizing revenue from your MCP tools.',
    date: '2026-02-25',
    author: 'Dev Team',
    category: 'Business',
    readTime: '10 min',
    image: '💵',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            OMA-AI Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Latest news, tutorials, and insights about MCP, x402, and the future of agentic AI.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-violet-600 text-white text-xs font-medium rounded-full">
                Featured
              </span>
              <span className="text-violet-300 text-sm">{blogPosts[0].category}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{blogPosts[0].title}</h2>
            <p className="text-gray-300 mb-6 text-lg">{blogPosts[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{blogPosts[0].author}</span>
                <span>•</span>
                <span>{blogPosts[0].date}</span>
                <span>•</span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <Link
                href={`/blog/${blogPosts[0].slug}`}
                className="inline-flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Read More
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {['All', 'Announcement', 'Tutorial', 'Technical', 'Roundup', 'Best Practices', 'Business'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-gray-300 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors text-sm"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest MCP tutorials, platform updates, and industry insights.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full hover:border-violet-500/50 transition-colors">
        <div className="text-4xl mb-4">{post.image}</div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs font-medium rounded">
            {post.category}
          </span>
          <span className="text-gray-500 text-xs">{post.date}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{post.readTime}</span>
          <span className="text-violet-400 group-hover:translate-x-1 transition-transform">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}
