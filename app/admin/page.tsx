import {
	IconAlertTriangle,
	IconArrowRight,
	IconBuildingBank,
	IconCalendarEvent,
	IconChecklist,
	IconClipboardCheck,
	IconDashboard,
	IconDatabase,
	IconFolder,
	IconNewSection,
	IconPackages,
	IconSchool,
	IconUserCheck,
	IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { ActiveUsersCard } from "@/components/analytics/ActiveUsersCard";
import { MostPopularEditionCard } from "@/components/analytics/DashboardMetricsCards";
import { DevicesUsage } from "@/components/analytics/DevicesUsage";
import { RegisteredUsersCard } from "@/components/analytics/RegisteredUsersCard";
import { SessionsCard } from "@/components/analytics/SessionsCard";
import { GaTopPagesChartBar } from "@/components/chart-area-interactive";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/prisma/dbConnect";

export const dynamic = "force-dynamic";

type NavItem = {
	title: string;
	url: string;
	icon: React.ElementType;
	countKey: keyof Counts;
	description: string;
	theme: {
		bg: string;
		text: string;
		border: string;
		glow: string;
	};
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
	{
		title: "Institutes",
		url: "/admin/institutes",
		icon: IconBuildingBank,
		countKey: "institutes",
		description: "Manage partner institutes",
		theme: {
			bg: "bg-blue-500/10 group-hover:bg-blue-500/15 dark:bg-blue-500/5 dark:group-hover:bg-blue-500/10",
			text: "text-blue-600 dark:text-blue-400",
			border:
				"border-blue-500/20 dark:border-blue-500/10 group-hover:border-blue-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]",
		},
	},
	{
		title: "Institute Editions",
		url: "/admin/editions",
		icon: IconCalendarEvent,
		countKey: "editions",
		description: "Academic program editions",
		theme: {
			bg: "bg-emerald-500/10 group-hover:bg-emerald-500/15 dark:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10",
			text: "text-emerald-600 dark:text-emerald-400",
			border:
				"border-emerald-500/20 dark:border-emerald-500/10 group-hover:border-emerald-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]",
		},
	},
	{
		title: "Edition Cohorts",
		url: "/admin/edition-cohorts",
		icon: IconSchool,
		countKey: "cohorts",
		description: "View cohort registrations",
		theme: {
			bg: "bg-violet-500/10 group-hover:bg-violet-500/15 dark:bg-violet-500/5 dark:group-hover:bg-violet-500/10",
			text: "text-violet-600 dark:text-violet-400",
			border:
				"border-violet-500/20 dark:border-violet-500/10 group-hover:border-violet-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.15)]",
		},
	},
	{
		title: "All Registrations",
		url: "/admin/registrations",
		icon: IconDatabase,
		countKey: "registrations",
		description: "Manage all registrations",
		theme: {
			bg: "bg-amber-500/10 group-hover:bg-amber-500/15 dark:bg-amber-500/5 dark:group-hover:bg-amber-500/10",
			text: "text-amber-600 dark:text-amber-400",
			border:
				"border-amber-500/20 dark:border-amber-500/10 group-hover:border-amber-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.15)]",
		},
	},
	{
		title: "Participants",
		url: "/admin/participants",
		icon: IconUserCheck,
		countKey: "participants",
		description: "View participants",
		theme: {
			bg: "bg-rose-500/10 group-hover:bg-rose-500/15 dark:bg-rose-500/5 dark:group-hover:bg-rose-500/10",
			text: "text-rose-600 dark:text-rose-400",
			border:
				"border-rose-500/20 dark:border-rose-500/10 group-hover:border-rose-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(244,63,94,0.15)]",
		},
	},
	{
		title: "Users",
		url: "/admin/users",
		icon: IconUsers,
		countKey: "users",
		description: "Manage system users",
		theme: {
			bg: "bg-cyan-500/10 group-hover:bg-cyan-500/15 dark:bg-cyan-500/5 dark:group-hover:bg-cyan-500/10",
			text: "text-cyan-600 dark:text-cyan-400",
			border:
				"border-cyan-500/20 dark:border-cyan-500/10 group-hover:border-cyan-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.15)]",
		},
	},
	{
		title: "Announcements",
		url: "/admin/announcements",
		icon: IconNewSection,
		countKey: "announcements",
		description: "User announcements",
		theme: {
			bg: "bg-fuchsia-500/10 group-hover:bg-fuchsia-500/15 dark:bg-fuchsia-500/5 dark:group-hover:bg-fuchsia-500/10",
			text: "text-fuchsia-600 dark:text-fuchsia-400",
			border:
				"border-fuchsia-500/20 dark:border-fuchsia-500/10 group-hover:border-fuchsia-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(217,70,239,0.15)]",
		},
	},
	{
		title: "Testimonials",
		url: "/admin/testimonials",
		icon: IconPackages,
		countKey: "testimonials",
		description: "User testimonials",
		theme: {
			bg: "bg-indigo-500/10 group-hover:bg-indigo-500/15 dark:bg-indigo-500/5 dark:group-hover:bg-indigo-500/10",
			text: "text-indigo-600 dark:text-indigo-400",
			border:
				"border-indigo-500/20 dark:border-indigo-500/10 group-hover:border-indigo-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.15)]",
		},
	},
	{
		title: "Publications",
		url: "/admin/publications",
		icon: IconFolder,
		countKey: "publications",
		description: "Manage publications",
		theme: {
			bg: "bg-teal-500/10 group-hover:bg-teal-500/15 dark:bg-teal-500/5 dark:group-hover:bg-teal-500/10",
			text: "text-teal-600 dark:text-teal-400",
			border:
				"border-teal-500/20 dark:border-teal-500/10 group-hover:border-teal-500/30",
			glow: "group-hover:shadow-[0_0_20px_-5px_rgba(20,184,166,0.15)]",
		},
	},
];

export default async function AdminDashboardPage() {
	const [
		users,
		editions,
		registrations,
		pendingApprovals,
		institutes,
		announcements,
		testimonials,
		activeInstitutes,
		activeEditions,
		approvedRegistrations,
		approvedAnnouncements,
		approvedTestimonials,
		adminUsers,
		superAdminUsers,
		featuredTestimonials,
	] = await Promise.all([
		prisma.user.count(),
		prisma.edition.count(),
		prisma.registration.count(),
		prisma.registration.count({ where: { approved: false } }),
		prisma.institute.count(),
		prisma.announcement.count(),
		prisma.testimonial.count(),
		prisma.institute.count({ where: { active: true } }),
		prisma.edition.count({ where: { active: true } }),
		prisma.registration.count({ where: { approved: true } }),
		prisma.announcement.count({ where: { approved: true } }),
		prisma.testimonial.count({ where: { approved: true } }),
		prisma.user.count({ where: { role: "ADMIN" } }),
		prisma.user.count({ where: { role: "SUPERADMIN" } }),
		prisma.testimonial.count({ where: { featured: true } }),
	]);

	const uniqueParticipants = await prisma.registration
		.findMany({ select: { userId: true }, distinct: ["userId"] })
		.then((r) => r.length);

	const counts: Counts = {
		users,
		editions,
		registrations,
		pendingApprovals,
		institutes,
		cohorts: editions,
		announcements,
		testimonials,
		participants: uniqueParticipants,
		donations: 0,
		publications: 0,
	};

	const subStats: Record<string, string> = {
		institutes: `${activeInstitutes} active`,
		editions: `${activeEditions} active`,
		cohorts: `${registrations} registrations`,
		registrations: `${approvedRegistrations} approved`,
		participants: `${uniqueParticipants} unique`,
		users: `${adminUsers + superAdminUsers} admins`,
		announcements: `${approvedAnnouncements} approved`,
		testimonials: `${approvedTestimonials} approved, ${featuredTestimonials} featured`,
	};

	return (
		<AdminPageWrapper
			icon={IconDashboard}
			title="Admin Dashboard"
			description="Overview of your platform metrics and analytics."
		>
			{/* Premium Dashboard Welcome Banner */}
			<div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
				<div className="absolute -right-20 -top-20 -z-10 size-60 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute -left-20 -bottom-20 -z-10 size-60 rounded-full bg-secondary/10 blur-3xl" />

				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div className="space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
							<span className="relative flex size-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
								<span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
							</span>
							System Status: Active & Operational
						</div>
						<h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
							Welcome Back, Administrator
						</h1>
						<p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
							Here's the latest performance and activity status across the
							COSTrAD platform. Check notifications and manage integrations
							below.
						</p>
					</div>

					{pendingApprovals > 0 && (
						<div className="shrink-0">
							<Link
								href="/admin/registrations"
								className="group flex items-center gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 backdrop-blur-sm hover:bg-amber-500/10 transition-all duration-300"
							>
								<div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
									<IconAlertTriangle className="size-5" />
								</div>
								<div>
									<div className="text-xs font-medium text-muted-foreground">
										Action Required
									</div>
									<div className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
										{pendingApprovals} Pending Approvals
										<IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
									</div>
								</div>
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* Main KPI Analytics Cards */}
			<section className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
				<MostPopularEditionCard />
				<ActiveUsersCard />
				<SessionsCard />
				<RegisteredUsersCard />
			</section>

			{/* Analytics Charts & Stats side-by-side row */}
			<section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
				<div className="flex flex-col md:col-span-2 lg:col-span-1 h-full">
					<GaTopPagesChartBar />
				</div>
				<div className="flex flex-col h-full">
					<DevicesUsage />
				</div>
				<div className="flex h-full">
					<Card className="relative overflow-hidden border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-md w-full flex flex-col justify-between">
						<div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-primary/60" />
						<CardHeader className="p-5 pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
									Total Registrations
								</CardTitle>
								<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<IconClipboardCheck className="size-4" />
								</div>
							</div>
							<CardDescription className="text-xs">
								All registration records
							</CardDescription>
						</CardHeader>
						<CardContent className="p-5 pt-2 flex-1 flex flex-col justify-between">
							<div className="flex flex-col justify-center flex-1 py-4">
								<span className="text-5xl font-extrabold tabular-nums tracking-tight text-primary">
									{registrations}
								</span>
								<span className="text-[11px] text-muted-foreground mt-1">
									{pendingApprovals > 0
										? `${pendingApprovals} pending approval`
										: "All registrations approved"}
								</span>
							</div>
							<div className="pt-4 border-t border-border/50">
								<Link
									href="/admin/registrations"
									className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
								>
									View all registrations
									<IconArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Quick Navigation Area */}
			<section className="space-y-4">
				<div className="flex items-center gap-2">
					<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<IconChecklist className="size-4" />
					</div>
					<h2 className="text-lg font-bold tracking-tight">Quick Operations</h2>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{navItems.map((item) => {
						const Icon = item.icon;
						const sub = subStats[item.countKey];
						return (
							<Link
								key={item.url}
								href={item.url}
								className="group block cursor-pointer"
							>
								<Card
									className={`h-full border border-border/80 bg-card/60 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 ${item.theme.glow}`}
								>
									<CardHeader className="flex flex-row items-start gap-4 p-5">
										<div
											className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${item.theme.bg} ${item.theme.text} ${item.theme.border} group-hover:scale-105`}
										>
											<Icon className="size-5" />
										</div>
										<div className="flex-1 space-y-1">
											<div className="flex items-center justify-between">
												<CardTitle className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
													{item.title}
												</CardTitle>
												<IconArrowRight className="size-3.5 opacity-0 -translate-x-2 text-primary transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
											</div>
											<CardDescription className="text-xs leading-normal">
												{item.description}
											</CardDescription>
											{sub && (
												<p className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
													{sub}
												</p>
											)}
										</div>
										<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold tabular-nums text-muted-foreground border border-border/30">
											{counts[item.countKey]}
										</div>
									</CardHeader>
								</Card>
							</Link>
						);
					})}
				</div>
			</section>
		</AdminPageWrapper>
	);
}
