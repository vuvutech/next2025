/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import BadgeLink from "./BadgeLink";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const GettingStarted = ({
  heading = "Counting on Your contribution",
  description = "Each donation made to (COSTrAD) has a significant effect that extends well beyond our walls. Your contribution will make the difference as we raise effective leaders for tomorrow. Thank you for your support.",
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}: Hero7Props) => {
  return (
    <section className="py-32">
      <div className="lg:container space-y-3">
        <div className="max-w-3xl space-y-3 pb-12">
          <div>
            <BadgeLink
              href="#"
              badge={"Speed"}
              label={"Start Your Journey with COSTrAD"}
            />
          </div>
          <h1 className="text-3xl  lg:text-5xl">
            Get in touch with us today to learn more
          </h1>
          <p className="">
            Ready to take the next step toward transformational leadership?
            Getting started with COSTrAD is simple, intentional, and designed to
            ensure the best experience for every student. To begin your journey,
            create your account, complete your profile, choose from one of our
            specialized institutes, and await approval.
          </p>
        </div>
        <div>
          <div dir="ltr" data-orientation="horizontal">
            <div
              role="tablist"
              aria-orientation="horizontal"
              className="relative grid items-start gap-6 lg:grid-cols-4"
              tabIndex={0}
              data-orientation="horizontal"
              style={{ outline: "none" }}
            >
              <div className="absolute top-[30px] right-0 left-4 -z-10 hidden h-px bg-input lg:block" />
              <button
                type="button"
                role="tab"
                aria-selected="true"
                aria-controls="radix-\xABRa9trdb\xBB-content-tab-1"
                data-state="active"
                id="radix-\xABRa9trdb\xBB-trigger-tab-1"
                className="group pointer-events-none lg:pointer-events-auto"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="flex gap-4 rounded-md px-8 py-4 text-left hover:bg-muted lg:block lg:px-4">
                  <div className="flex flex-col items-center lg:contents">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs font-medium lg:group-data-[state=active]:bg-primary lg:group-data-[state=active]:text-background lg:group-data-[state=active]:ring lg:group-data-[state=active]:ring-muted-foreground/40">
                      1
                    </span>
                    <span className="h-full w-px bg-input lg:hidden" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium lg:mt-4">
                      Step 1: Create Your Account
                    </h3>
                    <p className="text-sm">
                      Sign up to access COSTrAD’s leadership platform. It’s your
                      first step toward a transformative learning journey. Use a
                      valid email to register and unlock courses, resources, and
                      your spot in the community.
                    </p>
                  </div>
                </div>
                <div className="mt-6 block border bg-muted/50 px-4 py-6 lg:hidden">
                  <div className="aspect-video">
                    <img
                      src="/images/reviews.jpg"
                      alt="placeholder"
                      className="h-full w-full rounded-md border object-cover shadow"
                    />
                  </div>
                </div>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="radix-\xABRa9trdb\xBB-content-tab-2"
                data-state="inactive"
                id="radix-\xABRa9trdb\xBB-trigger-tab-2"
                className="group pointer-events-none lg:pointer-events-auto"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="flex gap-4 rounded-md px-8 py-4 text-left hover:bg-muted lg:block lg:px-4">
                  <div className="flex flex-col items-center lg:contents">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs font-medium group-data-[state=active]:bg-primary group-data-[state=active]:text-background group-data-[state=active]:ring group-data-[state=active]:ring-muted-foreground/40">
                      2
                    </span>
                    <span className="h-full w-px bg-input lg:hidden" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium lg:mt-4">
                      Step 2: Complete Your Profile
                    </h3>
                    <p className="text-sm">
                      Fill out your profile with current and accurate
                      information. This helps us match you with the right
                      institute and improves your approval chances.
                    </p>
                  </div>
                </div>
                <div className="mt-6 block border bg-muted/50 px-4 py-6 lg:hidden">
                  <div className="aspect-video">
                    <img
                      src="/images/united-nations2.webp"
                      alt="placeholder"
                      className="h-full w-full rounded-md border object-cover shadow"
                    />
                  </div>
                </div>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="radix-\xABRa9trdb\xBB-content-tab-3"
                data-state="inactive"
                id="radix-\xABRa9trdb\xBB-trigger-tab-3"
                className="group pointer-events-none lg:pointer-events-auto"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="flex gap-4 rounded-md px-8 py-4 text-left hover:bg-muted lg:block lg:px-4">
                  <div className="flex flex-col items-center lg:contents">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs font-medium group-data-[state=active]:bg-primary group-data-[state=active]:text-background group-data-[state=active]:ring group-data-[state=active]:ring-muted-foreground/40">
                      3
                    </span>
                    <span className="h-full w-px bg-input lg:hidden" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium lg:mt-4">
                      Step 3: Choose an Institute
                    </h3>
                    <p className="text-sm">
                      Browse our specialized institutes in leadership,
                      governance, and transformation. Pick one that fits your
                      goals — spots fill up fast, so choose early.
                    </p>
                  </div>
                </div>
                <div className="mt-6 block border bg-muted/50 px-4 py-6 lg:hidden">
                  <div className="aspect-video">
                    <img
                      src="/images/united-nations2.webp"
                      alt="placeholder"
                      className="h-full w-full rounded-md border object-cover shadow"
                    />
                  </div>
                </div>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="radix-\xABRa9trdb\xBB-content-tab-4"
                data-state="inactive"
                id="radix-\xABRa9trdb\xBB-trigger-tab-4"
                className="group pointer-events-none lg:pointer-events-auto"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="flex gap-4 rounded-md px-8 py-4 text-left hover:bg-muted lg:block lg:px-4">
                  <div className="flex flex-col items-center lg:contents">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs font-medium group-data-[state=active]:bg-primary group-data-[state=active]:text-background group-data-[state=active]:ring group-data-[state=active]:ring-muted-foreground/40">
                      4
                    </span>
                    <span className="h-full w-px bg-input lg:hidden" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium lg:mt-4">
                      Step 4: Get Approved
                    </h3>
                    <p className="text-sm">
                      Your application will be reviewed after submission. If
                      approved, you’ll receive onboarding details and can begin
                      your COSTrAD journey.
                    </p>
                  </div>
                </div>
                <div className="mt-6 block border bg-muted/50 px-4 py-6 lg:hidden">
                  <div className="aspect-video">
                    <img
                      src="/images/block/placeholder-dark-1.svg"
                      alt="placeholder"
                      className="h-full w-full rounded-md border object-cover shadow"
                    />
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-10 hidden rounded-3xl  p-10 lg:block">
              <div
                data-state="active"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-\xABRa9trdb\xBB-trigger-tab-1"
                id="radix-\xABRa9trdb\xBB-content-tab-1"
                tabIndex={0}
                className="aspect-video"
                style={{ animationDuration: "0s" }}
              >
                <Image
                  priority
                  src="/images/steps2.jpg"
                  alt="placeholder"
                  className="h-full w-full rounded-3xl border object-cover shadow"
                  width={1920}
                  height={1920}
                />
              </div>
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-\xABRa9trdb\xBB-trigger-tab-2"
                hidden
                id="radix-\xABRa9trdb\xBB-content-tab-2"
                tabIndex={0}
                className="aspect-video"
              />
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-\xABRa9trdb\xBB-trigger-tab-3"
                hidden
                id="radix-\xABRa9trdb\xBB-content-tab-3"
                tabIndex={0}
                className="aspect-video"
              />
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-\xABRa9trdb\xBB-trigger-tab-4"
                hidden
                id="radix-\xABRa9trdb\xBB-content-tab-4"
                tabIndex={0}
                className="aspect-video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
