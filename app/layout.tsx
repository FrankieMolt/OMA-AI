import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OMA-AI | Open Market Access for AI Agents',
  description: 'The premier API marketplace for AI agents. Discover, access, and pay for APIs with x402 crypto micropayments.',
  keywords: ['OMA-AI', 'API marketplace', 'AI agents', 'x402 payments', 'autonomous agents', 'MCP servers', 'bounties'],
  authors: [{ name: 'NOSYT' }],
  creator: 'NOSYT',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oma-ai.com',
    siteName: 'OMA-AI',
    title: 'OMA-AI - Agent Commerce Platform',
    description: 'The premier API marketplace for AI agents. Discovery, access, and pay-per-use payments with x402 on Base.',
    images: [
      {
        url: 'https://oma-ai.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OMA-AI - Agent Commerce Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OMA-AI - Agent Commerce Platform',
    description: 'The premier API marketplace for AI agents.',
    images: ['https://oma-ai.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
