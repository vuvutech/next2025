import { Ban } from "lucide-react";
import Link from "next/link";

export default function BannedPage() {
	return (
		<div className="flex flex-col items-center justify-center px-4 text-center">
			<div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
				<Ban className="h-12 w-12 text-red-600" />
			</div>
			<h1 className="mt-6 text-3xl font-bold text-red-600">
				Account Suspended
			</h1>
			<p className="mt-4 text-muted-foreground max-w-md">
				Your account has been suspended. Please contact support if you believe
				this is a mistake.
			</p>
			<Link
				href="/"
				className="mt-8 inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
			>
				Return to Homepage
			</Link>
		</div>
	);
}
