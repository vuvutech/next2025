// File: components/analytics/ActiveUsersCard.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "../ui/badge";

export function ActiveUsersCard() {
  const [activeUsers, setActiveUsers] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/analytics/active-users");
      const json = await res.json();
      setActiveUsers(json.activeUsers ?? null);
      setLoading(false);
    })();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-4xl font-semibold">
        {loading ? (
          <span className="text-muted-foreground text-base">Loading…</span>
        ) : activeUsers !== null ? (
          activeUsers.toLocaleString()
        ) : (
          <span className="text-destructive">Error</span>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Active community
          <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground text-xs">
          Current active sessions
        </div>
      </CardFooter>
    </Card>
  );
}
