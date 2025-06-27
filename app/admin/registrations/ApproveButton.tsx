// File: app/admin/registrations/ApproveButton.tsx
"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApproveButtonProps {
  id: string;
  name: string;
  email: string;
  approved: boolean;
  startDate: Date;
  endDate: Date;
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

  const handleApprove = async () => {
    startTransition(async () => {
      const res = await fetch("/api/approve-and-email-payment-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, startDate, endDate, price, priceViaZoom }),
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
      size="sm"
      disabled={approved || isPending}
      onClick={handleApprove}
    >
      {approved ? "Approved" : isPending ? "Approving..." : "Approve"}
    </Button>
  );
}
