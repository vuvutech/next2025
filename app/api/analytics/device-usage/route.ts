// app/api/analytics/devices/route.ts
import { NextResponse } from "next/server";
import { analyticsDataClient } from "@/lib/googleAnalytics";

export const dynamic = 'force-dynamic';

export async function GET() {
  const propertyId = process.env.GA4_PROPERTY_ID!;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }, { name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
    });

    const dailyStats: Record<
      string,
      { desktop: number; mobile: number; tablet: number }
    > = {};

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
        mobile: counts.mobile + counts.tablet, // group tablets with mobile
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({ data: chartData });
  } catch (err) {
    console.error("Failed to fetch device data:", err);
    return NextResponse.json(
      { error: "Unable to fetch device analytics" },
      { status: 500 }
    );
  }
}

function formatGA4Date(dateStr: string): string {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}
