import { IconDatabase } from "@tabler/icons-react";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { prisma } from "@/prisma/dbConnect";
import ClientWrapper from "./ClientWrapper";
import type { RegistrationRow } from "./columns";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
	const registrations = await prisma.registration.findMany({
		include: {
			user: true,
			edition: {
				include: { institute: true },
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const serializedRegistrations: RegistrationRow[] = registrations.map((r) => ({
		id: r.id,
		createdAt: r.createdAt.toISOString(),
		approved: r.approved,
		approvedBy: r.approvedBy,
		paid: r.paid,
		paidBy: r.paidBy,
		user: r.user
			? {
					id: r.user.id,
					name: r.user.name ?? undefined,
					email: r.user.email ?? undefined,
					image: r.user.image ?? undefined,
					studentId: r.user.studentId ?? undefined,
				}
			: undefined,
		edition: r.edition
			? {
					startDate: r.edition.startDate?.toISOString(),
					endDate: r.edition.endDate?.toISOString(),
					price: r.edition.price ?? undefined,
					priceViaZoom: r.edition.priceViaZoom ?? undefined,
					institute: r.edition.institute
						? {
								name: r.edition.institute.name,
								logo: r.edition.institute.logo ?? undefined,
							}
						: undefined,
				}
			: undefined,
	}));

	const approved = registrations.filter((r) => r.approved).length;
	const pending = registrations.filter((r) => !r.approved).length;

	return (
		<AdminPageWrapper
			icon={IconDatabase}
			title="Edition Registrations"
			description="Review and manage all registration submissions."
			stats={[
				{ label: "Total", value: registrations.length, variant: "default" },
				{ label: "Approved", value: approved, variant: "success" },
				{ label: "Pending", value: pending, variant: "warning" },
			]}
		>
			<ClientWrapper data={serializedRegistrations} />
		</AdminPageWrapper>
	);
}
