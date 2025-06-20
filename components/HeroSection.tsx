"use client";

import React from "react";
import clsx from "clsx";
import { bebas } from "@/config/fonts";
import { useDevice } from "@/hooks/useDevice";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

interface HeroSectionProps {
  backgroundImageUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImageUrl = '/images/united-nations.jpg' }) => {
  const { isMobile } = useDevice();

  return (
    <section className={`${bebas.className} md:min-h-dvh h-screen grid grid-cols-1 z-0`}>
      <div className="bg-background min-h-dvh relative p-4 md:p-6 order-1">
        <Image
          src={backgroundImageUrl}
          alt="Hero background image"
          fill
          className={clsx("z-0", {
            kenburns: !isMobile,
          })}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "contrast(104%) brightness(105%) saturate(2)",
          }}
          priority
          sizes="100vw"
        />
        <div className="relative h-full flex flex-col justify-center sm:justify-end items-start z-10">
          <div
            data-scroll
            data-scroll-speed={0.1}
            className="space-y-4 bg-black p-4 sm:p-8"
          >
            <div className="text-3xl text-current">
              <h2 className="leading-[0.9em] font-bebas  ">
                Doing The
                <br />
                Seemingly Impossible
              </h2>
            </div>
            <Separator className="my-4 w-1/5 h-1 bg-accent " />
            <div className="text-firefly">
              <p className=" text-xs sm:text-lg text-background dark:text-foreground">
              Explore what COSTrAD can help you achieve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;