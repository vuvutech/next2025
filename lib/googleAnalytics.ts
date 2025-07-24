// lib/googleAnalytics.ts
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.GA_CREDENTIALS_JSON!),
});
