"use client";

import { motion } from "framer-motion";
import type React from "react";

interface FadeInProps {
	children: React.ReactNode;
	delay?: number;
	duration?: number;
	className?: string;
	id?: string;
	as?: string;
}

export function FadeIn({
	children,
	delay = 0,
	duration = 0.5,
	className = "mx-auto",
	id,
	as = "div",
}: FadeInProps) {
	const Component =
		(motion as unknown as Record<string, typeof motion.div>)[as] || motion.div;

	return (
		<Component
			id={id}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{
				duration,
				delay,
				ease: "easeOut",
			}}
			className={className}
		>
			{children}
		</Component>
	);
}
