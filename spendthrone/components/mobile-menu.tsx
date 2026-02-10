'use client'

import { useState, useEffect } from 'react'
import { X, Menu, ShoppingCart, Heart, Scale } from 'lucide-react'

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
    { href: '/', label: 'Home', icon: Menu },
    { href: '/category/tech-gadgets', label: 'Tech Gadgets', icon: Menu },
    { href: '/category/home-living', label: 'Home Living', icon: Menu },
    { href: '/category/outdoor', label: 'Outdoor', icon: Menu },
    { href: '/category/gaming', label: 'Gaming', icon: Menu },
    { href: '/cart', label: 'Cart', icon: ShoppingCart },
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/compare', label: 'Compare', icon: Scale },
  ]

  return (
    <>
      {/* Hamburger Button - Premium luxury style */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-3 rounded-2xl bg-zinc-900 border-2 border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 md:hidden"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Drawer - Full screen with premium blur backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with blur effect */}
          <div
            onClick={closeMenu}
            className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md transition-opacity duration-300"
          />

          {/* Menu Content - Slide in from right with premium styling */}
          <div className="relative w-full max-w-sm h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl">
            {/* Premium Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-gradient-to-r from-purple-600/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">ST</span>
                </div>
                <span className="text-xl font-bold text-white tracking-wide">MENU</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links with premium styling */}
            <nav className="flex-1 overflow-y-auto p-6 space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-purple-500/20 border border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {link.icon && <link.icon size={20} className="text-purple-500" />}
                  <span className="flex-1">{link.label}</span>
                </a>
              ))}
            </nav>

            {/* Premium Footer Actions */}
            <div className="p-6 border-t border-zinc-800 space-y-3 bg-gradient-to-t from-zinc-900/50 to-transparent">
              <a
                href="/checkout"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg shadow-purple-500/20"
              >
                <ShoppingCart size={20} />
                <span>Proceed to Checkout</span>
              </a>

              <div className="text-center text-xs text-zinc-600">
                Free shipping on orders over $50
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
