import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();


  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { editionId } = await req.json();
  console.log("EDITION ID: ", editionId);

  if (!editionId) {
    return NextResponse.json(
      { error: "Edition ID is required" },
      { status: 400 }
    );
  }

  try {
    const edition = await prisma.edition.findUnique({
      where: { id: editionId },
    });

    if (!edition) {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    const existing = await prisma.registration.findUnique({
      where: {
        userId_editionId: {
          userId: user.id,
          editionId: editionId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "You are already registered." },
        { status: 200 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        editionId: editionId,
      },
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
