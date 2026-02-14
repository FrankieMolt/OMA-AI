/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,

  // Static export configuration
  output: 'export',
  distDir: 'out',
  trailingSlash: true,

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

  // Static export requires unoptimized images
  images: {
    unoptimized: true,
  },

  // Security Headers - disabled for static export (headers() requires server)
  // These should be configured in your web server (nginx, Apache, etc.)
};

module.exports = nextConfig;

// Add CSP headers for static export (if served via a CDN or server that supports headers)
// Note: When deployed to Vercel static, you can configure headers in vercel.json.

