import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | OMA-AI Data Protection',
  description: 'OMA-AI privacy policy explains how we collect, use, and protect your data when using our autonomous agent marketplace and API services.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
