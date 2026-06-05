"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getInstitutes } from "@/app/actions/functions";
import InstituteCardWithImage from "@/components/sections/InstituteCardWithImage";
import { formatAccraDate } from "@/lib/date";

type Institute = {
	id: string;
	name: string;
	slug: string;
	overview: string;
	banner?: string;
	acronym: string;
	editions: {
		title?: string;
		startDate?: string;
		endDate?: string;
	}[];
};

interface InstitutesComponentProps {
	initialInstitutes: Institute[] | null;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08, // Slightly faster stagger for mobile
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 }, // Increased y offset for more dramatic effect
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6, // Slightly longer duration for smoother animation
			ease: easeOut,
		},
	},
};

export default function InstitutesComponent({
	initialInstitutes,
}: InstitutesComponentProps) {
	const [institutes, setInstitutes] = useState<Institute[] | null>(
		initialInstitutes,
	);
	const [loading, setLoading] = useState(false); // Set to false since initial data is provided
	const [error, setError] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-20px" }); // Trigger when 20px from viewport

	// Optional: Fetch data client-side for real-time updates
	useEffect(() => {
		// Only fetch if you want to refresh data client-side (e.g., for polling)
		const _fetchInstitutes = async () => {
			try {
				setLoading(true);
				const data = await getInstitutes();
				setInstitutes(data);
			} catch (_err) {
				setError("Failed to fetch institutes");
			} finally {
				setLoading(false);
			}
		};
		// Uncomment to enable client-side refresh
		// fetchInstitutes();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!institutes || institutes.length === 0) {
		return <div>No institutes found</div>;
	}

	return (
		<motion.div
			ref={ref}
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8 md:p-2"
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
		>
			{institutes.map((institute) => {
				const edition = institute.editions[0];
				return (
					<motion.div
						key={institute.id}
						variants={itemVariants}
						className="h-full"
					>
						<InstituteCardWithImage
							id={institute.id}
							name={institute.name}
							slug={institute.slug}
							overview={institute.overview}
							banner={institute.banner ?? "/images/default-banner.webp"}
							logo={`/images/logos/${institute.acronym}.webp`}
							editionTitle={edition?.title || "No Edition Available"}
							editionDates={
								edition?.startDate && edition?.endDate
									? `${formatDate(edition.startDate)} – ${formatDate(edition.endDate)}`
									: "Dates TBD"
							}
						/>
					</motion.div>
				);
			})}
		</motion.div>
	);
}

function formatDate(dateString: string) {
	return formatAccraDate(dateString, "monthDay");
}
