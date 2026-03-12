'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('[ErrorBoundary] Error caught:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service
    // TODO: Add Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="backdrop-blur-xl bg-red-900/20 border border-red-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                Something went wrong
              </h1>

              <p className="text-gray-300 mb-6">
                An unexpected error occurred. We've been notified and are working to fix it.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-red-400 font-mono mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-xs text-gray-400 overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleReset}
                  className="w-full px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full px-6 py-2.5 bg-transparent hover:bg-slate-800 text-purple-400 border border-slate-700 rounded-lg font-semibold transition-colors"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple wrapper for quick error display
export function ErrorDisplay({ error, onReset }: { error: Error; onReset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-xl bg-red-900/20 border border-red-700/50 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Something went wrong
          </h1>

          <p className="text-gray-300 mb-6">
            {error.message || 'An unexpected error occurred.'}
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-red-400 font-mono">
                {error.toString()}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={onReset}
              className="w-full px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-6 py-2.5 bg-transparent hover:bg-slate-800 text-purple-400 border border-slate-700 rounded-lg font-semibold transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
