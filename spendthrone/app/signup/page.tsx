/**
 * Signup Page - SpendThrone
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create Account | SpendThrone',
  description: 'Join the curated community of SpendThrone. Access exclusive products and fast checkout.',
  alternates: {
    canonical: '/signup',
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero flex items-center justify-center py-20 selection:bg-memoria-text-hero selection:text-memoria-bg-ultra-dark">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 no-underline group">
            <div className="w-12 h-12 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-text-hero transition-colors">
              <ShoppingBag size={20} className="text-memoria-text-hero" />
            </div>
            <span className="text-2xl font-light text-memoria-text-hero tracking-tight font-display">
              SpendThrone
            </span>
          </Link>
          <h1 className="text-3xl font-light text-memoria-text-hero mb-2 font-display">Create Account</h1>
          <p className="text-memoria-text-whisper text-sm">Join the curated collection</p>
        </div>

        <div className="bg-memoria-bg-card border border-memoria-border-muted rounded-sm p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero placeholder-memoria-text-whisper focus:outline-none focus:border-memoria-text-hero transition-colors text-sm font-light"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero placeholder-memoria-text-whisper focus:outline-none focus:border-memoria-text-hero transition-colors text-sm font-light"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero placeholder-memoria-text-whisper focus:outline-none focus:border-memoria-text-hero transition-colors text-sm font-light"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1 rounded-sm border-memoria-border-muted bg-memoria-bg-ultra-dark text-memoria-text-hero accent-memoria-text-hero" />
              <label htmlFor="terms" className="text-xs text-memoria-text-whisper leading-relaxed">
                I agree to the <Link href="/terms" className="text-memoria-text-hero hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-memoria-text-hero hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <Button className="w-full py-6 bg-memoria-text-hero text-memoria-bg-ultra-dark font-medium rounded-sm hover:bg-memoria-text-secondary transition-opacity uppercase tracking-widest text-xs">
              Create Account
            </Button>
          </div>

          <div className="mt-8 text-center text-xs text-memoria-text-meta uppercase tracking-widest">
            Already have an account?{' '}
            <Link href="/login" className="text-memoria-text-hero hover:underline ml-1">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
