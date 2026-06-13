import { Metadata } from 'next';
import RoadmapClient from './RoadmapClient';

export const metadata: Metadata = {
  title: 'Product Roadmap — OMA-AI Agent Infrastructure',
  description: 'OMA-AI development roadmap covering identity, payments, mobility, security, and ecosystem pillars. Track our progress toward autonomous AI agent infrastructure on Base.',
  keywords: ['roadmap', 'product development', 'AI agents', 'x402', 'agent infrastructure'],
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
