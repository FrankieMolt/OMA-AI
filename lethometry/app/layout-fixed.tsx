/**
 * App Layout - Root layout with providers, metadata, and scientific CSS
 * FIXED: Import path errors - using correct relative paths
 */

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals-scientific.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { MobileMenu } from './components/mobile-menu'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Lethometry | AI Social Scientific Research Platform',
  description: 'A peer-reviewed research platform for studying AI decision-making, ethics, and cognitive patterns through rigorous behavioral experiments. Open data. Open science. Open minds.',
  keywords: ['AI research', 'artificial intelligence', 'behavioral experiments', 'moral philosophy', 'cognitive science', 'ethics', 'trolley problem'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased custom-scrollbar smooth-scroll`}>
        {/* Skip to main content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-scientific-blue focus:text-white focus:rounded-lg transition-all duration-200">
          Skip to main content
        </a>
        
        {/* Mobile Menu Component */}
        <MobileMenu />
        
        {/* Header - Contains desktop navigation (hidden on mobile) and search bar */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <a className="flex items-center gap-3 group" href="/">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-scientific-blue to-scientific-purple flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical w-5 h-5 text-white">
                    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
                    <path d="M6.453 15h11.094"></path>
                    <path d="M8.5 2h7"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground tracking-tight group-hover:text-scientific-blue transition-colors">Lethometry</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Research Platform</span>
                </div>
              </a>

              {/* Desktop Navigation (hidden on mobile) */}
              <nav className="hidden lg:flex items-center gap-1">
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical w-4 h-4">
                    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
                    <path d="M6.453 15h11.094"></path>
                    <path d="M8.5 2h7"></path>
                  </svg>
                  Home
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/experiments/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical w-4 h-4">
                    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
                    <path d="M6.453 15h11.094"></path>
                    <path d="M8.5 2h7"></path>
                  </svg>
                  Experiments
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/publications/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open w-4 h-4">
                    <path d="M12 7v14"></path>
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 1 4 4 4-4h-6a3 3 0 0 1-3 3 3 3z"></path>
                  </svg>
                  Publications
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/data/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database w-4 h-4">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                    <path d="M3 12A9 3 0 0 0 21 12"></path>
                  </svg>
                  Data
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/methodology/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 2H15a2 2 0 0 0 2 2H15a2 2 0 0 0 2 2h-6a3 3 0 0 0-3 3 3z"></path>
                    <path d="M15 2v4a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
                    <path d="M16 7v6h6"></path>
                  </svg>
                  Methodology
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/about/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-4 h-4">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87H16a4 4 0 0 0-3-3 3z"></path>
                    <path d="M16 3.13a4 4 0 0 0-3-3.87H16a4 4 0 0 0-3-3 3z"></path>
                  </svg>
                  About
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/guidelines/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help w-4 h-4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 1-3 0-3 3 3-0 3 3 3z"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  Guidelines
                </a>
              </nav>

              {/* Search Bar (New) */}
              <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md">
                <div className="relative flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3a10 10 0 0 0-10 10"></path>
                    <path d="m21 12-4.3-4.3a6 6 0 0 0-6 6"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search experiments, publications, data..."
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-scientific-blue transition-all duration-200"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-scientific-blue/30 hover:bg-scientific-blue/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-scientific-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3 w-5 h-5">
                    <path d="M12 20V10"></path>
                    <path d="M18 20V4"></path>
                    <path d="M3 20h18"></path>
                    <path d="M2 10h20"></path>
                    <path d="M2 14h20"></path>
                    <path d="M2 18h20"></path>
                  </svg>
                  <span className="hidden xl:inline">Analytics</span>
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity w-5 h-5">
                    <path d="M22 12h-4l-3 3-3-3-3-1.414-1.414 0 0 0-2-2l-3 3c0-1.1 0-2 2-2.612-2.612 0 0-2-2.828-2.828-5.656-5.656a4 4 0 0 0-5.657 5.657 0 0 0-4.828 4.828 0 0 0-2.172-2.172 0 0 0-1.414-1.414 0 0 0-2-2-2.612-2.612-5.656-5.656a4 4 0 0 0-5.657 5.657 0 0 0-4.828 4.828 0 0 0-2.172-2.172 0 0 0-1.414-1.414 0 0 0-2-2z"></path>
                  </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main content with scientific patterns and fade-in animation */}
        <main className="min-h-screen bg-background">
          <div className="min-h-screen scientific-grid molecular-pattern data-pattern fade-in">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity mx-auto mb-4 opacity-50">
                      <path d="M22 12h-4l-3 3-3-3-3-1.414-1.414 0 0 0-2-2l-3 3c0-1.1 0-2 2-2.612-2.612 0 0 0-2-2.828-2.828-5.656-5.656a4 4 0 0 0-5.657 5.657 0 0 0-4.828 4.828 0 0 0-2.172-2.172 0 0 0-1.414-1.414 0 0 0-2-2z"></path>
                    </svg>
                    <p className="text-lg font-medium">No results found</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content */}
            <div id="main-content">
              {children}
            </div>

            {/* Participate CTA Section (New) */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-scientific-blue/10 via-scientific-purple/5 to-transparent">
              <div className="max-w-7xl mx-auto text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-scientific-blue/20 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical text-scientific-blue">
                      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
                      <path d="M6.453 15h11.094"></path>
                      <path d="M8.5 2h7"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Participate in Research</h2>
                    <p className="text-lg text-muted-foreground mb-4">Join thousands of participants exploring AI decision-making, ethics, and cognitive patterns through rigorous behavioral experiments.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a href="/experiments" className="flex items-center gap-2 px-8 py-3 rounded-xl bg-scientific-blue text-white font-semibold hover:bg-scientific-blue/90 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-scientific-blue hover-lift">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical">
                      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
                      <path d="M6.453 15h11.094"></path>
                      <path d="M8.5 2h7"></path>
                    </svg>
                    <span>Browse Experiments</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                      <path d="M5 12h14"></path>
                      <path d="m12 16-4-4 4-1.414-1.414 0 0 1-2-2 2.828-2.828-5.656-5.656a4 4 0 0 0-5.657 5.657 0 0 0-4.828 4.828 0 0 0-2.172-2.172 0 0 0-1.414-1.414 0 0 0-2-2z"></path>
                    </svg>
                  </a>
                  <a href="/guidelines" className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-zinc-700 text-zinc-100 font-semibold hover:bg-zinc-800 hover:border-scientific-blue/30 hover:text-scientific-blue transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-scientific-blue hover-lift">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 1-3 0-3 3 3-0 3 3 3z"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                    <span>View Guidelines</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30">
          <Footer />
        </footer>
      </body>
    </html>
  )
}
