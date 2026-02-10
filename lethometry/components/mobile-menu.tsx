'use client'

import { useState, useEffect } from 'react'
import { X, Menu, FlaskConical, BookOpen, Database, FileText, Users, ChevronRight } from 'lucide-react'

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

  const navSections = [
    {
      title: 'Research',
      links: [
        { href: '/experiments', label: 'Experiments', icon: FlaskConical },
        { href: '/publications', label: 'Publications', icon: BookOpen },
        { href: '/data', label: 'Data Repository', icon: Database },
      ]
    },
    {
      title: 'Methodology',
      links: [
        { href: '/methodology', label: 'Methodology', icon: FileText },
        { href: '/guidelines', label: 'Participation Guidelines' },
        { href: '/about', label: 'About Us', icon: Users },
      ]
    },
    {
      title: 'Account',
      links: [
        { href: '/profile', label: 'Profile' },
        { href: '/history', label: 'Participation History' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
      ]
    },
  ]

  return (
    <>
      {/* Hamburger Button - Scientific/Academic style */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-xl bg-zinc-800 border-2 border-zinc-700 text-zinc-400 hover:text-white hover:border-scientific-blue/30 hover:bg-scientific-blue/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-scientific-blue md:hidden"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Drawer - Full screen with scientific blur backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with blur effect */}
          <div
            onClick={closeMenu}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Menu Content - Slide in from right with scientific gradient header */}
          <div className="relative w-full max-w-sm h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl">
            {/* Scientific/Academic Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-gradient-to-r from-scientific-blue/20 via-scientific-purple/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-scientific-blue/20 flex items-center justify-center">
                  <FlaskConical size={18} className="text-scientific-blue" />
                </div>
                <span className="text-lg font-bold text-zinc-100 tracking-wide">Lethometry</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-scientific-blue/30 hover:bg-scientific-blue/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-scientific-blue"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Sections with academic styling */}
            <nav className="flex-1 overflow-y-auto p-6 space-y-8">
              {navSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {/* Section Title */}
                  <h3 className="text-xs font-bold text-scientific-blue/70 uppercase tracking-wider mb-4 pl-2 border-l-2 border-scientific-blue/30">
                    {section.title}
                  </h3>

                  {/* Section Links */}
                  <ul className="space-y-1">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-scientific-blue/20 border border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-scientific-blue"
                        >
                          {link.icon && <link.icon size={18} className="text-scientific-blue" />}
                          <span className="flex-1">{link.label}</span>
                          <ChevronRight size={16} className="text-zinc-500" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Footer with scientific theme */}
            <div className="p-6 border-t border-zinc-800 bg-gradient-to-t from-zinc-900/50 to-transparent">
              <a
                href="/experiments"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-scientific-blue text-white font-semibold hover:bg-scientific-blue/90 transition-colors shadow-lg shadow-scientific-blue/20"
              >
                <FlaskConical size={20} />
                <span>Participate in Research</span>
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
