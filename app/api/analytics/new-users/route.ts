
// File: app/api/analytics/new-users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { subDays } from "date-fns";
import { prisma } from "@/prisma/dbConnect";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get("range") ?? "7d";

  const days = range === "30d" ? 30 : 7;
  const since = subDays(new Date(), days);

  try {
    const count = await prisma.user.count({
      where: { createdAt: { gte: since } },
    });
    return NextResponse.json({ newUsers: count });
  } catch (err) {
    console.error("Failed to fetch new users:", err);
    return NextResponse.json(
      { error: "Unable to get new users" },
      { status: 500 }
    );
  }
}
