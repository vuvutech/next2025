// File: app/api/analytics/registeredUsers/route.ts

import { prisma } from "@/prisma/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();

    const usersWithRegistrations = await prisma.user.count({
      where: {
        registration: {
          some: {}, // filters users with at least one registration
        },
      },
    });

    const percentage = totalUsers > 0
      ? (usersWithRegistrations / totalUsers) * 100
      : 0;

    return NextResponse.json({
      totalUsers,
      registeredUsers: usersWithRegistrations,
      registrationRate: Number(percentage.toFixed(2)), // 2 decimal places
    });
  } catch (error) {
    console.error("Error in /api/analytics/registeredUsers:", error);
    return NextResponse.json(
      { error: "Failed to fetch registered users" },
      { status: 500 }
    );
  }
}
