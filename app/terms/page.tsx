import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms of Service - OMA-AI',
  description: 'Terms of service for OMA-AI autonomous agent marketplace. Usage policies, payment terms, and service agreements.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <TermsClient />;
}
