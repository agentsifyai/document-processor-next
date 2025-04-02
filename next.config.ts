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
      path: false,
      util: false,
      stream: false,
      zlib: false,
      crypto: false,
      buffer: false,
    };
    
    // Ensure PDF.js can load Web Workers in Next.js
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?mjs/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name]-[hash][ext]",
      },
    });
    
    // Return the updated config
    return config;
  },
  
  // Extra security headers for better CSP support
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "require-corp",
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
      ],
    },
  ],
};

export default nextConfig;