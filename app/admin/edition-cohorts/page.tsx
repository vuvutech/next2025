import { prisma } from "@/prisma/dbConnect";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { IconSchool } from "@tabler/icons-react";
import EditionTabs from "./EditionTabs";

export const dynamic = "force-dynamic";

export default async function EditionCohortsPage() {
  const editions = await prisma.edition.findMany({
    include: {
      institute: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  return (
    <AdminPageWrapper
      icon={IconSchool}
      title="Edition Cohorts"
      description="View and approve registrants separated by their various edition cohort intakes."
      stats={[
        { label: "Total Cohorts", value: editions.length, variant: "default" },
      ]}
    >
      <EditionTabs editions={editions} />
    </AdminPageWrapper>
  );
}