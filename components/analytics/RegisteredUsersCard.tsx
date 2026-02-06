"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

export function RegisteredUsersCard() {
  const [count, setCount] = React.useState<number | null>(null);
  const [percentage, setPercentage] = React.useState<number | null>(null);
  const [totalUsers, setTotalUsers] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/analytics?type=registered-users");
        const json = await res.json();
        setCount(json.registeredUsers ?? null);
        setTotalUsers(json.totalUsers ?? null);
        setPercentage(json.registrationRate ?? null);
      } catch (err) {
        console.error("Failed to fetch registered users:", err);
        setCount(null);
        setPercentage(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getTrendIcon = () => {
    if (percentage === null) return null;
    return percentage >= 50 ? (
      <IconTrendingUp className="ml-1 size-4 text-green-500" />
    ) : (
      <IconTrendingDown className="ml-1 size-4 text-red-500" />
    );
  };

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold text-foreground">
          Total Conversions
        </CardDescription>
        <CardDescription>Total users registered</CardDescription>

        {/* <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
         
        </CardTitle> */}

        <CardAction>
          <Badge
            className={
              percentage !== null
                ? percentage >= 50
                  ? "text-green-500 "
                  : "text-red-500 "
                : ""
            }
            variant="outline"
          >
            {percentage !== null ? `${percentage.toFixed(1)}%` : "…"}
            {getTrendIcon()}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
        {loading ? (
          <span className="text-muted-foreground text-base">Loading…</span>
        ) : count !== null ? (
          count.toLocaleString()
        ) : (
          <span className="text-destructive">Error</span>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {percentage !== null && totalUsers !== null ? (
            <>
              {percentage >= 50 ? "Strong" : "Moderate"} conversion rate
              {getTrendIcon()}
            </>
          ) : (
            <span className="text-muted-foreground">Gathering insights…</span>
          )}
        </div>
        <div className="text-muted-foreground text-xs">
          Based on {totalUsers?.toLocaleString() ?? "…"} total users
        </div>
      </CardFooter>
    </Card>
  );
}
