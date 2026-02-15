/**
 * SpendThrone Root Layout - Memoria Design
 * FIXED: Missing imports and proper navigation
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals-premium.css'
import { MobileMenu } from './components/mobile-menu'
import { ShoppingBag, Search } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'SpendThrone - Excellence in Detail',
    template: '%s',
  },
  description: 'Curated premium goods for the modern connoisseur. Luxury marketplace with exceptional products.',
  keywords: ['SpendThrone', 'luxury marketplace', 'premium goods', 'curated products'],
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://spendthrone-olive.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spendthrone-olive.vercel.app',
    siteName: 'SpendThrone',
    title: 'SpendThrone - Excellence in Detail',
    description: 'Curated premium goods for the modern connoisseur.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SpendThrone - Excellence in Detail',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpendThrone - Excellence in Detail',
    description: 'Curated premium goods for the modern connoisseur.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://spendthrone-olive.vercel.app',
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
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SpendThrone",
              "description": "Curated premium goods marketplace for the modern connoisseur.",
              "url": "https://spendthrone.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://spendthrone.com/marketplace?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${dmSans.variable} ${instrumentSerif.variable} bg-memoria-bg-ultra-dark text-memoria-text-hero antialiased custom-scrollbar`}>
        <MobileMenu />
        
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-14 py-4 flex justify-between items-center bg-memoria-bg-ultra-dark/80 backdrop-blur-xl border-b border-memoria-border-muted" role="navigation" aria-label="Main Navigation">
          <Link href="/" className="flex items-center gap-3 no-underline group" aria-label="SpendThrone Home">
            <div className="w-8 h-8 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-border-active transition-colors">
              <ShoppingBag size={14} className="text-memoria-text-hero" />
            </div>
            <span className="text-lg font-normal text-memoria-text-hero tracking-tight">
              SpendThrone
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <button className="bg-transparent border-none text-memoria-text-whisper hover:text-memoria-text-hero cursor-pointer transition-colors p-0 flex items-center" aria-label="Search products">
              <Search size={16} />
            </button>
            <Link href="/login" className="no-underline" aria-label="Sign in to your account">
              <span className="text-[11px] uppercase tracking-widest text-memoria-text-secondary hover:text-memoria-text-hero transition-colors">Sign In</span>
            </Link>
          </div>
        </nav>

        <main id="main-content">
          {children}
        </main>

        <footer className="border-t border-memoria-border-muted py-10 px-4 md:px-14 bg-memoria-bg-ultra-dark mt-auto" role="contentinfo">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
              © 2026 SpendThrone • Excellence in Detail
            </span>
            <nav className="flex gap-6 flex-wrap justify-center" aria-label="Footer Navigation">
              <Link href="/about" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">About</Link>
              <Link href="/contact" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">Contact</Link>
              <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">Privacy</Link>
              <Link href="/terms" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">Terms</Link>
              <Link href="/affiliate-disclosure" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">Affiliate Disclosure</Link>
            </nav>
            <div className="flex gap-2 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
                Global Network Online
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
