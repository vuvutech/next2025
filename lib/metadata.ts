import { siteConfig } from "@/config/site";
import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://demo.better-auth.com",
			images: "https://demo.better-auth.com/og.png",
			siteName: siteConfig.name as string,
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@africanpride",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: "https://demo.better-auth.com/og.png",
			...override.twitter,
		},
	};
}

export const baseUrl2 =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(`https://${process.env.VERCEL_URL!}`);

		// lib/metadata.ts
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  console.warn('NEXT_PUBLIC_BASE_URL is not set. Using fallback URL:', baseUrl);
}

