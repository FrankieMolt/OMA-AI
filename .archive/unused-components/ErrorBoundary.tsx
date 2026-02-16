'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Optional: Send error to monitoring service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag?.('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return <DefaultErrorUI error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

// Default Error UI Component
function DefaultErrorUI({
  error,
  onReset
}: {
  error: Error | null;
  onReset: () => void;
}) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="glass-card p-8 rounded-2xl text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-red-500" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            {error?.message ||
              'An unexpected error occurred. Please try again or contact support if the problem persists.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={onReset}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <a
              href="/"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Go Home
            </a>
          </div>

          {/* Report Issue Link */}
          <a
            href="https://github.com/FrankieMolt/OMA-AI/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-400 transition-colors"
          >
            <Bug size={14} />
            Report this issue
          </a>

          {/* Developer Details */}
          {isDev && error && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-red-400 hover:text-red-300 mb-4">
                Show Error Details (Dev Mode)
              </summary>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-red-400 font-mono whitespace-pre-wrap">
                  {error.toString()}
                  {error.stack && '\n\n' + error.stack}
                </pre>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline error component for smaller sections
export function InlineError({
  message,
  onRetry,
  showIcon = true
}: {
  message: string;
  onRetry?: () => void;
  showIcon?: boolean;
}) {
  return (
    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
      {showIcon && (
        <AlertTriangle className="text-red-500 mx-auto mb-3" size={32} />
      )}
      <p className="text-red-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

// Network error component
export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle size={32} className="text-yellow-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Connection Error
      </h3>
      <p className="text-zinc-400 mb-6">
        Unable to connect to the server. Please check your internet connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="btn-primary flex items-center justify-center gap-2 mx-auto"
      >
        <RefreshCw size={18} />
        Retry
      </button>
    </div>
  );
}

// API error component
export function APIError({
  error,
  onRetry
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <h4 className="text-red-300 font-semibold mb-1">
            API Error
          </h4>
          <p className="text-red-400/80 text-sm">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 text-sm text-red-300 hover:text-red-200 transition-colors"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Not found error component
export function NotFoundError() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Home size={18} />
          Back to Home
        </a>
      </div>
    </div>
  );
}
