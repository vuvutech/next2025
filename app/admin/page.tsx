import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  IconDashboard,
  IconSchool,
  IconDatabase,
  IconChartBar,
  IconNewSection,
  IconFolder,
  IconPackages,
  IconUsers,
  IconChecklist,
  IconBuildingBank,
  IconCalendarEvent,
  IconUserCheck,
  IconAlertTriangle,
  IconTrendingUp,
  IconUsersGroup,
  IconClipboardCheck,
} from "@tabler/icons-react";
import { MostPopularEditionCard, EditionPopularityCard } from "@/components/analytics/DashboardMetricsCards";
import { ActiveUsersCard } from "@/components/analytics/ActiveUsersCard";
import { SessionsCard } from "@/components/analytics/SessionsCard";
import { RegisteredUsersCard } from "@/components/analytics/RegisteredUsersCard";
import { GaTopPagesChartBar } from "@/components/chart-area-interactive";
import { DevicesUsage } from "@/components/analytics/DevicesUsage";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { KpiCard } from "@/components/admin/kpi-card";
import { prisma } from "@/prisma/dbConnect";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type NavItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  countKey: keyof Counts;
  description: string;
};

type Counts = {
  users: number;
  editions: number;
  registrations: number;
  pendingApprovals: number;
  institutes: number;
  cohorts: number;
  announcements: number;
  testimonials: number;
  participants: number;
  donations: number;
  publications: number;
};

const navItems: NavItem[] = [
  {
    title: "Institutes",
    url: "/admin/institutes",
    icon: IconBuildingBank,
    countKey: "institutes",
    description: "Manage partner institutes",
  },
  {
    title: "Institute Editions",
    url: "/admin/editions",
    icon: IconCalendarEvent,
    countKey: "editions",
    description: "Academic program editions",
  },
  {
    title: "Edition Cohorts",
    url: "/admin/edition-cohorts",
    icon: IconSchool,
    countKey: "cohorts",
    description: "View cohort registrations",
  },
  {
    title: "All Registrations",
    url: "/admin/registrations",
    icon: IconDatabase,
    countKey: "registrations",
    description: "Manage all registrations",
  },
  {
    title: "Participants",
    url: "/admin/participants",
    icon: IconUserCheck,
    countKey: "participants",
    description: "View participants",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: IconUsers,
    countKey: "users",
    description: "Manage system users",
  },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: IconNewSection,
    countKey: "announcements",
    description: "User announcements",
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: IconPackages,
    countKey: "testimonials",
    description: "User testimonials",
  },
  {
    title: "Publications",
    url: "/admin/publications",
    icon: IconFolder,
    countKey: "publications",
    description: "Manage publications",
  },
];

export default async function AdminDashboardPage() {
  const [
    users,
    editions,
    registrations,
    pendingApprovals,
    institutes,
    announcements,
    testimonials,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.edition.count(),
    prisma.registration.count(),
    prisma.registration.count({ where: { approved: false } }),
    prisma.institute.count(),
    prisma.announcement.count(),
    prisma.testimonial.count(),
  ]);

  const counts: Counts = {
    users,
    editions,
    registrations,
    pendingApprovals,
    institutes,
    cohorts: editions,
    announcements,
    testimonials,
    participants: users,
    donations: 0,
    publications: 0,
  };

  return (
    <AdminPageWrapper
      icon={IconDashboard}
      title="Admin Dashboard"
      description="Overview of your platform metrics and analytics."
    >
      <section className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <MostPopularEditionCard />
        <ActiveUsersCard />
        <SessionsCard />
        <RegisteredUsersCard />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <GaTopPagesChartBar />
        </div>
        <div className="flex flex-col gap-4">
          <DevicesUsage />

          <Card className="border-l-4 border-l-warning/30">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <div className="flex size-8 items-center justify-center rounded-lg bg-warning/10 text-warning">
                  <IconClipboardCheck className="size-4" />
                </div>
              </div>
              <CardDescription className="text-xs">Registrations awaiting review</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold tabular-nums tracking-tight text-warning">
                  {pendingApprovals}
                </span>
                {pendingApprovals > 0 && (
                  <Link
                    href="/admin/registrations"
                    className="cursor-pointer text-xs font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Review all
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <IconChecklist className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Quick Navigation</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.url}
                href={item.url}
                className="group block cursor-pointer"
              >
                <Card className="h-full border-border/50 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <CardHeader className="flex flex-row items-start gap-4 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-sm font-medium">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {item.description}
                      </CardDescription>
                    </div>
                    <div className="flex size-8 items-center justify-center rounded-md bg-muted text-xs font-bold tabular-nums text-muted-foreground">
                      {counts[item.countKey]}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </AdminPageWrapper>
  );
}