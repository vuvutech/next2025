import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/functions";
import { prisma } from "@/prisma/dbConnect";

export async function GET(req: NextRequest) {
	const currentUser = await getCurrentUser();

	// ✅ Get ID from the query string
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	console.log("Getting user with ID:", id);

	// If no ID provided, return current user data
	if (!id && currentUser) {
		try {
			const user = await prisma.user.findUnique({
				where: { id: currentUser.id },
				select: {
					id: true,
					name: true,
					email: true,
					emailVerified: true,
					image: true,
					twoFactorEnabled: true,
					role: true,
					banned: true,
					banReason: true,
					banExpires: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			if (!user) {
				return NextResponse.json({ error: "User not found" }, { status: 404 });
			}

			return NextResponse.json(user);
		} catch (error: any) {
			console.error("Failed to fetch current user:", error);
			return NextResponse.json(
				{ error: "Failed to fetch user" },
				{ status: 500 },
			);
		}
	}

	if (!id) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	if (
		!currentUser ||
		(currentUser.role !== "ADMIN" && currentUser.role !== "SUPERADMIN")
	) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				newsletterSubscribers: true,
				testimonials: true,
				registration: true,
				profile: true,
			},
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (error: any) {
		console.error("Failed to fetch user:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user" },
			{ status: 500 },
		);
	}
}
