// File: app/admin/institutes/page.tsx

import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export default async function AdminInstitutesPage() {
  const institutes = await prisma.institute.findMany({
    // Add your include fields here, for example:
    include: { editions: true }
  });

  // console.log(institutes);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold"> Institutes</h1>
      <GenericDataTable
        extention={<ExtensionComponent />}
        addFiltering={true}
        columns={columns}
        data={institutes}
      />
    </div>
  );
}
