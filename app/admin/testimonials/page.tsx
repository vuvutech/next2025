import { IconPackages } from "@tabler/icons-react";
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { prisma } from "@/prisma/dbConnect";
import { columns } from "./columns";
import { ExtensionComponent } from "./ExtensionComponent";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
	const testimonials = await prisma.testimonial.findMany({
		include: { user: true },
	});

	const approved = testimonials.filter((t) => t.approved).length;
	const featured = testimonials.filter((t) => t.featured).length;

	return (
		<AdminPageWrapper
			icon={IconPackages}
			title="User Testimonials"
			description="Review, approve, and feature user testimonials."
			stats={[
				{ label: "Total", value: testimonials.length, variant: "default" },
				{ label: "Approved", value: approved, variant: "success" },
				{ label: "Featured", value: featured, variant: "warning" },
			]}
		>
			<GenericDataTable
				extention={<ExtensionComponent />}
				addFiltering={true}
				columns={columns}
				data={testimonials}
			/>
		</AdminPageWrapper>
	);
}
