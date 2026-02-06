// app/api/analytics/top-pages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { analyticsDataClient } from "@/lib/googleAnalytics";

export const dynamic = 'force-dynamic';
const RANGE_MAP: Record<string, string> = {
  "7d": "7daysAgo",
  "30d": "30daysAgo",
  "90d": "90daysAgo",
};

export async function GET(req: NextRequest) {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  // ?range=7d | 30d | 90d  → default to 7d
  const range = req.nextUrl.searchParams.get("range") ?? "7d";
  const startDate = RANGE_MAP[range] ?? "7daysAgo";

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    });

    const topPages =
      response.rows?.map((row) => ({
        path: row.dimensionValues?.[0].value ?? "/",
        views: Number(row.metricValues?.[0].value ?? 0),
      })) ?? [];

    return NextResponse.json({ topPages });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GA data" },
      { status: 500 },
    );
  }
}
