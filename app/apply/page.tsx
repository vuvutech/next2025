/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useDialog } from "@/providers/DialogProvider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSession } from "@/lib/auth-client";
import RegistrationSteps from "@/components/RegistrationSteps";
import { CloseButton } from "@/components/CloseButton";
import { useRouter } from "next/navigation";
import { ProfileForRegistration } from "@/components/profileForRegistration";
// import RegistrationSteps from "./RegistrationSteps";

export default function Apply() {
  const router = useRouter();
  const { close } = useDialog();
  const { data: session } = useSession();
  const [profileComplete, setProfileComplete] = useState(false);
  const [institutes, setInstitutes] = useState<string[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<string | null>(
    null
  );



  useEffect(() => {
    if (session?.user) {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((profile) => {
          const complete = !!(
            profile.gender &&
            profile.telephone &&
            profile.dateOfBirth &&
            profile.address
          );
          setProfileComplete(complete);
        });
    }
    fetch("/api/institutes")
      .then((res) => res.json())
      .then((data) => setInstitutes(data.map((i: any) => i.name)));
    console.log("Institutes fetched:", institutes);
  }, [session]);

  const onRegister = () => {
    if (!selectedInstitute) return;
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ institute: selectedInstitute }),
    }).then(() => close());
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 relative">
      <CloseButton
        onClick={() => {
          router.push("/"); // Redirect to home page
        }}
        className="absolute top-4 right-4 z-20"
      />
      <div className="flex items-center justify-between w-full">
        {!session?.user && <RegistrationSteps />}
      </div>

      {session?.user && !profileComplete && <ProfileForRegistration />}

      {session?.user && profileComplete && (
        <div className="space-y-4 w-full">
          <Select onValueChange={setSelectedInstitute}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Institute" />
            </SelectTrigger>
            <SelectContent>
              {institutes.map((name) => (
                <SelectItem key={name} value={name}>
                  <div>
                    <span>{name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onRegister} disabled={!selectedInstitute}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
