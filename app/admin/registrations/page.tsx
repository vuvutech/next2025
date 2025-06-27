// File: app/admin/registrations/page.tsx
import { prisma } from "@/prisma/dbConnect";
import ClientWrapper from "./ClientWrapper";

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    include: {
      user: true,
      edition: {
        include: { institute: true },
      },
    },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Registrations</h1>
      <ClientWrapper data={registrations} />
    </div>
  );
}
