import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    WP_SITE_URL: process.env.WP_SITE_URL,
    WP_USERNAME: process.env.WP_USERNAME,
    WP_PASSWORD: process.env.WP_PASSWORD,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_WP_SITE_URL: process.env.NEXT_PUBLIC_WP_SITE_URL,
    NEXT_PUBLIC_WP_USERNAME: process.env.NEXT_PUBLIC_WP_USERNAME,
    NEXT_PUBLIC_WP_PASSWORD: process.env.NEXT_PUBLIC_WP_PASSWORD,
  },
  images: {
    domains: ['*'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;
