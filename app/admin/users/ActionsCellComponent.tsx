// app/admin/testimonials/ActionsCell.tsx
"use client"; // This component needs to be a client component because it uses hooks

import { useRouter } from "next/navigation"; // Import useRouter
import { toast } from "sonner"; // Assuming you have sonner installed
import { MoreHorizontal } from "lucide-react";
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
  banReason?: string;

  // Add any other properties from your testimonial object that you need to access
}

export function ActionsCellComponent({
  id,
  banReason,
}: ActionsCellProps) {
  const router = useRouter(); // ⭐️ This is now a valid place to call useRouter

  const updateTestimonial = async (data: any) => {
    const res = await fetch("/api/testimonials", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
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
        <Button variant="outline" className="h-8 w-8 p-0 rounded-full">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
        // trigger ban dialog on click
          className="text-primary-foreground cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(banReason || "");
            toast.success("Ban reason copied to clipboard");
          }}

        >
          <span className="font-semibold text-primary">
            {"View User"}
          </span>
        </DropdownMenuItem>
       
      
       
      </DropdownMenuContent>
    </DropdownMenu>
    
  );
}
