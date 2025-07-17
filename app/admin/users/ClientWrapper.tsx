// File: app/admin/registrations/ClientWrapper.tsx
"use client";

import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

export default function ClientWrapper({ data }: { data: any[] }) {
  return <GenericDataTable columns={columns} data={data} addFiltering={true} />;
}
