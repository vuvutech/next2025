"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppSidebarCollapse } from "@/components/admin/dashboard/app-sidebar-collapse";

export default function SidebarSwitch(props: React.ComponentProps<typeof AppSidebar>) {
  const pathname = usePathname();
  const isDashboard = pathname === "/admin/admin-dashboard";

  if (isDashboard) {
    return <AppSidebarCollapse {...props} />;
  }

  return <AppSidebar {...props} />;
}