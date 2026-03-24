import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get Help & Support',
  description: 'Contact OMA-AI for technical support, MCP publication inquiries, business partnerships, or general questions. We respond within 24 hours. Multiple contact options available.',
  keywords: ['OMA-AI', 'Contact', 'Support', 'Help', 'MCP Support'],
  alternates: {
    canonical: 'https://www.oma-ai.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
