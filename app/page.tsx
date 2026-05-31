"use client";

import dynamic from "next/dynamic";
import { FadeIn } from "@/components/animations/FadeIn";
import HeroSection from "@/components/sections/HeroSection";
import { InstitutesIntro } from "@/components/sections/InstitutesIntro";

const Jumbotron = dynamic(() => import("@/components/sections/Jumbotron"));
const VelocityScroll = dynamic(() =>
  import("@/components/magicui/scroll-based-velocity").then(
    (mod) => mod.VelocityScroll,
  ),
);
const WhyCostrad = dynamic(() => import("@/components/sections/WhyCostrad"));
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((mod) => mod.Testimonials),
);

export default function Home() {
  return (
    <main className=" space-y-2 ">
      {/* <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence> */}
      <HeroSection backgroundImageUrl="/images/united-nations.webp" />
      <InstitutesIntro />
      <FadeIn
        as="section"
        className="container mx-auto  px-2 md:p-16  text-[16px]  md:text-[37px] 
				md:min-h-[70dvh] font-oswald pb-24"
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
      </FadeIn>

      <FadeIn className="pb-5 md:pb-10">
        <Jumbotron
          className="object-center"
          heroImage="/images/center2.webp"
          height="md:h-[600px]"
        />
      </FadeIn>
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
      <Testimonials className="hidden" />
      {/* <Newsletter /> */}
    </main>
  );
}
