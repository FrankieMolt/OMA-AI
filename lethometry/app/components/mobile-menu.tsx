'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-purple-400 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-4">
          <nav className="flex flex-col gap-4">
            <a href="/" className="text-white hover:text-purple-400 transition-colors">Home</a>
            <a href="/death-clock" className="text-white hover:text-purple-400 transition-colors">Death Clock</a>
            <a href="/memory-tools" className="text-white hover:text-purple-400 transition-colors">Memory Tools</a>
            <a href="/philosophy" className="text-white hover:text-purple-400 transition-colors">Philosophy</a>
            <a href="/about" className="text-white hover:text-purple-400 transition-colors">About</a>
          </nav>
        </div>
      )}
    </div>
  )
}
