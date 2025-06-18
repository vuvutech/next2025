"use client"; // This component needs to be a client component because it uses hooks

import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import React from "react";
import { getBaseUrl } from "@/config/site";

interface ActionsCellProps {
  id: string;
  content: string;
  featured: boolean;
  approved: boolean;
  setFormState: (state: {
    id?: string;
    content?: string;
    featured: boolean;
    approved: boolean;
  }) => void;
  setIsEditing: (editing: boolean) => void;
  openDialog: () => void;
}

export function ActionsCellComponent({
  id,
  content,
  featured,
  approved,
  setFormState,
  setIsEditing,
  openDialog,
}: ActionsCellProps) {
  const router = useRouter();

  const updateAnnouncement = async (data: any) => {
    const res = await fetch(`${getBaseUrl()}/api/announcements`, {
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

  const deleteAnnouncement = async () => {
    const res = await fetch(`${getBaseUrl()}/api/announcements`, {
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

  const handleEdit = () => {
    setFormState({ id, content, featured, approved });
    setIsEditing(true);
    openDialog();
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

       
        {/* Feature/Unfeature */}
        <DropdownMenuItem
          className="text-primary-foreground cursor-pointer"
          onClick={async () => {
            try {
              await updateAnnouncement({ featured: !featured });
              toast.success(
                featured ? "Announcement Unfeatured!" : "Announcement Featured!"
              );
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to toggle featured status: ${error.message}`);
            }
          }}
        >
          <span className="font-semibold">
            {featured ? "Unfeature" : "Feature"}
          </span>
        </DropdownMenuItem>

        {/* Approve/Unapprove */}
        <DropdownMenuItem
          className="text-firefly cursor-pointer"
          onClick={async () => {
            try {
              await updateAnnouncement({ approved: !approved });
              toast.success(
                approved ? "Announcement Unapproved!" : "Announcement Approved!"
              );
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to toggle approval status: ${error.message}`);
            }
          }}
        >
          <div className="font-semibold flex gap-2 items-center">
            {approved ? "Unapprove" : "Approve"}
          </div>
        </DropdownMenuItem>

        {/* Delete */}
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={async () => {
            try {
              await deleteAnnouncement();
              toast.success("Announcement deleted successfully!");
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to delete announcement: ${error.message}`);
            }
          }}
        >
          <span className="font-semibold">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
