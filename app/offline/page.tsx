import { WifiOff } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Offline - COSTrAD",
	description: "You are currently offline.",
};

export default function OfflinePage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
			<div className="space-y-6 max-w-md">
				<div className="flex justify-center">
					<div className="p-6 bg-accent rounded-full">
						<WifiOff className="size-16 text-primary animate-pulse" />
					</div>
				</div>
				<h1 className="text-4xl font-bebas tracking-tight">You're Offline</h1>
				<p className="text-muted-foreground text-lg">
					It looks like you've lost your internet connection. Don't worry, once
					you're back online, you can continue exploring COSTrAD.
				</p>
				<div className="pt-4">
					<Button asChild className="w-full sm:w-auto px-8">
						<Link href="/">Try Again</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
