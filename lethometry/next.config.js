/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Security headers are now in vercel.json (headers() doesn't work with static export)
}

module.exports = nextConfig
