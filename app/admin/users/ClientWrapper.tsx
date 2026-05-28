// File: app/admin/users/ClientWrapper.tsx
"use client";

import { useState, useMemo } from "react";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { createColumns } from "./columns";
import { UserProfileSheet } from "@/components/modals/UserProfileSheet";

export const dynamic = "force-dynamic";

export default function ClientWrapper({ data }: { data: any[] }) {
  const [viewUserId, setViewUserId] = useState<string | null>(null);
  const [showSheet, setShowSheet] = useState(false);

  const handleViewUser = (id: string) => {
    setViewUserId(id);
    setShowSheet(true);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columns = useMemo(() => createColumns(handleViewUser), []);

  return (
    <>
      <GenericDataTable columns={columns} data={data} addFiltering={true} />
      <UserProfileSheet
        open={showSheet}
        onOpenChange={setShowSheet}
        userId={viewUserId}
      />
    </>
  );
}
