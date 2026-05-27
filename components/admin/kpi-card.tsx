import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

type SparklinePoint = { value: number; label?: string };

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: {
    direction: "up" | "down" | "neutral";
    label: string;
  };
  sparkline?: SparklinePoint[];
  variant?: "default" | "success" | "warning" | "info";
}

const variantStyles = {
  default: { iconBg: "bg-primary/10", iconColor: "text-primary", accent: "border-l-primary/30" },
  success: { iconBg: "bg-success/10", iconColor: "text-success", accent: "border-l-success/30" },
  warning: { iconBg: "bg-warning/10", iconColor: "text-warning", accent: "border-l-warning/30" },
  info: { iconBg: "bg-info/10", iconColor: "text-info", accent: "border-l-info/30" },
};

const trendColors = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
};

const trendArrows = {
  up: "\u2191",
  down: "\u2193",
  neutral: "\u2192",
};

function Sparkline({ data }: { data: SparklinePoint[] }) {
  if (data.length < 2) return null;
  const values = data.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = data.length * 8;
  const h = 32;
  const pts = data.map((p, i) => {
    const x = i * 8 + 2;
    const y = h - ((p.value - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const fillArea = `M2,${h - 2}L${pts.join("L")}L${w - 2},${h - 2}Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sparkline-grad-${crypto.randomUUID?.() ?? Date.now()}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <path d={fillArea} fill="url(#sparkline-grad)" className="text-primary" />
    </svg>
  );
}

export function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  sparkline,
  variant = "default",
}: KpiCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className={`relative overflow-hidden border-l-4 ${styles.accent} transition-all duration-200 hover:shadow-sm`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              {title}
            </span>
            <div className="text-2xl font-bold tabular-nums tracking-tight">
              {value}
            </div>
            {description && (
              <CardDescription className="text-xs">
                {description}
              </CardDescription>
            )}
          </div>
          <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${styles.iconBg} ${styles.iconColor}`}>
            <Icon className="size-4.5" />
          </div>
        </div>

        {trend && (
          <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trendColors[trend.direction]}`}>
            <span>{trendArrows[trend.direction]}</span>
            <span>{trend.label}</span>
          </div>
        )}

        {sparkline && sparkline.length >= 2 && (
          <div className="mt-2 opacity-70">
            <Sparkline data={sparkline} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}