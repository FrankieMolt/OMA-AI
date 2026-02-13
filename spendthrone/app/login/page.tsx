/**
 * Login Page
 */

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🛍️</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              SPENDTHRONE
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to your account</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                <input type="checkbox" className="rounded border-zinc-700 bg-zinc-950 text-white accent-white" />
                Remember me
              </label>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-white hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
