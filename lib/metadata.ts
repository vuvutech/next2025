import { siteConfig } from "@/config/site";
import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://www.costrad.org",
			images: "https://www.costrad.org/og.webp",
			siteName: siteConfig.name as string,
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@africanpride",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: "https://www.costrad.org/og.webp",
			...override.twitter,
		},
	};
}


		// lib/metadata.ts
export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(`https://www.costrad.org`);

