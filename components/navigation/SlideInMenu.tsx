"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import MainLogo from "@/components/layout/MainLogo";
import MainMenu from "@/components/navigation/Menu";
import { SignInButton } from "@/components/ui/auth/signin-button";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { bebas } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { client } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function Component() {
	const pathname = usePathname();
	const router = useRouter();

	const { data: _session, isPending } = client.useSession();

	if (isPending) {
		return null;
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring" as const,
				stiffness: 100,
			},
		},
	};

	function handleLinkClick(href: string) {
		router.push(href);
		window.scrollTo(0, 0);
	}

	return (
		<div className="flex items-center bg-background justify-end gap-x-2 ">
			<div>
				<Sheet>
					<SheetTrigger>
						<div className={`${bebas.className}  `}>
							<MainMenu />
						</div>
					</SheetTrigger>
					<SheetContent className="w-[320px] sm:w-[540px] p-0 flex flex-col h-full">
						<SheetHeader className="p-4 sm:p-6 border-b shrink-0">
							<SheetTitle className="sr-only">Main Navigation Menu</SheetTitle>
							<SheetDescription className="sr-only">
								Access the site's main navigation links and user account
								options.
							</SheetDescription>
							<MainLogo />
						</SheetHeader>
						<div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
							<div className="space-y-2 pl-5 font-poppins">
								<motion.nav
									className="flex flex-col items-start justify-center gap-2 sm:gap-4 pl-8"
									variants={containerVariants}
									initial="hidden"
									animate="visible"
								>
									{siteConfig.navItems.map((item) => {
										const active =
											pathname === item.href ||
											(item.href !== "/" && pathname.startsWith(item.href));
										return (
											<motion.div
												key={item.number}
												className="group relative flex items-start justify-center py-1"
												variants={itemVariants}
											>
												<span
													className={cn(
														"absolute -left-8 text-[10px] sm:text-xs",
														active
															? "text-primary font-bold"
															: "text-muted-foreground",
													)}
												>
													{item.number}
												</span>
												<SheetClose asChild>
													<button
														onClick={() => handleLinkClick(item.href)}
														className={cn(
															"group relative text-lg font-bold sm:text-2xl transition-all duration-300 cursor-pointer uppercase tracking-tight",
															active ? "text-primary" : "text-foreground",
														)}
													>
														<span>{item.label}</span>
														<span
															className={cn(
																"absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full",
																active
																	? "w-full bg-primary"
																	: "w-0 bg-purple-600",
															)}
														/>
													</button>
												</SheetClose>
											</motion.div>
										);
									})}
								</motion.nav>
							</div>
						</div>

						<SheetFooter className="pt-4 border-t border-b border-accent ">
							<div className=" pb-5 flex items-center justify-between gap-6">
								<SignInButton />
								<ThemeSwitch />
							</div>
							<div className="grid grid-cols-1 gap-4">
								<div className="hidden items-center justify-between gap-4">
									{" "}
									<div>
										<SheetClose asChild>
											<Button variant="outline" className="w-full">
												Close
											</Button>
										</SheetClose>
									</div>
									<div>
										{" "}
										<ThemeSwitch />
									</div>
								</div>
							</div>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
