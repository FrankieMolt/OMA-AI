'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-amber-400 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-4">
          <nav className="flex flex-col gap-4">
            <a href="/market" className="text-white hover:text-amber-400 transition-colors">Market</a>
            <a href="/cart" className="text-white hover:text-amber-400 transition-colors">Cart</a>
            <a href="/about" className="text-white hover:text-amber-400 transition-colors">About</a>
          </nav>
        </div>
      )}
    </div>
  )
}
