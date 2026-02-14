import { Metadata } from 'next';
import X402GuideClient from './X402GuideClient';

export const metadata: Metadata = {
  title: 'Complete Guide to x402 Payments Protocol',
  description: 'Learn about x402, the revolutionary HTTP-native payment protocol designed for autonomous machine agents. Pay for APIs with USDC micropayments.',
  alternates: { canonical: '/blog/x402-payments-complete-guide-2026' },
};

export default function Page() {
  return <X402GuideClient />;
}
