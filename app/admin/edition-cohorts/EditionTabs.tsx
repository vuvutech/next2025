"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditionRegistrationsTable from "./EditionRegistrationsTable";

export default function EditionTabs({ editions }: { editions: any[] }) {
	if (!editions || editions.length === 0) {
		return (
			<div className="text-center text-muted-foreground py-8">
				No active or registered editions found.
			</div>
		);
	}

	return (
		<div className="space-y-4 pb-20">
			<Tabs defaultValue={editions[0].id} className="w-full">
				<TabsList className="max-w-full overflow-x-auto flex flex-nowrap bg-muted/50 p-1 rounded-lg">
					{editions.map((edition) => (
						<TabsTrigger
							key={edition.id}
							value={edition.id}
							className="px-2 py-2 font-medium text-xs rounded-md transition-all data-[state=active]:bg-background data-[state=active]:text-foreground"
						>
							{edition.title}
						</TabsTrigger>
					))}
				</TabsList>
				{editions.map((edition) => (
					<TabsContent
						key={edition.id}
						value={edition.id}
						className="space-y-4 mt-4"
					>
						<div className="bg-card border rounded-lg p-4 space-y-1">
							<h2 className="text-lg font-bold">{edition.title}</h2>
							<p className="text-sm text-muted-foreground">
								Institute: {edition.institute?.name || "Unknown"} (
								{edition.institute?.acronym || "N/A"})
							</p>
						</div>
						<EditionRegistrationsTable editionId={edition.id} />
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
