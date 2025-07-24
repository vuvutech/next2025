"use client"

import * as React from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card, CardAction, CardContent,
  CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer,
  ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"

export function GaTopPagesChartBar() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("7d")
  const [chartData, setChartData] = React.useState<
    { path: string; views: number }[]
  >([])

  React.useEffect(() => {
    if (isMobile && timeRange !== "7d") setTimeRange("7d")
  }, [isMobile, timeRange])

  React.useEffect(() => {
    ;(async () => {
      const res = await fetch(`/api/analytics/top-pages?range=${timeRange}`)
      const { topPages } = await res.json()
      setChartData(topPages)
    })()
  }, [timeRange])

  const labelMap: Record<typeof timeRange, string> = {
    "7d": "last 7 days",
    "30d": "last 30 days",
    "90d": "last 90 days",
  }

  const chartConfig = {
    views: { label: "Page Views", color: "var(--primary)" },
  } satisfies ChartConfig

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>
          Most‑visited pages in the {labelMap[timeRange]}
        </CardDescription>

        {!isMobile && (
          <CardAction>
            <Select value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
              <SelectTrigger className="w-40" size="sm">
                <SelectValue placeholder="Last 7 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
            <YAxis
              dataKey="path"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="views"
              fill="var(--color-views)"
              radius={5}
              layout="vertical"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
