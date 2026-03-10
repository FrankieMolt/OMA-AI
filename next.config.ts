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
};

export default nextConfig;
