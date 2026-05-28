"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { DialogProvider } from "@/providers/DialogProvider";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			{...themeProps}
		>
			<LazyMotion features={domAnimation}>
				<DialogProvider>{children}</DialogProvider>
			</LazyMotion>
		</NextThemesProvider>
	);
}
