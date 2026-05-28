// app/institute/page.tsx

import { getInstitutes } from "@/app/actions/functions";
import InstitutesComponent from "@/components/sections/InstitutesComponent";
import Jumbotron from "@/components/sections/Jumbotron";

export const dynamic = "force-dynamic";

export default async function InstitutesPage() {
	// Fetch institutes data server-side
	const institutes = await getInstitutes();

	return (
		<div>
			<Jumbotron />
			<div className="py-4 sm:py-8">
				<InstitutesComponent initialInstitutes={institutes} />
			</div>
		</div>
	);
}
