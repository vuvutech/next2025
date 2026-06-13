import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
	return (
		<div className="space-y-6">
			<div>
				<Skeleton className="h-8 w-24 mb-2" />
				<Skeleton className="h-4 w-64" />
			</div>

			<div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
				<Skeleton className="h-6 w-32 mb-2" />
				<Skeleton className="h-4 w-48 mb-6" />
				<div className="flex items-center space-x-4">
					<Skeleton className="h-24 w-24 rounded-full" />
					<Skeleton className="h-4 w-64" />
				</div>
			</div>

			<div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
				<Skeleton className="h-6 w-40 mb-2" />
				<Skeleton className="h-4 w-56 mb-6" />
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-10 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
				<div className="flex justify-end mt-6">
					<Skeleton className="h-10 w-28" />
				</div>
			</div>
		</div>
	);
}
