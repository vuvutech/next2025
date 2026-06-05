// app/api/user/testimonials/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { userTestimonials } from "@/app/actions/userfunctions";

export async function GET(_req: NextRequest) {
	try {
		const testimonials = await userTestimonials();
		return NextResponse.json(testimonials);
	} catch (err: unknown) {
		const e = err instanceof Error ? err : new Error(String(err));
		return NextResponse.json(
			{ error: e.message || "Failed to fetch testimonials" },
			{ status: e.message === "Unauthorized" ? 401 : 500 },
		);
	}
}
