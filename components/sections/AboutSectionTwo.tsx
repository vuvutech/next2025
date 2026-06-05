"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
	staggerContainer,
	staggerItem,
} from "@/components/animations/framerAnimations";

const AboutSectionTwo = ({
	backgroundImage = "/images/lecture_in_progress.webp",
	title = "Investing in the leadership that transforms nations",
	subtitle = "Seeing the invisible, hearing the inaudible, touching the intangible, perceiving the imperceptible and doing the seemingly impossible.",
	primaryButtonText = "Get started",
	primaryButtonHref = "/getting-started",
	secondaryButtonText = "Our Institutes",
	secondaryButtonHref = "institutes",
}) => {
	return (
		<section className="relative ">
			<Image
				src={backgroundImage}
				alt="Background image"
				fill
				className="object-cover rounded-3xl"
				priority
			/>
			<div className="absolute inset-0 bg-gray-500 opacity-5 rounded-3xl"></div>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				className="relative z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"
			>
				<motion.h1
					variants={staggerItem}
					className="mb-4 text-4xl ont-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
				>
					{title}
				</motion.h1>
				<motion.p
					variants={staggerItem}
					className="mb-8 text-lg font-normal shadow text-white lg:text-xl sm:px-16 lg:px-48"
				>
					{subtitle}
				</motion.p>
				<motion.div
					variants={staggerItem}
					className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
				>
					<Link
						href={primaryButtonHref}
						className="inline-flex justify-center items-center py-3 px-6 sm:py-2 sm:px-5 text-base font-medium text-center text-white rounded-full
             bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-transform hover:scale-105"
						prefetch={false}
					>
						{primaryButtonText}
						<svg
							className="w-4 h-4 ms-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</Link>
					<Link
						href={secondaryButtonHref}
						className="inline-flex justify-center items-center py-3 px-6 sm:py-2 sm:px-5 text-base font-medium text-center text-white border border-white hover:bg-white hover:text-gray-900 rounded-full transition-all duration-200"
						prefetch={false}
					>
						{secondaryButtonText}
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default AboutSectionTwo;
