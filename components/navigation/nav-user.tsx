"use client";

import {
	IconDotsVertical,
	IconLogout,
	IconMoon,
	IconSun,
	IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const isLight = theme === "light";

	return (
		<DropdownMenuItem
			className="cursor-pointer"
			onClick={() => setTheme(isLight ? "dark" : "light")}
		>
			{isLight ? (
				<IconMoon className="size-4" />
			) : (
				<IconSun className="size-4" />
			)}
			<span>{isLight ? "Dark Mode" : "Light Mode"}</span>
		</DropdownMenuItem>
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
							<Avatar className="h-8 w-8 rounded-lg grayscale">
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
