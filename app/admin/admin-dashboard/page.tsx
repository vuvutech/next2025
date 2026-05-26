// File: app/admin/admin-dashboard/page.tsx
import { prisma } from "@/prisma/dbConnect";
import Link from "next/link";
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
  IconListDetails,
  IconChartBar,
  IconMoneybagPlus,
  IconNewSection,
  IconFolder,
  IconPackages,
  IconUsers,
  IconReport,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";

type NavItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  countKey: keyof Counts;
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
  { title: "Dashboard", url: "/admin/", icon: IconDashboard, countKey: "users" },
  { title: "Edition Cohorts", url: "/admin/edition-cohorts", icon: IconSchool, countKey: "cohorts" },
  { title: "All Registrations", url: "/admin/registrations", icon: IconDatabase, countKey: "registrations" },
  { title: "Institutes", url: "/admin/institutes", icon: IconListDetails, countKey: "institutes" },
  { title: "Institute Editions", url: "/admin/editions", icon: IconChartBar, countKey: "editions" },
  { title: "Donations", url: "/admin/donations", icon: IconMoneybagPlus, countKey: "donations" },
  { title: "Announcements", url: "/admin/announcements", icon: IconNewSection, countKey: "announcements" },
  { title: "Publications", url: "/admin/publications", icon: IconFolder, countKey: "publications" },
  { title: "Testimonials", url: "/admin/testimonials", icon: IconPackages, countKey: "testimonials" },
  { title: "Participants", url: "/admin/participants", icon: IconUsers, countKey: "participants" },
  { title: "Users", url: "/admin/users", icon: IconReport, countKey: "users" },
];

export default async function AdminDashboardPage() {
  const counts: Counts = {
    users: await prisma.user.count(),
    editions: await prisma.edition.count(),
    registrations: await prisma.registration.count(),
    pendingApprovals: await prisma.registration.count({ where: { approved: false } }),
    institutes: await prisma.institute.count(),
    cohorts: await prisma.edition.count(),
    announcements: await prisma.announcement.count(),
    testimonials: await prisma.testimonial.count(),
    participants: await prisma.user.count(),
    donations: 0,
    publications: 0,
  };

  const metricCards = [
    { label: "Total Users", value: counts.users, key: "users", href: "/admin/users" },
    { label: "Editions", value: counts.editions, key: "editions", href: "/admin/editions" },
    { label: "Registrations", value: counts.registrations, key: "registrations", href: "/admin/registrations" },
    { label: "Pending Approvals", value: counts.pendingApprovals, key: "pending", href: "/admin/registrations" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => (
          <Link key={card.key} href={card.href} className="cursor-pointer">
            <Card className="transition-all hover:shadow-md hover:border-primary/50 h-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.url} href={item.url} className="block cursor-pointer">
                <Card className="transition-all hover:shadow-md hover:border-primary/50 h-full">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{item.title}</CardTitle>
                      <CardDescription>
                        {counts[item.countKey]} record{counts[item.countKey] !== 1 ? "s" : ""}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}