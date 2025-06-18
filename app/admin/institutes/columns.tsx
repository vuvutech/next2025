// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import EditInstituteDialog from "./EditInstituteDialogue";
import { Edition } from "@prisma/client";

// Updated Institute type with missing fields
type Institute = {
  id: string;
  name: string;
  acronym: string;
  overview: string;
  about: string;
  introduction: string;
  icon?: string | null;
  logo?: string | null;
  banner?: string | null;
  seo?: string | null;
  active: boolean;
  slug: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  approved?: boolean; // Added
  featured?: boolean; // Added
  editions: Edition[] | null;
};

// Define type for ActionsCellComponent props (for type safety)
interface ActionsCellProps {
  id: string;
  overview: string; // Changed from content to overview
  featured?: boolean;
  approved?: boolean;
  setFormState: (state: {
    id?: string;
    overview?: string;
    featured: boolean;
    approved: boolean;
  }) => void;
  setIsEditing: (editing: boolean) => void;
  openDialog: () => void;
}

export const columns: ColumnDef<Institute>[] = [
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
    id: "logo",
    header: "Logo",
    accessorFn: (row) => row.logo || "No Logo",
    cell: ({ row }) => (
      <Image
        src={`/${row.original.logo}` || "/images/avatar.png"}
        alt={row.original.name || "Institute logo"}
        width={80}
        height={80}
        className="rounded-full"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "overview",
    header: "Overview",
    accessorKey: "overview",
    cell: ({ row }) => (
      <div className="space-y-2">
        <p className="whitespace-normal line-clamp-3 break-words text-sm max-w-[450px]">
          {row.original.overview}
        </p>
        <h5 className="font-bebas">— {row.original.name || "Unknown"}</h5>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "created_at",
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const dateValue = row.original.createdAt;
      if (dateValue && !isNaN(new Date(dateValue).getTime())) {
        return format(new Date(dateValue), "PPP");
      }
      return "N/A";
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const institute = row.original;
      // Ensure 'featured' and 'approved' are always boolean
      const instituteForm = {
        ...institute,
        featured: institute.featured ?? false,
        approved: institute.approved ?? false,
      };
      return <EditInstituteDialog institute={instituteForm} />;
    },
  },
];
