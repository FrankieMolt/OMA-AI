/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,

  // Turbopack configuration - explicitly set to this project
  turbopack: {
    root: process.cwd(),
  },

  // Performance Optimizations
  compress: true,
  poweredByHeader: false,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;

// Add CSP headers for static export (if served via a CDN or server that supports headers)
// Note: When deployed to Vercel static, you can configure headers in vercel.json.

