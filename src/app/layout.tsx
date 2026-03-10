import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { Providers } from '@/components/providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://oma-ai.com'),
  title: {
    default: 'OMA - Autonomous Agent Infrastructure',
    template: '%s | OMA Infrastructure'
  },
  description: 'Enterprise-grade infrastructure for building, deploying, and monitoring autonomous AI agents at scale. The standard for agentic compute.',
  keywords: ['autonomous agents', 'AI infrastructure', 'agent orchestration', 'enterprise AI', 'x402 protocol'],
  authors: [{ name: 'OMA Systems' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oma-ai.com',
    siteName: 'OMA Infrastructure',
    title: 'OMA - Autonomous Agent Infrastructure',
    description: 'Build, deploy, and monitor autonomous AI agents at scale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OMA - Autonomous Agent Infrastructure',
    description: 'Build, deploy, and monitor autonomous AI agents at scale.',
    creator: '@OMA_Infrastructure',
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
        <Script src="/x402.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased selection:bg-zinc-800`}>
        <ErrorBoundary>
          <Providers>
            {children}
            <Footer />
          </Providers>
        </ErrorBoundary>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
