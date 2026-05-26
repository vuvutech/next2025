// File: app/admin/registrations/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ApproveButton } from "./ApproveButton";
import { ActionsCellComponent } from "./ActionsCellComponent";

export const columns: ColumnDef<any>[] = [
  {
    header: "User",
    accessorFn: (row) => row.user?.name || "Unknown",
    cell: ({ row }) => (
      <Image
        src={row.original.user?.image || "/images/avatar.webp"}
        alt={row.original.user?.name || "Unknown user"}
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
  },
  {
    header: "",
    accessorKey: "user.name",
    cell: ({ row }) => (
      <div>
        <h6 className="text-current gap-2 text-sm">
          {row.original.user?.name}
        </h6>
        —
        <div className="text-[10px] font-bold uppercase">
          {row.original.user?.email}
        </div>
      </div>
    ),
  },

  {
    header: "Institute",
    accessorFn: (row) => row.edition?.institute?.name,
    enableSorting: true,

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={
            row.original.edition?.institute?.logo
              ? `/${row.original.edition.institute.logo}`
              : "/images/costrad.png"
          }
          alt="Institute Logo"
          width={50}
          height={50}
        />
<span>
           {row.original.edition?.institute?.name} <br />
           {row.original.edition?.startDate && (
             <>
               <span className=" text-firefly text-[11px] font-bold uppercase" suppressHydrationWarning>
                 {" "}
                 {format(new Date(row.original.edition.startDate), "MMMM d, yyyy")}
               </span>{" "}
               &mdash;{" "}
               <span className=" text-destructive text-[11px] font-bold uppercase" suppressHydrationWarning>
                 {row.original.edition?.endDate
                   ? format(new Date(row.original.edition.endDate), "MMMM d, yyyy")
                   : "TBC"}
               </span>{" "}
             </>
           )}
         </span>
      </div>
    ),
  },
  {
    header: "Date of Registration",
    enableSorting: true,

    accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
    cell: ({ row }) => (
      <div>
        {row.original.createdAt ? format(new Date(row.original.createdAt), "PPP") : "—"}
      </div>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const isPast =
        row.original.edition?.endDate &&
        new Date(row.original.edition.endDate) < new Date();
      return row.original.approved ? (
        <Badge className="bg-green-500 text-background uppercase">
          Approved
        </Badge>
      ) : isPast ? (
        <Badge className="bg-muted text-muted-foreground uppercase">
          Expired
        </Badge>
      ) : (
        <Badge className="bg-yellow-500 text-background uppercase">
          Pending
        </Badge>
      );
    },
  },
  {
    id: "details",
    header: "Approve",
    cell: ({ row }) => (
      <ApproveButton
        id={row.original.id}
        name={row.original.user?.name || "Unknown"}
        email={row.original.user?.email || "Unknown"}
        approved={row.original.approved}
        startDate={row.original.edition?.startDate}
        endDate={row.original.edition?.endDate}
        price={row.original.edition?.price}
        priceViaZoom={row.original.edition?.priceViaZoom}
      />
    ),
  },
  {
    header: "",
    enableSorting: false,
    id: "actions",

    // accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <ActionsCellComponent id={row.original.user?.id} />
        </div>
      );
    },
  },
];
