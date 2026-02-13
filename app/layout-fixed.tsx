/**
 * App Layout - Root layout with providers, metadata, and comprehensive design/layout fixes
 * FIXED: Import path errors - using correct lowercase paths
 */

import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'
import './globals-improved.css'
import { QueryProvider } from '@/lib/query-client'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { MobileMenu } from './components/mobile-menu'
import { ApiCardSkeleton, ProductCardSkeleton, ExperimentCardSkeleton } from '@/components/skeleton-loaders'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
    creator: '@oma_ai',
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
      <head>
        {/* Preload critical resources for performance */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${ibmPlexSans.variable} ${spaceGrotesk.variable} bg-zinc-950 text-zinc-50 antialiased selection:bg-zinc-800 custom-scrollbar smooth-scroll`}>
        {/* Skip to main content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg transition-all duration-200">
          Skip to main content
        </a>
        
        {/* Mobile Menu Component */}
        <MobileMenu />
        
        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 px-8 py-4 bg-zinc-900/50 border-b border-zinc-800/50 backdrop-blur-md">
          <a className="flex items-center gap-3 group" href="/">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg hover-lift">
              <span className="text-2xl font-bold text-white">OMA</span>
            </div>
            <span className="text-lg font-bold text-zinc-100 tracking-tight group-hover:text-purple-400 transition-colors">OMA-AI</span>
          </a>
          
          <div className="flex items-center gap-1">
            <a className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500" href="/how-it-works">
              <span className="font-medium">How It Works</span>
            </a>
            <a className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500" href="/bounties">
              <span className="font-medium">Bounties</span>
            </a>
            <a className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500" href="/docs">
              <span className="font-medium">Documentation</span>
            </a>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg">
            <span className="font-semibold">Get API Key</span>
          </button>
        </nav>
        
        <ErrorBoundary>
          <QueryProvider>
            <main id="main-content" className="fade-in">
              {children}
            </main>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
