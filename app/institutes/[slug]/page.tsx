// app/institutes/[slug]/page.tsx

// revalidate after 12 hours
export const revalidate = 43200; // 12 hours in seconds

import { prisma } from "@/prisma/dbConnect";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section1 } from "../Section1";
import WorldMap from "@/components/WorldMap";
import OverviewSection from "@/app/institutes/OverviewSection";
import Jumbotron from "@/components/ui/Jumbotron";

// Static paths for SSG
export async function generateStaticParams() {
  const institutes = await prisma.institute.findMany({
    select: { slug: true },
  });

  return institutes.map((institute) => ({
    slug: institute.slug,
  }));
}

// SEO metadata
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const institute = await prisma.institute.findUnique({
    where: { slug: params.slug },
    select: { name: true },
  });

  return {
    title: institute?.name || "Institute Not Found",
  };
}

// Actual SSG Page
export default async function InstituteViewPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const institute = await prisma.institute.findUnique({
    where: { slug: params.slug },
    include: {
      editions: true,
    },
  });

  if (!institute) return notFound();

  const edition = institute.editions[0];

  return (
    <div className="overflow-hidden">
      <Jumbotron
        heroImage={edition?.banner ? edition.banner : "/images/institute.jpg"}
      />

      <div className="relative overflow-hidden pb-5">
        <Section1
          name={institute.name}
          overview={institute.overview}
          acronym={institute.acronym}
          defaultVerticalBannerSrc={`/images/defaultVerticalBanner/${institute.acronym}.webp`}
          edition={
            edition
              ? {
                  title: edition.title,
                  startDate: edition.startDate ?? undefined,
                  endDate: edition.endDate ?? undefined,
                  banner: edition.banner ?? undefined,
                  theme: edition.theme ?? undefined,
                }
              : undefined
          }
        />
      </div>
      <OverviewSection edition={edition} institute={institute} />
      <WorldMap />
      {/* <WorldMapSection /> */}
    </div>
  );
}
