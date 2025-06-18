"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconMoneybagPlus,
  IconNewSection,
  IconPackages,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { client } from "@/lib/auth-client";
import Link from "next/link";

const data = {
  user: {
    name: "costrad",
    email: "info@costrad.org",
    avatar: "/images/avatar.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/",
      icon: IconDashboard,
    },
    // {
    //   title: "Profile",
    //   url: "/profile",
    //   icon: IconUsers,
    // },
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
    {
      title: "Donations",
      url: "/admin/donations",
      icon: IconMoneybagPlus,
    },
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
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
   
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending, error } = client.useSession();
  if (isPending) {
    // Optionally render a loading state
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state
    console.error("Error fetching session:", error);
    return <div>Error loading user data</div>;
  }

  const user = session?.user;

  return (
    <Sidebar className="font-opensans" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">COSTrAD.Org</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <hr />
        <NavDocuments items={data.documents}  />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {user ? (
        <NavUser
          user={{
            name: user.name ?? "",
            email: user.email ?? "",
            avatar: user.image ?? "/avatars/avatar.png",
          }}
        />
      ) : (
        <div>Please sign in</div> // Or a sign-in button/link
      )}
    </Sidebar>
  );
}
