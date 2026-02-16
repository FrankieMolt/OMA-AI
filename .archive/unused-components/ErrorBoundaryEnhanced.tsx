'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Enhanced Error Boundary Component
 * Catches JavaScript errors in component tree and displays fallback UI
 */
export class ErrorBoundaryEnhanced extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Store error info in state for display
    this.setState({
      error,
      errorInfo
    });

    // Send error to monitoring service (e.g., Sentry)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-lg w-full text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>

            <p className="text-zinc-400 mb-8">
              We apologize for the inconvenience. The application encountered an unexpected error.
              Please try refreshing the page or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-zinc-900 rounded-lg p-4 mb-6 text-sm">
                <summary className="cursor-pointer text-zinc-300 font-semibold mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-red-400 overflow-auto p-2 bg-zinc-800 rounded">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-zinc-400 overflow-auto p-2 mt-2 bg-zinc-800 rounded text-xs">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <RefreshCw size={18} />
                Try Again
              </button>

              <a
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-zinc-200 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <Home size={18} />
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional component wrapper for easier usage
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundaryEnhanced fallback={fallback}>
        <Component {...props} />
      </ErrorBoundaryEnhanced>
    );
  };
}
