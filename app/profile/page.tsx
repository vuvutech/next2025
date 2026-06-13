import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileSection } from "@/components/dashboard/profile-section";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
	title: "Profile",
	description: "Manage your personal information and profile settings.",
};

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/auth/sign-in");
	}

	return <ProfileSection session={session} />;
}
