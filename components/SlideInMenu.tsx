"use client";

import React, { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import MainMenu from "./ui/Menu";
import { siteConfig } from "@/config/site";
import { bebas } from "@/config/fonts";
import { useRouter } from "next/navigation";
import { ThemeSwitch } from "./ui/theme-switch";
import { client } from "@/lib/auth-client";


import { SignInButton } from "./ui/auth/signin-button";
import MainLogo from "./ui/MainLogo";

export default function Component() {
  const [isSignOut, setIsSignOut] = useState<boolean>(false);

  const router = useRouter();

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = client.useSession();

  if (isPending) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  function handleLinkClick(href: string) {
    router.push(href);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className="flex items-center bg-background justify-end gap-x-2 ">
        <div>
          <Sheet>
            <SheetTrigger>
              <div className={`${bebas.className}  `}>
                <MainMenu />
              </div>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[540px] p-4 sm:p-6">
              <SheetHeader className="border-b ">
                <SheetTitle></SheetTitle>
                <MainLogo />
              </SheetHeader>
              <div className="space-y-2 pl-5 font-poppins ">
                <motion.nav
                  className="flex flex-col items-start justify-center gap-4 pl-8 "
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {siteConfig.navItems.map((item) => (
                    <motion.div
                      key={item.number}
                      className="group relative flex items-start justify-center"
                      variants={itemVariants}
                    >
                      <span className="absolute -left-8 text-xs text-firefly">
                        {item.number}
                      </span>
                      <SheetClose asChild>
                        <button
                          onClick={() => handleLinkClick(item.href)}
                          className="group relative text-3xl font-light sm:text-4xl transition-all duration-300 cursor-pointer "
                        >
                          {item.label}
                          <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full" />
                        </button>
                      </SheetClose>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>

              <SheetFooter className="pt-4 border-t border-b border-accent ">
                  <div className="p-3 pb-5 flex items-center justify-between">
                    <SignInButton />
                    <ThemeSwitch />
                  </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="hidden items-center justify-between gap-4">
                    {" "}
                    <div>
                      <SheetClose asChild>
                        <Button variant="outline" className="w-full">
                          Close
                        </Button>
                      </SheetClose>
                    </div>
                    <div>
                      {" "}
                      <ThemeSwitch />
                    </div>
                  </div>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
