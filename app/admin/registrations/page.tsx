// File: app/admin/registrations/page.tsx
import { prisma } from "@/prisma/dbConnect";
import { columns } from "./columns";
import { GenericDataTable } from "@/components/generic-data-table";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    where: {
      user: { NOT: {} },
    },
    include: {
      user: true,
      edition: {
        include: {
          institute: true,
        },
      },
    },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Registrations</h1>
      <GenericDataTable
        columns={columns}
        data={registrations}
        addFiltering={true}
      />
    </div>
  );
}
