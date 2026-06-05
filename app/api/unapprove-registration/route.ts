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

		await prisma.registration.update({
			where: { id },
			data: { approved: false, approvedBy: null, approvedAt: null },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[ERROR] Unapprove failed:", error);
		return NextResponse.json(
			{ error: "Failed to unapprove registration" },
			{ status: 500 },
		);
	}
}
