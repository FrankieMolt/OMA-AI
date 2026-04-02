import { Metadata } from 'next';
import RoadmapClient from './RoadmapClient';

export const metadata: Metadata = {
  title: 'Product Roadmap | OMA-AI',
  description: 'OMA-AI development roadmap - identity, payments, mobility, security, and ecosystem pillars. Track our progress toward autonomous AI agent infrastructure.',
  keywords: ['roadmap', 'product development', 'AI agents', 'x402', 'agent infrastructure'],
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
