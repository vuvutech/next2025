import MainLogo from "@/components/ui/MainLogo";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import Link from "next/link";
import React from "react";

export default function Subscribe() {
  return (
    <main className="flex h-screen max-h-dvh flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-3">
        <ThemeSwitch className="pt-2 pl-6" />
      </div>

      <div className="grid grid-cols-1 text-center gap-6 sm:gap-4 lg:gap-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Subscription Confirmed ✅
          </h1>
          <p className="text-lg max-w-xl mx-auto mt-2 text-gray-700 dark:text-gray-300">
            You’re now subscribed to the <strong>COSTrAD Newsletter</strong>.
            We’re excited to have you on board!
          </p>
          <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">
            Stay tuned for updates, insights, and exclusive content straight to your inbox.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 text-gray-900 dark:text-white">
            Welcome to the community!
          </h2>
        </div>

        <div>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Have questions? Reach out at{" "}
            <Link href="mailto:info@costrad.org" className="underline hover:text-blue-600 dark:hover:text-blue-400">
              info@costrad.org
            </Link>
            ,{" "}
            <Link href="mailto:webmaster@costrad.org" className="underline hover:text-blue-600 dark:hover:text-blue-400">
              webmaster@costrad.org
            </Link>{" "}
            or call{" "}
            <Link href="tel:+233200201334" className="underline hover:text-blue-600 dark:hover:text-blue-400">
              +233 20 020 1334
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
