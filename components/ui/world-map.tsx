"use client";
import { motion } from "motion/react";
import React from "react";

interface WorldMapProps {
	dots: Array<{
		start: { lat: number; lng: number; label?: string };
		end: { lat: number; lng: number; label?: string };
	}>;
	lineColor?: string;
}

function projectPoint(lat: number, lng: number) {
	const x = (lng + 180) * (800 / 360);
	const y = (90 - lat) * (400 / 180);
	return { x, y };
}

function createCurvedPath(
	start: { x: number; y: number },
	end: { x: number; y: number },
) {
	const midX = (start.x + end.x) / 2;
	const midY = (start.y + end.y) / 2;
	const dx = end.x - start.x;
	const dy = end.y - start.y;

	const offset = Math.sqrt(dx * dx + dy * dy) * 0.25;
	const perpendicularX = -dy;
	const perpendicularY = dx;
	const length = Math.sqrt(
		perpendicularX * perpendicularX + perpendicularY * perpendicularY,
	);
	const normalX = (perpendicularX / length) * offset;
	const normalY = (perpendicularY / length) * offset;

	return `M ${start.x} ${start.y} Q ${midX + normalX} ${midY + normalY} ${end.x} ${end.y}`;
}

export function WorldMap({ dots, lineColor = "#ffffff" }: WorldMapProps) {
	const svgRef = React.useRef<SVGSVGElement>(null);

	return (
		<div className="relative w-full aspect-[2/1]">
			<svg
				viewBox="0 0 800 400"
				className="w-full h-full"
				preserveAspectRatio="xMidYMid meet"
			>
				<title>World map background</title>
				<image
					href="https://cffinedndwvfblwbglnn.supabase.co/storage/v1/object/public/school%20website/world.svg"
					height="400"
					width="800"
				/>
			</svg>
			<svg
				ref={svgRef}
				viewBox="0 0 800 400"
				className="w-full h-full absolute inset-0 pointer-events-none select-none"
			>
				<title>World map connections</title>
				{dots.map((dot, i) => {
					const startPoint = projectPoint(dot.start.lat, dot.start.lng);
					const endPoint = projectPoint(dot.end.lat, dot.end.lng);
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: static world map SVG elements
						<g key={`path-group-${i}`}>
							<motion.path
								d={createCurvedPath(startPoint, endPoint)}
								fill="none"
								stroke="url(#path-gradient)"
								strokeWidth="1"
								initial={{
									pathLength: 0,
								}}
								animate={{
									pathLength: 1,
								}}
								transition={{
									duration: 1,
									delay: 0.5 * i,
									ease: "easeOut",
								}}
								// biome-ignore lint/suspicious/noArrayIndexKey: static world map SVG elements
								key={`start-upper-${i}`}
							></motion.path>
						</g>
					);
				})}

				<defs>
					<linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="white" stopOpacity="0" />
						<stop offset="5%" stopColor={lineColor} stopOpacity="1" />
						<stop offset="95%" stopColor={lineColor} stopOpacity="1" />
						<stop offset="100%" stopColor="white" stopOpacity="0" />
					</linearGradient>
				</defs>

				{dots.map((dot, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static world map SVG elements
					<g key={`points-group-${i}`}>
						{/* biome-ignore lint/suspicious/noArrayIndexKey: static world map SVG elements */}
						<g key={`start-${i}`}>
							<circle
								cx={projectPoint(dot.start.lat, dot.start.lng).x}
								cy={projectPoint(dot.start.lat, dot.start.lng).y}
								r="2"
								fill={lineColor}
							/>
							<circle
								cx={projectPoint(dot.start.lat, dot.start.lng).x}
								cy={projectPoint(dot.start.lat, dot.start.lng).y}
								r="2"
								fill={lineColor}
								opacity="0.5"
							>
								<animate
									attributeName="r"
									from="2"
									to="8"
									dur="1.5s"
									begin="0s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="opacity"
									from="0.5"
									to="0"
									dur="1.5s"
									begin="0s"
									repeatCount="indefinite"
								/>
							</circle>
						</g>
						{/* biome-ignore lint/suspicious/noArrayIndexKey: static world map SVG elements */}
						<g key={`end-${i}`}>
							<circle
								cx={projectPoint(dot.end.lat, dot.end.lng).x}
								cy={projectPoint(dot.end.lat, dot.end.lng).y}
								r="2"
								fill={lineColor}
							/>
							<circle
								cx={projectPoint(dot.end.lat, dot.end.lng).x}
								cy={projectPoint(dot.end.lat, dot.end.lng).y}
								r="2"
								fill={lineColor}
								opacity="0.5"
							>
								<animate
									attributeName="r"
									from="2"
									to="8"
									dur="1.5s"
									begin="0s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="opacity"
									from="0.5"
									to="0"
									dur="1.5s"
									begin="0s"
									repeatCount="indefinite"
								/>
							</circle>
						</g>
					</g>
				))}
			</svg>
		</div>
	);
}
