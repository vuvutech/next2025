import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/functions";
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

		return NextResponse.json({ success: true, paid: nowPaid });
	} catch (error) {
		console.error("[ERROR] Toggle paid failed:", error);
		return NextResponse.json(
			{ error: "Failed to toggle paid status" },
			{ status: 500 },
		);
	}
}