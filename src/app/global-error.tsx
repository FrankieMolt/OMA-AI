'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: '#09090b', 
        color: '#fafafa',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ 
            fontSize: '7rem', 
            fontWeight: 900,
            background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
          }}>
            500
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            Internal Server Error
          </h1>
          <p style={{ color: '#a1a1aa', marginBottom: '2rem', lineHeight: 1.6 }}>
            Something went wrong on our end. Our agents have been notified and are working to fix it.
          </p>
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-block',
              background: '#8b5cf6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              marginRight: '1rem',
            }}
          >
            Try Again
          </button>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#a78bfa',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              border: '1px solid #8b5cf6',
            }}
          >
            Return to Homepage
          </Link>
          <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#52525b' }}>
            OMA-AI MCP Marketplace | x402 Payments
          </div>
        </div>
      </body>
    </html>
  );
}