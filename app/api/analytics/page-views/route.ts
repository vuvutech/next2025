// app/api/analytics/page-views/route.ts
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
  const range = req.nextUrl.searchParams.get("range") ?? "7d";
  const startDate = RANGE_MAP[range] ?? "7daysAgo";
  const pagePath = req.nextUrl.searchParams.get("path");

  if (!pagePath) {
    return NextResponse.json({ error: "Missing page path" }, { status: 400 });
  }

  try {
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
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Failed to fetch time series" }, { status: 500 });
  }
}
