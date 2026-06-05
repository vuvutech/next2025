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
	// biome-ignore lint/suspicious/noExplicitAny: LocomotiveScroll's bundled types don't match runtime API (missing update method)
	const locomotiveRef = useRef<any>(null);
	const _pathname = usePathname();

	useEffect(() => {
		if (!containerRef.current) return;

		let scrollInstance: LocomotiveScroll | null = null;

		import("locomotive-scroll").then((LocomotiveModule) => {
			const LocomotiveScrollConstructor = LocomotiveModule.default;

			if (!containerRef.current) return;

			scrollInstance = new LocomotiveScrollConstructor({
				el: containerRef.current as never,
				smooth: true,
			} as never);

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
