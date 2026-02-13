/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for development to allow dynamic routes
  // Uncomment this for production build: output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  trailingSlash: true,
  
  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'self';",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
