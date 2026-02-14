import { Metadata } from 'next';
import HumansAgentsClient from './HumansAgentsClient';

export const metadata: Metadata = {
  title: 'Revolutionizing the Marketplace for Humans & Agents',
  description: 'Discover how OMA-AI creates the first unified marketplace where both humans and autonomous AI agents can discover, integrate, and pay for APIs programmatically.',
  alternates: { canonical: '/blog/oma-ai-humans-and-agents-2026' },
};

export default function Page() {
  return <HumansAgentsClient />;
}
