"use client";
import { motion } from "framer-motion";
import {
	staggerContainer,
	staggerItem,
} from "@/components/animations/framerAnimations";
import BadgeLink from "./BadgeLink";

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
						<div>
							<BadgeLink
								href="#begin"
								badge={"COSTRAD"}
								label={"Transformational Leadership"}
							/>
						</div>

						<motion.h1
							variants={staggerItem}
							className="text-3xl sm:text-5xl max-w-4xl  "
						>
							Cultivating Purposeful Leadership
						</motion.h1>
						<motion.p
							variants={staggerItem}
							className="lg:text-xl m max-w-5xl text-foreground"
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
