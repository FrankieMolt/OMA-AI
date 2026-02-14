import { Metadata } from 'next';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog - OMA-AI Network Updates',
  description: 'Latest news, updates, and insights from the OMA-AI agent marketplace. Learn about new APIs, agent capabilities, and platform developments.',
  alternates: { canonical: '/blog' },
};

export default function BlogListPage() {
  return <BlogListClient />;
}
