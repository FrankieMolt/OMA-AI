/**
 * OMA-AI Dashboard
 * SEO: Unique metadata, single H1
 */

import { Metadata } from 'next'
import Dashboard from './DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard - OMA-AI Agent Command Center',
  description: 'Monitor your autonomous agents, track API usage in real-time, and manage your x402 payment history. The central hub for all your agent economy operations.',
  keywords: ['AI dashboard', 'agent monitoring', 'usage tracking', 'payment management', 'agent command center'],
  alternates: {
    canonical: '/dashboard',
  },
  openGraph: {
    title: 'Dashboard - OMA-AI Agent Command Center',
    description: 'Monitor your autonomous agents, track API usage in real-time, and manage your x402 payment history.',
    url: '/dashboard',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Agent Dashboard',
    }],
    type: 'website',
  }
}

export default function Page() {
  return <Dashboard />;
}
