// File: app/admin/registrations/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Country } from "@/components/ui/country-dropdown";
import { LucideBadgeCheck, LucideShieldUser } from "lucide-react";
import { ActionsCellComponent } from "./ActionsCellComponent";

export const columns: ColumnDef<any>[] = [
  {
    header: "User",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarImage src={row.original.image} alt={row.original.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div>
          <h6 className="text-current gap-2 text-xs">
            {row.original.name}{" "}
            <span>
              <Badge className="rounded-full">
                {row.original.profile?.gender
                  ? row.original.profile.gender === "MALE"
                    ? "M"
                    : "F"
                  : "N/A"}
              </Badge>
            </span>
          </h6>
          —
          <div className="text-[10px] font-bold uppercase">
            {row.original.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Student ID",
    accessorFn: (row) => row.studentId,
    accessorKey: "Student ID",
    cell: ({ row }) => (
      <div className="text-xs">{row.original.studentId || "Not specified"}</div>
    ),
  },
  {
    header: "Country",
    accessorKey: "Country",
    accessorFn: (row) => row.profile?.country,
    cell: ({ row }) => (
      <div className="">
        <div>{row.original.profile?.country || "Not specified"}</div>
        <div className="font-bold">
          {row.original.profile?.telephone || "Not specified"}
        </div>
      </div>
    ),
  },

  {
    header: "Role",
    accessorFn: (row) => row.role,
    accessorKey: "Role",
    cell: ({ row }) => (
      <div className="text-[9px] uppercase">
        {row.original.role == "ADMIN" ? (
          <Badge variant={"destructive"} className="flex items-center gap-1">
            {" "}
            <LucideShieldUser />
            ADMIN
          </Badge>
        ) : (
          <Badge variant={"default"} className="flex items-center gap-1">
            {" "}
            <LucideBadgeCheck /> USER
          </Badge>
        )}
      </div>
    ),
  },
  {
    header: "Last Updated",
    enableSorting: true,

    accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
    cell: ({ row }) => (
      <div className="text-xs">
        {format(new Date(row.original.createdAt).toLocaleDateString(), "PPP")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        // ⭐️ Render your new ActionsCell component
        <ActionsCellComponent
          id={user.id}
          banned={user.banned}
          setFormState={function (state: {
            id?: string;
            banned: boolean;
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
      );
    },
  },
];
