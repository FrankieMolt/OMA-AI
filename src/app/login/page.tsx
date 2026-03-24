'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
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
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

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

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
