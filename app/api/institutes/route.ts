// app/api/institutes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/app/actions/functions";

const AUTH_TOKEN = process.env.AUTH_TOKEN;

function checkAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];
  if (token !== AUTH_TOKEN) {
    console.log("Failed with auth token");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

// GET handler
export async function GET(req: NextRequest) {
  // const authResult = checkAuth(req);
  // if (authResult) return authResult;

  console.log("Getting institutes ....");
  try {
    const institutes = await prisma.institute.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        editions: true,
      },
    });
    return NextResponse.json(institutes);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch institutes" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST handler
export async function POST(req: NextRequest) {
  const authResult = checkAuth(req);
  if (authResult) return authResult;

  try {
    const data = await req.json();
    const institute = await prisma.institute.create({ data });
    return NextResponse.json(institute);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to create institute" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
// PUT update institute (admin only)
export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { slug, overview, about } = body;

  if (!slug) {
    return NextResponse.json(
      { error: "Missing institute slug" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.institute.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json(
        { error: "Institute not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.institute.update({
      where: { slug },
      data: {
        overview: overview ?? undefined,
        about: about ?? undefined,
      },
      include: {
        editions: false,
      },
    });

    // 🔄 Revalidate both public and admin edit pages
    revalidatePath(`/institutes/${slug}`);
    revalidatePath(`/admin/institutes/${slug}/edit`);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Update failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(req: NextRequest) {
  const authResult = checkAuth(req);
  if (authResult) return authResult;

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.institute.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete institute" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
