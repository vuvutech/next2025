import { prisma } from "@/prisma/dbConnect";
import ClientWrapper from "./ClientWrapper"; // your table wrapper

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

  const serializedUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">COSTrAD Users</h1>
      <ClientWrapper data={serializedUsers} />
    </div>
  );
}
