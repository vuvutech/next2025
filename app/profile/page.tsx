import { ProfileSection } from "@/components/dashboard/profile-section";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";


type Props = {};

export default async function ProfilePage({}: Props) {
     const session = await auth.api.getSession({
        headers: await headers(),
      });
    
  return (
    <div className="p-4">
      <ProfileSection session={session!} />
    </div>
  );
}
