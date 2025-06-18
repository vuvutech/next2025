// app/actions/userfunctions.ts
"use server";

import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions"; // adjust path if needed

export async function userTestimonials() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized: No user logged in.");
  }

  const testimonials = await prisma.testimonial.findMany({
    where: {
      userId: user.id, // ✅ Filter by current user
    },
    include: {
      user: true, // optional — only if you need user data in the response
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return testimonials;
}
