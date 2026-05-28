import { Toaster } from "sonner";
import Jumbotron from "@/components/sections/Jumbotron";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="block p-2">
			<Toaster />
			<Jumbotron heroImage="/images/dr_abu.jpg" />
			<div className="md:p-4 pt-4 max-w-8xl mx-auto space-y-4">{children}</div>
		</div>
	);
}
