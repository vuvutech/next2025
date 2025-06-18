"use client";

import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DottedDiv } from "@/components/DottedDiv";

type Section1Props = {
  name: string;
  overview?: string | null;
  defaultVerticalBannerSrc?: string;
  edition?: {
    title?: string;
    startDate?: Date;
    endDate?: Date;
    banner?: string;
    theme?: string;
    // Add more fields as needed
  };
};

export const Section1 = ({
  name,
  overview,
  edition,
  defaultVerticalBannerSrc,
}: Section1Props) => {
  const formattedStartDate = edition?.startDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(edition.startDate))
    : "Coming Soon";
  const formattedEndDate = edition?.endDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(edition.endDate))
    : "";

  const verticalBannerSrc = defaultVerticalBannerSrc ?? "/images/banner.jpg";
  const editionTitle = edition?.title || "Upcoming Edition";

  return (
    <section className="bg-background py-16 h-auto">
      <div className="relative container flex flex-col items-center px-0! lg:pt-8">
        <DottedDiv>
          <div className="grid lg:grid-cols-3">
            {/* Left Content */}
            <div className="flex md:col-span-2 w-full flex-col gap-4 px-8 py-20 md:px-10">
              <Badge
                variant="outline"
                className="flex w-fit cursor-pointer items-center gap-4 rounded-full px-6 py-2 transition-all ease-in-out hover:gap-6"
              >
                <span className="text-sm font-medium tracking-tight text-muted-foreground">
                  Explore Institute Details
                </span>
                <ChevronRight className="size-4!" />
              </Badge>
              <h1 className="text-2xl font-semibold tracking-tighter md:text-6xl">
                {name}
              </h1>
              <p className="tracking-tight text-lg text-foreground ">
                {overview ?? "This institute currently has no overview."}
              </p>
              <div className="flex w-full gap-2">
                <Button className="text-md h-8 w-fit cursor-pointer rounded-full bg-primary px-10 text-foreground">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="text-md h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out hover:rotate-45"
                >
                  <ArrowUpRight />
                </Button>
              </div>
            </div>

            {/* Right Content */}
            <DottedDiv className="group size-full md:cols-span-1 place-self-end p-4 ">
              <div className="relative h-full w-full bg-muted-2/50 p-4 transition-all ease-in-out group-hover:bg-muted-2">
                <Image
                  src={verticalBannerSrc}
                  alt="Edition Banner"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover object-top rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-3xl"></div>
                <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
                  <div className="flex w-full items-center font-oswald text-xs md:text-lg tracking-tighter text-white">
                    <span className="font-bold uppercase text-xs md:text-lg text-primary">
                      Date:&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="text-[11px] sm:text-lg font-bold uppercase">
                      {formattedStartDate.toUpperCase()}
                      {edition?.endDate && (
                        <>
                          &nbsp;<span className="text-primary">&mdash;</span>
                          &nbsp;
                          {formattedEndDate.toUpperCase()}
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center uppercase text-xl sm:text-4xl font-semibold tracking-tight text-white">
                      {editionTitle}
                    </h2>
                    <div className="mt-3 h-1 w-6 rounded-full bg-primary" />
                    <p className="mt-4 max-w-sm px-2 text-center text-xs md:text-xl leading-5 font-bold tracking-tighter text-purple-200">
                      {edition?.theme
                        ? edition?.theme
                        : "Education for a New Epoch of Influence and Leadership."}
                    </p>
                  </div>
                  <Link
                    href={"#about-section"}
                    className="group mb-6 flex cursor-pointer flex-col items-center justify-center text-primary"
                  >
                    <p className="text-sm tracking-tight text-primary">
                      See More
                    </p>
                    <ChevronDown
                      size={30}
                      className="transition-all ease-in-out group-hover:-translate-y-2"
                    />
                  </Link>
                </div>
              </div>
            </DottedDiv>
          </div>
        </DottedDiv>
      </div>
    </section>
  );
};
