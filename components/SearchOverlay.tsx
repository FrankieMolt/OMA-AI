'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchResult {
  type: 'api' | 'blog' | 'doc' | 'page';
  title: string;
  url: string;
  description: string;
}

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);

      // Simulated search results (in production, this would query an API)
      const mockResults = [
        {
          type: 'api' as const,
          title: 'AI Code Review API',
          url: '/',
          description: 'Automated code review with GPT-4 integration',
        },
        {
          type: 'doc' as const,
          title: 'Getting Started Guide',
          url: '/docs',
          description: 'Quick start guide to begin using OMA-AI',
        },
        {
          type: 'blog' as const,
          title: 'How OMA-AI is Revolutionizing the API Marketplace',
          url: '/blog/oma-ai-humans-and-agents-2026',
          description: 'Discover how OMA-AI is creating the first unified marketplace for humans and autonomous AI agents',
        },
        {
          type: 'page' as const,
          title: 'Pricing Plans',
          url: '/pricing',
          description: 'Simple, transparent pricing for all users',
        },
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );

      setResults(mockResults);
      setIsSearching(false);
    };

    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search APIs, docs, blog posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 text-lg"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {query && (
          <div className="max-h-96 overflow-y-auto p-4">
            {isSearching ? (
              <div className="text-center text-zinc-500 py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-zinc-600 border-t-purple-500" />
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <a
                    key={index}
                    href={result.url}
                    onClick={onClose}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {result.type === 'api' && (
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      )}
                      {result.type === 'doc' && (
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                      {result.type === 'blog' && (
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      )}
                      {result.type === 'page' && (
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        {result.title}
                      </div>
                      <div className="text-sm text-zinc-500 mt-1">
                        {result.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center text-zinc-500 py-8">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
