import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { render } from "@react-email/render";
import { WelcomeToInstituteEmail } from "@/lib/email/welcome-to-institute";
import { AdminApprovalRequestEmail } from "@/lib/email/admin-registration-approval";
import { sendMail } from "@/lib/nodemailer-mail";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { editionId } = await req.json();

  if (!editionId) {
    return NextResponse.json({ error: "Edition ID is required" }, { status: 400 });
  }

  try {
    const edition = await prisma.edition.findUnique({
      where: { id: editionId },
      include: { institute: true },
    });

    if (!edition) {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    const alreadyRegistered = await prisma.registration.findUnique({
      where: {
        userId_editionId: {
          userId: user.id,
          editionId,
        },
      },
    });

    if (alreadyRegistered) {
      return NextResponse.json({ message: "You are already registered." }, { status: 200 });
    }

    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        editionId,
      },
    });

    const formatDate = (date?: Date | null) =>
      date ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(date)) : "TBD";

    const formattedStartDate = formatDate(edition.startDate);
    const formattedEndDate = formatDate(edition.endDate);

    // Email Content
    const applicantName = user.name || "Participant";
    const editionTitle = edition.title;
    const instituteName = edition.institute.name;

    const welcomeEmailHtml = await render(
      WelcomeToInstituteEmail({
        name: applicantName,
        editionTitle,
        instituteName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        dashboardLink: `https://www.costrad.org/dashboard`,
      })
    );

    const adminEmailHtml = await render(
      AdminApprovalRequestEmail({
        adminName: "Admin",
        applicantName,
        editionTitle,
        instituteName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    );

    // Send Emails
    try {
      await Promise.all([
        sendMail({
          to: user.email,
          subject: `Welcome to ${editionTitle}`,
          html: welcomeEmailHtml,
        }),
        sendMail({
          to: process.env.ADMIN_EMAIL || "notifycostrad@gmail.com",
          subject: `New registration for ${editionTitle}`,
          html: adminEmailHtml,
        }),
      ]);
    } catch (emailError) {
      console.error("📧 Failed to send email:", emailError);
      // You might still want to return success depending on your UX preference.
    }

    return NextResponse.json({ success: true, registration });
  } catch (err) {
    console.error("❌ Registration failed:", err);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
