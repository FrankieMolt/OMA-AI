/**
 * App Layout - Root layout with providers and metadata
 */

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'SpendThrone - The Kingdom of Weird Stuff',
    template: '%s | SpendThrone',
  },
  description: 'Discover the weirdest, most viral products on Earth. Extreme tech, luxury items, and WTF technology for the modern age. A curated collection of bizarre innovation.',
  keywords: [
    'SpendThrone',
    'weird products',
    'extreme tech',
    'viral products',
    'luxury items',
    'WTF technology',
    'bizarre innovations',
    'strange gadgets',
    'unusual products',
    'kingdom of weird',
    'viral marketplace',
  ],
  authors: [{ name: 'Nosyt LLC' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spendthrone.com',
    siteName: 'SpendThrone',
    title: 'SpendThrone - The Kingdom of Weird Stuff',
    description: 'The curated kingdom of the weirdest, most viral products on Earth. WTF-level technology for the modern age.',
    images: [
      {
        url: 'https://spendthrone.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SpendThrone - Weird Products Kingdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpendThrone - The Kingdom of Weird Stuff',
    description: 'The ultimate collection of viral, weird, and extreme products. WTF-level technology for the modern age.',
    creator: '@spendthrone',
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
    canonical: 'https://spendthrone.com',
  },
}

import { AppProvider } from '@/components/providers/AppProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SpendThrone - The Kingdom of Weird Stuff',
    description: 'The curated kingdom of the weirdest, most viral products on Earth. WTF-level technology for the modern age.',
    url: 'https://spendthrone.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://spendthrone.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SpendThrone',
      url: 'https://spendthrone.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://spendthrone.com/logo-512x512.png',
        width: 512,
        height: 512,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@spendthrone.com',
      },
    },
    sameAs: [
      'https://twitter.com/spendthrone',
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://spendthrone.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} bg-zinc-950 text-zinc-50 antialiased selection:bg-purple-500 selection:text-white`}>
        <ErrorBoundary>
          <ToastProvider>
            <AppProvider>
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg">
                Skip to main content
              </a>
              <Navbar />
              <main id="main-content">
                {children}
              </main>
              <Footer />
            </AppProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
