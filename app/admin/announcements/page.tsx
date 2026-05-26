import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { IconNewSection } from "@tabler/icons-react";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    include: { user: true },
  });

  const approved = announcements.filter((a) => a.approved).length;
  const featured = announcements.filter((a) => a.featured).length;

  return (
    <AdminPageWrapper
      icon={IconNewSection}
      title="User Announcements"
      description="Review, approve, and feature user announcements."
      stats={[
        { label: "Total", value: announcements.length, variant: "default" },
        { label: "Approved", value: approved, variant: "success" },
        { label: "Featured", value: featured, variant: "warning" },
      ]}
    >
      <GenericDataTable
        extention={<ExtensionComponent />}
        addFiltering={true}
        columns={columns}
        data={announcements}
      />
    </AdminPageWrapper>
  );
}