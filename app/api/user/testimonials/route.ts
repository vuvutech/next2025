// app/api/user/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { userTestimonials } from "@/app/actions/userfunctions";

export async function GET(req: NextRequest) {
  try {
    const testimonials = await userTestimonials();
    return NextResponse.json(testimonials);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch testimonials" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
