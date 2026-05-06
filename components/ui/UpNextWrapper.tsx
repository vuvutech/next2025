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
import { cn } from "@/lib/utils";

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
      if (!res.ok) return;
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
		<div className='bg-primary/95 backdrop-blur-sm border-b border-white/10'>
			<div className='max-w-[90rem] px-4 py-1.5 sm:px-6 lg:px-8 mx-auto'>
				<div className='flex flex-wrap justify-center items-center gap-y-1 gap-x-4 sm:gap-x-8'>
					<div
						className={cn(
							oswald.className,
							"flex items-center gap-x-2 text-white uppercase text-[10px] md:text-[13px] tracking-wider",
						)}
					>
						<span className='font-bold opacity-80'>UpNext:</span>
						<span className='font-medium'>{nextEdition.title}</span>
						<div className='h-3 w-[1px] bg-white/20 mx-1 hidden sm:block' />
						<span className='font-medium text-white/90'>
							{nextEdition.startDate
								? new Date(
										nextEdition.startDate,
									).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									})
								: ""}{" "}
							&mdash;{" "}
							{nextEdition.endDate
								? new Date(
										nextEdition.endDate,
									).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})
								: ""}{" "}
						</span>
					</div>

					<Link
						className={cn(
							oswald.className,
							"py-0.5 px-3 md:px-5 inline-flex items-center gap-x-2 bg-white text-primary text-[10px] md:text-[11px] uppercase font-bold hover:bg-white/90 transition-all rounded-full shadow-lg shrink-0",
						)}
						href={`/apply`}
					>
						Apply Now
						<LucideMoveRight size={14} strokeWidth={3} />
					</Link>
				</div>
			</div>
		</div>
  );
}
