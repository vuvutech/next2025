import { IconSchool } from "@tabler/icons-react";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { prisma } from "@/prisma/dbConnect";
import EditionTabs from "./EditionTabs";

export const dynamic = "force-dynamic";

export default async function EditionCohortsPage() {
	const editions = await prisma.edition.findMany({
		include: {
			institute: true,
		},
		orderBy: {
			startDate: "desc",
		},
	});

	const serializedEditions = editions.map((e) => ({
		id: e.id,
		title: e.title,
		startDate: e.startDate?.toISOString() ?? "",
		endDate: e.endDate?.toISOString() ?? "",
		institute: e.institute
			? { name: e.institute.name, acronym: e.institute.acronym }
			: undefined,
	}));

	return (
		<AdminPageWrapper
			icon={IconSchool}
			title="Edition Cohorts"
			description="View and approve registrants separated by their various edition cohort intakes."
			stats={[
				{ label: "Total Cohorts", value: editions.length, variant: "default" },
			]}
		>
			<EditionTabs editions={serializedEditions} />
		</AdminPageWrapper>
	);
}
