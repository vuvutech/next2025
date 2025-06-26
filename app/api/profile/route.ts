/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/lib/metadata";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("❌ Failed to fetch profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const existing = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    // Prepare payload
    const payload: any = {
      ...body,
      userId: user.id,
      updatedAt: new Date(),
    };
    // For new records set createdAt
    if (!existing) payload.createdAt = new Date();

    // Convert the string into a JS Date (if provided)
    if (body.dateOfBirth) {
      payload.dateOfBirth = new Date(body.dateOfBirth);
    } else {
      delete payload.dateOfBirth;
    }

    const profile = existing
      ? await prisma.profile.update({
          where: { userId: user.id },
          data: payload,
        })
      : await prisma.profile.create({ data: payload });
    revalidatePath(`/apply`);
    return NextResponse.json(profile);
  } catch (err) {
    console.error("❌ Failed to save profile:", err);
    return NextResponse.json(
      {
        error: "Failed to save profile",
        detail: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Destructure and filter out any unsafe fields
    const {
      id, // 🚫 Prisma manages this
      user: _user, // 🚫 avoid passing nested user object
      createdAt, // 🚫 managed by Prisma
      updatedAt, // ✅ we override this manually
      ...rest
    } = body;

    // Convert string to Date object for dateOfBirth
    if (rest.dateOfBirth) {
      rest.dateOfBirth = new Date(rest.dateOfBirth);
    }

    const now = new Date();

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        ...rest,
        updatedAt: now,
      },
      create: {
        ...rest,
        userId: user.id,
        createdAt: now,
        updatedAt: now,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("❌ Failed to update profile:", error);
    return NextResponse.json(
      {
        error: "Failed to update profile",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.profile.delete({
      where: { userId: user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    console.error("❌ Failed to delete profile:", error);
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}
