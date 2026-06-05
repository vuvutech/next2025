import { IconNewSection } from "@tabler/icons-react";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { prisma } from "@/prisma/dbConnect";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
	const announcements = await prisma.announcement.findMany({
		include: { user: true },
	});

	const serializedAnnouncements = announcements.map((a) => ({
		id: a.id,
		content: a.content,
		featured: a.featured,
		approved: a.approved,
		createdAt: a.createdAt.toISOString(),
		user: a.user
			? { name: a.user.name ?? undefined, image: a.user.image }
			: undefined,
	}));

	const approved = announcements.filter((a) => a.approved).length;
	const featured = announcements.filter((a) => a.featured).length;

	return (
		<AdminPageWrapper
			icon={IconNewSection}
			title="User Announcements"
			description="Review, approve, and feature user announcements."
			stats={[
				{ label: "Total", value: announcements.length, variant: "default" },
				{ label: "Approved", value: approved, variant: "success" },
				{ label: "Featured", value: featured, variant: "warning" },
			]}
		>
			<GenericDataTable
				extention={<ExtensionComponent />}
				addFiltering={true}
				columns={columns}
				data={serializedAnnouncements}
			/>
		</AdminPageWrapper>
	);
}
