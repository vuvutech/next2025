import { IconCalendarEvent } from "@tabler/icons-react";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { prisma } from "@/prisma/dbConnect";
import { columns, type EditionRow } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export const dynamic = "force-dynamic";

export default async function AdminEditionsPage() {
	const editions = await prisma.edition.findMany();

	const serializedEditions: EditionRow[] = editions.map((e) => ({
		id: e.id,
		instituteId: e.instituteId,
		title: e.title,
		theme: e.theme,
		overview: e.overview,
		seo: e.seo,
		inPersonDelivery: e.inPersonDelivery,
		onlineDelivery: e.onlineDelivery,
		active: e.active,
		price: e.price ?? undefined,
		priceViaZoom: e.priceViaZoom ?? undefined,
		earlyBirdPrice: e.earlyBirdPrice ?? undefined,
		earlyBirdDeadline: e.earlyBirdDeadline?.toISOString(),
		startDate: e.startDate?.toISOString(),
		endDate: e.endDate?.toISOString(),
		startTime: e.startTime,
		endTime: e.endTime,
		banner: e.banner,
		verticalBanner: e.verticalBanner,
	}));

	return (
		<AdminPageWrapper
			icon={IconCalendarEvent}
			title="Institute Editions"
			description="Create and manage academic program editions for institutes."
			stats={[
				{ label: "Total", value: editions.length, variant: "default" },
				{
					label: "Active",
					value: editions.filter((e) => e.active).length,
					variant: "success",
				},
				{
					label: "In-Person",
					value: editions.filter((e) => e.inPersonDelivery).length,
					variant: "info",
				},
			]}
		>
			<GenericDataTable
				extention={<ExtensionComponent />}
				addFiltering={true}
				columns={columns}
				data={serializedEditions}
			/>
		</AdminPageWrapper>
	);
}
