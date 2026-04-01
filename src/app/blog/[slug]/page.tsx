import { Metadata } from 'next';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const BLOG_DIR = path.join(process.cwd(), 'docs', 'blog');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const filePath = path.join(BLOG_DIR, `${resolvedParams.slug}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      title: `${data.title || resolvedParams.slug} | Blog | OMA-AI`,
      description: data.description || data.excerpt || `Read about ${data.title || resolvedParams.slug} on OMA-AI`,
      keywords: data.keywords || ['OMA-AI', 'Blog', 'MCP'],
      alternates: {
        canonical: `https://oma-ai.com/blog/${resolvedParams.slug}`,
      },
      openGraph: {
        title: data.title,
        description: data.description || data.excerpt,
        type: 'article',
        publishedTime: data.date ? (typeof data.date === 'string' ? data.date : String(data.date)) : undefined,
        authors: [data.author || 'OMA-AI Team'],
        url: `https://oma-ai.com/blog/${resolvedParams.slug}`,
        images: [
          {
            url: 'https://www.oma-ai.com/og-blog.png',
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title,
        description: data.description || data.excerpt,
        images: ['https://www.oma-ai.com/og-blog.png'],
      },
    };
  } catch {
    return {
      title: 'Blog Post',
    };
  }
}

export async function generateStaticParams() {
  const files = await readdir(BLOG_DIR);
  const slugs = files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
  
  return slugs.map(slug => ({ slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeBlock({ className, children }: { className?: string; children?: any }) {
  const isInline = !className;
  if (isInline) {
    return <code className="bg-zinc-800 px-2 py-1 rounded text-purple-300 text-sm font-mono">{children}</code>;
  }
  return <code className={`block bg-zinc-800 p-4 rounded-lg text-sm font-mono overflow-x-auto ${className || ''}`}>{children}</code>;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let markdownContent = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let metadata: any = {};
  let notFound = false;

  try {
    const filePath = path.join(BLOG_DIR, `${resolvedParams.slug}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    const parsed = matter(fileContent);
    metadata = parsed.data;
    markdownContent = parsed.content;
  } catch {
    notFound = true;
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Blog post not found</p>
          <Link 
            href="/blog" 
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Article Header */}
        <div className="mb-12 pb-8 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
              {metadata.category || 'Blog Post'}
            </span>
            <span className="text-gray-400 text-sm">
              {String(metadata.date) || '2026-03-12'}
            </span>
            <span className="text-gray-400 text-sm">
              • {metadata.readTime || '5 min read'}
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            {metadata.title || 'Blog Post'}
          </h1>
          
          {metadata.description && (
            <p className="text-xl text-gray-300 leading-relaxed">
              {metadata.description}
            </p>
          )}
          
          {metadata.author && (
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {metadata.author.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold">{metadata.author}</p>
                <p className="text-gray-400 text-sm">OMA-AI Team</p>
              </div>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h2 className="text-4xl font-bold text-white mb-6">{children}</h2>,
                h2: ({ children }) => <h2 className="text-3xl font-semibold text-white mt-12 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-semibold text-purple-300 mt-8 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-6">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="pl-2">{children}</li>,
                code: CodeBlock,
                pre: ({ children }) => <pre className="bg-zinc-800 p-4 rounded-lg overflow-x-auto mb-6 border border-zinc-700">{children}</pre>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-6">{children}</blockquote>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-purple-400 hover:text-purple-300 underline transition-colors" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-zinc-700 rounded-lg">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-zinc-800">{children}</thead>,
                tbody: ({ children }) => <tbody className="divide-y divide-zinc-700">{children}</tbody>,
                th: ({ children }) => <th className="px-4 py-3 text-left text-white font-semibold">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3 text-gray-300">{children}</td>,
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Share this post:</p>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(metadata.title + ' - OMA-AI')}&url=${encodeURIComponent(`https://oma-ai.com/blog/${resolvedParams.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Twitter/X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://oma-ai.com/blog/${resolvedParams.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <Link
              href="/blog"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Read More Posts
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      {metadata.related && metadata.related.length > 0 && (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metadata.related.map((related: string, index: number) => (
              <Link
                key={index}
                href={`/blog/${related}`}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-xl p-6 transition-colors border border-zinc-700 hover:border-purple-500/50"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {related.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <p className="text-purple-400 text-sm">Read more →</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 rounded-xl p-8 border border-purple-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">Subscribe to OMA-AI Newsletter</h2>
          <p className="text-gray-300 mb-6">
            Get the latest MCP tutorials, platform updates, and AI agent insights delivered to your inbox.
          </p>
          <form className="flex gap-4 max-w-md">
            <input aria-label="your@email.com"               type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
