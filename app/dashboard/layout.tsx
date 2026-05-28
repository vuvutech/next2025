import { Toaster } from "sonner";
import { AppBreadcrumbs } from "@/components/navigation/AppBreadcrumbs";
import Jumbotron from "@/components/sections/Jumbotron";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="block p-2">
			<Toaster />
			<Jumbotron />
			<div className="md:p-4 pt-4 max-w-8xl mx-auto space-y-4">
				<AppBreadcrumbs />
				{children}
			</div>
		</div>
	);
}
