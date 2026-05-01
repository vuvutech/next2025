"use client";
import { InstituteGallery, InstituteProps } from "@/components/blocks/Institutegallery4";
import React, { useState, useEffect } from "react";

const institutesData: Pick<InstituteProps, "name" | "overview"> = {
  name: "The COSTRAD Institutes",
  overview:
    "The College of Sustainable Transformation and Development (COSTRAD) and the various institutes are committed to the restoration, transformation and development of all spheres of society.",
};

interface Institute {
  id?: string; // Might be missing if raw file
  name: string;
  acronym: string;
  overview: string;
  slug: string;
  banner?: string;
}

export function InstitutesIntro() {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const res = await fetch("/data/institutes.json");
        if (!res.ok) throw new Error("Failed to load local file");
        const data = await res.json();
        setInstitutes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load institutes from file", err);
        setError("Could not load institute data.");
        setInstitutes([]);
      }
    };

    fetchInstitutes();
  }, []);

  const galleryItems = institutes.map((institute) => ({
    id: institute.id ?? institute.acronym, // fallback ID
    name: institute.name,
    overview: institute.overview,
    slug: institute.slug,
    banner:
      institute.banner ??
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  }));

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <InstituteGallery
        name={institutesData.name}
        overview={institutesData.overview}
        items={galleryItems}
      />
    </>
  );
}
