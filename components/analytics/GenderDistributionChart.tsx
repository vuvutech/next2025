"use client";

import {
	PieChart,
	Pie,
	Label,
} from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { IconGenderBigender } from "@tabler/icons-react";

const chartConfig = {
	male: {
		label: "Male",
		color: "hsl(221, 83%, 53%)",
	},
	female: {
		label: "Female",
		color: "hsl(336, 80%, 58%)",
	},
} satisfies ChartConfig;

export function GenderDistributionChart({
	male,
	female,
}: {
	male: number;
	female: number;
}) {
	const total = male + female;
	const chartData = [
		{ gender: "male", count: male, fill: "hsl(221, 83%, 53%)" },
		{ gender: "female", count: female, fill: "hsl(336, 80%, 58%)" },
	];

	return (
		<Card>
			<CardHeader className="p-5 pb-3">
				<div className="flex items-center gap-2.5">
					<IconGenderBigender className="size-5 text-primary" />
					<CardTitle className="text-base font-bold">
						Gender Distribution
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="p-5 pt-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square h-[220px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="count"
							nameKey="gender"
							innerRadius={60}
							strokeWidth={2}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy ?? 0) - 8}
													className="fill-foreground text-3xl font-extrabold tabular-nums"
												>
													{total}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy ?? 0) + 18}
													className="fill-muted-foreground text-xs font-medium"
												>
													Participants
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
				<div className="mt-3 flex items-center justify-center gap-6 text-sm">
					<div className="flex items-center gap-2">
						<span className="size-2.5 rounded-sm bg-[hsl(221,83%,53%)]" />
						<span className="text-muted-foreground">Male</span>
						<span className="font-bold tabular-nums">{male}</span>
						<span className="text-muted-foreground/60 text-xs">
							({total > 0 ? Math.round((male / total) * 100) : 0}%)
						</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="size-2.5 rounded-sm bg-[hsl(336,80%,58%)]" />
						<span className="text-muted-foreground">Female</span>
						<span className="font-bold tabular-nums">{female}</span>
						<span className="text-muted-foreground/60 text-xs">
							({total > 0 ? Math.round((female / total) * 100) : 0}%)
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
