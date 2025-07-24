"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import MainLogo from "@/components/ui/MainLogo";
import { WebMenu } from "@/components/ui/WebMenu";
import SlideInMenu from "@/components/SlideInMenu";
import { SignInButton } from "./auth/signin-button";
import { client } from "@/lib/auth-client";
import { Skeleton } from "./skeleton";
import { useDevice } from "@/hooks/useDevice";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function StickyMenu() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // ✅ Hooks must be called unconditionally
  const { isMobile, isDesktop } = useDevice();
  const { isPending } = client.useSession();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasMounted) {
    // ✅ Skip rendering but after calling hooks
    return null;
  }

  return (
    <div
      id="menu"
      className={clsx(
        "w-full block transition-all bg-background text-foreground z-50 shadow dark:border-b border-b-slate-300/",
        isFixed
          ? "fixed top-0 left-0 right-0 duration-600 z-50 py-1"
          : "relative py-1"
      )}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <MainLogo />

        {isDesktop && (
          <div className="flex items-center gap-x-4">
            <div className="p-2 px-6 rounded-full">
              <WebMenu />
            </div>
          </div>
        )}

        {isDesktop && (
          <div className="flex cursor-pointer items-center gap-x-3">
            {isPending ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        )}

        {isMobile && <SlideInMenu />}
        <ScrollProgress />
      </div>
    </div>
  );
}
