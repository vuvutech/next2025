import type { ReactNode } from "react";

type PageAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ElementType;
  variant?: "default" | "outline" | "secondary" | "ghost";
};

type StatBadge = {
  label: string;
  value: number | string;
  icon?: React.ElementType;
  variant?: "default" | "success" | "warning" | "danger" | "info";
};

interface AdminPageWrapperProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  actions?: PageAction[];
  stats?: StatBadge[];
  children: ReactNode;
}

export function AdminPageWrapper({
  title,
  description,
  icon: Icon,
  stats,
  children,
}: AdminPageWrapperProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
          )}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>

      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            const variantStyles = {
              default: "bg-primary/10 text-primary border-primary/20",
              success: "bg-success/10 text-success border-success/20",
              warning: "bg-warning/10 text-warning border-warning/20",
              danger: "bg-destructive/10 text-destructive border-destructive/20",
              info: "bg-info/10 text-info border-info/20",
            };
            const variantClass = variantStyles[stat.variant ?? "default"];

            return (
              <div
                key={stat.label}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${variantClass}`}
              >
                {StatIcon && <StatIcon className="size-3.5" />}
                <span>{stat.label}:</span>
                <span className="font-bold">{stat.value}</span>
              </div>
            );
          })}
        </div>
      )}

      {children}
    </div>
  );
}