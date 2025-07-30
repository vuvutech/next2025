import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";

export async function DELETE(
  req: NextRequest,
) {
  const currentUser = await getCurrentUser();
  const { id } = await req.json();

  console.log("Deleting user with ID:", id);

  // Check admin privileges
  if (
    !currentUser ||
    (currentUser.role !== "ADMIN" && currentUser.role !== "SUPERADMIN")
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Prevent self-deletion
  if (currentUser.id === id) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 }
    );
  }

  try {
    await prisma.$transaction([
      prisma.newsletterSubscriber.deleteMany({ where: { userId: id } }),
      prisma.oauthAccessToken.deleteMany({ where: { userId: id } }),
      prisma.oauthConsent.deleteMany({ where: { userId: id } }),
      prisma.oauthApplication.deleteMany({ where: { userId: id } }),
      prisma.session.deleteMany({ where: { userId: id } }),
      prisma.registration.deleteMany({ where: { userId: id } }),
      prisma.profile.delete({ where: { userId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
