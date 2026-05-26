"use client";

import { useEffect, useState } from "react";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { columns } from "@/app/admin/registrations/columns";

export default function EditionRegistrationsTable({
  editionId,
}: {
  editionId: string;
}) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `/api/admin/registrations-by-edition?editionId=${editionId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch registrations");
        }
        const data = await res.json();
        setRegistrations(data);
      } catch (err: any) {
        console.error("Error in EditionRegistrationsTable:", err);
        setError(err?.message || "Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    }

    if (editionId) {
      fetchRegistrations();
    }
  }, [editionId]);

  if (loading) {
    return <div className="text-center py-8">Loading registrations...</div>;
  }

  if (error) {
    return <div className="text-center text-destructive py-8">{error}</div>;
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No registrations found for this edition.
      </div>
    );
  }

  return <GenericDataTable columns={columns} data={registrations} addFiltering={true} />;
}
