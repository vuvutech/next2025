import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/functions";
import { InstituteAcceptanceEmail } from "@/lib/email/institute-acceptance-email";
import { IEAAcceptanceEmail } from "@/lib/email/iea-acceptance-email";
import { sendMail } from "@/lib/nodemailer-mail";
import { prisma } from "@/prisma/dbConnect";

export async function POST(req: NextRequest) {
	try {
		console.log("[toggle-paid] POST request received");

		const admin = await getCurrentUser();
		console.log("[toggle-paid] Admin check:", admin?.email || "none");

		if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPERADMIN")) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const { id } = await req.json();
		console.log("[toggle-paid] Registration ID:", id);

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
			console.log("[toggle-paid] Registration not found");
			return NextResponse.json(
				{ error: "Registration not found" },
				{ status: 404 },
			);
		}

		console.log("[toggle-paid] Found registration:", {
			userId: registration.userId,
			userEmail: registration.user?.email,
			currentPaid: registration.paid,
			editionTitle: registration.edition?.title,
			instituteAcronym: registration.edition?.institute?.acronym,
		});

		const nowPaid = !registration.paid;
		console.log("[toggle-paid] Toggling paid to:", nowPaid);

		await prisma.registration.update({
			where: { id },
			data: {
				paid: nowPaid,
				paidBy: nowPaid ? admin.name || admin.email : null,
				paidAt: nowPaid ? new Date() : null,
			},
		});
		console.log("[toggle-paid] DB updated successfully");

		let emailSent = false;

		if (nowPaid) {
			try {
				const isIEA =
					registration.edition?.institute?.acronym?.toLowerCase() === "iea";
				console.log("[toggle-paid] Is IEA edition:", isIEA);

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

				console.log("[toggle-paid] Preparing email for:", {
					userName,
					userEmail,
					formattedStartDate,
					formattedEndDate,
				});

				if (!userEmail) {
					console.warn(
						"[toggle-paid] No email for user, skipping paid notification",
					);
				} else {
					let htmlContent: string;
					let subject: string;

					if (isIEA) {
						console.log("[toggle-paid] Rendering IEAAcceptanceEmail");
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
						console.log("[toggle-paid] Rendering InstituteAcceptanceEmail");
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

					console.log("[toggle-paid] Email template rendered, sending...");
					await sendMail({
						to: userEmail,
						cc: "correspondence@costrad.org",
						subject,
						html: htmlContent,
					});

					emailSent = true;
					console.log("[toggle-paid] Email sent successfully");
				}
			} catch (emailError) {
				console.error(
					"[toggle-paid] FAILED to send paid acceptance email:",
					emailError,
				);
			}
		} else {
			console.log("[toggle-paid] Marking as unpaid - no email sent");
		}

		console.log("[toggle-paid] Returning response:", {
			success: true,
			paid: nowPaid,
			emailSent,
		});
		return NextResponse.json({ success: true, paid: nowPaid, emailSent });
	} catch (error) {
		console.error("[toggle-paid] UNEXPECTED ERROR:", error);
		return NextResponse.json(
			{ error: "Failed to toggle paid status" },
			{ status: 500 },
		);
	}
}