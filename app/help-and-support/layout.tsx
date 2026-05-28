import { Toaster } from "sonner";
import Jumbotron from "@/components/sections/Jumbotron";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container mx-auto">
			<Toaster />
			<Jumbotron />
			<div className="md:p-4 pt-4 max-w-8xl mx-auto space-y-4">{children}</div>
		</div>
	);
}
