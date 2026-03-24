'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';


export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-white">Signup Successful!</h1>
            <p className="text-gray-400 mb-6">
              Please check your email to verify your account.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-bold mb-2 text-gray-300">Name</label>
            <input
              id="signup-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-bold mb-2 text-gray-300">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-bold mb-2 text-gray-300">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
