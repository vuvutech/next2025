// File: components/analytics/DashboardMetricsCards.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconAward, IconTrendingUp, IconUsers } from "@tabler/icons-react";

// Utility fetcher
const useMetric = (endpoint: string) => {
  const [value, setValue] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        setValue(json.count ?? null);
      } catch (err) {
        console.error("Failed to fetch metric:", err);
        setValue(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint]);

  return { value, loading };
};

export function TotalUsersCard() {
  const { value, loading } = useMetric("/api/analytics/total-users");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Total Users</CardTitle>
        <CardDescription>All registered accounts</CardDescription>
        <CardContent className="text-4xl font-bold">
          {loading ? (
            <span className="text-muted-foreground">Loading…</span>
          ) : (
            (value?.toLocaleString() ?? "Error")
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export function NewUsersCard() {
  const { value: weekly, loading: loadingWeek } = useMetric(
    "/api/analytics/new-users?range=7d"
  );
  const { value: monthly, loading: loadingMonth } = useMetric(
    "/api/analytics/new-users?range=30d"
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Users</CardTitle>
        <CardDescription>This Week / Month</CardDescription>
        <CardContent className="text-3xl font-bold">
          {loadingWeek || loadingMonth ? (
            <span className="text-muted-foreground">Loading…</span>
          ) : (
            `${weekly} / ${monthly}`
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export function EditionPopularityCard() {
  const [data, setData] = React.useState<{ edition: string; count: number }[]>(
    []
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/analytics/edition-popularity");
        const json = await res.json();
        setData(json.popularity ?? []);
      } catch (err) {
        console.error("Failed to fetch edition popularity:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edition Popularity</CardTitle>
        <CardDescription>Top 3 most registered editions</CardDescription>
        <CardContent>
          {loading ? (
            <span className="text-muted-foreground">Loading…</span>
          ) : (
            <ul className="space-y-1">
              {data.map(({ edition, count }) => (
                <li key={edition} className="flex justify-between">
                  <span>{edition}</span>
                  <Badge variant="outline">{count}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

type EditionStats = {
  edition: {
    title?: string;
    id: string;
    name: string;
    count: number;
  } | null;
};

export function MostPopularEditionCard() {
  const [data, setData] = React.useState<EditionStats["edition"] | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/analytics/most-popular-edition");
        const json = await res.json();
        setData(json.edition ?? null);
      } catch (err) {
        console.error("Failed to fetch most popular edition:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold text-foreground">
          Most Popular Edition
        </CardDescription>
        {data && (
          <Badge variant="outline" className="text-green-600">
            <IconAward className="mr-1 size-4" />
            {data.count.toLocaleString()} registrations
          </Badge>
        )}
      </CardHeader>

      <CardContent>
          {loading ? (
            <span className="text-muted-foreground text-base">Loading…</span>
          ) : data ? (
            data.title
          ) : (
            <span className="text-destructive">N/A</span>
          )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Top-performing edition{" "}
          <IconAward className="size-4 text-yellow-500" />
        </div>
        <div className="text-muted-foreground text-xs">
          Based on total number of registrations
        </div>
      </CardFooter>
    </Card>
  );
}
