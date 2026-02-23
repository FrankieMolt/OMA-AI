"use client";

import Link from "next/link";

interface NavigationProps {
  title?: string;
  showStatus?: boolean;
  status?: "ok" | "error";
}

export default function Navigation({
  title = "OMA-AI",
  showStatus = false,
  status = "ok",
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-white cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-orbitron font-bold text-lg tracking-tight">
            {title}
          </span>
        </Link>

        {showStatus && (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${status === "ok" ? "bg-green-500 animate-pulse shadow-lg shadow-green-500/50" : "bg-red-500"}`}
            />
            <span className="text-sm text-green-400 font-medium">
              {status === "ok" ? "LIVE" : "DOWN"}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
