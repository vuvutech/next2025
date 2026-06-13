import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
			<Toaster />
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				{children}
			</div>
		</div>
	);
}
