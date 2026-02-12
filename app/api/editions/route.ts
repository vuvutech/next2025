//  app/api/editions/route.ts
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch editions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const data = await req.json();

    const edition = await prisma.edition.create({
      data: {
        ...data,
        slug: slugify(data.title, { lower: true, strict: true }),
        // instituteId: new ObjectId(data.instituteId),
      },
    });

    return NextResponse.json(edition);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to create edition" },
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
    instituteId, // keep extracting it
    ...rest
  } = data;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Optional: validate instituteId exists (avoids silent wrong FK)
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
    const updated = await prisma.edition.update({
      where: { id },
      data: {
        ...rest,
        // Set the scalar FK field directly – this is the correct way for MongoDB
        ...(instituteId !== undefined && { instituteId }),

        ...(title && {
          title,
          slug: slugify(title, { lower: true, strict: true }),
        }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(earlyBirdPrice !== undefined && { earlyBirdPrice: parseFloat(earlyBirdPrice) }),
        ...(priceViaZoom !== undefined && { priceViaZoom: parseFloat(priceViaZoom) }),
      },
    });

    console.log("Updated edition:", updated);

    revalidatePath(`${baseUrl}/admin/editions`);
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("❌ Failed to update edition:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    // For MongoDB you might also see P2003 (constraint failed) if instituteId is invalid
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
  if (!user || user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.edition.delete({ where: { id } });
    revalidatePath(`${baseUrl}/admin/editions`);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete edition" },
      { status: 500 }
    );
  }
}
