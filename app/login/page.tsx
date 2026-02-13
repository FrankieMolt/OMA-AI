'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, Github, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 no-underline group mb-8">
             <div className="w-10 h-10 bg-[#1e1e1e] border border-[#2a2a2a] rounded-sm flex items-center justify-center group-hover:border-white transition-colors">
                <Shield size={20} className="text-white" />
             </div>
             <span className="text-2xl font-light text-white tracking-tighter font-display">
                OMA SYSTEMS
             </span>
          </Link>
          <h1 className="text-3xl font-light text-white tracking-tight mb-2 font-display">Welcome Back</h1>
          <p className="text-[#a1a1aa] text-sm">Access your agent dashboard and API keys.</p>
        </div>

        <Card className="bg-[#121212] border-[#1e1e1e] rounded-sm">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-[#71717a] font-medium ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" size={16} aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                    placeholder="name@example.com"
                    aria-label="Email address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="password" className="text-[10px] uppercase tracking-widest text-[#71717a] font-medium">Password</label>
                  <Link href="/forgot-password" className="text-[10px] uppercase tracking-widest text-[#71717a] hover:text-white transition-colors">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" size={16} aria-hidden="true" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                    placeholder="••••••••"
                    aria-label="Password"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black hover:bg-[#e4e4e7] h-12 rounded-sm text-xs font-bold uppercase tracking-widest"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#1e1e1e]"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#121212] px-2 text-[#71717a]">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-[#2a2a2a] text-[#d4d4d8] hover:bg-[#1e1e1e] hover:text-white h-12 rounded-sm text-xs font-bold uppercase tracking-widest">
              <Github size={16} className="mr-2" /> GitHub
            </Button>
          </CardContent>
        </Card>

        <p className="text-center mt-8 text-[11px] uppercase tracking-widest text-[#71717a]">
          New to the network?{' '}
          <Link href="/signup" className="text-white hover:underline transition-all">
            Initialize Account
          </Link>
        </p>
      </div>
    </div>
  );
}
