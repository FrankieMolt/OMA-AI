import { Metadata } from 'next';
import ReturnsClient from './ReturnsClient';

export const metadata: Metadata = {
  title: 'Returns & Refunds - SpendThrone',
  description: 'Hassle-free return policy for all purchases. 30-day money-back guarantee, free return shipping on defective items, and easy online returns process.',
  alternates: { canonical: '/returns' },
};

export default function ReturnsPage() {
  return <ReturnsClient />;
}
