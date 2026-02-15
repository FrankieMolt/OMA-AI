/**
 * Lethometry Root Layout - Memoria Design
 * FIXED: Missing imports and proper navigation
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals-scientific.css'
import { MobileMenu } from './components/mobile-menu'
import { Activity } from 'lucide-react'
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
    default: 'Lethometry - Existential Quantification',
    template: '%s | Lethometry',
  },
  description: 'Scientific tools for quantifying life, death, and existence. Death clock, memory systems, and wisdom frameworks.',
  keywords: ['Lethometry', 'death clock', 'life expectancy', 'memory systems', 'stoicism', 'philosophy'],
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://lethometry.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lethometry.vercel.app',
    siteName: 'Lethometry',
    title: 'Lethometry - Existential Quantification',
    description: 'Scientific tools for quantifying life, death, and existence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lethometry - Existential Quantification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lethometry - Existential Quantification',
    description: 'Scientific tools for quantifying life, death, and existence.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lethometry.vercel.app',
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
      </head>
      <body className={`${inter.variable} ${dmSans.variable} ${instrumentSerif.variable} bg-memoria-bg-ultra-dark text-memoria-text-hero antialiased custom-scrollbar`}>
        <MobileMenu />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Lethometry",
              "description": "Scientific tools for quantifying life, death, and existence.",
              "url": "https://lethometry.com"
            })
          }}
        />
        
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-14 py-4 flex justify-between items-center bg-memoria-bg-ultra-dark/80 backdrop-blur-xl border-b border-memoria-border-muted" role="navigation" aria-label="Main Navigation">
          <Link href="/" className="flex items-center gap-3 no-underline group" aria-label="Lethometry Home">
            <div className="w-8 h-8 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-border-active transition-colors">
              <Activity size={14} className="text-memoria-text-hero" />
            </div>
            <span className="text-lg font-normal text-memoria-text-hero tracking-tight">
              Lethometry
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              <Link href="/clock" className="text-[10px] uppercase tracking-widest text-memoria-text-whisper hover:text-memoria-text-hero no-underline transition-colors">
                Clock
              </Link>
              <Link href="/memory" className="text-[10px] uppercase tracking-widest text-memoria-text-whisper hover:text-memoria-text-hero no-underline transition-colors">
                Memory
              </Link>
              <Link href="/experiments" className="text-[10px] uppercase tracking-widest text-memoria-text-whisper hover:text-memoria-text-hero no-underline transition-colors">
                Experiments
              </Link>
              <Link href="/about" className="text-[10px] uppercase tracking-widest text-memoria-text-whisper hover:text-memoria-text-hero no-underline transition-colors">
                About
              </Link>
            </div>
            <Link href="/data" className="no-underline" aria-label="View Data">
              <span className="text-[11px] uppercase tracking-widest text-memoria-text-secondary hover:text-memoria-text-hero transition-colors">Data</span>
            </Link>
          </div>
        </nav>

        <main id="main-content">
          {children}
        </main>

        <footer className="border-t border-memoria-border-muted py-10 px-4 md:px-14 bg-memoria-bg-ultra-dark mt-auto" role="contentinfo">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
              © 2026 Lethometry • Systems of Quantification
            </span>
            <div className="flex gap-6 items-center">
              <Link href="/about" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-whisper transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-whisper transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-whisper transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-whisper transition-colors">
                Terms
              </Link>
              <div className="w-1.5 h-1.5 rounded-full bg-memoria-text-whisper" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
                Protocol v2.4.0
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
