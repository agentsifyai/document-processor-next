import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Add webpack configuration for dependencies
  webpack: (config) => {
    // Add fallback for Node.js modules required by some dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Return the updated config
    return config;
  },
  
  // Remove Turbopack configuration as it doesn't handle the same options
  // Using a simple dev script is fine for now
};

export default nextConfig;