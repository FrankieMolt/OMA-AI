import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions | OMA-AI Help Center',
  description: 'Find answers to common questions about OMA-AI MCP marketplace. Learn about MCPs, x402 payments, pricing, and getting started with AI agents.',
  keywords: ['OMA-AI', 'FAQ', 'Help', 'Questions', 'MCP', 'x402'],
  alternates: {
    canonical: 'https://www.oma-ai.com/faq',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
