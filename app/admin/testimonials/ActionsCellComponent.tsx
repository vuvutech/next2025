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
  id: string;
  content: string; // Add content if you need it for the copy text
  featured: boolean;
  approved: boolean;
  // Add any other properties from your testimonial object that you need to access
}

export function ActionsCellComponent({
  id,
  content,
  featured,
  approved,
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
        <Button variant="ghost" className="h-8 w-8 p-0">
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
                featured ? "Testimonial Unfeatured!" : "Testimonial Featured!"
              );
              router.refresh(); // Refresh the page after successful update
            } catch (error: any) {
              toast.error(`Failed to toggle featured status: ${error.message}`);
            }
          }}
        >
          <span className="font-semibold">
            {featured ? "Unfeature" : "Feature"}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-firefly cursor-pointer"
          onClick={async () => {
            try {
              await updateTestimonial({ approved: !approved });
              toast.success(
                approved ? "Testimonial Unapproved!" : "Testimonial Approved!"
              );
              router.refresh(); // Refresh the page after successful update
            } catch (error: any) {
              toast.error(`Failed to toggle approval status: ${error.message}`);
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
