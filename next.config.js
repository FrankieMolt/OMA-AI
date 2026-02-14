/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  // Performance Optimizations
  compress: true,
  poweredByHeader: false,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.oma-ai.com',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' https://api.oma-ai.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://* blob:; connect-src 'self' https://*;",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          }
        ],
      },
      {
        source: '/(fonts|images|favicon.ico|favicon.svg|apple-touch-icon.png)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      }
    ]
  }
};

module.exports = nextConfig;
