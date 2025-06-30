"use client";

import { usePathname } from "next/navigation";
import StickyMenu from "./StickyMenu";

export default function StickyMenuWrapper() {
  const pathname = usePathname();

  // Pages where Footer should be hidden (match by prefix)
  const hiddenPrefixes = ["/admin", "/www", "/coming-soon", "/auth","/apply","/thank-you"];

  const shouldHideFooter = hiddenPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (shouldHideFooter) return null;

  return <StickyMenu />;
}
