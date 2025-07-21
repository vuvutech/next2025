// app/api/users/ban/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { admin } from "@/lib/auth-client";

export async function PUT(req: NextRequest) {
  // Extract id and add a safety check
 

  const body = await req.json();
  const currentUser = await getCurrentUser();

  if (
    !currentUser ||
    (currentUser.role !== "SUPERADMIN" && currentUser.role !== "ADMIN")
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const {id, banned, banReason } = body;
  // console.log(id, banned, banReason);

  if (typeof banned !== "boolean") {
    return NextResponse.json(
      { error: "`banned` must be boolean" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        banned,
        banReason: banned ? (banReason ?? "No reason provided") : null,
        banExpires: banned
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          : null,
      },
    });

    if (banned) {
      await admin.revokeUserSessions({ userId: id });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("Failed to update user or revoke sessions:", err);
    return NextResponse.json(
      { error: "User banned, but session revocation failed." },
      { status: 500 }
    );
  }
}
