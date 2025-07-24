"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card, CardAction, CardContent,
  CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig, ChartContainer,
  ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function GaTopPagesChart() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("7d");
  const [chartData, setChartData] = React.useState<
    { path: string; views: number }[]
  >([]);

  // Lock to 7 d on small screens
  React.useEffect(() => {
    if (isMobile && timeRange !== "7d") setTimeRange("7d");
  }, [isMobile, timeRange]);

  // Fetch whenever the range changes
  React.useEffect(() => {
    (async () => {
      const res = await fetch(`/api/analytics/top-pages?range=${timeRange}`);
      const { topPages } = await res.json();
      setChartData(topPages);
    })();
  }, [timeRange]);

  const labelMap: Record<typeof timeRange, string> = {
    "7d":  "last 7 days",
    "30d": "last 30 days",
    "90d": "last 90 days",
  };

  const chartConfig = {
    views: { label: "Page Views", color: "var(--primary)" },
  } satisfies ChartConfig;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>
          Most‑visited pages in the {labelMap[timeRange]}
        </CardDescription>

        {/* desktop‑only selector */}
        {!isMobile && (
          <CardAction>
            <Select value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
              <SelectTrigger className="w-40" size="sm">
                <SelectValue placeholder="Last 7 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-views)" stopOpacity={1} />
                <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="path"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              interval={0}
            />

            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 0}
              content={
                <ChartTooltipContent
                  labelFormatter={(v) => v}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="views"
              type="monotone"
              stroke="var(--color-views)"
              fill="url(#fillViews)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
