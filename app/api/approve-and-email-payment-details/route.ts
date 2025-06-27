// File: app/api/approve-and-email-payment-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { sendMail } from "@/lib/nodemailer-mail";

export async function POST(req: NextRequest) {
  try {
    const { name, email, startDate, endDate, price, priceViaZoom } = await req.json();

    // Send email with payment info
    await sendMail({
      to: email,
      subject: `Payment Details for Institute Edition`,
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for registering. Here are your payment details:</p>
        <ul>
          <li><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</li>
          <li><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</li>
          <li><strong>Price (In Person):</strong> $${price}</li>
          <li><strong>Price (Via Zoom):</strong> $${priceViaZoom}</li>
        </ul>
        <p>Kind regards,<br />COSTrAD Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
