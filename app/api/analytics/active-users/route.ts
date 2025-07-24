// File: app/api/analytics/active-users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { analyticsDataClient } from "@/lib/googleAnalytics";

export async function GET(_req: NextRequest) {
  const propertyId = process.env.GA4_PROPERTY_ID!;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
    });

    const count = Number(response.rows?.[0].metricValues?.[0].value ?? 0);
    return NextResponse.json({ activeUsers: count });
  } catch (err) {
    console.error("Failed to fetch active users:", err);
    return NextResponse.json({ error: "Unable to get active users" }, { status: 500 });
  }
}
