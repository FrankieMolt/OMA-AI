'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-900/30 rounded-full">
                <AlertCircle size={48} className="text-red-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">
              Something went wrong
            </h1>
            <p className="text-gray-400 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Reload Page
            </button>
            <div className="mt-6 text-sm text-gray-500">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-gray-400 hover:text-white">
                    Error Details
                  </summary>
                  <pre className="mt-2 p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-left overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
