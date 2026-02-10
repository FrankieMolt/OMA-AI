/**
 * Blog Page - SpendThrone Blog
 */

import { Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of Buying Things That Don't Exist",
    excerpt: "A comprehensive guide to purchasing quantum-locked safes, time travel insurance, and other products that defy conventional physics.",
    date: "2026-02-08",
    category: "Shopping Guide",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Why Your Cat Needs a Neural Interface",
    excerpt: "Understanding the revolutionary technology behind brain-computer interfaces for pets and what Mr. Whiskers is really thinking.",
    date: "2026-02-05",
    category: "Pet Tech",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Levitating Furniture: A Design Revolution",
    excerpt: "How magnetic levitation is changing interior design and why your desk should defy gravity.",
    date: "2026-02-01",
    category: "Interior Design",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "The Ethics of AI-Powered Haunted Dolls",
    excerpt: "Exploring the philosophical implications of artificial intelligence in traditionally supernatural products.",
    date: "2026-01-28",
    category: "Deep Thoughts",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Gravity Reduction: Fitness Game Changer",
    excerpt: "How antigravity yoga mats are revolutionizing wellness and making impossible poses possible.",
    date: "2026-01-25",
    category: "Wellness",
    readTime: "4 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          ← Back to Marketplace
        </Link>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <BookOpen size={10} />
            Latest Stories
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9] uppercase italic">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">Blog</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Stories from the edge of commerce, technology, and pure weirdness.
          </p>
        </header>

        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:border-purple-500/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {post.category}
                </span>
                <span className="text-zinc-600 text-sm">{post.date}</span>
                <span className="text-zinc-600 text-sm">•</span>
                <span className="text-zinc-600 text-sm">{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-3xl text-center">
          <Sparkles className="mx-auto mb-4 text-purple-400" size={32} />
          <p className="text-xl font-bold text-white mb-2">Want more weirdness?</p>
          <p className="text-zinc-500 mb-6">Subscribe to our newsletter for the strangest product drops.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
