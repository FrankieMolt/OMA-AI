import { Metadata } from 'next';
import WelcomeClient from './WelcomeClient';

export const metadata: Metadata = {
  title: 'Welcome to OMA-AI: The Future of API Commerce',
  description: 'Introducing OMA-AI — the first API marketplace built for both humans AND AI agents. Discover, integrate, and pay for APIs with x402 payments.',
  alternates: { canonical: '/blog/welcome-to-oma-ai' },
};

export default function Page() {
  return <WelcomeClient />;
}
