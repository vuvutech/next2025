/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/lib/metadata";
import slugify from "slugify";

export async function GET() {
  try {
    const editions = await prisma.edition.findMany({
      include: {
        institute: true,
      },
    });
    return NextResponse.json(editions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch editions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const data = await req.json();

    // Validate required fields
    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!data.instituteId) {
      return NextResponse.json({ error: "Institute ID is required" }, { status: 400 });
    }

    // Check if institute exists
    const instituteExists = await prisma.institute.findUnique({
      where: { id: data.instituteId },
      select: { id: true, name: true },
    });

    if (!instituteExists) {
      return NextResponse.json({ error: "Institute not found" }, { status: 404 });
    }

    const slug = slugify(data.title, { lower: true, strict: true });

    // Check if slug already exists
    const existingSlug = await prisma.edition.findUnique({
      where: { slug },
      select: { id: true, title: true },
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          error: "An edition with this title already exists",
          details: `Title "${data.title}" generates slug "${slug}" which is already used by edition: ${existingSlug.title}`,
        },
        { status: 409 }
      );
    }

    // ────────────────────────────────────────────────
    //   Copy the safe parsing pattern from PUT
    // ────────────────────────────────────────────────

    const {
      title,           // we'll handle separately if needed
      instituteId,
      price,
      earlyBirdPrice,
      priceViaZoom,
      ...rest
    } = data;

    const edition = await prisma.edition.create({
      data: {
        ...rest,
        title,
        instituteId,
        slug,
        // Only include price fields if they were sent, and convert them safely
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(earlyBirdPrice !== undefined && { earlyBirdPrice: parseFloat(earlyBirdPrice) }),
        ...(priceViaZoom !== undefined && { priceViaZoom: parseFloat(priceViaZoom) }),
      },
      include: { institute: { select: { slug: true, name: true } } },
    });

    console.log(
      `✅ New edition created: "${edition.title}" (ID: ${edition.id}) for institute "${instituteExists.name}"`
    );

    // Revalidate paths (same as before)
    revalidatePath(`${baseUrl}/admin/editions`);
    revalidatePath('/institutes', 'page');
    if (edition.institute?.slug) {
      revalidatePath(`/institutes/${edition.institute.slug}`, 'page');
    }

    return NextResponse.json(edition);
  } catch (error: any) {
    console.error("❌ Edition creation failed:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Edition slug already exists. Use a different title." },
        { status: 409 }
      );
    }
    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Invalid institute reference" },
        { status: 400 }
      );
    }

    // For Prisma validation errors (like string instead of float)
    if (error instanceof Error && error.message.includes("Invalid value provided")) {
      return NextResponse.json(
        { error: "Invalid data format", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create edition", details: error?.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  const {
    id,
    title,
    earlyBirdPrice,
    price,
    priceViaZoom,
    instituteId,
    ...rest
  } = data;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Validate instituteId if provided
  if (instituteId) {
    const instituteExists = await prisma.institute.findUnique({
      where: { id: instituteId },
      select: { id: true },
    });
    if (!instituteExists) {
      return NextResponse.json({ error: "Institute not found" }, { status: 404 });
    }
  }

  console.log("Data received for update:", data);

  try {
    // Fetch current edition + its institute slug (before update)
    const currentEdition = await prisma.edition.findUnique({
      where: { id },
      include: { institute: { select: { slug: true } } },
    });

    if (!currentEdition) {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    const updated = await prisma.edition.update({
      where: { id },
      data: {
        ...rest,
        ...(instituteId !== undefined && { instituteId }),
        ...(title && {
          title,
          slug: slugify(title, { lower: true, strict: true }),
        }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(earlyBirdPrice !== undefined && { earlyBirdPrice: parseFloat(earlyBirdPrice) }),
        ...(priceViaZoom !== undefined && { priceViaZoom: parseFloat(priceViaZoom) }),
      },
      include: { institute: { select: { slug: true } } }, // also fetch after update (in case institute changed)
    });

    console.log("Updated edition:", updated);

    // Revalidate admin + institutes
    revalidatePath(`${baseUrl}/admin/editions`);
    revalidatePath('/institutes', 'page'); // broad: all /institutes/* pages

    // Precise: old slug (if changed) + new slug
    if (currentEdition.institute?.slug) {
      revalidatePath(`/institutes/${currentEdition.institute.slug}`, 'page');
    }
    if (updated.institute?.slug) {
      revalidatePath(`/institutes/${updated.institute.slug}`, 'page');
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("❌ Failed to update edition:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }
    if (error.code === "P2003") {
      return NextResponse.json({ error: "Invalid institute reference" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update edition", details: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Fetch edition + slug before delete
    const editionToDelete = await prisma.edition.findUnique({
      where: { id },
      include: { institute: { select: { slug: true } } },
    });

    if (!editionToDelete) {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    await prisma.edition.delete({ where: { id } });

    // Revalidate
    revalidatePath(`${baseUrl}/admin/editions`);
    revalidatePath('/institutes', 'page');

    if (editionToDelete.institute?.slug) {
      revalidatePath(`/institutes/${editionToDelete.institute.slug}`, 'page');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete edition" },
      { status: 500 }
    );
  }
}