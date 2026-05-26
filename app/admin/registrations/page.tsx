import { prisma } from "@/prisma/dbConnect";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { IconDatabase } from "@tabler/icons-react";
import ClientWrapper from "./ClientWrapper";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    include: {
      user: true,
      edition: {
        include: { institute: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const approved = registrations.filter((r) => r.approved).length;
  const pending = registrations.filter((r) => !r.approved).length;

  return (
    <AdminPageWrapper
      icon={IconDatabase}
      title="Edition Registrations"
      description="Review and manage all registration submissions."
      stats={[
        { label: "Total", value: registrations.length, variant: "default" },
        { label: "Approved", value: approved, variant: "success" },
        { label: "Pending", value: pending, variant: "warning" },
      ]}
    >
      <ClientWrapper data={registrations} />
    </AdminPageWrapper>
  );
}