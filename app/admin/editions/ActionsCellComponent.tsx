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
  overview: string;
  startDate?: Date;
  endDate?: Date;
  active: boolean;
  setFormState: (state: {
    id?: string;
    overview?: string;
    active: boolean;
    startDate?: Date;
    endDate?: Date;
  }) => void;
  setIsEditing: (editing: boolean) => void;
  openDialog: () => void;
}

export function ActionsCellComponent({
  id,
  overview,
  active,
  startDate,
  endDate,
  setFormState,
  setIsEditing,
  openDialog,
}: ActionsCellProps) {
  const router = useRouter();

  const updateEdition = async (data: any) => {
    const res = await fetch(`${getBaseUrl()}/api/editions`, {
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

 

  const handleEdit = () => {
    setFormState({ id, overview, active, startDate, endDate });
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
          id={id}
          className="text-primary-foreground cursor-pointer"
          onClick={async () => {
            try {
              await updateEdition({ active: !active });
              toast.success(active ? "Edition InActive!" : "Edition Active!");
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to toggle featured status: ${error.message}`);
            }
          }}
        >
          <span className="font-semibold">
            {active ? "Make In-Active" : "Make Active"}
          </span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
