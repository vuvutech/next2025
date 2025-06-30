import { prisma } from "@/prisma/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from '@/lib/metadata';

export async function GET(
  req: NextRequest,
  context: { params: { token: string } }
) {
  const token = context.params.token;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/confirmation-error`);
  }

  const subscriber = await prisma.newsletterSubscriber.findFirst({
    where: { confirmationToken: token },
  });

  if (!subscriber) {
    return NextResponse.redirect(`${baseUrl}/confirmation-error`);
  }

  await prisma.newsletterSubscriber.update({
    where: { email: subscriber.email },
    data: {
      verified: true,
      confirmationToken: null,
    },
  });

  return NextResponse.redirect(`${baseUrl}/confirmed-successfully`);
}
