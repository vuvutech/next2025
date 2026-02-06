// app/api/analytics/edition-popularity/route.ts
import { prisma } from "@/prisma/dbConnect";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      select: { editionId: true },
    });

    // Tally counts per editionId
    const countMap = registrations.reduce((acc, reg) => {
      const id = reg.editionId;
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Sort and pick top 3
    const topEditions = Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const editionIds = topEditions.map(([id]) => id);

    const editions = await prisma.edition.findMany({
      where: { id: { in: editionIds } },
    });

    const editionMap = Object.fromEntries(editions.map(e => [e.id, e.title]));

    const top = topEditions.map(([editionId, count]) => ({
      title: editionMap[editionId] ?? `Edition ${editionId}`,
      count,
    }));

    return NextResponse.json({ editions: top });
  } catch (err) {
    console.error("Failed to fetch edition popularity:", err);
    return NextResponse.json({ error: "Unable to get edition data" }, { status: 500 });
  }
}
