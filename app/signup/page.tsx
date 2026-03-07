import { Metadata } from 'next';
import Link from 'next/link';
import { WalletConnect } from '@/components/wallet-connect';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your OMA-AI account and start building AI agents today.',
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 py-8 px-4 shadow sm:rounded-2xl border border-zinc-800 sm:px-10">
          <div className="mb-6">
            <WalletConnect />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-900 text-zinc-500">Or register with email</span>
            </div>
          </div>

          <form className="space-y-6 mt-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-lg shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-zinc-950 text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-lg shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-zinc-950 text-white"
                />
              </div>
            </div>
            
            <p className="text-xs text-zinc-500 text-center">
              By registering, you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
