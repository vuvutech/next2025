"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { DialogProvider } from "@/providers/DialogProvider";
import { LazyMotion, domAnimation } from "framer-motion";

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
