"use client";

import { useTransition } from "react";
import { LucideScanFace, MoreHorizontal, Unlink } from "lucide-react";
import { toast } from "sonner";
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
	id?: string;
	onViewUser?: (id: string) => void;
	registrationId?: string;
	approved?: boolean;
}

export function ActionsCellComponent({
	id,
	onViewUser,
	registrationId,
	approved,
}: ActionsCellProps) {
	const [isPending, startTransition] = useTransition();

	const handleUnapprove = () => {
		if (!registrationId) return;
		startTransition(async () => {
			const res = await fetch("/api/unapprove-registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: registrationId }),
			});

			if (!res.ok) {
				toast.error("Failed to unapprove registration");
				return;
			}

			toast.success("Registration unapproved successfully");
			window.location.reload();
		});
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8 w-8 p-0 rounded-full">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="text-foreground cursor-pointer"
						onClick={() => id && onViewUser?.(id)}
					>
						<span className=" flex items-center gap-1">
							<LucideScanFace /> View User
						</span>
					</DropdownMenuItem>

					{approved && (
						<DropdownMenuItem
							className="text-destructive cursor-pointer"
							onClick={handleUnapprove}
							disabled={isPending}
						>
							<span className="flex items-center gap-1">
								<Unlink /> {isPending ? "Unapproving..." : "Unapprove"}
							</span>
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
