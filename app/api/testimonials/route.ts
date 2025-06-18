// app/api/testimonials/route.ts

// File: app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { revalidatePath } from "next/cache";

// GET all testimonials (admin only)
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const testimonials = await prisma.testimonial.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  console.log(testimonials);

  return NextResponse.json(testimonials);
}

// POST new testimonial (authenticated user only)
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  // If user is not authenticated, return 401 Unauthorized
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required to submit a testimonial....." },
      { status: 401 }
    );
  }

  const { content } = await req.json();
  if (!content || content.trim() === "") {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        userId: user.id,
        content,
      },
    });
    return NextResponse.json(testimonial, { status: 201 }); // 201 Created for successful resource creation
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to save testimonial due to a server error." },
      { status: 500 }
    );
  }
}

// PUT update testimonial (admin only)
export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id, approved, featured } = await req.json();
  if (!id)
    return NextResponse.json(
      { error: "Missing testimonial id" },
      { status: 400 }
    );

  // Fetch the testimonial to check its userId
  const testimonialToUpdate = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonialToUpdate) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  if (user.role === "admin") {
    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        approved: approved ?? undefined,
        featured: featured ?? undefined,
      },
    });
        revalidatePath('/admin/testimonials');

    return NextResponse.json(updated);
  }

}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();

  // Extract the testimonial ID from the request body
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  // Fetch the testimonial to check its userId
  const testimonialToDelete = await prisma.testimonial.findUnique({
    where: { id },
  });

  // If testimonial not found
  if (!testimonialToDelete) {
    return NextResponse.json(
      { error: "Testimonial not found" },
      { status: 404 }
    );
  }

  // Check if user is logged in
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Allow deletion if user is an admin OR if the user is the owner of the testimonial
  if (user.role === "admin" || testimonialToDelete.userId === user.id) {
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } else {
    // If not an admin and not the owner
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
