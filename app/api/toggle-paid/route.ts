import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/functions";
import { InstituteAcceptanceEmail } from "@/lib/email/institute-acceptance-email";
import { IEAAcceptanceEmail } from "@/lib/email/iea-acceptance-email";
import { sendMail } from "@/lib/nodemailer-mail";
import { prisma } from "@/prisma/dbConnect";

export async function POST(req: NextRequest) {
	try {
		const admin = await getCurrentUser();
		if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPERADMIN")) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const { id } = await req.json();

		const registration = await prisma.registration.findUnique({
			where: { id },
			include: {
				user: true,
				edition: {
					include: { institute: true },
				},
			},
		});

		if (!registration) {
			return NextResponse.json(
				{ error: "Registration not found" },
				{ status: 404 },
			);
		}

		const nowPaid = !registration.paid;

		await prisma.registration.update({
			where: { id },
			data: {
				paid: nowPaid,
				paidBy: nowPaid ? admin.name || admin.email : null,
				paidAt: nowPaid ? new Date() : null,
			},
		});

		let emailSent = false;

		if (nowPaid) {
			try {
				const isIEA =
					registration.edition?.institute?.acronym?.toLowerCase() === "iea";

				const formatter = new Intl.DateTimeFormat("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});

				const formattedStartDate = registration.edition?.startDate
					? formatter.format(new Date(registration.edition.startDate))
					: "TBD";

				const formattedEndDate = registration.edition?.endDate
					? formatter.format(new Date(registration.edition.endDate))
					: "TBD";

				const userEmail = registration.user?.email;
				const userName = registration.user?.name || "Participant";

				if (!userEmail) {
					console.warn(
						"[WARN] No email for user, skipping paid notification",
					);
				} else {
					let htmlContent: string;
					let subject: string;

					if (isIEA) {
						htmlContent = await render(
							IEAAcceptanceEmail({
								name: userName,
								startDate: formattedStartDate,
								endDate: formattedEndDate,
								theme: registration.edition?.theme ?? undefined,
							}),
						);
						subject = `Your Acceptance & Zoom Access Pass: IEA ${new Date().getFullYear()}`;
					} else {
						const instituteName =
							registration.edition?.institute?.name || "Institute";
						const instituteShortName =
							registration.edition?.institute?.acronym || "Institute";
						htmlContent = await render(
							InstituteAcceptanceEmail({
								name: userName,
								instituteName,
								instituteShortName,
								startDate: formattedStartDate,
								endDate: formattedEndDate,
								theme: registration.edition?.theme ?? undefined,
								zoomLink: "https://us02web.zoom.us/j/81431256100?pwd=pWt3MpkvaiQF1cpPHKI4Ja0R8YsdUS.1",
								zoomMeetingId: "814 3125 6100",
								zoomPasscode: "IEA</>26",
								instituteEmail: `${instituteShortName.toLowerCase()}office@costrad.org`,
							}),
						);
						subject = `Your Acceptance & Zoom Access Pass: ${instituteName} ${new Date().getFullYear()}`;
					}

					await sendMail({
						to: userEmail,
						cc: "correspondence@costrad.org",
						subject,
						html: htmlContent,
					});

					emailSent = true;
				}
			} catch (emailError) {
				console.error(
					"[ERROR] Failed to send paid acceptance email:",
					emailError,
				);
			}
		}

		return NextResponse.json({ success: true, paid: nowPaid, emailSent });
	} catch (error) {
		console.error("[ERROR] Toggle paid failed:", error);
		return NextResponse.json(
			{ error: "Failed to toggle paid status" },
			{ status: 500 },
		);
	}
}