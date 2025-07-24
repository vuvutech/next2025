// File: app/api/analytics/total-users/route.ts
import { prisma } from "@/prisma/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ totalUsers: count });
  } catch (err) {
    console.error("Failed to fetch total users:", err);
    return NextResponse.json(
      { error: "Unable to get total users" },
      { status: 500 }
    );
  }
}
