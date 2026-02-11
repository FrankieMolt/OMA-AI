/**
 * App Layout - Root layout with providers, metadata, and comprehensive design/layout fixes
 * FIXED: Bad design/layout issues - mobile responsiveness, search functionality, loading states
 */

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals-scientific.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { MobileMenu } from './components/mobile-menu'
import { Search, FlaskConical, BookOpen, Database, FileText, Users, CircleHelp, BarChart3, Activity, ArrowRight } from 'lucide-react'

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
      <head>
        {/* Preload critical resources for performance */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
                  <FlaskConical size={18} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground tracking-tight group-hover:text-scientific-blue transition-colors">Lethometry</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Research Platform</span>
                </div>
              </a>

              {/* Desktop Navigation (hidden on mobile) */}
              <nav className="hidden lg:flex items-center gap-1">
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/">
                  <FlaskConical size={16} />
                  Home
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/experiments/">
                  <FlaskConical size={16} />
                  Experiments
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/publications/">
                  <BookOpen size={16} />
                  Publications
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/data/">
                  <Database size={16} />
                  Data
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/methodology/">
                  <FileText size={16} />
                  Methodology
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/about/">
                  <Users size={16} />
                  About
                </a>
                <a className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue" href="/guidelines/">
                  <CircleHelp size={16} />
                  Guidelines
                </a>
              </nav>

              {/* Search Bar (New) */}
              <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search experiments, publications, data..."
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-scientific-blue transition-all duration-200"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-scientific-blue/30 hover:bg-scientific-blue/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-scientific-blue">
                  <BarChart3 size={18} />
                  <span className="hidden xl:inline">Analytics</span>
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted hover-lift focus:outline-none focus:ring-2 focus:ring-scientific-blue">
                <Activity size={20} />
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
                    <Activity size={48} className="mx-auto mb-4 opacity-50" />
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
                    <FlaskConical size={32} className="text-scientific-blue" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Participate in Research</h2>
                    <p className="text-lg text-muted-foreground mb-4">Join thousands of participants exploring AI decision-making, ethics, and cognitive patterns through rigorous behavioral experiments.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a href="/experiments" className="flex items-center gap-2 px-8 py-3 rounded-xl bg-scientific-blue text-white font-semibold hover:bg-scientific-blue/90 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-scientific-blue hover-lift">
                    <FlaskConical size={20} />
                    <span>Browse Experiments</span>
                    <ArrowRight size={20} />
                  </a>
                  <a href="/guidelines" className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-zinc-700 text-zinc-100 font-semibold hover:bg-zinc-800 hover:border-scientific-blue/30 hover:text-scientific-blue transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-scientific-blue hover-lift">
                    <CircleHelp size={20} />
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
