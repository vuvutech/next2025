// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox"; // Corrected import for Checkbox
import { ActionsCellComponent } from "./ActionsCellComponent";
import { BadgeCheckIcon, Trash } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/config/site";
import { InstituteInfo } from "./InstituteEditionImage";
import { EditEditionSheet } from "./EditEditionSheet";

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
    enableSorting: true,
    enableHiding: false,
  },
  {
    header: "Institute",
    accessorFn: (row) => row.instituteId || "Unknown",
    cell: ({ row }) => <InstituteInfo id={row.original.instituteId} />,
  },
  {
    header: "Overview",
    accessorKey: "overview",
    cell: ({ row }) => (
      <div className="space-y-2">
        <p className="whitespace-normal line-clamp-4  text-sm max-w-[450px]">
          {row.original.overview}
        </p>
        <h5 className="font-bebas flex items-center ">
          &mdash;&nbsp;   <InstituteInfo id={row.original.instituteId} mode="text" />

        </h5>
      </div>
    ),
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => (
      <div className="space-y-2">
        <p className="whitespace-normal line-clamp-4  text-sm max-w-[450px]">
          {row.original.price}
        </p>
      </div>
    ),
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
    cell: ({ row }) => {
      const dateValue = row.original.startDate;
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
    header: "End Date",
    accessorKey: "endDate",
    cell: ({ row }) => {
      const dateValue = row.original.endDate;
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
    header: "Action Details",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.active && (
          <Badge
            variant="secondary"
            className="bg-green-500 text-white dark:bg-green-600"
          >
            <BadgeCheckIcon />
            Active
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      const edition = row.original;
      return <EditEditionSheet edition={row.original} />
;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const edition = row.original;

      const deleteEdition = async () => {
        const res = await fetch(`${getBaseUrl()}/api/editions`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          },
          body: JSON.stringify({ id: edition.id }),
        });

        if (!res.ok) {
          alert("FAILURE....");
          const result = await res.json();
          throw new Error(result.error || "Failed to delete");
        }

        // ✅ Refresh the page after successful deletion
        window.location.reload();
      };

      return (
        // ⭐️ Render your new ActionsCell component

        <div className="flex items-center gap-2">
          <DeleteConfirmationDialog
            id={edition.id}
            onConfirm={deleteEdition}
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
            id={edition.id}
            overview={edition.overview}
            startDate={edition.startDate}
            endDate={edition.endDate}
            active={edition.active}
            setFormState={function (state: {
              id?: string;
              overview?: string;
              active: boolean;
              startDate?: Date;
              endDate?: Date;
            }): void {
              throw new Error("Function not implemented.");
            }}
            setIsEditing={function (editing: boolean): void {
              throw new Error("Function not implemented.");
            }}
            openDialog={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      );
    },
  },
];
