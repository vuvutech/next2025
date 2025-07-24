import { prisma } from "@/prisma/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/lib/metadata";
import { generateUnsubscribeToken } from "@/app/actions/functions";
import { render } from "@react-email/components";
import { NewsletterAppreciationEmail } from "@/lib/email/newsletter-confirmation-appreciation";
import { sendMail } from "@/lib/nodemailer-mail";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const token = (await context.params).token;
  console.log("Confirmation token:", token);

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/confirmation-error`);
  }

  const subscriber = await prisma.newsletterSubscriber.findFirst({
    where: { confirmationToken: token },
  });

  console.log("Subscriber found:", subscriber);

  if (!subscriber) {
    return NextResponse.redirect(`${baseUrl}/confirmation-error`);
  }

  const unsubscribeToken = await generateUnsubscribeToken();

  const completeSubscription = await prisma.newsletterSubscriber.update({
    where: { email: subscriber.email },
    data: {
      verified: true,
      confirmationToken: null,
      unsubscribeToken: unsubscribeToken,
    },
  });

  if (completeSubscription) {
    // Email confirmation
    const html = await render(
      NewsletterAppreciationEmail({
        name: subscriber?.name ?? undefined,
        unsubscribeToken: unsubscribeToken,
      })
    );

    await sendMail({
      to: subscriber.email,
      subject: "You're now subscribed to COSTrAD!",
      html,
    });
  }

  return NextResponse.redirect(`${baseUrl}/confirmed-successfully`);
}
