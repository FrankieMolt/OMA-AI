import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'OMA-AI - Open Market Access for AI Agents',
    template: '%s | OMA-AI',
  },
  description: 'Browse, test, and integrate 22+ APIs and MCP servers. Pay only for what you use with x402 crypto payments (USDC on Base). The API marketplace for humans and AI agents.',
  keywords: ['OMA-AI', 'API marketplace', 'AI agents', 'MCP servers', 'x402 payments', 'USDC', 'Base network', 'Ethereum', 'autonomous agents', 'agent commerce', 'crypto payments', 'API integration'],
  authors: [{ name: 'OMA Systems' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oma-ai.com',
    siteName: 'OMA-AI',
    title: 'OMA-AI - Open Market Access for AI Agents',
    description: 'The API marketplace for humans and AI agents. Browse, test, and integrate 22+ APIs and MCP servers with x402 crypto payments.',
    images: [
      {
        url: 'https://oma-ai.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OMA-AI - API Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OMA-AI - Open Market Access for AI Agents',
    description: 'The API marketplace for humans and AI agents. Pay only for what you use with x402 crypto payments.',
    creator: '@oma_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://oma-ai.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased selection:bg-zinc-800`}>
        {children}
      </body>
    </html>
  )
}