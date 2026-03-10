import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Force content hashing and disable immutable caching
  generateEtags: false,
  // Ensure consistent builds
  output: 'standalone',
};

export default nextConfig;
