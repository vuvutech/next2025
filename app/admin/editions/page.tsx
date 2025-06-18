// File: app/admin/editions/page.tsx

import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export default async function AdminEditionsPage() {
  const editions = await prisma.edition.findMany();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Editions</h1>
      <GenericDataTable
        extention={<ExtensionComponent />}
        addFiltering={true}
        columns={columns}
        data={editions}
      />
    </div>
  );
}
