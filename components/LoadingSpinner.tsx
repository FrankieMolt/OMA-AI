'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'blue' | 'green' | 'white';
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
};

const colorClasses = {
  purple: 'text-purple-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  white: 'text-white'
};

export default function LoadingSpinner({
  size = 'md',
  color = 'purple',
  text,
  className = ''
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} />
      {text && <p className="text-sm text-zinc-400">{text}</p>}
    </div>
  );
}

// Full page loading state
export function FullPageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

// Inline loader for content sections
export function InlineLoader({ height = '200px' }: { height?: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height }}
    >
      <LoadingSpinner size="md" />
    </div>
  );
}

// Button loader
export function ButtonLoader() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin w-4 h-4" />
    </div>
  );
}

// Skeleton loading component
export function SkeletonCard({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card p-6 rounded-xl space-y-4 animate-pulse"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-zinc-800 rounded" />
                <div className="w-24 h-3 bg-zinc-800/50 rounded" />
              </div>
            </div>
          </div>
          <div className="w-full h-12 bg-zinc-800/50 rounded" />
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-zinc-800 rounded" />
            <div className="w-16 h-6 bg-zinc-800 rounded" />
            <div className="w-16 h-6 bg-zinc-800 rounded" />
          </div>
          <div className="w-full h-px bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div className="w-20 h-4 bg-zinc-800 rounded" />
            <div className="w-16 h-8 bg-zinc-800 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}

// Skeleton stats
export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="glass-card p-6 rounded-xl space-y-3 animate-pulse"
        >
          <div className="w-10 h-10 bg-zinc-800 rounded-lg" />
          <div className="w-24 h-8 bg-zinc-800 rounded" />
          <div className="w-32 h-4 bg-zinc-800/50 rounded" />
        </div>
      ))}
    </div>
  );
}

// Skeleton table rows
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="w-full h-12 bg-zinc-800/30 rounded-lg animate-pulse" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 animate-pulse">
          <div className="w-16 h-10 bg-zinc-800/50 rounded" />
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-4 bg-zinc-800/50 rounded" />
            <div className="w-1/2 h-3 bg-zinc-800/30 rounded" />
          </div>
          <div className="w-20 h-8 bg-zinc-800/50 rounded" />
        </div>
      ))}
    </div>
  );
}

// Progress loader
export function ProgressLoader({ progress = 0 }: { progress: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
        <span>Loading...</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Dot loader
export function DotLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
}
