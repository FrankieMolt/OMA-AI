'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('[MCPSkillPage] Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-8">
          We encountered an error loading this MCP skill. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Try again
        </button>
        <div className="mt-6">
          <a
            href="/mcps"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            ← Back to Marketplace
          </a>
        </div>
      </div>
    </div>
  );
}
