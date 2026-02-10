/**
 * App Layout - Root layout with providers, metadata, and premium CSS
 * UPDATED: Switched to improved premium CSS with loading states, hover effects, and animations
 * UPDATED: Mobile menu integrated with hamburger button
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals-premium.css' // Updated to premium CSS
import { MobileMenu } from './components/mobile-menu'
import { ShoppingBag, Heart, Scale } from 'lucide-react'

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
      <body className={`${inter.variable} ${playfairDisplay.variable} ${sourceSansPro.variable} font-sans antialiased custom-scrollbar smooth-scroll`}>
        {/* Mobile Menu Component */}
        <MobileMenu />

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 px-8 py-4 bg-zinc-950 border-b border-zinc-800 backdrop-blur-md">
          <a className="flex items-center gap-3" href="/">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg premium-shine">
              <span className="text-2xl font-bold text-white">ST</span>
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">SpendThrone</span>
          </a>

          <div className="flex items-center gap-1">
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded-xl transition-colors duration-200" href="/">
              Home
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded-xl transition-colors duration-200" href="/category/tech-gadgets">
              Tech Gadgets
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded-xl transition-colors duration-200" href="/category/home-living">
              Home Living
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded-xl transition-colors duration-200" href="/category/outdoor">
              Outdoor
            </a>
            <a className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded-xl transition-colors duration-200" href="/category/gaming">
              Gaming
            </a>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 premium-lift">
            <ShoppingBag size={20} />
            <span>Cart</span>
          </button>
        </nav>

        {/* Main content with fade-in animation */}
        <main className="flex-1 fade-in">
          {children}
        </main>
      </body>
    </html>
  )
}
