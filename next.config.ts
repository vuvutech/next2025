import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["192.168.10.20"],
	headers: async () => {
		const securityHeaders = [
			{ key: "X-Frame-Options", value: "DENY" },
			{ key: "X-Content-Type-Options", value: "nosniff" },
			{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
			{ key: "Permissions-Policy", value: "interest-cohort=()" },
			{ key: "X-DNS-Prefetch-Control", value: "off" },
			{
				key: "Content-Security-Policy",
				value: [
					"default-src 'self'",
					"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com",
					"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
					"font-src 'self' https://fonts.gstatic.com",
					"img-src 'self' data: https: blob:",
					"connect-src 'self' https://challenges.cloudflare.com https://www.google.com https://res.cloudinary.com https://*.resend.com https://www.google-analytics.com",
					"frame-src 'self' https://challenges.cloudflare.com",
					"object-src 'none'",
					"base-uri 'self'",
					"form-action 'self'",
				].join("; "),
			},
		];

		if (process.env.NODE_ENV === "production") {
			securityHeaders.push({
				key: "Strict-Transport-Security",
				value: "max-age=63072000; includeSubDomains; preload",
			});
		}

		return [
			{ source: "/(.*)", headers: securityHeaders },
			{
				source: "/favicon.ico",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
	serverExternalPackages: ["@prisma/client"],
	experimental: {
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
	images: {
		qualities: [75, 80, 85],
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
