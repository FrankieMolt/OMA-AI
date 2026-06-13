'use client';

import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!supabase) return;

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        window.location.href = '/dashboard';
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('demo_user', JSON.stringify({
      id: 'demo-user-001',
      email: 'demo@oma-ai.dev',
      user_metadata: { name: 'Demo User' },
    }));
    window.location.href = '/dashboard?demo=true';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Login</h1>

        {!isSupabaseConfigured() && (
          <div className="mb-4 p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-sm">
            Demo mode — Supabase not configured. Using mock auth.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        {isSupabaseConfigured() ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-bold mb-2 text-gray-300">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-bold mb-2 text-gray-300">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="•••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full p-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Continue as Demo User
          </button>
        )}

        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
