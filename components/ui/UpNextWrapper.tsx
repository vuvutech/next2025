// components/ui/UpNextWrapper.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { oswald } from "@/config/fonts";
import {
  LucideArrowRight,
  LucideEllipsisVertical,
  LucideMoveRight,
  LucideTally1,
  SeparatorVertical,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

type NextEdition = {
  title: string;
  slug: string;
  startDate: string | null;
  endDate: string | null;
} | null;

export default function UpNextWrapper() {
  const pathname = usePathname();
  // Pages where Footer should be hidden (match by prefix)
  const hiddenPrefixes = [
    "/admin",
    "/www",
    "/coming-soon",
    "/auth",
    "/apply",
    "/thank-you",
  ];

  const [nextEdition, setNextEdition] = useState<NextEdition>(null);

  useEffect(() => {
    async function fetchEdition() {
      const res = await fetch("/api/upnext");
      const data = await res.json();
      setNextEdition(data);
    }
    fetchEdition();
  }, []);

  const hideUpNext = hiddenPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (hideUpNext) return null;
  if (!nextEdition) return null;

  return (
    <div className="bg-linear-to-r from-primary to-primary/90">
      <div className="max-w-[85rem] px-1 py-1  sm:px-6 lg:px-8 mx-auto">
        <div className="flex  justify-center items-center ">
          <p
            className={`${oswald.className} text-white uppercase leading-[10px] text-[10px] md:text-[12px] flex items-center `}
          >
            <span className="font-bold uppercase">UpNext:</span>
            &nbsp; <span className="font-mono">{nextEdition.title}</span>

            <LucideTally1 size={14} className="pl-2  box-content" />
            <span className="font-semibold uppercase ">
              {nextEdition.startDate
                ? new Date(nextEdition.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : ""}{" "}
              &mdash;{" "}
              {nextEdition.endDate
                ? new Date(nextEdition.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}{" "}
            </span>
          </p>
          &nbsp;&nbsp;
          <Link
            className="py-0.5 sm:py-1 px-3 md:px-4 inline-flex justify-center items-center gap-x-1 bg-white/10 text-[9px] md:text-[11px] font-oswald
                uppercase font-semibold text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20 rounded-full"
            href={`/apply`}
          >
            Apply Now
            <span className=" sm:inline-flex">
              <LucideMoveRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
