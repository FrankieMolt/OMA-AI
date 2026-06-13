'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[BlogPost] Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-300 mb-8">
          We encountered an error loading this blog post. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try again
        </button>
        <div className="mt-6">
          <Link href="/blog"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
