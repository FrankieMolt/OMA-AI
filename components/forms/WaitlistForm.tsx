'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'waitlist' }),
      })
      
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 rounded-lg bg-[#0a0a15] border border-white/10 text-white"
        required
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2 bg-[#22C55E] rounded-lg text-white font-semibold hover:bg-[#16A34A] transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Join'}
      </button>
    </form>
  )
}
