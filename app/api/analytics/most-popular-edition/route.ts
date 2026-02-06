// app/api/analytics/most-popular-edition/route.ts
import { prisma } from "@/prisma/dbConnect";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Group registrations by editionId and count them
    const grouped = await prisma.registration.groupBy({
      by: ["editionId"],
      _count: { editionId: true },
      orderBy: { _count: { editionId: "desc" } },
      take: 1, // get only the most popular
    });

    if (!grouped.length) {
      return NextResponse.json({ edition: null, count: 0 });
    }

    const { editionId, _count } = grouped[0];

    const edition = await prisma.edition.findUnique({
      where: { id: editionId },
      select: { id: true, title: true, slug: true },
    });

    return NextResponse.json({
      edition: {
        id: edition?.id ?? editionId,
        title: edition?.title ?? `Edition ${editionId}`,
        slug: edition?.slug,
        count: _count.editionId,
      },
    });
  } catch (err) {
    console.error("Failed to fetch most popular edition:", err);
    return NextResponse.json(
      { error: "Unable to get most popular edition" },
      { status: 500 }
    );
  }
}
