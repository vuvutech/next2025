"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface InstituteInfoProps {
  id: string;
  mode?: "image" | "text" | "both"; // new prop
}

interface Institute {
  name: string;
  logo?: string;
}

export function InstituteInfo({
  id,
  mode = "image", // default rendering mode
}: InstituteInfoProps) {
  const [institute, setInstitute] = useState<Institute | null>(null);

  useEffect(() => {
    async function fetchInstitute() {
      const res = await fetch(`/api/institutes/getInstitute/${id}`, {
        cache: "force-cache",
      });
      if (res.ok) setInstitute(await res.json());
    }
    if (id) fetchInstitute();
  }, [id]);

  const imgSrc = institute?.logo
    ? institute.logo.startsWith("/")
      ? institute.logo
      : `/${institute.logo}`
    : "/images/costrad.png";

  const altText = institute?.name || "Unknown";

  return (
    <div className="flex items-center gap-2">
      {(mode === "image" || mode === "both") && (
        <Image
          src={imgSrc}
          alt={altText}
          width={70}
          height={70}
          className="rounded-full"
        />
      )}
      {(mode === "text" || mode === "both") && (
        <span className="font-medium">{institute?.name || "Unknown"}</span>
      )}
    </div>
  );
}
