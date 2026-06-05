import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileSection } from "@/components/dashboard/profile-section";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/auth/sign-in");
	}

	return (
		<div className="p-4">
			<ProfileSection session={session} />
		</div>
	);
}
