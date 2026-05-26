import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const editionId = searchParams.get("editionId");

    if (!editionId) {
      return NextResponse.json({ error: "Missing editionId" }, { status: 400 });
    }

    const registrations = await prisma.registration.findMany({
      where: { editionId },
      include: {
        user: true,
        edition: {
          include: { institute: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("API Error fetching edition registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
