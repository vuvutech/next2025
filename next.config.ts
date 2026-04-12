import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => ([
    { source: '/favicon.ico', headers: [{ key:'Cache-Control', value:'public, max-age=31536000, immutable' }] }
  ]),
  serverExternalPackages: ["@prisma/client"],
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
