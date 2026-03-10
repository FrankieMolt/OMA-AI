import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: reactCompiler is a Next.js 16.x feature, not available in 15.x
  // Enable via environment variable if needed: NEXT_REACT_COMPILER=true
  // Disable ETag generation to force browser revalidation
  generateEtags: false,
  // Disable immutable caching for development
  compress: true,
  // Ensure production builds
  productionBrowserSourceMaps: false,
};

export default nextConfig;
