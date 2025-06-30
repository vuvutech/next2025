import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { nanoid } from "nanoid"; // for generating unsubscribeToken

export async function POST(req: NextRequest) {
  const { name, email, notifyPermission } = await req.json();

  if (!name || !email || !notifyPermission) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // Lookup IP and Locale
  const ip = req.headers.get("x-forwarded-for") || null;
  const locale = req.headers.get("accept-language")?.split(",")[0] || null;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  const unsubscribeToken = nanoid(32); // for one-click unsubscribe

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        name,
        notifyPermission,
        subscribedAt: new Date(),
        unsubscribedAt: null,
        ipAddress: ip,
        locale,
        source: "dialog",
      },
      create: {
        name,
        email,
        notifyPermission,
        userId: existingUser?.id,
        unsubscribeToken,
        topics: [],
        verified: false,
        source: "dialog",
        ipAddress: ip,
        locale,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
