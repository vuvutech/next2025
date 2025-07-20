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
import { auth } from "@/lib/auth";

interface ActionsCellProps {
  id: string;
  banned: boolean;
  setFormState: (state: { id?: string; banned: boolean }) => void;
  setIsEditing: (editing: boolean) => void;
  openDialog: () => void;
}

export function ActionsCellComponent({
  id,
  banned,
  setFormState,
  setIsEditing,
  openDialog,
}: ActionsCellProps) {
  const router = useRouter();

  // Define the banUser function to handle banning/unbanning users
  const banUser = async (data: { banned: boolean }) => {
    await auth.admin.banUser({
      userId: "user-id", // required
      banReason: "Spamming",
      banExpiresIn: 60 * 60 * 24 * 7,
    });

    const result = await res.json();
    if (!result.user) {
      throw new Error("Failed to update");
    }
  };
  // const banUser = async (data: any) => {
  //   const res = await fetch(`${getBaseUrl()}/api/announcements`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  //     },
  //     body: JSON.stringify({ id, ...data }),
  //   });
  //   if (!res.ok) {
  //     const result = await res.json();
  //     throw new Error(result.error || "Failed to update");
  //   }
  // };

  // const deleteAnnouncement = async () => {
  //   const res = await fetch(`${getBaseUrl()}/api/announcements`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  //     },
  //     body: JSON.stringify({ id }),
  //   });
  //   if (!res.ok) {
  //     const result = await res.json();
  //     throw new Error(result.error || "Failed to delete");
  //   }
  // };

  const handleEdit = () => {
    setFormState({ id, banned });
    setIsEditing(true);
    openDialog();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-8 w-8 p-0 rounded-full  ">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Ban/Unban */}
        <DropdownMenuItem
          className="text-primary-destructive cursor-pointer"
          onClick={async () => {
            try {
              await banUser({ banned: !banned });
              toast.success(banned ? "Unban User" : "Ban User");
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to toggle ban status: ${error.message}`);
            }
          }}
        >
          <span className="font-semibold text-destructive">
            {banned ? "Unban User" : "Ban User"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
