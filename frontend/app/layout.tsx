import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OMA-AI - Zero Human Company',
  description: 'Autonomous Agent Ecosystem with x402 Payments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}