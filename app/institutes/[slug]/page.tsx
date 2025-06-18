// app/institutes/[slug]/page.tsx
import { prisma } from "@/prisma/dbConnect";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section1 } from "../Section1";
import WorldMap from "@/components/WorldMap";
import OverviewSection from "@/app/institutes/OverviewSection";

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

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden pb-5">
        <Section1
          name={institute.name}
          overview={institute.overview}
          defaultVerticalBannerSrc={`/images/defaultVerticalBanner/${institute.acronym}.jpg`}
          edition={
            institute.editions[0]
              ? {
                  title: institute.editions[0].title,
                  startDate: institute.editions[0].startDate ?? undefined,
                  endDate: institute.editions[0].endDate ?? undefined,
                  banner: institute.editions[0].banner ?? undefined,
                  theme: institute.editions[0].theme ?? undefined,
                }
              : undefined
          }
        />
      </div>
      <OverviewSection  institute={institute} />
      <WorldMap />
    </div>
  );
}
