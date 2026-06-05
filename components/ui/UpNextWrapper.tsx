// components/ui/UpNextWrapper.tsx
"use client";

import { LucideMoveRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { oswald } from "@/config/fonts";
import { formatAccraDate } from "@/lib/date";
import { cn } from "@/lib/utils";

type NextEdition = {
	title: string;
	slug: string;
	startDate: string | null;
	endDate: string | null;
	institute?: {
		slug: string;
	} | null;
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
		pathname.startsWith(prefix),
	);

	if (hideUpNext) return null;
	if (!nextEdition) return null;

	return (
		<div className="bg-primary/95 backdrop-blur-sm border-b border-white/10 overflow-x-hidden">
			<div className="max-w-[90rem] px-2 py-1 sm:px-6 lg:px-8 mx-auto">
				<div className="flex flex-nowrap justify-center items-center gap-x-2 sm:gap-x-3 text-[9px] sm:text-[10px] md:text-[13px]">
					<span
						className={cn(
							oswald.className,
							"text-white uppercase font-bold opacity-80 shrink-0",
						)}
					>
						UpNext:
					</span>
					<Link
						href={
							nextEdition.institute?.slug
								? `/institutes/${nextEdition.institute.slug}`
								: `#`
						}
						className={cn(
							oswald.className,
							"text-white font-medium truncate max-w-[90px] sm:max-w-none hover:underline cursor-pointer",
						)}
					>
						{nextEdition.title}
					</Link>
					<div className="h-3 w-[1px] bg-white/20 shrink-0" />
					<span
						className={cn(
							oswald.className,
							"font-medium text-white/90 shrink-0 whitespace-nowrap",
						)}
					>
						{nextEdition.startDate
							? formatAccraDate(nextEdition.startDate, "monthDay")
							: ""}{" "}
						&mdash;{" "}
						{nextEdition.endDate
							? formatAccraDate(nextEdition.endDate, "monthDay")
							: ""}{" "}
					</span>

					<Link
						className={cn(
							oswald.className,
							"py-0.5 px-2.5 sm:px-3 md:px-5 inline-flex items-center gap-x-1 bg-white text-primary text-[9px] sm:text-[10px] md:text-[11px] uppercase font-bold hover:bg-white/90 transition-all rounded-full shadow-lg shrink-0",
						)}
						href={`/apply`}
					>
						Apply
						<LucideMoveRight
							size={12}
							strokeWidth={3}
							className="hidden sm:block"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
