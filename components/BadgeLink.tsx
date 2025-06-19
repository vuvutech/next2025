"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // optional if you use classnames helper

interface BadgeLinkProps {
  href: string;
  label: string;
  badge?: string;
  className?: string;
}

export default function BadgeLink({
  href ="#",
  label = "Learn More",
  badge = "Costrad",
  className,
}: BadgeLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "mx-auto mb-3 sm:inline-flex flex justify-between items-center gap-3 uppercase rounded-full border px-2 py-1 text-xs sm:text-sm w-full sm:w-auto",
        className
      )}
    >
      <span
        data-slot="badge"
        className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 border-transparent bg-primary text-white hover:bg-primary/90 rounded-full"
      >
        {badge}
      </span>
      <span className="font-oswald text-[11px] sm:text-xs">{label}</span>
      <span className="flex size-7 items-center justify-center rounded-full bg-muted">
        <ArrowRight className="w-4" />
      </span>
    </Link>
  );
}
