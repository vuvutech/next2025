"use client";

import {
	DollarSign,
	LucideScanFace,
	MoreHorizontal,
	Unlink,
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
	registrationId?: string;
	approved?: boolean;
	paid?: boolean;
}

export function ActionsCellComponent({
	id,
	onViewUser,
	registrationId,
	approved,
	paid,
}: ActionsCellProps) {
	const [isPending, startTransition] = useTransition();
	const [showPaidDialog, setShowPaidDialog] = useState(false);
	const [showUnapproveDialog, setShowUnapproveDialog] = useState(false);

	const handleUnapprove = () => {
		if (!registrationId) return;
		setShowUnapproveDialog(false);
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

	const handleTogglePaid = () => {
		if (!registrationId) return;
		setShowPaidDialog(false);
		startTransition(async () => {
			const res = await fetch("/api/toggle-paid", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: registrationId }),
			});

			if (!res.ok) {
				toast.error("Failed to toggle payment status");
				return;
			}

			const data = await res.json();

			if (data.paid) {
				if (data.emailSent) {
					toast.success("Payment marked as paid. Acceptance email sent.");
				} else {
					toast.warning(
						"Payment marked as paid, but acceptance email could not be sent.",
					);
				}
			} else {
				toast.success("Payment status marked as unpaid");
			}

			window.location.reload();
		});
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="h-8 w-8 p-0 rounded-full cursor-pointer"
					>
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
							onClick={() => setShowUnapproveDialog(true)}
							disabled={isPending}
						>
							<span className="flex items-center gap-1">
								<Unlink /> {isPending ? "Unapproving..." : "Unapprove"}
							</span>
						</DropdownMenuItem>
					)}

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="text-foreground cursor-pointer"
						onClick={() => setShowPaidDialog(true)}
						disabled={isPending}
					>
						<span className="flex items-center gap-1">
							<DollarSign /> {paid ? "Mark as Unpaid" : "Mark as Paid"}
						</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={showPaidDialog} onOpenChange={setShowPaidDialog}>
				<DialogContent className="w-md rounded-2xl">
					<DialogHeader>
						<DialogTitle>
							{paid ? "Confirm Unpaid Status" : "Confirm Payment"}
						</DialogTitle>
						<DialogDescription>
							{paid
								? "This will mark the participant's payment as unpaid."
								: "I confirm that the participant has made payment and meets the financial requirements for the programme."}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="grid grid-cols-2 gap-2">
						<Button variant="outline" onClick={() => setShowPaidDialog(false)}>
							Cancel
						</Button>
						<Button
							variant={paid ? "destructive" : "default"}
							onClick={handleTogglePaid}
							disabled={isPending}
						>
							{isPending
								? "Processing..."
								: paid
									? "Confirm Unpaid"
									: "Confirm Payment"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={showUnapproveDialog} onOpenChange={setShowUnapproveDialog}>
				<DialogContent className="w-md rounded-2xl">
					<DialogHeader>
						<DialogTitle>Confirm Un-approval</DialogTitle>
						<DialogDescription>
							This will revoke the participant's approval and clear the approval
							audit trail. No email will be sent.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="grid grid-cols-2 gap-2">
						<Button
							variant="outline"
							onClick={() => setShowUnapproveDialog(false)}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={handleUnapprove}
							disabled={isPending}
						>
							{isPending ? "Unapproving..." : "Confirm Un-approval"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
