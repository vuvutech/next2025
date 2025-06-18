import React, { useState } from "react";
import {
  Button,
  useDisclosure,
} from "@heroui/react";

import { Input } from "@/components/ui/input";

import { Label } from "@radix-ui/react-label";

type Props = {};

const CTA = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <section className="p-4 sm:p-16">
      <div className="container">
        <div className="grid grid-cols-3 md:h-[50dvh]  w-full flex-col gap-16 overflow-hidden rounded-xl bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="col-span-full md:col-span-2 ">
            <h1 className="mb-3 text-3xl sm:text-5xl  md:mb-4 md:text-4xl lg:mb-6">
              Stay Ahead of the Curve
            </h1>
            <p className="text-foreground lg:text-lg">
              Stay in the loop and never miss out on what's happening! Be the
              first to hear about our latest and most exciting events, special
              announcements, important updates, and exclusive notifications—all
              sent directly to you. Join us and make sure you're always up to
              date with everything we have going on.
            </p>
          </div>
          <div className="col-span-full md:col-span-1 ">
            <div className="flex flex-col justify-center  gap-2 ">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="bg-card rounded-none"
              />

              <Button className="bg-primary text-background hover:bg-primary/90 cursor-pointer  " color="primary" variant="ghost">
                Subscribe To Newsletter
              </Button>

              {/* <Button
                variant="solid"
                type="submit"
                className="w-full cursor-pointer text-current bg-primary "
              >
               Subscribe to Newsletter
              </Button> */}
            </div>
            <p className="mt-2 text-left text-xs text-muted-foreground">
              View our{/* */}{" "}
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
