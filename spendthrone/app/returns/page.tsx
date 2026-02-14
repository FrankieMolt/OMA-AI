import { Metadata } from 'next';
import ReturnsClient from './ReturnsClient';

export const metadata: Metadata = {
  title: 'Returns & Refunds - OMA-AI',
  description: 'Hassle-free return policy for all purchases. 30-day window for refunds, instant credit for exchanges, and clear guidelines for damaged or incorrect items.',
  alternates: { canonical: '/returns' },
};

export default function ReturnsPage() {
  return <ReturnsClient />;
}
