// app/api/announcements/route.ts

// File: app/api/announcements/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";

// GET all announcements (admin only)
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  // if (!user || user.role !== "admin") {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  const announcements = await prisma.announcement.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(announcements);
}

// POST new announcement (authenticated user only)
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  // If user is not authenticated, return 401 Unauthorized
  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { error: "Authentication required to submit a announcement....." },
      { status: 401 }
    );
  }

  const { content } = await req.json();
  if (!content || content.trim() === "") {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  try {
    const announcement = await prisma.announcement.create({
      data: {
        userId: user.id,
        content,
      },
    });
    return NextResponse.json(announcement, { status: 201 }); // 201 Created for successful resource creation
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Failed to save announcement due to a server error." },
      { status: 500 }
    );
  }
}

// PUT update announcement (admin only)
export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id, content, approved, featured } = await req.json();
  if (!id)
    return NextResponse.json(
      { error: "Missing announcement id" },
      { status: 400 }
    );

  const updated = await prisma.announcement.update({
    where: { id },
    data: {
      approved: approved ?? undefined,
      featured: featured ?? undefined,
      content: content ?? undefined,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();

  // Extract the announcement ID from the request body
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  // Fetch the announcement to check its userId
  const announcementToDelete = await prisma.announcement.findUnique({
    where: { id },
  });

  // If announcement not found
  if (!announcementToDelete) {
    return NextResponse.json(
      { error: "Announcement not found" },
      { status: 404 }
    );
  }

  // Check if user is logged in
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Allow deletion if user is an admin OR if the user is the owner of the announcement
  if (user.role === "admin" || announcementToDelete.userId === user.id) {
    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } else {
    // If not an admin and not the owner
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
