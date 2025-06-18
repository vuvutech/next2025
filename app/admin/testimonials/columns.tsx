// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox"; // Corrected import for Checkbox
import { ActionsCellComponent } from "./ActionsCellComponent";
import { BadgeCheckIcon, Trash } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "User",
    accessorFn: (row) => row.user?.name || "Unknown",
    cell: ({ row }) => (
      <Image
        src={row.original.user?.image || "/images/avatar.png"}
        alt={row.original.user?.name || "Unknown user"}
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Content",
    accessorKey: "content",
    cell: ({ row }) => (
      <div className="space-y-2">
        <p className="whitespace-normal line-clamp-3 break-words text-sm max-w-[450px]">
          {row.original.content}
        </p>
        <h5 className="font-bebas ">
          &mdash; {row.original.user?.name || "Unknown"}
        </h5>
      </div>
    ),
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const dateValue = row.original.createdAt;
      if (dateValue) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          return format(date, "PPP");
        }
      }
      return "N/A";
    },
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.approved && (
          <Badge
            variant="secondary"
            className="bg-green-500 text-white dark:bg-green-600"
          >
            <BadgeCheckIcon />
            Approved
          </Badge>
        )}
        {row.original.featured && (
          <Badge
            variant="secondary"
            className="bg-yellow-500 text-white dark:bg-yellow-600"
          >
            <BadgeCheckIcon />
            Featured
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "ACTION",
    enableHiding: false,
    cell: ({ row }) => {
      const testimonial = row.original;
      const deleteTestimonial = async () => {
        const res = await fetch("/api/testimonials", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          },
          body: JSON.stringify({ id: testimonial.id }),
        });
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.error || "Failed to delete");
        }
      };
      return (
        <div className="flex items-center gap-2">
          <DeleteConfirmationDialog
            onConfirm={deleteTestimonial}
            trigger={
              <Button
                variant="ghost"
                className="text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-2 "
              >
                <Trash className="h-4 w-4 text-red-400" />
                <span className="font-semibold">Delete</span>
              </Button>
            }
          />
          <ActionsCellComponent
            id={testimonial.id}
            content={testimonial.content} // Pass content if needed for clipboard
            featured={testimonial.featured}
            approved={testimonial.approved}
          />
        </div>
      );
    },
  },
];
