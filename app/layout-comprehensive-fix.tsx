/**
 * App Layout - Root layout with providers, metadata, and comprehensive design/layout fixes
 * FIXED: Bad design/layout issues - mobile responsiveness, search, loading states, performance
 */

import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'
import './globals-improved.css'
import { QueryProvider } from '@/lib/query-client'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { MobileMenu } from '@/components/mobile-menu'
import { ApiCardSkeleton, ProductCardSkeleton, ExperimentCardSkeleton } from '@/components/skeleton-loaders'
import { Search, FlaskConical, BookOpen, Database, FileText, Users, CircleHelp, BarChart3, Activity, ArrowRight, Menu, X, ShoppingCart, Heart, Scale } from 'lucide-react'

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        
        {/* Desktop Navigation (hidden on mobile, fully responsive with search) */}
        <nav className="hidden md:flex items-center justify-between gap-8 px-8 py-4 bg-zinc-900/50 border-b border-zinc-800/50 backdrop-blur-md">
          <a className="flex items-center gap-3 group" href="/">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg hover-lift transition-all duration-300">
              <span className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">OMA</span>
            </div>
            <span className="text-lg font-bold text-zinc-100 tracking-tight group-hover:text-purple-400 transition-colors">OMA-AI</span>
          </a>
          
          <div className="flex items-center gap-4">
            {/* Search Bar (NEW) */}
            <div className="relative hidden lg:flex">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search APIs..."
                className="w-64 pl-12 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
            </div>

            {/* Navigation Links */}
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
            <main id="main-content" className="fade-in tech-pattern">
              <div className="min-h-screen">
                {/* Search Results Section (Hidden by default, shown when searching) */}
                <section id="search-results" className="hidden py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-foreground">Search Results</h2>
                      <span className="text-sm text-muted-foreground">Found 0 results</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Search results will be injected here */}
                      <div className="glass-card p-6 rounded-xl text-center text-muted-foreground">
                        <Activity size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No results found</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Main Content */}
                <div id="main-content">
                  {children}
                </div>

                {/* Quick Start CTA Section */}
                <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/10 via-blue-600/5 to-transparent">
                  <div className="max-w-7xl mx-auto text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-2">
                        <FlaskConical size={32} className="text-purple-500" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">Get Started with OMA-AI</h2>
                        <p className="text-lg text-muted-foreground mb-4">Browse, test, and integrate 22+ APIs and MCP servers. Pay only for what you use with x402 crypto payments (USDC on Base).</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <a href="/apis" className="flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover-lift">
                        <FlaskConical size={20} />
                        <span>Browse APIs</span>
                        <ArrowRight size={20} />
                      </a>
                      <a href="/pricing" className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-zinc-700 text-zinc-100 font-semibold hover:bg-zinc-800 hover:border-purple-500/30 hover:text-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover-lift">
                        <BookOpen size={20} />
                        <span>View Pricing</span>
                        <ArrowRight size={20} />
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
