"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
	staggerContainer,
	staggerItem,
} from "@/components/animations/framerAnimations";

const AboutSectionOne = () => {
	return (
		<div className="py-8 pb-4">
			<section>
				<div className="container">
					<motion.div
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="text-left space-y-4"
					>
						<motion.div variants={staggerItem}>
							<Link
								href="/institutes"
								className="mx-auto mb-3 inline-flex justify-between items-center gap-2 sm:gap-3 rounded-full 
              border px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-auto hover:bg-accent/50 transition-colors duration-200 cursor-pointer"
							>
								<span
									data-slot="badge"
									className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-primary text-primary-foreground rounded-full"
								>
									COSTrAD
								</span>
								<span className="font-oswald text-[10px] sm:text-xs truncate max-w-[120px] sm:max-w-none">
									Transformational
								</span>
								<span className="flex size-5 sm:size-6 items-center justify-center rounded-full bg-muted flex-shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-arrow-right w-3 h-3"
										aria-hidden="true"
									>
										<path d="M5 12h14" />
										<path d="m12 5 7 7-7 7" />
									</svg>
								</span>
							</Link>
						</motion.div>
						<motion.h1
							variants={staggerItem}
							className="text-3xl sm:text-5xl max-w-2xl  "
						>
							Cultivating Purposeful Leadership
						</motion.h1>
						<motion.p
							variants={staggerItem}
							className="lg:text-xl m max-w-3xl text-foreground"
						>
							The College of Sustainable Transformation and Development
							(COSTrAD) is an initiative of the Logos-Rhema Foundation for
							Leadership Resource Development, a Non-Governmental Foundation
							registered in Ghana.
						</motion.p>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default AboutSectionOne;
