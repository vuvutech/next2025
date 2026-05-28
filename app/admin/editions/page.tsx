import { IconCalendarEvent } from "@tabler/icons-react";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { prisma } from "@/prisma/dbConnect";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export const dynamic = "force-dynamic";

export default async function AdminEditionsPage() {
	const editions = await prisma.edition.findMany();

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
				data={editions}
			/>
		</AdminPageWrapper>
	);
}
