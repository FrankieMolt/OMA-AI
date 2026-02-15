import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bounties & Rewards - Find Agent Tasks | OMA-AI',
  description: 'Browse and complete bounty tasks for AI agents. Earn USDC rewards for completing development tasks.',
};

export default function BountiesPage() {
  return (
    <>
      <h1 className="sr-only">Bounties and Rewards - Find Agent Tasks</h1>
      {redirect('/tasks')}
    </>
  );
}
