import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { nanoid } from "nanoid"; // for generating unsubscribeToken
import { NewsletterConfirmationEmail } from "@/lib/email/newsletter-confirmation";
import { render } from "@react-email/render";
import { sendMail } from "@/lib/nodemailer-mail"; // or your mail helper

export async function POST(req: NextRequest) {
  const { name, email, notifyPermission } = await req.json();

  if (!name || !email || !notifyPermission) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  const confirmationToken = nanoid();

  try {
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        name,
        notifyPermission,
        subscribedAt: new Date(),
        unsubscribedAt: null,
        confirmationToken,
        verified: false,
      },
      create: {
        name,
        email,
        notifyPermission,
        userId: existingUser?.id,
        confirmationToken,
        verified: false,
        source: "dialog",
      },
    });

    if (subscriber) {
      // Email confirmation
      const html = await render(
        NewsletterConfirmationEmail({
          name,
          confirmationToken,
        })
      );

      await sendMail({
        to: email,
        subject: "Confirm Subscription to COSTrAD!",
        html,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
