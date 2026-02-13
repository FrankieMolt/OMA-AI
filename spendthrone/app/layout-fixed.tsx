/**
 * App Layout - Root layout with providers, metadata, and premium CSS
 * FIXED: Import path errors - using correct relative paths
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals-premium.css'
import { MobileMenu } from './components/mobile-menu'
import { ShoppingBag, Heart, Scale, Search, Filter, ArrowUpDown, ChevronRight, Sparkles } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair-display',
})
const sourceSansPro = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-source-sans',
})

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'SpendThrone - The Kingdom of Weird Stuff',
    template: '%s | SpendThrone',
  },
  description: 'Discover unique and extraordinary products at SpendThrone. The kingdom of weird stuff for the modern connoisseur.',
  keywords: ['SpendThrone', 'luxury shopping', 'unique products', 'premium goods', 'tech gadgets', 'home living', 'gaming accessories'],
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
    url: 'https://spendthrone.com',
    siteName: 'SpendThrone',
    title: 'SpendThrone - The Kingdom of Weird Stuff',
    description: 'Discover unique and extraordinary products at SpendThrone. The kingdom of weird stuff for the modern connoisseur.',
    images: [
      {
        url: 'https://spendthrone.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@spendthrone',
    title: 'SpendThrone - The Kingdom of Weird Stuff',
    description: 'Discover unique and extraordinary products at SpendThrone. The kingdom of weird stuff for the modern connoisseur.',
    images: [
      {
        url: 'https://spendthrone.com/og-image.png',
        width: 1200,
        height: 630,
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
        <link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} ${sourceSansPro.variable} font-sans antialiased custom-scrollbar smooth-scroll`}>
        {/* Skip to main content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg">
          Skip to main content
        </a>
        
        {/* Mobile Menu Component */}
        <MobileMenu />
        
        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center justify-between gap-8 px-8 py-4 bg-zinc-950 border-b border-zinc-800 backdrop-blur-md">
          <a className="flex items-center gap-3" href="/">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg premium-shine hover-lift">
              <span className="text-2xl font-bold text-white">ST</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">SpendThrone</span>
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Luxury Shopping</span>
            </div>
          </a>

          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-12 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
            </div>
            
            {/* Navigation Links */}
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" href="/">
              Home
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" href="/category/tech-gadgets">
              Tech Gadgets
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" href="/category/home-living">
              Home Living
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" href="/category/outdoor">
              Outdoor
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" href="/category/gaming">
              Gaming
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Sorting & Filtering */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <Filter size={18} />
              <ArrowUpDown size={18} />
            </button>

            {/* Cart Button */}
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 premium-lift">
              <ShoppingBag size={20} />
              <span>Cart</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-xs">0</span>
            </button>
          </div>
        </nav>

        {/* Main content with fade-in animation */}
        <main id="main-content" className="flex-1 fade-in">
          {children}
        </main>
      </body>
    </html>
  )
}
