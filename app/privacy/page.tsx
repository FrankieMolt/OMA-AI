import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy - OMA-AI',
  description: 'OMA-AI privacy policy. How we collect, use, and protect your data when using our autonomous agent marketplace.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
