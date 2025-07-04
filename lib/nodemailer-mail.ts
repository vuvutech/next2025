// lib/mail.ts
import nodemailer from "nodemailer";

export async function sendMail({
  to,
  // replyTo,
  subject,
  html,
  cc
}: {
  to: string;
  // replyTo: string;
  subject: string;
  html: string;
  cc?: string;
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
    replyTo: `no-reply@costrad.org`,
    to,
    subject,
    html,
    cc
  });
}
