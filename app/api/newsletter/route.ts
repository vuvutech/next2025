import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { nanoid } from "nanoid"; // for generating unsubscribeToken
import { NewsletterConfirmationEmail } from "@/lib/email/newsletter-confirmation";
import { render } from "@react-email/render";
import { sendMail } from "@/lib/nodemailer-mail"; // or your mail helper
import { generateUnsubscribeToken } from "@/app/actions/functions";



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
  

  const unsubscribeToken = await generateUnsubscribeToken();

  try {
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        name,
        notifyPermission,
        subscribedAt: new Date(),
        unsubscribedAt: null,
      },
      create: {
        name,
        email,
        notifyPermission,
        userId: existingUser?.id,
        unsubscribeToken,
        source: "dialog",
      },
    });

    if (subscriber) {
      // Email confirmation
      const html = await render(
        NewsletterConfirmationEmail({
          name,
          unsubscribeToken
        })
      );

      await sendMail({
        to: email,
        subject: "You're now subscribed to COSTrAD!",
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
