import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { admin } from "@/lib/auth-client"; // ✅ Use this import

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const currentUser = await getCurrentUser();

  if (
    !currentUser ||
    (currentUser.role !== "SUPERADMIN" && currentUser.role !== "ADMIN")
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { banned, banReason } = body;

  if (typeof banned !== "boolean") {
    return NextResponse.json({ error: "`banned` must be boolean" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      banned,
      banReason: banned ? banReason ?? "No reason provided" : null,
      banExpires: banned ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null,
    },
  });

  if (banned) {
    try {
      await admin.revokeUserSessions({ userId: id }); // ✅ This is what works with your setup
    } catch (err) {
      console.error("Failed to revoke sessions:", err);
      return NextResponse.json(
        { error: "User banned, but session revocation failed." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true, user: updated });
}
