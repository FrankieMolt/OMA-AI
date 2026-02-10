/**
 * Error Boundary Component - Catches React errors
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="text-red-400" size={40} />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h1>
            
            <p className="text-zinc-500 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-zinc-600 cursor-pointer mb-2">
                  Error Details
                </summary>
                <pre className="p-4 bg-zinc-900 rounded-xl text-xs text-red-400 overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={this.handleReset}>
                <RefreshCw className="mr-2" size={18} />
                Try Again
              </Button>
              <Button variant="primary" onClick={() => window.location.href = '/'}>
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
