// lib/googleAnalytics.ts
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const getCredentials = () => {
  const raw = process.env.GA_CREDENTIALS_JSON;
  if (!raw) return undefined;

  try {
    // Strip leading/trailing single or double quotes if present
    const clean = raw.trim().replace(/^['"]|['"]$/g, '');
    return JSON.parse(clean);
  } catch (err) {
    console.error("Failed to parse GA_CREDENTIALS_JSON:", err);
    return undefined;
  }
};

export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: getCredentials(),
});
