import { Toaster } from "sonner";
import Jumbotron from "@/components/sections/Jumbotron";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="">
			<Toaster />
			{children}
		</div>
	);
}
