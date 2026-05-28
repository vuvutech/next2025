"use client";

import { usePathname } from "next/navigation";
import { AppSidebarCollapse } from "@/components/admin/dashboard/app-sidebar-collapse";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function SidebarSwitch(
	props: React.ComponentProps<typeof AppSidebar>,
) {
	const pathname = usePathname();
	const useCollapse = pathname.startsWith("/admin");

	if (useCollapse) {
		return <AppSidebarCollapse {...props} />;
	}

	return <AppSidebar {...props} />;
}
