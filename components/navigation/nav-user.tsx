"use client";

import {
	IconDotsVertical,
	IconLogout,
	IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { client } from "@/lib/auth-client";

function ThemeToggle() {
	return (
		<div className="flex items-center justify-between px-2.5 py-1.5 text-sm select-none">
			<span className="text-zinc-500 dark:text-zinc-400 mr-3">Theme</span>
			<ThemeSwitcher />
		</div>
	);
}

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	} | null;
}) {
	const isMobile = useIsMobile();
	const router = useRouter();
	if (!user) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<div className="flex items-center gap-3 px-2 py-2">
						<div className="h-8 w-8 animate-pulse rounded-lg bg-sidebar-accent" />
						<div className="grid flex-1 gap-1.5">
							<div className="h-3 w-24 animate-pulse rounded bg-sidebar-accent" />
							<div className="h-2 w-32 animate-pulse rounded bg-sidebar-accent" />
						</div>
					</div>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg ">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="text-muted-foreground truncate text-xs">
									{user.email}
								</span>
							</div>
							<IconDotsVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="text-muted-foreground truncate text-xs">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => {
								router.push("/profile");
							}}
						>
							<IconUserCircle />
							Profile
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => {
								router.push("/admin");
							}}
						>
							<IconUserCircle />
							My Dashboard
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<ThemeToggle />
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={async () => {
								await client.signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/");
										},
									},
								});
							}}
						>
							<IconLogout />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
