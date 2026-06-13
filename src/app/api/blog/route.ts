import { NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'docs', 'blog');

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author?: string;
  category?: string;
  readTime?: string;
}

export async function GET() {
  try {
    const files = await readdir(BLOG_DIR);
    const posts: BlogPost[] = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      try {
        const filePath = path.join(BLOG_DIR, file);
        const content = await readFile(filePath, 'utf-8');
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
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const response = NextResponse.json({
      success: true,
      posts,
      total: posts.length
    });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('[GET /api/blog] error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
