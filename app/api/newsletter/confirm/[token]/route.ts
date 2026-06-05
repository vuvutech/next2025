import { render } from "@react-email/components";
import { type NextRequest, NextResponse } from "next/server";
import { generateUnsubscribeToken } from "@/app/actions/functions";
import { NewsletterAppreciationEmail } from "@/lib/email/newsletter-confirmation-appreciation";
import { baseUrl } from "@/lib/metadata";
import { sendMail } from "@/lib/nodemailer-mail";
import { prisma } from "@/prisma/dbConnect";

export async function GET(
	_req: NextRequest,
	context: { params: Promise<{ token: string }> },
) {
	const token = (await context.params).token;
	console.log("Confirmation token:", token);

	if (!token) {
		return NextResponse.redirect(`${baseUrl}/confirmation-error`);
	}

	const subscriber = await prisma.newsletterSubscriber.findFirst({
		where: { confirmationToken: token },
	});

	console.log("Subscriber found:", subscriber);

	if (!subscriber) {
		return NextResponse.redirect(`${baseUrl}/confirmation-error`);
	}

	const unsubscribeToken = await generateUnsubscribeToken();

	const completeSubscription = await prisma.newsletterSubscriber.update({
		where: { email: subscriber.email },
		data: {
			verified: true,
			confirmationToken: null,
			unsubscribeToken: unsubscribeToken,
		},
	});

	if (completeSubscription) {
		// Email confirmation
		const html = await render(
			NewsletterAppreciationEmail({
				name: subscriber?.name ?? undefined,
				unsubscribeToken: unsubscribeToken,
			}),
		);

		await sendMail({
			to: subscriber.email,
			subject: "You're now subscribed to COSTrAD!",
			html,
		});
	}

	return NextResponse.redirect(`${baseUrl}/confirmed-successfully`);
}
