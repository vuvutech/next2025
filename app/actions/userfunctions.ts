// app/actions/userfunctions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/app/actions/functions";
import { prisma } from "@/prisma/dbConnect";

const updateNameSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(100),
});

export async function updateUserName(data: { name: string }) {
	const parsed = updateNameSchema.safeParse(data);
	if (!parsed.success) {
		return { error: parsed.error.issues[0].message };
	}

	const user = await getCurrentUser();
	if (!user) {
		return { error: "Unauthorized" };
	}

	try {
		await prisma.user.update({
			where: { id: user.id },
			data: { name: parsed.data.name, updatedAt: new Date() },
		});
		revalidatePath("/profile");
		return { success: true };
	} catch {
		return { error: "Failed to update name" };
	}
}

export async function userTestimonials() {
	const user = await getCurrentUser();

	if (!user) {
		throw new Error("Unauthorized: No user logged in.");
	}

	const testimonials = await prisma.testimonial.findMany({
		where: {
			userId: user.id,
		},
		include: {
			user: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return testimonials;
}
