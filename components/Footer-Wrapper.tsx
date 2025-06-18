"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Pages where Footer should be hidden (match by prefix)
  const hiddenPrefixes = ["/admin", "/www", "/coming-soon", "/auth"];

  const shouldHideFooter = hiddenPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (shouldHideFooter) return null;

  return <Footer />;
}
