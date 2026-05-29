// app/api/testimonials/route.ts

import { revalidatePath } from "next/cache";
// File: app/api/testimonials/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/functions";
import { baseUrl } from "@/lib/metadata";
import {
	containsMaliciousPatterns,
	sanitizeHtml,
	validateContentLength,
} from "@/lib/security";
import { prisma } from "@/prisma/dbConnect";

// GET all testimonials (admin only)
export async function GET(_req: NextRequest) {
	const user = await getCurrentUser();
	if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const testimonials = await prisma.testimonial.findMany({
		include: { user: true },
		orderBy: { createdAt: "desc" },
	});

	return NextResponse.json(testimonials);
}

// POST new testimonial (authenticated user only)
export async function POST(req: NextRequest) {
	const user = await getCurrentUser();

	// If user is not authenticated, return 401 Unauthorized
	if (!user) {
		return NextResponse.json(
			{ error: "login/signup required to submit a testimonial....." },
			{ status: 401 },
		);
	}

	const { content, userFeaturePermission } = await req.json();

	// Input validation
	if (!content || typeof content !== "string" || content.trim() === "") {
		return NextResponse.json(
			{ error: "Content is required and must be a non-empty string" },
			{ status: 400 },
		);
	}

	const sanitizedContent = sanitizeHtml(content.trim());
	if (!validateContentLength(sanitizedContent, 5000)) {
		return NextResponse.json(
			{ error: "Content is too long (maximum 5000 characters)" },
			{ status: 400 },
		);
	}

	if (containsMaliciousPatterns(sanitizedContent)) {
		return NextResponse.json(
			{ error: "Content contains invalid characters or patterns" },
			{ status: 400 },
		);
	}

	try {
		const testimonial = await prisma.testimonial.create({
			data: {
				userId: user.id,
				content: sanitizedContent,
				userFeaturePermission: userFeaturePermission,
			},
		});
		return NextResponse.json(testimonial, { status: 201 }); // 201 Created for successful resource creation
	} catch (error) {
		console.error("Error creating testimonial:", error);
		return NextResponse.json(
			{ error: "Failed to save testimonial due to a server error." },
			{ status: 500 },
		);
	}
}

// PUT update testimonial (admin only)
export async function PUT(req: NextRequest) {
	const user = await getCurrentUser();

	if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { id, approved, featured } = await req.json();
	if (!id)
		return NextResponse.json(
			{ error: "Missing testimonial id" },
			{ status: 400 },
		);

	// Fetch the testimonial to check its userId
	const testimonialToUpdate = await prisma.testimonial.findUnique({
		where: { id },
	});

	if (!testimonialToUpdate) {
		return NextResponse.json(
			{ error: "Testimonial not found" },
			{ status: 404 },
		);
	}

	if (
		user.role === "ADMIN" ||
		user.role === "SUPERADMIN" ||
		testimonialToUpdate.userId === user.id
	) {
		const updated = await prisma.testimonial.update({
			where: { id },
			data: {
				approved: approved ?? undefined,
				featured: featured ?? undefined,
			},
		});
		revalidatePath(`${baseUrl}/admin/testimonials`);

		return NextResponse.json(updated);
	}
}

export async function DELETE(req: NextRequest) {
	const user = await getCurrentUser();

	// Extract the testimonial ID from the request body
	const { id } = await req.json();

	if (!id) {
		return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
	}

	// Fetch the testimonial to check its userId
	const testimonialToDelete = await prisma.testimonial.findUnique({
		where: { id },
	});

	// If testimonial not found
	if (!testimonialToDelete) {
		return NextResponse.json(
			{ error: "Testimonial not found" },
			{ status: 404 },
		);
	}

	// Check if user is logged in
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// Allow deletion if user is an admin OR if the user is the owner of the testimonial
	if (
		user.role === "ADMIN" ||
		user.role === "SUPERADMIN" ||
		testimonialToDelete.userId === user.id
	) {
		await prisma.testimonial.delete({ where: { id } });
		revalidatePath(`${baseUrl}/admin/testimonials`);

		return NextResponse.json({ success: true });
	} else {
		// If not an admin and not the owner
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}
}
