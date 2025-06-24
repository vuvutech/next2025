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
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  // },
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
          &mdash;&nbsp;{" "}
          <InstituteInfo id={row.original.instituteId} mode="text" />
        </h5>
      </div>
    ),
  },
  {
    header: "Delivery Mode",
    cell: ({ row }) => (
      <div className="grid gap-2">
        <div>
          {row.original.inPersonDelivery && (
            <Badge
              variant="secondary"
              className="bg-firefly text-white dark:bg-firefly/70 rounded-full"
            >
              <BadgeCheckIcon />
              In-Person
            </Badge>
          )}
        </div>
        <div>
          {" "}
          {row.original.onlineDelivery && (
            <Badge variant="default" className="rounded-full">
              <BadgeCheckIcon />
              Online
            </Badge>
          )}
        </div>
      </div>
    ),
  },
  {
    header: "Details",
    accessorKey: "details",
    cell: ({ row }) => {
      // format number to US dollar
      let USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return (
        <div className="flex w-full flex-col gap-2">
          <div className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full">
            <div className="font-medium">Start Date</div>
            <div className="text-muted-foreground text-xs">
              {row.original.startDate
                ? format(new Date(row.original.startDate), "PPP")
                : "N/A"}
            </div>
          </div>
          <div className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full">
            <div className="font-medium">End Date</div>
            <div className="text-muted-foreground text-xs">
              {row.original.endDate
                ? format(new Date(row.original.endDate), "PPP")
                : "N/A"}
            </div>
          </div>
          <div className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full">
            <div className="font-medium">Donation Amount</div>
            <div className="text-muted-foreground text-xs grid grid-cols-2 gap-2">
              <div className="text-firefly">
                
                {row.original.price
                  ? USDollar.format(row.original.price)
                  : "N/A"}
              </div>
              <div className="text-primary">
                
                {row.original.price
                  ? USDollar.format(row.original.priceViaZoom)
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      );
    },
  },

  // {
  //   header: "Action Details",
  //   cell: ({ row }) => (
  //     <div className="flex gap-2">
  //       {row.original.active && (
  //         <Badge
  //           variant="secondary"
  //           className="bg-green-500 text-white dark:bg-green-600"
  //         >
  //           <BadgeCheckIcon />
  //           Active
  //         </Badge>
  //       )}
  //     </div>
  //   ),
  // },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      const edition = row.original;
      return <EditEditionSheet edition={row.original} />;
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
