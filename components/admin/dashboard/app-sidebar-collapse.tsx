"use client";

import * as React from "react";
import {
  LayoutDashboard,
  School,
  Database,
  List,
  BarChart3,
  Banknote,
  Megaphone,
  FolderOpen,
  MessageSquareQuote,
  Users,
  FileText,
} from "lucide-react";

import { NavMain } from "@/components/admin/dashboard/nav-main";
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
    icon: LayoutDashboard,
  },
  {
    title: "Edition Cohorts",
    url: "/admin/edition-cohorts",
    icon: School,
  },
  {
    title: "All Registrations",
    url: "/admin/registrations",
    icon: Database,
  },
  {
    title: "Institutes",
    url: "/admin/institutes",
    icon: List,
  },
  {
    title: "Institute Editions",
    url: "/admin/editions",
    icon: BarChart3,
  },
  {
    title: "Donations",
    url: "/admin/donations",
    icon: Banknote,
  },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: Megaphone,
  },
  {
    title: "Publications",
    url: "/admin/publications",
    icon: FolderOpen,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    title: "Participants",
    url: "/admin/participants",
    icon: Users,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: FileText,
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
              <Link href="/admin/admin-dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-4" />
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