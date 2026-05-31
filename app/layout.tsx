import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import FooterWrapper from "@/components/layout/Footer-Wrapper";
import StickyMenuWrapper from "@/components/navigation/StickyMenuWrapper";
import { anton, bebas, ibmplex, opensans, oswald } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";

const TestimonialDialog = dynamic(() =>
  import("@/components/modals/TestimonialDialog").then(
    (mod) => mod.TestimonialDialog,
  ),
);
const NewsletterDialog = dynamic(() =>
  import("@/components/modals/NewsletterDialog").then(
    (mod) => mod.NewsletterDialog,
  ),
);

import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollToTop from "@/components/ui/ScrollToTop";
import UpNextWrapper from "@/components/ui/UpNextWrapper";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/images/costrad.webp",
  },
  publisher: "Dr. Abu Bako",
  robots: "index, follow",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      data-scroll-behavior="smooth"
      className={` ${bebas.variable} ${anton.variable}  ${ibmplex.variable} ${oswald.variable} ${opensans.variable}  ${opensans.className} 
         text-lg font-extralight min-h-screen text-foreground bg-background antialiased`}
    >
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <UpNextWrapper />
          <StickyMenuWrapper />

          <main className="relative overflow-x-hidden mx-auto">{children}</main>
          <ScrollToTop />
          <FooterWrapper />
          <Toaster />
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
          <GoogleAnalytics gaId="G-1GJ79QESWQ" />

          {/* <GlobalDialog /> */}
          <TestimonialDialog />
          <NewsletterDialog />
        </Providers>
      </body>
    </html>
  );
}
