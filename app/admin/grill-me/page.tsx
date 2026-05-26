// File: app/admin/grill-me/page.tsx
import { prisma } from "@/prisma/dbConnect";
import EditionTabs from "./EditionTabs";

export const dynamic = "force-dynamic";

export default async function GrillMePage() {
  const editions = await prisma.edition.findMany({
    include: {
      institute: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Grill-Me Panel</h1>
        <p className="text-muted-foreground">
          View and approve registrants separated by their various edition intakes in tabs.
        </p>
      </div>
      <EditionTabs editions={editions} />
    </div>
  );
}
