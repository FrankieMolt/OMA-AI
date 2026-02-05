/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.oma-ai.com',
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
