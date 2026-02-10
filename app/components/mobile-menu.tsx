'use client'

import { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/apis', label: 'All APIs' },
    { href: '/trending', label: 'Trending' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Documentation' },
    { href: '/bounties', label: 'Bounties' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Hamburger Button - Visible only on mobile */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 md:hidden"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Drawer - Full screen with backdrop blur */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with blur effect */}
          <div
            onClick={closeMenu}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Menu Content - Slide in from right */}
          <div className="relative w-full max-w-sm h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <span className="text-lg font-bold text-zinc-100">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer Actions */}
            <div className="p-6 border-t border-zinc-800">
              <a
                href="/pricing"
                onClick={closeMenu}
                className="block w-full px-4 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors text-center"
              >
                Get API Key
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
