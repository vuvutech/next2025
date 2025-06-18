//  app/api/editions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/lib/metadata";
import slugify from "slugify";

export async function GET() {
  console.log("Getting editions ....");
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
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const data = await req.json();

    console.log(data);
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
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  const { id, ...rest } = data;

  console.log(data);

  if (!id) {
    return NextResponse.json({ error: "Missing edition id" }, { status: 400 });
  }

  try {
    const updated = await prisma.edition.update({
      where: { id },
      data: rest,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("❌ Failed to update edition:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update edition" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { id } = await req.json();
    console.log("DELETING EDITION WITH ID", id);
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
