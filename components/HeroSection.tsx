"use client";

import React from "react";
import clsx from "clsx";
import { bebas } from "@/config/fonts";
import { useDevice } from "@/hooks/useDevice";
import { Separator } from "@radix-ui/react-separator";

interface HeroSectionProps {
  backgroundImageUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImageUrl ='/images/united-nations.jpg' }) => {
  const { isMobile } = useDevice();

  return (
    <section className={`${bebas.className} md:min-h-dvh h-screen grid grid-cols-1 z-0 `}>     

      <div className="bg-red-700 min-h-dvh relative p-4 md:p-6 order-1">
        <div
          className={clsx("absolute inset-0 z-0", {
            kenburns: !isMobile,
          })}
          style={{
            backgroundImage: `url("${backgroundImageUrl}")`,
            filter: "contrast(118%) brightness(124%) saturate(2)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        ></div>

        <div className="relative h-full flex flex-col justify-end items-start z-10">
          <div
            data-scroll
            data-scroll-speed={0.1}
            className="space-y-4 bg-black p-4 sm:p-8"
          >
            <div className="text-3xl text-current">
              <h2 className="leading-[0.9em] font-bebas ">
                Doing The
                <br />
                Seemingly Impossible{" "}
              </h2>
            </div>
            <Separator className="my-4 w-1/5 h-1 bg-accent" />
            <div className="text-firefly">
              <p className="text-lg text-white ">
                &mdash; &nbsp; Explore what COSTrAD can help you achieve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
