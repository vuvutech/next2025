// ActionsCell.tsx
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ActionsCellProps = {
  id: string;
};

export function TestiomonialActionsCell({ id }: ActionsCellProps) {
  const router = useRouter();

  const deleteTestimonial = async () => {
    const res = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.error || "Failed to delete");
    }
  };

  return (
    <div className="flex gap-2 flex-wrap ">
      {/* <Button
        size="sm"
        variant={approved ? "outline" : "default"}
        onClick={async () => {
          try {
            await updateTestimonial({ approved: !approved });
            toast.success(approved ? "Unapproved" : "Approved");
            router.refresh();
          } catch {
            toast.error("Failed to toggle approval");
          }
        }}
      >
        {approved ? "Unapprove" : "Approve"}
      </Button> */}

      {/* <Button
        size="sm"
        variant={featured ? "outline" : "secondary"}
        onClick={async () => {
          try {
            await updateTestimonial({ featured: !featured });
            toast.success(featured ? "Unfeatured" : "Featured");
            router.refresh();
          } catch {
            toast.error("Failed to toggle featured");
          }
        }}
      >
        {featured ? "Unfeature" : "Feature"}
      </Button> */}

      <Button
        size="sm"
        variant="destructive"
        onClick={async () => {
          try {
            await deleteTestimonial();
            toast.success("Deleted");
            router.refresh();
          } catch {
            toast.error("Failed to delete");
          }
        }}
      >
        Delete
      </Button>
    </div>
  );
}
