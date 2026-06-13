import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Enable Turbopack (default in Next.js 16+)
  turbopack: {},

  // Enable strict mode for better React practices
  reactStrictMode: true,

  // Disable ETag generation to force browser revalidation
  generateEtags: false,

  // Suppress lockfile warning — bun.lock lives in /home/nosyt/ parent dir
  outputFileTracingRoot: __dirname,
  output: 'standalone',

  // Compression
  compress: true,

  // Production settings
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Tree-shaking handled by experimental.optimizePackageImports below

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: '**.github.com' },
      { protocol: 'https', hostname: 'icons.duckduckgo.com' },
    ],
  },

  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Server-only packages (moved OUT of experimental in Next.js 16+)
  serverExternalPackages: [
    '@open-wallet-standard/core',
    '@open-wallet-standard/core-linux-x64-gnu',
    'better-sqlite3',
  ],

  // Handle native Rust FFI binaries for OWS
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        '@open-wallet-standard/core',
        '@open-wallet-standard/core-linux-x64-gnu',
      ];
    }
    // Treat .node files as binary
    config.module.rules.push({
      test: /\.node$/,
      type: 'binary',
    });
    return config;
  },

  // Redirects
  async redirects() {
    return [
      { source: '/marketplace', destination: '/mcps', permanent: true },
      { source: '/mcp', destination: '/mcps', permanent: true },
    ];
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { 
            key: 'Content-Security-Policy', 
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
          },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default withBundle(nextConfig);
