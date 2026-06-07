"use client";

import { IconGlobe } from "@tabler/icons-react";
import * as React from "react";
import { CircleFlag } from "react-circle-flags";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type CountryRow = {
	name: string;
	code: string;
	sessions: number;
};

const RANGE_DAYS = 30;
const ROW_COUNT = 20;

export function TopCountriesCard() {
	const [countries, setCountries] = React.useState<CountryRow[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch("/api/analytics?type=top-countries");
				if (!res.ok) {
					throw new Error(`Request failed (${res.status})`);
				}
				const json = (await res.json()) as { countries?: CountryRow[] };
				if (!cancelled) {
					setCountries(json.countries ?? []);
				}
			} catch (err) {
				if (!cancelled) {
					const message = err instanceof Error ? err.message : "Unknown error";
					setError(message);
					console.error("Failed to fetch top countries:", err);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const maxSessions = countries.reduce(
		(max, c) => (c.sessions > max ? c.sessions : max),
		0,
	);
	const totalSessions = countries.reduce((sum, c) => sum + c.sessions, 0);

	return (
		<Card className="relative w-full overflow-hidden border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
			<div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-primary/60" />
			<CardHeader className="px-6 pt-5 pb-3">
				<div className="flex items-center justify-between gap-2">
					<div>
						<CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
							Top Visitor Countries
						</CardTitle>
						<CardDescription className="mt-1 text-xs">
							Top {ROW_COUNT} countries by sessions over the last {RANGE_DAYS}{" "}
							days
						</CardDescription>
					</div>
					<CardAction>
						<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<IconGlobe className="size-4" />
						</div>
					</CardAction>
				</div>
			</CardHeader>
			<CardContent className="px-6 pb-6">
				{loading ? (
					<CountriesSkeleton />
				) : error ? (
					<EmptyState
						title="Could not load country data"
						description={error}
						tone="error"
					/>
				) : countries.length === 0 ? (
					<EmptyState
						title="No visitor data yet"
						description="Once traffic comes in, the top countries will appear here."
					/>
				) : (
					<div className="space-y-2">
						<div className="flex items-center justify-between px-1 pb-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase">
							<span>Country</span>
							<span>Sessions</span>
						</div>
						<div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-2">
							{countries.map((country, index) => (
								<CountryBar
									key={`${country.code}-${country.name}`}
									rank={index + 1}
									country={country}
									maxSessions={maxSessions}
								/>
							))}
						</div>
						<div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
							<span>
								Showing {countries.length} of {ROW_COUNT}
							</span>
							<span className="tabular-nums">
								<span className="font-semibold text-foreground">
									{totalSessions.toLocaleString()}
								</span>{" "}
								total sessions
							</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function CountryBar({
	rank,
	country,
	maxSessions,
}: {
	rank: number;
	country: CountryRow;
	maxSessions: number;
}) {
	const pct = maxSessions > 0 ? (country.sessions / maxSessions) * 100 : 0;
	const flagCode = country.code || "xx";

	return (
		<div className="group flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-border/60 hover:bg-muted/30">
			<span className="w-5 shrink-0 text-right text-[10px] font-bold tabular-nums text-muted-foreground/60">
				{rank}
			</span>
			<div className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-border/50">
				<CircleFlag
					countryCode={flagCode}
					height={24}
					className="size-6 object-cover"
				/>
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-baseline justify-between gap-2">
					<span className="truncate text-sm font-medium text-foreground">
						{country.name}
					</span>
					<span className="shrink-0 text-xs font-semibold tabular-nums text-foreground">
						{country.sessions.toLocaleString()}
					</span>
				</div>
				<div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
					<div
						className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>
		</div>
	);
}

function CountriesSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-2">
			{Array.from({ length: 8 }).map((_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholder, never reorders
					key={`skeleton-row-${i}`}
					className="flex items-center gap-3 rounded-lg px-2 py-2"
				>
					<Skeleton className="size-5 shrink-0 rounded-full" />
					<Skeleton className="size-6 shrink-0 rounded-full" />
					<div className="min-w-0 flex-1 space-y-1.5">
						<div className="flex items-center justify-between">
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-3 w-10" />
						</div>
						<Skeleton className="h-1.5 w-full rounded-full" />
					</div>
				</div>
			))}
		</div>
	);
}

function EmptyState({
	title,
	description,
	tone = "default",
}: {
	title: string;
	description: string;
	tone?: "default" | "error";
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
			<span
				className={
					tone === "error"
						? "text-sm font-semibold text-destructive"
						: "text-sm font-semibold text-foreground"
				}
			>
				{title}
			</span>
			<span className="max-w-sm text-xs text-muted-foreground">
				{description}
			</span>
		</div>
	);
}
