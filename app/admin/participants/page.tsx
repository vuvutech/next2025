import {
	IconBuildingBank,
	IconGenderBigender,
	IconGlobe,
	IconSchool,
	IconThumbUp,
	IconUserCheck,
	IconUserPlus,
	IconUsers,
} from "@tabler/icons-react";
import { prisma } from "@/prisma/dbConnect";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { KpiCard } from "@/components/admin/kpi-card";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function percentage(numerator: number, denominator: number) {
	if (!denominator) return "0%";
	return `${Math.round((numerator / denominator) * 100)}%`;
}

export default async function ParticipantsPage() {
	const registrations = await prisma.registration.findMany({
		include: {
			user: {
				include: { profile: true },
			},
			edition: {
				include: { institute: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});

	const approved = registrations.filter((r) => r.approved).length;
	const pending = registrations.filter((r) => !r.approved).length;
	const uniqueParticipants = new Set(registrations.map((r) => r.userId)).size;
	const totalInstitutes = new Set(
		registrations.map((r) => r.edition.institute?.id).filter(Boolean),
	).size;

	const byInstitute = Map.groupBy(
		registrations,
		(r) => r.edition.institute?.name ?? "Unknown",
	);

	const instituteStats = [...byInstitute.entries()]
		.map(([name, regs]) => {
			const instApproved = regs.filter((r) => r.approved).length;
			const male = regs.filter(
				(r) => r.user.profile?.gender === "MALE",
			).length;
			const female = regs.filter(
				(r) => r.user.profile?.gender === "FEMALE",
			).length;
			const countries = new Set(
				regs.map((r) => r.user.profile?.country).filter(Boolean),
			);
			return {
				name,
				acronym: regs[0]?.edition.institute?.acronym ?? "",
				total: regs.length,
				approved: instApproved,
				pending: regs.length - instApproved,
				male,
				female,
				countries: countries.size,
			};
		})
		.sort((a, b) => b.total - a.total);

	const genderMale = registrations.filter(
		(r) => r.user.profile?.gender === "MALE",
	).length;
	const genderFemale = registrations.filter(
		(r) => r.user.profile?.gender === "FEMALE",
	).length;

	const countryCounts = Map.groupBy(
		registrations.filter((r) => r.user.profile?.country),
		(r) => r.user.profile!.country!,
	);
	const topCountries = [...countryCounts.entries()]
		.map(([country, regs]) => ({ country, count: regs.length }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 8);

	return (
		<AdminPageWrapper
			icon={IconUsers}
			title="Participants"
			description="Aggregated participant statistics across all institutes and editions."
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				<KpiCard
					title="Total Registrations"
					value={registrations.length}
					icon={IconUserCheck}
				/>
				<KpiCard
					title="Approved"
					value={approved}
					description={`${percentage(approved, registrations.length)} approval rate`}
					icon={IconThumbUp}
					variant="success"
				/>
				<KpiCard
					title="Pending Review"
					value={pending}
					icon={IconUserPlus}
					variant={pending > 0 ? "warning" : "success"}
				/>
				<KpiCard
					title="Unique Participants"
					value={uniqueParticipants}
					icon={IconUsers}
					variant="info"
				/>
				<KpiCard
					title="Active Institutes"
					value={totalInstitutes}
					icon={IconSchool}
				/>
			</div>

			<section className="space-y-4">
				<div className="flex items-center gap-2">
					<IconBuildingBank className="size-6 text-primary" />
					<h2 className="text-xl font-bold">Per-Institute Breakdown</h2>
				</div>
				<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{instituteStats.map((inst) => (
						<Card key={inst.name} className="border-border/50">
							<CardHeader className="p-5 pb-3">
								<div className="flex items-start justify-between gap-3">
									<div className="space-y-1">
										<CardTitle className="text-base font-bold leading-snug">
											{inst.name}
										</CardTitle>
										{inst.acronym && (
											<p className="text-xs uppercase tracking-wider font-medium text-muted-foreground/70">
												{inst.acronym}
											</p>
										)}
									</div>
									<span className="text-3xl font-extrabold tabular-nums tracking-tight text-primary">
										{inst.total}
									</span>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 p-5 pt-1">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground font-medium">Approved</span>
									<div className="flex items-center gap-2">
										<span className="font-bold text-success text-base">
											{inst.approved}
										</span>
										<span className="text-muted-foreground/70 text-xs font-medium">
											({percentage(inst.approved, inst.total)})
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground font-medium">Pending</span>
									<span className="font-bold text-warning text-base">
										{inst.pending}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground font-medium flex items-center gap-1.5">
										<IconGenderBigender className="size-3.5" />
										Gender
									</span>
									<span className="text-muted-foreground font-semibold">
										{inst.male}M / {inst.female}F
									</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground font-medium flex items-center gap-1.5">
										<IconGlobe className="size-3.5" />
										Countries
									</span>
									<span className="font-bold text-base">{inst.countries}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<div className="grid gap-5 lg:grid-cols-2">
				<Card>
					<CardHeader className="p-5 pb-3">
						<div className="flex items-center gap-2.5">
							<IconGenderBigender className="size-5 text-primary" />
							<CardTitle className="text-base font-bold">
								Gender Distribution
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="p-5 pt-1">
						<div className="flex items-center gap-6">
							<div className="flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-primary/20 text-3xl font-extrabold tabular-nums tracking-tight text-primary shrink-0">
								{percentage(genderMale, registrations.length)}
							</div>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 text-sm font-semibold">
										Male
									</Badge>
									<span className="font-bold text-lg tabular-nums">
										{genderMale}
									</span>
									<span className="text-muted-foreground text-sm font-medium">
										({percentage(genderMale, registrations.length)})
									</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="outline" className="bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300 px-3 py-1 text-sm font-semibold">
										Female
									</Badge>
									<span className="font-bold text-lg tabular-nums">
										{genderFemale}
									</span>
									<span className="text-muted-foreground text-sm font-medium">
										({percentage(genderFemale, registrations.length)})
									</span>
								</div>
								<div className="text-sm font-medium text-muted-foreground/70">
									{registrations.length - genderMale - genderFemale} unspecified
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="p-5 pb-3">
						<div className="flex items-center gap-2.5">
							<IconGlobe className="size-5 text-primary" />
							<CardTitle className="text-base font-bold">
								Top Countries
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="p-5 pt-1">
						{topCountries.length > 0 ? (
							<div className="space-y-3">
								{topCountries.map(({ country, count }, i) => (
									<div
										key={country}
										className="flex items-center gap-3"
									>
										<span className="w-6 text-center text-sm font-bold text-muted-foreground/50">
											{i + 1}
										</span>
										<div className="flex-1 text-sm font-medium truncate">
											{country}
										</div>
										<div className="flex items-center gap-2.5">
											<div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
												<div
													className="h-full rounded-full bg-primary"
													style={{
														width: `${(count / topCountries[0].count) * 100}%`,
													}}
												/>
											</div>
											<span className="text-sm font-bold tabular-nums min-w-[2ch]">
												{count}
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-sm text-muted-foreground">
								No country data available.
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</AdminPageWrapper>
	);
}
