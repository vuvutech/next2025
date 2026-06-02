import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function POST(req: NextRequest) {
	try {
		const { id } = await req.json();

		await prisma.registration.update({
			where: { id },
			data: { approved: false },
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