// lib/googleAnalytics.ts
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const getCredentials = () => {
  const raw = process.env.GA_CREDENTIALS_JSON;
  if (!raw) return undefined;

  try {
    // 1. Strip potential leading/trailing quotes
    // 2. Replace escaped or literal newlines with actual newline characters for the private key
    const clean = raw.trim().replace(/^['"]|['"]$/g, '').replace(/\\n/g, '\n');
    return JSON.parse(clean);
  } catch (err) {
    // If double-escaping occurred, try to fix common JSON control character issues
    try {
        const fixed = raw.trim().replace(/^['"]|['"]$/g, '').replace(/\n/g, '\\n');
        return JSON.parse(fixed);
    } catch (secondErr) {
        console.error("Failed to parse GA_CREDENTIALS_JSON:", err);
        return undefined;
    }
  }
};

export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: getCredentials(),
});
