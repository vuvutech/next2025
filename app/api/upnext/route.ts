// app/api/upnext/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function GET(req: NextRequest) {
  const now = new Date();

  const nextEdition = await prisma.edition.findFirst({
    where: {
      startDate: { gt: now },
    },
    orderBy: { startDate: "asc" },
    select: {
      title: true,
      slug: true,
      startDate: true,
      endDate: true,
    },
  });

  return NextResponse.json(nextEdition || null);
}
