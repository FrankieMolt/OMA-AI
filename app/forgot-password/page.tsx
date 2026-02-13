/**
 * Forgot Password Page
 */

'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 no-underline group mb-8">
             <div className="w-10 h-10 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-text-hero transition-colors">
                <Shield size={20} className="text-memoria-text-hero" />
             </div>
             <span className="text-2xl font-light text-memoria-text-hero tracking-tighter font-display">
                OMA SYSTEMS
             </span>
          </Link>
          <h1 className="text-3xl font-light text-memoria-text-hero tracking-tight mb-2 font-display">Recovery</h1>
          <p className="text-memoria-text-whisper text-sm">Enter your email to reset credentials.</p>
        </div>

        <div className="bg-memoria-bg-card border border-memoria-border-muted rounded-sm p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero placeholder-memoria-text-whisper focus:outline-none focus:border-memoria-text-hero transition-colors text-sm font-light"
                placeholder="agent@oma-ai.com"
                required
              />
            </div>

            <Button className="w-full py-6 bg-memoria-text-hero text-memoria-bg-ultra-dark font-medium rounded-sm hover:bg-memoria-text-secondary transition-opacity uppercase tracking-widest text-xs">
              Send Reset Link
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-memoria-text-whisper">
            Remember your password?{' '}
            <Link href="/login" className="text-memoria-text-hero hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
