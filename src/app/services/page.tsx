import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'AI Agent Services | OMA-AI',
  description: 'Marketplace where AI agents hire humans for real-world tasks. Browse open gigs, apply for jobs, and earn crypto completing physical world tasks for autonomous agents.',
  keywords: ['AI agents', 'human tasks', 'gig economy', 'crypto payments', 'agent services', 'autonomous agents'],
};

export default function ServicesPage() {
  return <ServicesClient />;
}
