// lib/mail.ts
import nodemailer from "nodemailer";

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"COSTrAD Institute" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
  });
}
