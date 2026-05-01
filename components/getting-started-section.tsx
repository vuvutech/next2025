"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./ui/animations/framerAnimations";
import BadgeLink from "./BadgeLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const GettingStarted = ({
  heading = "Counting on Your contribution",
  description = "Each donation made to (COSTrAD) has a significant effect that extends well beyond our walls. Your contribution will make the difference as we raise effective leaders for tomorrow. Thank you for your support.",
}: Hero7Props) => {
  const steps = [
    {
      id: "tab-1",
      number: "1",
      title: "Step 1: Create Your Account",
      description: "Sign up to access COSTrAD’s leadership platform. It’s your first step toward a transformative learning journey. Use a valid email to register and unlock courses, resources, and your spot in the community.",
      mobileImage: "/images/reviews.jpg",
      desktopImage: "/images/steps2.jpg"
    },
    {
      id: "tab-2",
      number: "2",
      title: "Step 2: Complete Your Profile",
      description: "Fill out your profile with current and accurate information. This helps us match you with the right institute and improves your approval chances.",
      mobileImage: "/images/reviews.jpg",
      desktopImage: "/images/steps2.jpg"
    },
    {
      id: "tab-3",
      number: "3",
      title: "Step 3: Choose an Institute",
      description: "Browse our specialized institutes in leadership, governance, and transformation. Pick one that fits your goals — spots fill up fast, so choose early.",
      mobileImage: "/images/reviews.jpg",
      desktopImage: "/images/steps2.jpg"
    },
    {
      id: "tab-4",
      number: "4",
      title: "Step 4: Get Approved",
      description: "Your application will be reviewed after submission. If approved, you’ll receive onboarding details and can begin your COSTrAD journey.",
      mobileImage: "/images/reviews.jpg",
      desktopImage: "/images/steps2.jpg"
    }
  ];

  return (
    <section className="py-32">
      <div className="lg:container space-y-3">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-3xl space-y-3 pb-12"
        >
          <motion.div variants={staggerItem}>
            <BadgeLink
              href="#"
              badge={"Speed"}
              label={"Start Your Journey with COSTrAD"}
            />
          </motion.div>
          <motion.h1 variants={staggerItem} className="text-3xl  lg:text-5xl">
            Get in touch with us today to learn more
          </motion.h1>
          <motion.p variants={staggerItem} className="">
            Ready to take the next step toward transformational leadership?
            Getting started with COSTrAD is simple, intentional, and designed to
            ensure the best experience for every student. To begin your journey,
            create your account, complete your profile, choose from one of our
            specialized institutes, and await approval.
          </motion.p>
        </motion.div>
        
        <Tabs defaultValue="tab-1" className="w-full">
          <TabsList className="relative grid items-start gap-6 lg:grid-cols-4 bg-transparent h-auto p-0 w-full overflow-visible">
            <div className="absolute top-[30px] right-0 left-4 -z-10 hidden h-px bg-input lg:block" />
            {steps.map((step) => (
              <TabsTrigger
                key={step.id}
                value={step.id}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-none p-0 flex flex-col items-start h-auto"
              >
                <div className="flex gap-4 rounded-md px-8 py-4 text-left hover:bg-muted lg:block lg:px-4 w-full group">
                  <div className="flex flex-col items-center lg:contents">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs font-medium group-data-[state=active]:bg-primary group-data-[state=active]:text-background group-data-[state=active]:ring group-data-[state=active]:ring-muted-foreground/40">
                      {step.number}
                    </span>
                    <span className="h-full w-px bg-input lg:hidden" />
                  </div>
                  <div className="text-foreground">
                    <h3 className="mb-1 font-medium lg:mt-4 text-base">
                      {step.title}
                    </h3>
                    <p className="text-sm font-normal text-muted-foreground line-clamp-3">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 block border bg-muted/50 px-4 py-6 lg:hidden w-full group-data-[state=active]:block hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={step.mobileImage}
                      alt={step.title}
                      fill
                      className="h-full w-full rounded-md border object-cover shadow"
                    />
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mt-10 hidden rounded-3xl p-10 lg:block bg-muted/30">
            {steps.map((step) => (
              <TabsContent key={step.id} value={step.id} className="m-0 focus-visible:outline-none">
                <div className="aspect-video relative">
                  <Image
                    priority={step.id === "tab-1"}
                    src={step.desktopImage}
                    alt={step.title}
                    fill
                    className="h-full w-full rounded-3xl border object-cover shadow"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default GettingStarted;
