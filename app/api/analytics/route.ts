import { NextRequest, NextResponse } from "next/server";
import { analyticsDataClient } from "@/lib/googleAnalytics";

export async function GET(_req: NextRequest) {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    });

    const topPages = response.rows?.map(row => ({
      path: row.dimensionValues?.[0].value,
      views: row.metricValues?.[0].value,
    })) || [];

    return NextResponse.json({ topPages });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Failed to fetch GA data" }, { status: 500 });
  }
}
