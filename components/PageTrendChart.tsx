import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

type PageTrendChartProps = {
  path: string;
  range: "7d" | "30d" | "90d";
};

export function PageTrendChart({ path, range }: PageTrendChartProps) {
  const [data, setData] = React.useState<{ date: string; views: number }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/analytics/page-views?path=${encodeURIComponent(path)}&range=${range}`);
      const json = await res.json();
      setData(json.viewsByDate ?? []);
      setLoading(false);
    })();
  }, [path, range]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Views for: {path}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="text-muted-foreground text-sm">Loading chart...</div>
        ) : (
          <ChartContainer config={{ views: { label: "Views", color: "var(--primary)" } }}>
            <AreaChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickMargin={8} />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(d) => new Date(d).toLocaleDateString()}
                  />
                }
              />
              <Area
                dataKey="views"
                type="monotone"
                stroke="var(--color-views)"
                fillOpacity={0.3}
                fill="var(--color-views)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
