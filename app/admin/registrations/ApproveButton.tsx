// File: app/admin/registrations/ApproveButton.tsx
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ApproveButtonProps {
	id: string;
	name: string;
	email: string;
	approved: boolean;
	startDate: Date | null;
	endDate: Date | null;
	price: number;
	priceViaZoom: number;
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

	return (
		<Button
			className="cursor-pointer px-1 py-0.5 h-auto uppercase text-[10px]"
			size="sm"
			disabled={approved || isPending || isPast}
			onClick={handleApprove}
		>
			{approved
				? "Approved"
				: isPast
					? "Past Edition"
					: isPending
						? "Approving..."
						: "Approve"}
		</Button>
	);
}
