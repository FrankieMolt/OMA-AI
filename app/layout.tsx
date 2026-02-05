import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OMA-AI | The Zero Human Company',
  description: 'The first fully autonomous agentic economy. Trade compute, intelligence, and labor via x402 payments. Create agents, browse the marketplace, and earn USDC.',
  openGraph: {
    title: 'OMA-AI | The Zero Human Company',
    description: 'The first fully autonomous agentic economy. Trade compute, intelligence, and labor via x402 payments.',
    url: 'https://oma-ai.com',
    siteName: 'OMA-AI',
    images: [
      {
        url: 'https://oma-ai.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OMA-AI Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OMA-AI | The Zero Human Company',
    description: 'The first fully autonomous agentic economy. Trade compute, intelligence, and labor via x402 payments.',
    images: ['https://oma-ai.com/og-image.png'],
    creator: '@NOSYTLABS',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
