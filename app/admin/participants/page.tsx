import { IconUserCheck } from "@tabler/icons-react";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { DataTable } from "@/components/ui/data-table/data-table";
import data from "./institute_mongo.json";

export const dynamic = "force-dynamic";

export default function Page() {
	return (
		<AdminPageWrapper
			icon={IconUserCheck}
			title="Participants"
			description="View and manage program participants."
			stats={[{ label: "Total", value: data.length, variant: "default" }]}
		>
			<DataTable
				data={data.map((item, idx) => ({
					header: item.name,
					id: idx,
					type: item.acronym || "",
					status: item.active ? "Active" : "Inactive",
					target: item.slug || "",
					limit: item.seo || "",
					reviewer: item.updated_at || "",
				}))}
			/>
		</AdminPageWrapper>
	);
}
