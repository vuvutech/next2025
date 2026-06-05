// app/admin/testimonials/ActionsCell.tsx
"use client"; // This component needs to be a client component because it uses hooks

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter
import { toast } from "sonner"; // Assuming you have sonner installed
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionsCellProps {
	id: string;
	content: string; // Add content if you need it for the copy text
	featured: boolean;
	approved: boolean;
	// Add any other properties from your testimonial object that you need to access
}

export function ActionsCellComponent({
	id,
	content: _content,
	featured,
	approved,
}: ActionsCellProps) {
	const router = useRouter(); // ⭐️ This is now a valid place to call useRouter

	const updateTestimonial = async (data: Record<string, unknown>) => {
		const res = await fetch("/api/testimonials", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, ...data }),
		});
		if (!res.ok) {
			const result = await res.json();
			throw new Error(result.error || "Failed to update");
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="text-primary-foreground cursor-pointer"
					onClick={async () => {
						try {
							await updateTestimonial({ featured: !featured });
							toast.success(
								featured ? "Testimonial Unfeatured!" : "Testimonial Featured!",
							);
							router.refresh(); // Refresh the page after successful update
						} catch (error: unknown) {
							toast.error(
								`Failed to toggle featured status: ${error instanceof Error ? error.message : String(error)}`,
							);
						}
					}}
				>
					<span className="font-semibold text-primary">
						{featured ? "Unfeature" : "Feature"}
					</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="text-firefly cursor-pointer"
					onClick={async () => {
						try {
							await updateTestimonial({ approved: !approved });
							toast.success(
								approved ? "Testimonial Unapproved!" : "Testimonial Approved!",
							);
							router.refresh(); // Refresh the page after successful update
						} catch (error: unknown) {
							toast.error(
								`Failed to toggle approval status: ${error instanceof Error ? error.message : String(error)}`,
							);
						}
					}}
				>
					<div className="font-semibold flex gap-2 items-center">
						{approved ? "Unapprove" : "Approve"}
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
