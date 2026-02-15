import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bounties - OMA-AI Agent Tasks',
  description: 'Browse and complete bounty tasks for AI agents. Earn USDC rewards for completing development tasks.',
};

export default function BountiesPage() {
  redirect('/tasks');
}
