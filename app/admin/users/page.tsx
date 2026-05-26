import { prisma } from "@/prisma/dbConnect";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { IconUsers } from "@tabler/icons-react";
import ClientWrapper from "./ClientWrapper";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      profile: true,
      registration: true,
      accounts: true,
      sessions: true,
      _count: {
        select: {
          accounts: true,
          sessions: true,
          registration: true,
        },
      },
    },
  });

  const serializedUsers = users.map((user: any) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  const admins = users.filter((u) => u.role === "ADMIN" || u.role === "SUPERADMIN").length;
  const banned = users.filter((u) => u.banned).length;

  return (
    <AdminPageWrapper
      icon={IconUsers}
      title="COSTrAD Users"
      description="Manage platform users, roles, and permissions."
      stats={[
        { label: "Total", value: users.length, variant: "default" },
        { label: "Admins", value: admins, variant: "info" },
        { label: "Banned", value: banned, variant: banned > 0 ? "danger" : "success" },
      ]}
    >
      <ClientWrapper data={serializedUsers} />
    </AdminPageWrapper>
  );
}