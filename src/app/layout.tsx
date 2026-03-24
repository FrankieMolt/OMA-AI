import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import Navigation from '@/components/Navigation'
import { Providers } from '@/components/providers'
import { ErrorBoundary } from '@/components/error-boundary'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://oma-ai.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'OMA-AI | MCP Marketplace with x402 Gasless Payments',
    template: '%s'
  },
  description: 'Discover, deploy, and monetize AI agents with the premier MCP Marketplace. Access 19+ verified MCP servers with gasless x402 payments on Base network - no API keys, no subscriptions.',
  keywords: ['MCP', 'Model Context Protocol', 'x402', 'AI agents', 'MCP marketplace', 'gasless payments', 'Base network', 'USDC', 'agent economy', 'AI infrastructure'],
  authors: [{ name: 'OMA-AI Team' }],
  icons: {
    icon: '/icon-192.svg',
    apple: '/icon-512.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oma-ai.com',
    siteName: 'OMA-AI',
    title: 'OMA-AI | Premier MCP Marketplace with x402 Payments',
    description: 'Discover, deploy, and monetize AI agents with the premier MCP Marketplace. Access 19+ verified MCP servers with gasless x402 payments on Base network.',
    images: [
      {
        url: '/icon-512.svg',
        width: 512,
        height: 512,
        alt: 'OMA-AI MCP Marketplace Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OMA-AI | Premier MCP Marketplace with x402 Payments',
    description: 'Discover, deploy, and monetize AI agents with the premier MCP Marketplace. Access 19+ verified MCP servers with gasless x402 payments on Base network.',
    creator: '@OMA_AI',
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
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased selection:bg-zinc-800`}>
        <Script src="/x402.js" strategy="lazyOnload" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://oma-ai.com/#organization",
                  "name": "OMA-AI",
                  "url": "https://oma-ai.com",
                  "logo": "https://oma-ai.com/icon-512.svg",
                  "sameAs": [
                    "https://github.com/oma-ai",
                    "https://discord.gg/oma-ai"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://oma-ai.com/#website",
                  "url": "https://oma-ai.com",
                  "name": "OMA-AI",
                  "description": "Premier MCP Marketplace with x402 Gasless Payments",
                  "publisher": {
                    "@id": "https://oma-ai.com/#organization"
                  }
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://oma-ai.com/#webapp",
                  "name": "OMA-AI MCP Marketplace",
                  "url": "https://oma-ai.com",
                  "description": "Discover, deploy, and monetize AI agents with the premier MCP Marketplace. Access 19+ verified MCP servers with gasless x402 payments on Base network.",
                  "applicationCategory": "DeveloperApplication",
                  "operatingSystem": "Any",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://oma-ai.com/#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://oma-ai.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Marketplace",
                      "item": "https://oma-ai.com/marketplace"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Publish",
                      "item": "https://oma-ai.com/publish"
                    }
                  ]
                }
              ]
            })
          }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium">
          Skip to main content
        </a>
        <ErrorBoundary>
          <Providers>
            <Navigation />
            <main id="main-content">{children}</main>
            <Footer />
          </Providers>
        </ErrorBoundary>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
