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

  // Enable Next.js Image Optimization for better performance
  // This provides automatic image resizing, compression, and format conversion (WebP/AVIF)
  // Improves Core Web Vitals (LCP, CLS) and reduces bandwidth usage by 30-50%
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains for flexibility
      },
    ],
    formats: ['image/avif', 'image/webp'], // Prefer modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Security Headers for improved security
  // These headers protect against XSS, clickjacking, and enforce HTTPS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy - Prevent XSS attacks
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app; style-src 'self' 'unsafe-inline' https://*.vercel.app; img-src 'self' data: https:*.vercel.app blob:; font-src 'self' data:; connect-src 'self' https://*.vercel.app https://api.oma-ai.com; frame-ancestors 'self';",
          },
          // Strict Transport Security - Enforce HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // X-Frame-Options - Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // X-Content-Type-Options - Prevent MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer Policy - Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Cache Control for static assets
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Bundle Analysis
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };

    // Tree shaking for better bundle optimization
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };

    return config;
  },

  // Turbopack configuration (Next.js 16+)
  turbopack: {
    // Empty config to silence the warning
  },
};

module.exports = nextConfig;
