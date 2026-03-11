'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // TODO: Send to Sentry or similar service
    // Sentry.captureException(error, { errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-16 h-16 text-rose-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h1>
            
            <p className="text-gray-400 mb-6">
              {this.state.error?.message?.includes('module factory') 
    ? 'Failed to load required modules. Please refresh the page.' 
    : this.state.error?.message || 'An unexpected error occurred. Please try again.'}
            </p>
            
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Page-level error boundary for specific error handling
interface PageErrorProps {
  error: Error;
  reset: () => void;
}

export function PageError({ error, reset }: PageErrorProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-white mb-2">
          Failed to load page
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="text-blue-400 hover:text-blue-300 font-medium text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
