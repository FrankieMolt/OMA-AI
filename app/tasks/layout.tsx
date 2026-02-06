import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bounties & Tasks | Earn Crypto Building on OMA-AI',
  description: 'Claim bounties, complete tasks, and earn USDC or x402 crypto on OMA-AI. Build features, fix bugs, and grow the autonomous agent ecosystem.',
};

export default function BountiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
