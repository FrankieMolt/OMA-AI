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
              {['Systems', 'Data', 'About'].map(item => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] uppercase tracking-widest text-memoria-text-whisper hover:text-memoria-text-hero no-underline transition-colors" aria-label={`Go to ${item}`}>
                  {item}
                </Link>
              ))}
            </div>
            <Link href="/terminal" className="no-underline" aria-label="Open Terminal">
              <span className="text-[11px] uppercase tracking-widest text-memoria-text-secondary hover:text-memoria-text-hero transition-colors">Terminal</span>
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
            <div className="flex gap-2 items-center">
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
