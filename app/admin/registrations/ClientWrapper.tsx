// File: app/admin/registrations/ClientWrapper.tsx
"use client";

import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";

export default function ClientWrapper({ data }: { data: any[] }) {
  return <GenericDataTable columns={columns} data={data} addFiltering />;
}
