"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDialog } from "@/providers/DialogProvider";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/components/animations/framerAnimations";

const CTA = () => {
    const { open } = useDialog();
  
  const [emailInput, setEmailInput] = useState("");
  const [name, setName] = useState<string | undefined>();

  const handleClick = () => {
    setName(emailInput);
  };

  return (
    <section className="p-2 md:p-6">
      <div className="container">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-3 md:h-[70dvh] w-full flex-col gap-16 overflow-hidden rounded-xl bg-accent
          dark:bg-black  p-4 sm:p-8 md:rounded-3xl lg:flex-row lg:items-center lg:p-16"
        >
          <div className="col-span-full md:col-span-2 relative">
            <motion.h1 
              variants={staggerItem}
              className="text-xl sm:text-2xl md:mb-4 md:text-3xl lg:mb-6"
            >
              STAY AHEAD OF THE CURVE
            </motion.h1>
            <motion.div variants={staggerItem}>
              <Separator className="my-2 max-w-1/5 bg-primary" />
            </motion.div>
            <motion.p 
              variants={staggerItem}
              className="text-foreground lg:text-lg"
            >
              Stay in the loop and never miss out on what's happening! Be the
              first to hear about our latest and most exciting events, special
              announcements, important updates, and exclusive notifications—all
              sent directly to you.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerItem}
            className="col-span-full md:col-span-1"
          >
            <div className="flex flex-col justify-center gap-2">
              <motion.div variants={staggerItem}>
                <Label htmlFor="email">Email Address</Label>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Input
                  type="email"
                  id="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Email"
                  className="bg-card rounded-none"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <Button
                  onClick={()=>{
                    handleClick();
                    open('newsletter');
                  }}
                  className="bg-primary text-white hover:text-secondary 
                  shadow border border-accent-background cursor-pointer w-full"
                >
                  Subscribe To Newsletter
                </Button>
              </motion.div>
            </div>
            <motion.p 
              variants={staggerItem}
              className="mt-2 text-left text-xs text-muted-foreground"
            >
              View our{" "}
              <a href="#" className="underline hover:text-foreground">
                privacy policy
              </a>
              .
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
