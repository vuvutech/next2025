import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  if (!token) {
    return NextResponse.json({ error: "Missing unsubscribe token." }, { status: 400 });
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: { unsubscribeToken: token },
    });

    if (!subscriber) {
      return NextResponse.json({ error: "Invalid or expired unsubscribe token." }, { status: 404 });
    }

    await prisma.newsletterSubscriber.update({
      where: { email: subscriber.email },
      data: {
        unsubscribedAt: new Date(),
      },
    });

    return NextResponse.redirect("https://www.costrad.org/unsubscribed-successfully");
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
