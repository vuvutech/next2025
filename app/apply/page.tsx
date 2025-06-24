"use client";

import React, { useEffect, useState } from "react";
import { useDialog } from "@/providers/DialogProvider";
import { useSession } from "@/lib/auth-client";
import RegistrationSteps from "@/components/RegistrationSteps";
import { CloseButton } from "@/components/CloseButton";
import { useRouter } from "next/navigation";
import { ProfileForRegistration } from "@/components/profileForRegistration";
import { toast } from "sonner";
import { EditionSelect } from "@/components/editionSelect";

interface Edition {
  id: string;
  title: string;
  slug: string;
  institute: {
    name: string;
    logo?: string;
  };
}

export default function Apply() {
  const router = useRouter();
  const { close } = useDialog();
  const { data: session } = useSession();

  const [hasProfile, setHasProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [editionsLoading, setEditionsLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


   useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await fetch("/api/checkProfile"); // Or your actual endpoint
        if (res.ok) {
          const data = await res.json();
          setHasProfile(!!data);
        } else {
          setHasProfile(false);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
        toast.error("Failed to check profile status");
      } finally {
        setProfileLoading(false);
      }
    };

    if (session?.user) {
      checkProfile();
    }
    fetch("/api/editions")
      .then((res) => res.json())
      .then((data) => setEditions(data))
      .finally(() => setEditionsLoading(false));
    setEditionsLoading(true);
  }, [session?.user]);



  const onRegister = () => {
    if (!selectedEdition) return;

    const edition = editions.find((e) => e.id === selectedEdition);
    setLoading(true);

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editionId: selectedEdition }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Registered!", {
            duration: 4000,
            description: `You are now registered for ${edition?.title} (${edition?.institute.name})`,
          });
          setTimeout(() => {
            close();
            router.push("/dashboard");
          }, 1500);
        } else {
          toast.error("Registration Failed", {
            description: data.message || data.error || "Something went wrong.",
            duration: 4000,
          });
        }
      })
      .catch(() => {
        toast.error("Network Error", {
          description: "Please check your connection and try again.",
          duration: 4000,
        });
      })
      .finally(() => setLoading(false));
  };

  const isLoading = profileLoading || editionsLoading || loading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <span className="text-sm text-gray-500 animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 relative">
      <CloseButton
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 z-20"
      />

      <div className="flex items-center justify-between w-full">
        {!session?.user && <RegistrationSteps />}
      </div>
      <div>
        {session?.user && !hasProfile && <ProfileForRegistration />}
      </div>

      {session?.user && hasProfile && (
        <EditionSelect
          editions={editions}
          selectedEdition={selectedEdition}
          onSelect={setSelectedEdition}
          onRegister={onRegister}
          loading={loading}
        />
      )}
    </div>
  );
}
