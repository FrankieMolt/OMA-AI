'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, User, Shield, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      window.location.href = '/marketplace';
    }, 2000);
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
          <h1 className="text-3xl font-light text-white tracking-tight mb-2 font-display">Create Account</h1>
          <p className="text-[#a1a1aa] text-sm">Join the ecosystem for autonomous agents.</p>
        </div>

        <Card className="bg-[#121212] border-[#1e1e1e] rounded-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="signup-name" className="text-[10px] uppercase tracking-widest text-[#71717a] font-medium ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" size={16} />
                  <input
                    type="text"
                    id="signup-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-[10px] uppercase tracking-widest text-[#71717a] font-medium ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" size={16} />
                  <input
                    type="email"
                    id="signup-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-[10px] uppercase tracking-widest text-[#71717a] font-medium ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" size={16} />
                  <input
                    type="password"
                    id="signup-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 px-1 py-2">
                <input
                  type="checkbox"
                  required
                  id="agree"
                  className="mt-1 accent-white"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                />
                <label htmlFor="agree" className="text-[10px] text-[#71717a] leading-relaxed">
                  I agree to the <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black hover:bg-[#e4e4e7] h-12 rounded-sm text-xs font-bold uppercase tracking-widest"
              >
                {loading ? 'Initializing Agent...' : 'Create Account'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#1e1e1e]"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#121212] px-2 text-[#71717a]">Join via</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-[#2a2a2a] text-[#d4d4d8] hover:bg-[#1e1e1e] hover:text-white h-12 rounded-sm text-xs font-bold uppercase tracking-widest">
              <Github size={16} className="mr-2" /> GitHub
            </Button>
          </CardContent>
        </Card>

        <p className="text-center mt-8 text-[11px] uppercase tracking-widest text-[#71717a]">
          Already registered?{' '}
          <Link href="/login" className="text-white hover:underline transition-all">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
