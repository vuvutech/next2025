// File: app/admin/registrations/ApproveButton.tsx
"use client";

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
	DialogTrigger,
} from "@/components/ui/dialog";

interface ApproveButtonProps {
	id: string;
	name: string;
	email: string;
	approved: boolean;
	startDate?: string | null;
	endDate?: string | null;
	price?: number | null;
	priceViaZoom?: number | null;
}

export function ApproveButton({
	id,
	name,
	email,
	approved,
	startDate,
	endDate,
	price,
	priceViaZoom,
}: ApproveButtonProps) {
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);

	const isPast = endDate ? new Date(endDate) < new Date() : false;

	const handleApprove = async () => {
		if (isPast) return;
		startTransition(async () => {
			const res = await fetch("/api/approve-and-email-payment-details", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id,
					name,
					email,
					startDate,
					endDate,
					price,
					priceViaZoom,
				}),
			});

			if (!res.ok) {
				toast.error("Failed to approve and send email");
				return;
			}

			toast.success("Approved and email sent successfully");
			window.location.reload();
		});
	};

	if (approved || isPast) {
		return (
			<Button
				className="cursor-pointer px-1 py-0.5 h-auto uppercase text-[10px]"
				size="sm"
				disabled={true}
			>
				{approved ? "Approved" : "Past Edition"}
			</Button>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="cursor-pointer px-1 py-0.5 h-auto uppercase text-[10px]"
					size="sm"
					disabled={isPending}
				>
					{isPending ? "Approving..." : "Approve"}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-md rounded-2xl">
				<DialogHeader>
					<DialogTitle>Confirm Approval</DialogTitle>
					<DialogDescription>
						{name} has been vetted and meets the requirements for acceptance to
						the programme.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="grid grid-cols-2 gap-2">
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="default"
						onClick={() => {
							handleApprove();
						}}
						disabled={isPending}
					>
						{isPending ? "Approving..." : "Confirm Approval"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
