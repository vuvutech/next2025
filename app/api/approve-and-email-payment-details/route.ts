// File: app/api/approve-and-email-payment-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { sendMail } from "@/lib/nodemailer-mail";

export async function POST(req: NextRequest) {
  try {
    const { id, name, email, startDate, endDate, price, priceViaZoom } =
      await req.json();

    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedStartDate = startDate
      ? formatter.format(new Date(startDate))
      : "TBD";

    const formattedEndDate = endDate
      ? formatter.format(new Date(endDate))
      : "TBD";

    // Send email with payment info
    await sendMail({
      to: email,
      subject: `Payment Details for Institute Edition`,
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for registering. Here are your payment details:</p>
        <ul>
          <li><strong>Start Date:</strong> ${formattedStartDate}</li>
          <li><strong>End Date:</strong> ${formattedEndDate}</li>
          <li><strong>Price (In Person):</strong> $${price}</li>
          <li><strong>Price (Via Zoom):</strong> $${priceViaZoom}</li>
        </ul>
        <p>Kind regards,<br />COSTrAD Team</p>
      `,
    });

    // ✅ Update registration as approved
    await prisma.registration.update({
      where: { id },
      data: { approved: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending or approval failed:", error);
    return NextResponse.json(
      { error: "Failed to send email or approve registration" },
      { status: 500 }
    );
  }
}
