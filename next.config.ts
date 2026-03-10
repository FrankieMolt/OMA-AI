import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Disable ETag generation to force browser revalidation
  generateEtags: false,
  // Disable immutable caching for development
  compress: true,
  // Ensure production builds
  productionBrowserSourceMaps: false,
  // Disable Turbopack to fix module factory error with Framer Motion
  experimental: {
    turbo: undefined,  // Explicitly disable Turbopack
  },
};

export default nextConfig;
