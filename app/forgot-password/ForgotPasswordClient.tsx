'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from 'lucide-react';

export default function ForgotPasswordClient() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 no-underline group mb-8">
             <div className="w-10 h-10 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-text-hero transition-colors">
                <Shield size={20} className="text-memoria-text-hero" />
             </div>
            <span className="text-lg font-normal text-memoria-text-hero tracking-tight">OMA-AI</span>
          </Link>
          
          <h1 className="text-3xl font-light text-memoria-text-hero mb-2 font-display">Reset Password</h1>
          <p className="text-memoria-text-whisper">Enter your email to receive a reset link</p>
        </div>

        <form className="space-y-6" aria-label="Password reset form">
          <div>
            <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-memoria-text-label mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-3 bg-memoria-bg-surface border border-memoria-border-muted rounded-sm text-memoria-text-hero placeholder-memoria-text-meta focus:outline-none focus:border-memoria-border-active transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <Button className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-12 text-sm font-medium hover:bg-memoria-text-secondary transition-all">
            Send Reset Link
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-memoria-text-whisper hover:text-memoria-text-hero text-sm transition-colors">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
