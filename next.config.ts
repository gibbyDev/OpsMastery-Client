import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // This ensures React Strict Mode is enabled for better debugging
  productionBrowserSourceMaps: true, // Enables source maps in production as well
  webpack(config, { isServer, dev }) {
    // Enable source maps in development (client-side only)
    if (!isServer && dev) {
      config.devtool = 'source-map'; // Make sure source maps are generated for client-side code
    }
    return config;
  },
};

export default nextConfig;
