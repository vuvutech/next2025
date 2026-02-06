// app\api\analytics\route.ts
import { NextRequest, NextResponse } from "next/server";
import { analyticsDataClient } from "@/lib/googleAnalytics";
import { prisma } from "@/prisma/dbConnect";
import { subDays } from "date-fns";

export const dynamic = 'force-dynamic';

const RANGE_MAP: Record<string, string> = {
  "7d": "7daysAgo",
  "30d": "30daysAgo",
  "90d": "90daysAgo",
};

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") || "top-pages";
  const range = req.nextUrl.searchParams.get("range") ?? "7d";
  const propertyId = process.env.GA4_PROPERTY_ID!;

  try {
    switch (type) {
      case "active-users": {
        const [response] = await analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          metrics: [{ name: "activeUsers" }],
        });
        const count = Number(response.rows?.[0].metricValues?.[0].value ?? 0);
        return NextResponse.json({ activeUsers: count, count }); // include both for compatibility
      }

      case "device-usage": {
        const [response] = await analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "date" }, { name: "deviceCategory" }],
          metrics: [{ name: "activeUsers" }],
        });

        const dailyStats: Record<string, { desktop: number; mobile: number; tablet: number }> = {};
        for (const row of response.rows || []) {
          const date = row.dimensionValues?.[0].value ?? "unknown";
          const device = row.dimensionValues?.[1].value ?? "unknown";
          const count = Number(row.metricValues?.[0].value ?? 0);

          if (!dailyStats[date]) {
            dailyStats[date] = { desktop: 0, mobile: 0, tablet: 0 };
          }
          if (device === "desktop" || device === "mobile" || device === "tablet") {
            dailyStats[date][device] += count;
          }
        }

        const chartData = Object.entries(dailyStats)
          .map(([date, counts]) => ({
            date: formatGA4Date(date),
            desktop: counts.desktop,
            mobile: counts.mobile + counts.tablet,
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({ data: chartData });
      }

      case "registered-users": {
        const totalUsers = await prisma.user.count();
        const usersWithRegistrations = await prisma.user.count({
          where: { registration: { some: {} } },
        });
        const percentage = totalUsers > 0 ? (usersWithRegistrations / totalUsers) * 100 : 0;
        return NextResponse.json({
          totalUsers,
          registeredUsers: usersWithRegistrations,
          registrationRate: Number(percentage.toFixed(2)),
          count: usersWithRegistrations,
        });
      }

      case "total-users": {
        const count = await prisma.user.count();
        return NextResponse.json({ totalUsers: count, count });
      }

      case "edition-popularity": {
        const registrations = await prisma.registration.findMany({
          select: { editionId: true },
        });
        const countMap = registrations.reduce((acc, reg) => {
          const id = reg.editionId;
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topEditions = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);

        const editions = await prisma.edition.findMany({
          where: { id: { in: topEditions.map(([id]) => id) } },
        });

        const editionMap = Object.fromEntries(editions.map((e) => [e.id, e.title]));
        const top = topEditions.map(([editionId, count]) => ({
          edition: editionMap[editionId] ?? `Edition ${editionId}`,
          count,
        }));
        return NextResponse.json({ editions: top, popularity: top });
      }

      case "most-popular-edition": {
        const grouped = await prisma.registration.groupBy({
          by: ["editionId"],
          _count: { editionId: true },
          orderBy: { _count: { editionId: "desc" } },
          take: 1,
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
      }

      case "new-users": {
        const days = range === "30d" ? 30 : 7;
        const since = subDays(new Date(), days);
        const count = await prisma.user.count({
          where: { createdAt: { gte: since } },
        });
        return NextResponse.json({ newUsers: count, count });
      }

      case "page-views": {
        const startDate = RANGE_MAP[range] ?? "7daysAgo";
        const pagePath = req.nextUrl.searchParams.get("path");
        if (!pagePath) {
          return NextResponse.json({ error: "Missing page path" }, { status: 400 });
        }

        const [response] = await analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate: "today" }],
          dimensions: [{ name: "date" }],
          metrics: [{ name: "screenPageViews" }],
          dimensionFilter: {
            filter: {
              fieldName: "pagePath",
              stringFilter: { value: pagePath, matchType: "EXACT" },
            },
          },
          orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
        });

        const viewsByDate = response.rows?.map((row) => ({
          date: row.dimensionValues?.[0].value,
          views: Number(row.metricValues?.[0].value ?? 0),
        })) ?? [];

        return NextResponse.json({ viewsByDate });
      }

      case "sessions": {
        const [response] = await analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          metrics: [{ name: "sessions" }],
        });
        const count = Number(response.rows?.[0].metricValues?.[0].value ?? 0);
        return NextResponse.json({ sessions: count, count });
      }

      case "top-pages":
      default: {
        const startDate = RANGE_MAP[range] ?? "7daysAgo";
        const [response] = await analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate: "today" }],
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 10,
        });

        const topPages = response.rows?.map((row) => ({
          path: row.dimensionValues?.[0].value ?? "/",
          views: Number(row.metricValues?.[0].value ?? 0),
        })) || [];

        return NextResponse.json({ topPages });
      }
    }
  } catch (err) {
    console.error(`Analytics error for ${type}:`, err);
    return NextResponse.json({ error: `Failed to fetch ${type} data` }, { status: 500 });
  }
}

function formatGA4Date(dateStr: string): string {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}
