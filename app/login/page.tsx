'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, Github, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      window.location.href = '/marketplace';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark flex items-center justify-center p-6 selection:bg-memoria-text-hero selection:text-memoria-bg-ultra-dark">
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
          <h1 className="text-3xl font-light text-memoria-text-hero tracking-tight mb-2 font-display">Welcome Back</h1>
          <p className="text-memoria-text-whisper text-sm">Access your autonomous agent fleet.</p>
        </div>

        <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-memoria-text-meta font-medium ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-memoria-text-meta" size={16} aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero text-sm focus:outline-none focus:border-memoria-text-hero transition-all placeholder-memoria-text-whisper"
                    placeholder="name@example.com"
                    aria-label="Email address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="password" className="text-[10px] uppercase tracking-widest text-memoria-text-meta font-medium">Password</label>
                  <Link href="/forgot-password" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-memoria-text-meta" size={16} aria-hidden="true" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero text-sm focus:outline-none focus:border-memoria-text-hero transition-all placeholder-memoria-text-whisper"
                    placeholder="••••••••"
                    aria-label="Password"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark hover:bg-memoria-text-secondary h-12 rounded-sm text-xs font-bold uppercase tracking-widest"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-memoria-border-muted"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-memoria-bg-card px-2 text-memoria-text-meta">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-memoria-border-muted text-memoria-text-secondary hover:bg-memoria-bg-surface hover:text-memoria-text-hero h-12 rounded-sm text-xs font-bold uppercase tracking-widest">
              <Github size={16} className="mr-2" /> GitHub
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center max-w-xs mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-memoria-text-meta mb-4">
            New to the network?{' '}
            <Link href="/signup" className="text-memoria-text-hero hover:underline transition-all">
              Initialize Account
            </Link>
          </p>
          <p className="text-xs text-memoria-text-whisper leading-relaxed">
            By accessing the dashboard, you agree to the OMA-AI autonomous commerce protocols and x402 payment standards.
          </p>
        </div>
      </div>
    </div>
  );
}
