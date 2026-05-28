"use client";

import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import HeroSection from "@/components/sections/HeroSection";
import { InstitutesIntro } from "@/components/sections/InstitutesIntro";

const Jumbotron = dynamic(() => import("@/components/sections/Jumbotron"));
const VelocityScroll = dynamic(() =>
	import("@/components/magicui/scroll-based-velocity").then(
		(mod) => mod.VelocityScroll,
	),
);
const WhyCostrad = dynamic(() => import("@/components/sections/WhyCostrad"));
const Testimonials = dynamic(() =>
	import("@/components/sections/Testimonials").then((mod) => mod.Testimonials),
);

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	//   (async () => {
	//     const LocomotiveScroll = (await import("locomotive-scroll")).default;
	//     const locomotiveScroll = new LocomotiveScroll();

	//     setTimeout(() => {
	//       setIsLoading(false);
	//       document.body.style.cursor = "default";
	//       window.scrollTo(0, 0);
	//     }, 2000);
	//   })();
	// }, []);

	return (
		<main className=" space-y-2 ">
			{/* <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence> */}
			<HeroSection backgroundImageUrl="/images/united-nations.webp" />
			<InstitutesIntro />
			<FadeIn
				as="section"
				className="px-2 md:p-8 max-w-8xl text-[24px] mx-auto md:text-[37px] 
				md:min-h-[60dvh] font-oswald flex flex-col justify-center pb-24"
			>
				<div>
					{" "}
					We equip you with the essential tools and{" "}
					<span className="text-firefly">mindset</span> to confidently guide
					individuals, lead organizations, and oversee complex systems with
					clarity and purpose.{" "}
					<span className="text-primary inline whitespace-nowrap">
						Effective leaders
					</span>{" "}
					demonstrate exceptional communication abilities, sound judgment, and
					sharp analytical thinking. They also have the capacity to uplift,
					energize, and mobilize those around them toward a shared{" "}
					<span className="text-destructive">vision</span>.
				</div>
			</FadeIn>

			<FadeIn className="pb-5 md:pb-10">
				<Jumbotron
					className="object-center"
					heroImage="/images/center2.webp"
					height="md:h-[600px]"
				/>
			</FadeIn>
			<div className="flex flex-col justify-center">
				<VelocityScroll
					className="uppercase md:text-3xl text-xs w-full mx-auto font-poppins font-thin "
					defaultVelocity={1}
				>
					Seeing the <span className="text-purple-700">Invisible</span> &mdash;
					Touching the <span className="text-primary">intangible</span> &mdash;
					Hearing the <span className="text-chart-3">Inaudible</span> &mdash;
				</VelocityScroll>
			</div>

			<WhyCostrad />
			<Testimonials className="hidden" />
			{/* <Newsletter /> */}
		</main>
	);
}
