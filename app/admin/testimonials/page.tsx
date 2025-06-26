// File: app/admin/testimonials/page.tsx

import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export const dynamic = "force-dynamic";


export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    include: { user: true },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Testimonials</h1>
      <GenericDataTable
        extention={<ExtensionComponent />}
        addFiltering={true}
        columns={columns}
        data={testimonials}
      />
    </div>
  );
}
