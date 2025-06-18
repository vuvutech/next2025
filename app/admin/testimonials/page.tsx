// File: app/admin/testimonials/page.tsx

import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { IconCirclePlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExtensionComponent } from "./ExtensionComponent";

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
