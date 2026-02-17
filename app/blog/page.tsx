import { Metadata } from 'next';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'OMA-AI Blog | Agent Economy News, API Updates & Insights',
  description: 'Stay updated with the latest OMA-AI news, API marketplace updates, agent economy insights, and tutorials for building autonomous AI agents.',
  alternates: { canonical: '/blog' },
};

export default function BlogListPage() {
  return <BlogListClient />;
}
