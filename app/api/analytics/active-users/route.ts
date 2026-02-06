// app/api/analytics/active-users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data"; // ← make sure you're importing the real client

export const dynamic = 'force-dynamic'; // ← add this

export async function GET(_req: NextRequest) {
  const propertyId = process.env.GA4_PROPERTY_ID;

  if (!propertyId) {
    console.error("Missing GA4_PROPERTY_ID env var");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const analyticsDataClient = new BetaAnalyticsDataClient(); // or your existing factory

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
    });

    const rawValue = response?.rows?.[0]?.metricValues?.[0]?.value;
    const count = rawValue ? Number(rawValue) : 0;

    return NextResponse.json({ activeUsers: count });
  } catch (err: any) {
    // Log structured data instead of raw err (avoids multiline surprises)
    console.error("GA4 active users error:", {
      message: err.message,
      stack: err.stack?.split("\n")[0], // first line only
      code: err.code,
    });
    return NextResponse.json(
      { error: "Unable to fetch active users" },
      { status: 500 }
    );
  }
}