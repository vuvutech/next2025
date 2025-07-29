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
import Loading from "../loading";
import { getCurrentEditions } from "../actions/functions";

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

  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [editionsLoading, setEditionsLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Move checkProfile outside useEffect so it can be called anytime
  const checkProfile = async () => {
    setProfileLoading(true);
    try {
      const res = await fetch("/api/checkProfile");
      if (res.ok) {
        const data = await res.json();
        setHasProfile(!!data);
        console.debug("[DEBUG] Profile found:", data);
      } else {
        setHasProfile(false);
        console.debug("[DEBUG] No profile found, status:", res.status);
      }
    } catch (error) {
      setHasProfile(false);
      console.error("[DEBUG] Failed to fetch profile", error);
      toast.error("Failed to check profile status");
    } finally {
      setProfileLoading(false);
      console.debug("[DEBUG] Profile loading finished");
    }
  };

  useEffect(() => {
    if (session?.user) {
      checkProfile();
    } else {
      setHasProfile(false);
      setProfileLoading(false);
      console.debug("[DEBUG] No user session");
    }
    setEditionsLoading(true);
    console.debug("[DEBUG] Fetching editions...");
    console.log(getCurrentEditions)
    fetch("/api/getCurrentEditions")
      .then((res) => res.json())
      .then((data) => {
        setEditions(data);
        console.debug("[DEBUG] Editions loaded:", data);
      })
      .finally(() => {
        setEditionsLoading(false);
        console.debug("[DEBUG] Editions loading finished");
      });
  }, [session?.user]);

  const onRegister = async (): Promise<void> => {
    if (!selectedEdition) return;

    const edition = editions.find((e) => e.id === selectedEdition);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editionId: selectedEdition }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Registered!", {
          duration: 4000,
          description: `You are now registered for ${edition?.title} (${edition?.institute.name})`,
        });
        setTimeout(() => {
          close();
          router.push("/dashboard#registration");
        }, 1500);
      } else {
        toast.error("Registration Failed", {
          description: data.message || data.error || "Something went wrong.",
          duration: 4000,
        });
      }
    } catch {
      toast.error("Network Error", {
        description: "Please check your connection and try again.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const isLoading = profileLoading || editionsLoading || loading;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-4 w-full relative mx-auto">
      <CloseButton
        onClick={() => router.push("/")}
        className=" top-4 right-4 z-20"
      />

      <div className="flex items-center justify-between w-full">
        {!session?.user && <RegistrationSteps />}
      </div>
      <div>
        {session?.user && !hasProfile && (
          <ProfileForRegistration onProfileSaved={checkProfile} />
        )}
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
