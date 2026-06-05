import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
	return (
		<div className="flex flex-col gap-8 p-6 lg:p-10">
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<Skeleton className="h-10 w-[250px]" />
					<Skeleton className="h-4 w-[350px]" />
				</div>
				<Skeleton className="h-11 w-[140px]" />
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => (
					<Skeleton key={id} className="h-[140px] w-full rounded-xl" />
				))}
			</div>

			<div className="space-y-4">
				<Skeleton className="h-[400px] w-full rounded-xl" />
			</div>
		</div>
	);
}
