"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import {
  staggerContainer,
  staggerItem,
} from "@/components/animations/framerAnimations";
import { Button } from "@/components/ui/button";
import { useDevice } from "@/hooks/useDevice";

interface WhyCostradProps {
  backgroundImageUrl?: string;
}

export const WhyCostrad: React.FC<WhyCostradProps> = ({
  backgroundImageUrl: _backgroundImageUrl = "/images/united-nations.webp",
}) => {
  const { isMobile: _isMobile } = useDevice();

  return (
    <section className="container mx-auto  max-w-8xl  h-auto  text-lg md:text-3xl p-2 ">
      <div className="  md:py-8 py-4 ">
        <div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid items-stretch gap-y-10 md:grid-cols-2 md:gap-x-6"
          >
            <motion.div
              variants={staggerItem}
              className="relative grid grid-cols-2 gap-2 mt-10 md:mt-0 py-12 h-auto"
            >
              <div className="overflow-hidden aspect-w-3 aspect-h-4 rounded-none md:rounded-2xl">
                <motion.div
                  initial={{ scale: 1.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full w-full"
                >
                  <Image
                    className="object-cover object-top origin-top h-full w-full"
                    src="/images/leader2.webp"
                    alt=""
                    width={400}
                    height={533}
                  />
                </motion.div>
              </div>

              <div className="relative">
                <div className="h-full overflow-hidden aspect-w-3 aspect-h-4 rounded-none md:rounded-2xl">
                  <motion.div
                    initial={{ scale: 1.3 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full w-full"
                  >
                    <Image
                      className="object-cover object-top origin-top h-full w-full"
                      src="/images/steps.webp"
                      alt=""
                      width={400}
                      height={533}
                    />
                  </motion.div>
                </div>
              </div>

              <div className="absolute -translate-x-1/2 left-[50%] hidden  ">
                <Image
                  className="w-32 h-32 rotating"
                  src="/images/round-text-costrad.webp"
                  alt=""
                  width={128}
                  height={128}
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex flex-col items-start  justify-center md:px-8 space-y-6 text-left  "
            >
              <h2 className="uppercase   ">
                The Vital Role of Leadership Training Today
              </h2>
              <p className="md:text-lg">
                At the{" "}
                <span>
                  College of Sustainable Transformation and Development COSTrAD
                </span>
                , You would find more reasons why leadership training is
                essential and how leadership impacts family, governance, economy
                and every aspect of society. We teach you the necessary skills
                and qualities to effectively lead and manage people,
                organizations, and systems. Leaders must possess strong
                communication, decision-making, and problem-solving skills, as
                well as the ability to inspire and motivate others.
              </p>

              <Link
                href={`/about`}
                className="flex flex-col sm:flex-row w-full sm:w-auto gap-2"
                prefetch={false}
              >
                <Button className="text-sm h-10 sm:h-8 w-full sm:w-auto cursor-pointer rounded-full bg-primary hover:bg-primary/90 px-6 sm:px-10 text-white min-w-[120px]">
                  Get Started
                </Button>

                <Button
                  variant="outline"
                  className="text-sm h-10 sm:h-8 w-full sm:w-10 cursor-pointer border border-foreground/30 p-0 text-foreground rounded-full transition-all ease-in-out hover:rotate-45"
                >
                  <ArrowUpRight />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyCostrad;
