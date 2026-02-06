/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
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
  },
};

module.exports = nextConfig;
