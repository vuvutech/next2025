import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";
import { render } from "@react-email/render";
import { WelcomeToInstituteEmail } from "@/lib/email/welcome-to-institute";
import { sendMail } from "@/lib/nodemailer-mail";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { editionId } = await req.json();

  if (!editionId) {
    return NextResponse.json(
      { error: "Edition ID is required" },
      { status: 400 }
    );
  }

  try {
    const edition = await prisma.edition.findUnique({
      where: { id: editionId },
      include: { institute: true },
    });

    if (!edition) {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    const existing = await prisma.registration.findUnique({
      where: {
        userId_editionId: {
          userId: user.id,
          editionId: editionId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "You are already registered." },
        { status: 200 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        editionId: editionId,
      },
    });

    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedStartDate = edition.startDate
      ? formatter.format(new Date(edition.startDate))
      : "TBD";

    const formattedEndDate = edition.endDate
      ? formatter.format(new Date(edition.endDate))
      : "TBD";

    // 🎉 Send confirmation email
    const html = await render(
      WelcomeToInstituteEmail({
        name: user.name,
        editionTitle: edition.title,
        instituteName: edition.institute.name,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        dashboardLink: `https://www.costrad.org/dashboard`,
      })
    );

    await sendMail({
      to: user.email,
      cc: "correspondence@costrad.org",
      subject: `Welcome to ${edition.title}`,
      html,
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
