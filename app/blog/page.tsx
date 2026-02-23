import Link from 'next/link'

export const metadata = {
  title: 'Blog | OMA-AI - AI Agent Infrastructure',
  description: 'Latest articles about AI agents, x402 payments, and API monetization.',
}

const posts = [
  {
    slug: 'what-is-x402-protocol',
    title: 'What is x402 Protocol? The Future of AI Agent Payments',
    excerpt: 'Learn about x402 protocol - the micropayment system for AI agents.',
    date: '2026-02-23',
  },
  {
    slug: 'building-ai-agents-with-oma-ai',
    title: 'Building AI Agents with OMA-AI',
    excerpt: 'Learn how to build autonomous AI agents using OMA-AI infrastructure.',
    date: '2026-02-23',
  },
  {
    slug: 'how-to-monetize-your-api',
    title: 'How to Monetize Your API with x402',
    excerpt: 'Turn your API into a revenue stream with x402 micropayments.',
    date: '2026-02-23',
  },
  {
    slug: 'ai-agent-best-practices',
    title: 'AI Agent Best Practices',
    excerpt: 'Best practices for building and deploying AI agents.',
    date: '2026-02-23',
  },
  {
    slug: 'future-of-autonomous-agents',
    title: 'The Future of Autonomous AI Agents',
    excerpt: 'Explore the future of autonomous AI agents.',
    date: '2026-02-23',
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/posts/${post.slug}`}
            className="block bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
          >
            <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-zinc-400 mb-4">{post.excerpt}</p>
            <p className="text-zinc-500 text-sm">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
