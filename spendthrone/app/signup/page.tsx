/**
 * Signup Page
 */

import Link from 'next/link';

export default function SignupPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-zinc-400">Join the kingdom of weird stuff</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                placeholder="Your name"
              />
            </div>

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

            <div className="flex items-start gap-2">
              <input type="checkbox" id="agree" className="mt-1 rounded border-zinc-700 bg-zinc-950 text-white" />
              <label htmlFor="agree" className="text-sm text-zinc-400">
                I agree to the{' '}
                <Link href="/terms" className="text-white hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-white hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
              Create Account
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
