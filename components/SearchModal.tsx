"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Toggle handled by parent
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus input
      const input = document.getElementById("search-modal-input");
      if (input) input.focus();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onClose();
      setQuery("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-memoria-bg-card border border-memoria-border-default rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSearch} className="flex items-center gap-3 p-4">
          <Search className="text-memoria-text-whisper" size={20} />
          <input
            id="search-modal-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search APIs, MCP servers, docs..."
            className="flex-1 bg-transparent text-memoria-text-hero text-lg outline-none placeholder-memoria-text-meta"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-memoria-bg-surface rounded"
          >
            <X size={16} className="text-memoria-text-meta" />
          </button>
        </form>

        <div className="border-t border-memoria-border-muted p-4">
          <div className="text-xs text-memoria-text-meta mb-2">
            Quick links:
          </div>
          <div className="flex flex-wrap gap-2">
            {["/marketplace", "/docs", "/dashboard", "/tasks"].map((path) => (
              <a
                key={path}
                href={path}
                className="px-3 py-1 text-sm bg-memoria-bg-surface rounded hover:bg-memoria-bg-ultra-dark transition-colors"
                onClick={onClose}
              >
                {path}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
