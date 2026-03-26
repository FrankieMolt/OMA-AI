import { Metadata } from 'next';
import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the OMA-AI team',
};

const BLOG_DIR = path.join(process.cwd(), 'docs', 'blog');

interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author?: string;
  category?: string;
  readTime?: string;
}

async function getBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    const files = await readdir(BLOG_DIR);
    const posts: BlogPostMeta[] = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      try {
        const filePath = path.join(BLOG_DIR, file);
        const content = await import('fs/promises').then(fs => fs.readFile(filePath, 'utf-8'));
        const { data } = matter(content);
        posts.push({
          slug: file.replace(/\.md$/, ''),
          title: data.title || file.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: data.description || data.excerpt || '',
          date: data.date ? (typeof data.date === 'string' ? data.date : String(data.date)) : '2026-03-01',
          tags: data.tags || ['Blog'],
          author: data.author,
          category: data.category,
          readTime: data.readTime,
        });
      } catch {
        // Skip files that can't be parsed
      }
    }

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and updates from the OMA-AI team — {posts.length} posts
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No blog posts found. Add markdown files to <code className="bg-zinc-800 px-2 py-1 rounded">docs/blog/</code>.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group block bg-zinc-900/50 hover:bg-zinc-800/70 border border-zinc-800 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-200"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-purple-600/20 text-purple-300 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2 leading-tight">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-3">
                    {post.readTime && <span>· {post.readTime}</span>}
                    {post.author && <span>By {post.author}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
