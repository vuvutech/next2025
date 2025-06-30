// File: app/admin/registrations/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ApproveButton } from "./ApproveButton";

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
        <h4 className="text-current">
          {" "}
          {row.original.user?.name} <br />
          &mdash; <br />
          <span className="text-[10px] font-bold">
            {row.original.user?.email}
          </span>
        </h4>
      </div>
    ),
  },

  {
    header: "Institute",
    accessorFn: (row) => row.edition?.institute?.name,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={
            `/${row.original.edition?.institute?.logo}` || "/images/costrad.png"
          }
          alt="Institute Logo"
          width={50}
          height={50}
        />
        <span>
          {row.original.edition?.institute?.name} <br />
          <span className=" text-firefly text-[11px] font-bold uppercase">
            {" "}
            {new Date(row.original.edition?.startDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </span>{" "}
          &mdash;{" "}
          <span className=" text-destructive text-[11px] font-bold uppercase">
            {new Date(row.original.edition?.endDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </span>{" "}
        </span>
      </div>
    ),
  },
  {
    header: "Date of Registration",
    accessorFn: (row) => new Date(row.original.createdAt).toLocaleDateString(),
    cell: ({ row }) => (
      <div>{format(new Date(row.original.createdAt).toLocaleDateString(), "PPP")}</div>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) =>
      row.original.approved ? (
        <Badge className="bg-green-500 text-white">Approved</Badge>
      ) : (
        <Badge className="bg-yellow-500 text-white">Pending</Badge>
      ),
  },
  {
    id: "actions",
    header: "Approve",
    cell: ({ row }) => (
      <ApproveButton
        id={row.original.id}
        name={row.original.user.name}
        email={row.original.user.email}
        approved={row.original.approved}
        startDate={row.original.edition?.startDate}
        endDate={row.original.edition?.endDate}
        price={row.original.edition?.price}
        priceViaZoom={row.original.edition?.priceViaZoom}
      />
    ),
  },
];
