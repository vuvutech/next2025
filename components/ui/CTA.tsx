"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { Separator } from "./separator";

const CTA = () => {
  const [emailInput, setEmailInput] = useState("");
  const [name, setName] = useState<string | undefined>();

  const handleClick = () => {
    setName(emailInput);
    console.log("Subscribed Email:", emailInput); // for debug or further action
  };

  return (
    <section className="p-4 sm:p-16">
      <div className="container">
        <div className="grid grid-cols-3 md:h-[50dvh] w-full flex-col gap-16 overflow-hidden rounded-xl bg-accent p-4 sm:p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="col-span-full md:col-span-2 relative">
            <h1 className="text-xl sm:text-2xl md:mb-4 md:text-3xl lg:mb-6">
              STAY AHEAD OF THE CURVE
            </h1>
            <Separator className="my-2 max-w-1/5 bg-primary" />
            <p className="text-foreground lg:text-lg">
              Stay in the loop and never miss out on what's happening! Be the
              first to hear about our latest and most exciting events, special
              announcements, important updates, and exclusive notifications—all
              sent directly to you.
            </p>
          </div>

          <div className="col-span-full md:col-span-1">
            <div className="flex flex-col justify-center gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Email"
                className="bg-card rounded-none"
              />

              <Button
                onClick={handleClick}
                className="bg-primary text-white hover:text-secondary 
                shadow border border-accent-background cursor-pointer"
              >
                Subscribe To Newsletter
              </Button>
            </div>
            <p className="mt-2 text-left text-xs text-muted-foreground">
              View our{" "}
              <a href="#" className="underline hover:text-foreground">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
