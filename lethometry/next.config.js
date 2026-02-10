/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for development to allow dynamic routes
  // Uncomment this for production build: output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
