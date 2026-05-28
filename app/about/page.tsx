// app/donate/page.tsx

import { FadeIn } from "@/components/animations/FadeIn";
import AboutSectionFour from "@/components/sections/AboutSectionFour";
import AboutSectionOne from "@/components/sections/AboutSectionOne";
import AboutSectionThree from "@/components/sections/AboutSectionThree";
import AboutSectionTwo from "@/components/sections/AboutSectionTwo";

export default function AboutPage() {
	return (
		<div className="sm:space-y-4">
			<AboutSectionOne />

			<AboutSectionTwo />
			<FadeIn
				as="section"
				id="mission"
				className="md:py-8 md:px-12 max-w-6xl mx-auto text-lg md:text-4xl md:text-center  "
			>
				Our Mission is to raise and develop generations of{" "}
				<span className="text-chart-2 ">transformational leaders</span>,
				equipped to bring systemic and sustainable change, to every sphere of
				society.
			</FadeIn>
			<AboutSectionThree />

			<FadeIn
				as="section"
				className="md:py-8 md:px-8 max-w-8xl mx-auto text-lg md:text-3xl md:text-center  "
			>
				We teach you the necessary skills and qualities to effectively lead and
				manage people, organizations, and systems.{" "}
				<span className="text-purple-700">Leaders</span> must possess strong
				communication, decision-making, and{" "}
				<span className="text-chart-2">problem-solving skills</span>, as well as
				the ability to inspire and motivate others.
			</FadeIn>

			<AboutSectionFour />
		</div>
	);
}
