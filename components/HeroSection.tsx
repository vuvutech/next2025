"use client";

import React from "react";
import clsx from "clsx";
import { bebas } from "@/config/fonts";
import { useDevice } from "@/hooks/useDevice";
import { useHasMounted } from "@/hooks/useHasMounted";

import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./ui/animations/framerAnimations";

interface HeroSectionProps {
  backgroundImageUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImageUrl = '/images/united-nations.webp' }) => {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  const shouldAnimate = hasMounted && !isMobile;

  return (
    <section className={`${bebas.className} md:min-h-dvh h-screen grid grid-cols-1 z-0`}>
      <div className="bg-background min-h-dvh relative p-4 md:p-6 order-1">
        <Image
          src={backgroundImageUrl}
          alt="Hero background image"
          fill
          className={clsx("z-0", shouldAnimate && "kenburns")}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "contrast(104%) brightness(105%) saturate(2)",
          }}
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoIAAUAAUAmJaQAA3AA/v60AAAA"
        />
        <div className="relative h-full flex flex-col justify-center sm:justify-end items-start z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            data-scroll
            data-scroll-speed={0.1}
            className="space-y-4 bg-black p-4 sm:p-8"
          >
            <motion.div variants={staggerItem} className="">
              <h2 className="leading-[0.9em] text-lg sm:text-3xl text-primary-light dark:text-primary ">
                Doing The
                <br />
                Seemingly Impossible
              </h2>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Separator className="my-4 w-1/5 h-1 bg-accent " />
            </motion.div>
            <motion.div variants={staggerItem} className="text-firefly">
              <p className=" text-xs sm:text-lg text-background dark:text-foreground">
                Explore what COSTrAD can help you achieve.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
