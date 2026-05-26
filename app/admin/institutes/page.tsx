import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { IconListDetails } from "@tabler/icons-react";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export const dynamic = "force-dynamic";

export default async function AdminInstitutesPage() {
  const institutes = await prisma.institute.findMany({
    include: { editions: true },
  });

  return (
    <AdminPageWrapper
      icon={IconListDetails}
      title="Institutes"
      description="Manage partner institutes and their configurations."
      stats={[
        { label: "Total", value: institutes.length, variant: "default" },
        {
          label: "Active",
          value: institutes.filter((i) => i.active).length,
          variant: "success",
        },
      ]}
    >
      <GenericDataTable
        extention={<ExtensionComponent />}
        addFiltering={true}
        columns={columns}
        data={institutes}
      />
    </AdminPageWrapper>
  );
}