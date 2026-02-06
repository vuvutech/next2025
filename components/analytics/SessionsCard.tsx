// File: components/analytics/SessionsCard.tsx
"use client";

import * as React from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";

export function SessionsCard() {
  const [sessions, setSessions] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/analytics?type=sessions");
      const json = await res.json();
      setSessions(json.sessions ?? null);
      setLoading(false);
    })();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="text-4xl font-semibold">
        {loading ? (
          <span className="text-muted-foreground text-base">Loading…</span>
        ) : sessions !== null ? (
          sessions.toLocaleString()
        ) : (
          <span className="text-destructive">Error</span>
        )}
      </CardContent>
    </Card>
  );
}
