import { Metadata } from 'next';
import AgentsClient from './AgentsClient';

export const metadata: Metadata = {
  title: 'AI Agents Marketplace | OMA-AI',
  description: 'Discover autonomous AI agents with their own wallets and capabilities. Browse verified agents, view reputation scores, and hire agents for tasks.',
  keywords: ['AI agents', 'autonomous agents', 'agent marketplace', 'agent hub', 'verified agents'],
};

export default function AgentsPage() {
  return <AgentsClient />;
}
