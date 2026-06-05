import { Toaster } from "sonner";
import Jumbotron from "@/components/sections/Jumbotron";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="block p-2 mx-auto  ">
			<Toaster />
			<Jumbotron heroImage="/images/about.jpg" />
			<div className="md:p-4 max-w-8xl mx-auto container space-y-4">
				{children}
			</div>
		</div>
	);
}
