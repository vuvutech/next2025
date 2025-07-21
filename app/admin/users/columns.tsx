// File: app/admin/registrations/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LucideBadgeCheck, LucideShieldUser } from "lucide-react";

import { ActionsCellComponent } from "./ActionsCellComponent";
import { BanToggleForm } from "./BanToggleForm";
import { AdminRoleToggleForm } from "./AdminRoleToggleForm";

export const columns: ColumnDef<any>[] = [
  {
    header: "User",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarImage src={row.original.image || null} alt={row.original.name || null} />
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
    header: "Created",
    enableSorting: true,

    accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
    cell: ({ row }) => (
      <div className="text-xs">
        {format(new Date(row.original.createdAt).toLocaleDateString(), "PPP")}
      </div>
    ),
  },
  {
    header: "Last Updated",
    enableSorting: true,
    accessorFn: (row) =>
      row.profile?.updatedAt ? new Date(row.profile.updatedAt) : null,
    cell: ({ row }) => {
      const updatedAt = row.original.profile?.updatedAt;
      if (!updatedAt) return <div className="text-xs text-muted">N/A</div>;

      try {
        return (
          <div className="text-xs">{format(new Date(updatedAt), "PPP")}</div>
        );
      } catch (err) {
        console.error("Invalid date:", updatedAt);
        return <div className="text-xs text-destructive">Invalid date</div>;
      }
    },
  },
  {
    header: "Admin Status",
    id: "adminToggle",
    enableSorting: false,
    accessorFn: (row) => row.role,
    cell: ({ row }) => (
      <AdminRoleToggleForm
        userId={row.original.id}
        isAdmin={row.original.role === "ADMIN"}
      />
    ),
  },

  {
    enableSorting: true,
    header: "",
    id: "banned",
    accessorFn: (row) => (row.banned ? "Yes" : "No"),
    cell: ({ row }) => {
      return (
        <BanToggleForm
          userId={row.original.id}
          initialBanned={row.original.banned}
        />
      );
    },
  },

  {
    header: "",
    enableSorting: false,
    id: "actions",

    accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <ActionsCellComponent id={row.original.id} />
        </div>
      );
    },
  },
];
