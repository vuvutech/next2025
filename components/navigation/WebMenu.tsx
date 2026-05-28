"use client";

import * as React from "react";
// import { Icons } from "@/components/icons"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";
import Apply from "../../app/apply/page";

export const gettingStarted: {
	title: string;
	href: string;
	description: string;
}[] = [
	{
		title: "Why COSTrAD",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Mission & Vision",
		href: "/docs/primitives/hover-card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Our Story",
		href: "/our-story",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
];

import { usePathname } from "next/navigation";

export function WebMenu() {
	const pathname = usePathname();

	const isActive = (path: string) => {
		if (path === "/" && pathname !== "/") return false;
		return pathname.startsWith(path);
	};

	return (
		<div className="flex items-center justify-end gap-x-2 divide-x-1 font-poppins divide-dotted space-x-1 z-20  ">
			<NavigationMenu className="pr-5">
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/"
							className={cn(
								navigationMenuTriggerStyle(),
								isActive("/") && "text-primary font-semibold",
							)}
						>
							<span className="uppercase cursor-pointer">Home</span>
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink
							href="/about"
							className={cn(
								navigationMenuTriggerStyle(),
								isActive("/about") && "text-primary font-semibold",
							)}
						>
							<span className="uppercase">About</span>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/institutes"
							className={cn(
								navigationMenuTriggerStyle(),
								isActive("/institutes") && "text-primary font-semibold",
							)}
						>
							<span className="uppercase">Institutes</span>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/donate"
							className={cn(
								navigationMenuTriggerStyle(),
								isActive("/donate") && "text-primary font-semibold",
							)}
						>
							<span className="uppercase">Donate</span>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/apply"
							className={cn(
								navigationMenuTriggerStyle(),
								isActive("/apply") && "text-primary font-semibold",
							)}
						>
							<span className="uppercase">Apply</span>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/contact"
							className={cn(
								navigationMenuTriggerStyle(),
								isActive("/contact") && "text-primary font-semibold",
							)}
						>
							<span className="uppercase">Contact</span>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<ThemeSwitch className="pt-2 pl-2" />
		</div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
