"use client";

import { LucideScanFace, LucideTrash2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
}

export function ActionsCellComponent({ id, onViewUser }: ActionsCellProps) {
	const router = useRouter();
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		setDeleting(true);
		try {
			const res = await fetch(`/api/users/delete`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});

			if (!res.ok) {
				const result = await res.json();
				throw new Error(result.error || "Failed to delete user");
			}

			toast.success("User deleted successfully");
			router.refresh();
		} catch (error) {
			toast.error("Failed to delete user");
			console.error(error);
		} finally {
			setDeleting(false);
			setShowConfirmDialog(false);
		}
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

					<DropdownMenuItem
						className=" cursor-pointer"
						onClick={() => setShowConfirmDialog(true)}
					>
						<span className=" hover:text-destructive flex items-center gap-1">
							<LucideTrash2 />
							Delete User
						</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Delete Confirmation Dialog */}
			<Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
					</DialogHeader>
					<p>
						This action cannot be undone. This will permanently delete the user.
					</p>
					<DialogFooter className="flex justify-end gap-2 pt-4">
						<Button
							variant="outline"
							onClick={() => setShowConfirmDialog(false)}
						>
							Cancel
						</Button>
						<Button
							className="flex items-center gap-1"
							variant="destructive"
							onClick={handleDelete}
							disabled={deleting}
						>
							{deleting ? (
								"Deleting User..."
							) : (
								<>
									<LucideTrash2 /> Confirm Delete
								</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
