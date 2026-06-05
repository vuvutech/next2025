"use client";
import type React from "react";
import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import type LocomotiveScroll from "locomotive-scroll";
import { usePathname } from "next/navigation";

const SmoothScroll: React.FC<React.PropsWithChildren<object>> = ({
	children,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const locomotiveRef = useRef<LocomotiveScroll | null>(null);
	const _pathname = usePathname();

	useEffect(() => {
		if (!containerRef.current) return;

		let scrollInstance: LocomotiveScroll | null = null;

		import("locomotive-scroll").then((LocomotiveModule) => {
			const LocomotiveScrollConstructor = LocomotiveModule.default;

			if (!containerRef.current) return;

			scrollInstance = new LocomotiveScrollConstructor({
				el: containerRef.current,
				smooth: true,
			});

			locomotiveRef.current = scrollInstance;

			// Cleanup
			return () => {
				scrollInstance?.destroy();
			};
		});
	}, []);

	useEffect(() => {
		locomotiveRef.current?.update?.();
	}, []);

	return (
		<div className="app-container" data-scroll-container ref={containerRef}>
			{children}
		</div>
	);
};

export default SmoothScroll;
