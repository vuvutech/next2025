import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { revalidatePath } from "next/cache";


export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id?.trim();
  if (!id) return NextResponse.json({ error: "Missing institute ID" }, { status: 400 });

  console.log("🔍 Fetching institute with ID:", id);

  try {
    const institute = await prisma.institute.findUnique({
      where: { id },
      include: { editions: true },
    });
    if (!institute) return NextResponse.json({ error: "Institute not found" }, { status: 404 });
    return NextResponse.json(institute);
  } catch (error) {
    console.error("❌ Error fetching institute:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/institutes/getInstitute/[id]
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id?.trim();

  if (!id) {
    return NextResponse.json(
      { error: "Missing institute ID" },
      { status: 400 }
    );
  }

  console.log("🔥 PUT request for institute ID:", id);

  const json = await request.json();

  const fields = [
    "name",
    "acronym",
    "overview",
    "about",
    "introduction",
    "seo",
    "banner",
    "logo",
    "icon",
  ];

  const data: Record<string, any> = {};
  for (const field of fields) {
    const value = json[field];
    if (value !== undefined && value !== null && value !== "") {
      data[field] = value;
    }
  }

  console.log("📦 Sanitized update payload:", data);

  try {
    const existing = await prisma.institute.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Institute not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.institute.update({
      where: { id },
      data,
    });

    revalidatePath(`/admin/institutes/${existing.slug}/edit`);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("❌ Error updating institute:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
