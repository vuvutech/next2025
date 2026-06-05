// File: app/api/approve-and-email-payment-details/route.ts

import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/functions";
import { IEARegistrationEmail } from "@/lib/email/iea-welcome-email";
import { INSTITUTEWelcomeEmail } from "@/lib/email/institute-welcome-email";
import { sendMail } from "@/lib/nodemailer-mail";
import { prisma } from "@/prisma/dbConnect";

export async function POST(req: NextRequest) {
	try {
		const admin = await getCurrentUser();
		if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPERADMIN")) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

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

		// ✅ Fetch the registration and its institute information to check if it's IEA
		const registration = await prisma.registration.findUnique({
			where: { id },
			include: {
				edition: {
					include: {
						institute: true,
					},
				},
			},
		});

		const isIEA =
			registration?.edition?.institute?.acronym?.toLowerCase() === "iea";

		let htmlContent = "";
		if (isIEA) {
			htmlContent = await render(
				IEARegistrationEmail({
					name,
					startDate: formattedStartDate,
					endDate: formattedEndDate,
					price,
					priceViaZoom,
					theme: registration?.edition?.theme ?? undefined,
				}),
			);
		} else {
			htmlContent = await render(
				INSTITUTEWelcomeEmail({
					name,
					startDate: formattedStartDate,
					endDate: formattedEndDate,
					price,
					priceViaZoom,
					theme: registration?.edition?.theme ?? undefined,
				}),
			);
		}

		const instituteName = registration?.edition?.institute?.name ?? "Institute";
		const subject = isIEA
			? `Welcome to the ${new Date().getFullYear()} Institute of Economic Affairs (IEA) - Payment Details`
			: `Welcome to the ${new Date().getFullYear()} ${instituteName} - Payment Details`;

		// Send email with payment info
		await sendMail({
			to: email,
			subject,
			html: htmlContent,
		});

		// ✅ Update registration as approved with audit trail
		await prisma.registration.update({
			where: { id },
			data: {
				approved: true,
				approvedBy: admin.name || admin.email,
				approvedAt: new Date(),
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Email sending or approval failed:", error);
		return NextResponse.json(
			{ error: "Failed to send email or approve registration" },
			{ status: 500 },
		);
	}
}
