"use client";

import * as React from "react";
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

import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { client } from "@/lib/auth-client";
import Link from "next/link";

const navMain = [
  {
    title: "Dashboard",
    url: "/admin/",
    icon: IconDashboard,
  },
  {
    title: "Edition Cohorts",
    url: "/admin/edition-cohorts",
    icon: IconSchool,
  },
  {
    title: "All Registrations",
    url: "/admin/registrations",
    icon: IconDatabase,
  },
  {
    title: "Institutes",
    url: "/admin/institutes",
    icon: IconListDetails,
  },
  {
    title: "Institute Editions",
    url: "/admin/editions",
    icon: IconChartBar,
  },
  // {
  //   title: "Donations",
  //   url: "/admin/donations",
  //   icon: IconMoneybagPlus,
  // },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: IconNewSection,
  },
  {
    title: "Publications",
    url: "/admin/publications",
    icon: IconFolder,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: IconPackages,
  },
  {
    title: "Participants",
    url: "/admin/participants",
    icon: IconUsers,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: IconReport,
  },
];

export function AppSidebarCollapse({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending, error } = client.useSession();

  const user = session?.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">COSTrAD</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser
            user={{
              name: user.name ?? "",
              email: user.email ?? "",
              avatar: user.image ?? "/avatars/avatar.webp",
            }}
          />
        ) : (
          <div className="p-2 text-xs text-muted-foreground">Loading...</div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
