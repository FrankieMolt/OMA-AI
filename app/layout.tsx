/**
 * App Layout - Root layout with providers, metadata, and unified design
 */

import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Sans, Space_Grotesk, Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals-improved.css'
import { QueryProvider } from '@/lib/query-client'
import { ErrorBoundary } from '../components/ErrorBoundary'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
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
  themeColor: '#050505',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'OMA-AI - Agent Commerce Platform',
    template: '%s | OMA-AI',
  },
  description: 'The premier API marketplace for AI agents. Discovery, access, and pay-per-use payments with x402 on Base.',
  keywords: ['OMA-AI', 'API marketplace', 'AI agents', 'x402 payments', 'autonomous agents', 'MCP servers', 'bounties'],
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://oma-ai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oma-ai.com',
    siteName: 'OMA-AI',
    title: 'OMA-AI - Agent Commerce Platform',
    description: 'The premier API marketplace for AI agents. Discovery, access, and pay-per-use payments with x402 on Base.',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
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
      <head>
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "OMA-AI",
              "description": "The premier API marketplace for AI agents. Discover, access, and pay for APIs with x402 crypto micropayments.",
              "url": "https://oma-ai.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${dmSans.variable} ${instrumentSerif.variable} ${ibmPlexSans.variable} ${spaceGrotesk.variable} bg-[#050505] text-[#e4e4e7] antialiased custom-scrollbar`}>
        <Navbar />
        <ErrorBoundary>
          <QueryProvider>
            <main id="main-content" style={{ minHeight: '100vh' }}>
              {children}
            </main>
          </QueryProvider>
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  )
}
