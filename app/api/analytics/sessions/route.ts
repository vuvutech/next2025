// app/api/analytics/sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { analyticsDataClient } from "@/lib/googleAnalytics";

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  const propertyId = process.env.GA4_PROPERTY_ID!;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "sessions" }],
    });

    const count = Number(response.rows?.[0].metricValues?.[0].value ?? 0);
    return NextResponse.json({ sessions: count });
  } catch (err) {
    console.error("Failed to fetch sessions:", err);
    return NextResponse.json({ error: "Unable to get sessions" }, { status: 500 });
  }
}
