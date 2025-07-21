import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com", // If used elsewhere
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ correct
        pathname: "/dbvlk7bkr/**",
      },
    ],
  },
};

export default nextConfig;
