import MainLogo from "@/components/ui/MainLogo";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import Link from "next/link";
import React from "react";

export default function Unsubscribe() {
  return (
    <main className="flex h-[70dvh] max-h-dvh flex-col items-center justify-center p-4 relative">

      <div className="grid grid-cols-1 text-center gap-6 sm:gap-4 lg:gap-8">

        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-red-600 dark:text-red-400">
            Unsubscribe Failed
          </h1>
          <p className="text-lg max-w-xl mx-auto mt-2 text-gray-700 dark:text-gray-300">
            Oops! We couldn’t verify your unsubscribe request.
          </p>
          <p className="text-md mt-2 text-gray-600 dark:text-gray-400">
            This usually happens when the confirmation token is missing, invalid, or expired.
          </p>
          <p className="text-md mt-2 text-gray-600 dark:text-gray-400">
            If you believe this is an error, feel free to contact us directly and we’ll sort it out.
          </p>
        </div>

        <div>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Need help? Email{" "}
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
