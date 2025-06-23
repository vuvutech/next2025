"use client";

import HeroSection from "@/components/HeroSection";
import { InstitutesIntro } from "@/components/InstitutesIntro";
import { Testimonials } from "@/components/Testimonials";
import Preloader from "@/components/ui/animations/Preloader";
import CTA from "@/components/ui/CTA";
import Jumbotron from "@/components/ui/Jumbotron";
import WhyCostrad from "@/components/WhyCostrad";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     const locomotiveScroll = new LocomotiveScroll();

  //     setTimeout(() => {
  //       setIsLoading(false);
  //       document.body.style.cursor = "default";
  //       window.scrollTo(0, 0);
  //     }, 2000);
  //   })();
  // }, []);

  return (
    <main className=" space-y-2 ">
      {/* <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence> */}
      <HeroSection backgroundImageUrl="/images/united-nations.jpg" />
      <InstitutesIntro />
      <section
        className="px-2 md:p-8 max-w-8xl text-[24px] mx-auto md:text-[37px] 
  md:min-h-[60dvh] font-oswald flex flex-col justify-center pb-24"
      >
        <div>
          {" "}
          We equip you with the essential tools and{" "}
          <span className="text-firefly">mindset</span> to confidently guide
          individuals, lead organizations, and oversee complex systems with
          clarity and purpose.{" "}
          <span className="text-primary inline whitespace-nowrap">
            Effective leaders
          </span>{" "}
          demonstrate exceptional communication abilities, sound judgment, and
          sharp analytical thinking. They also have the capacity to uplift,
          energize, and mobilize those around them toward a shared{" "}
          <span className="text-destructive">vision</span>.
        </div>
      </section>

      <Jumbotron
        className="object-center"
        heroImage="/images/center2.jpg"
        height="md:h-[600px]"
      />
      <div className="flex flex-col justify-center">
        <VelocityScroll
          className="uppercase md:text-3xl text-xs w-full mx-auto font-poppins font-thin "
          defaultVelocity={1}
        >
          Seeing the <span className="text-purple-700">Invisible</span> &mdash;
          Touching the <span className="text-primary">intangible</span> &mdash;
          Hearing the <span className="text-chart-3">Inaudible</span> &mdash;
        </VelocityScroll>
      </div>

      <WhyCostrad />
      <CTA />
      <Testimonials className="hidden" />
      {/* <Newsletter /> */}
    </main>
  );
}
