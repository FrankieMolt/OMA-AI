import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about OMA-AI MCP Marketplace, x402 gasless payments, pricing, and getting started.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
