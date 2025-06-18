import Link from "next/link";
import React from "react";

type Props = {};

const AboutSectionOne = (props: Props) => {
  return (
    <div  className="py-8 pb-4">
      <section>
        <div className="container">
          <div className="text-left space-y-4">
            <Link
              href="#"
              className="mx-auto mb-3 sm:inline-flex flex justify-between  uppercase items-center gap-3 rounded-full 
              border px-2 py-1 text-xs sm:text-sm w-full sm:w-auto"
            >
              <span
                data-slot="badge"
                className="inline-flex  items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-white [a&]:hover:bg-primary/90 rounded-full"
              >
                Costrad
              </span>
              <span className=" font-oswald text-[11px] sm:text-xs ">Transformational and Enduring progress</span>
              <span className="flex size-7 items-center justify-center rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
            <h1 className="text-3xl sm:text-5xl md:text-4xl  ">
              A Leadership Development <br /> Initiative
            </h1>
            <p className="lg:text-xl m max-w-3xl text-foreground">
              The College of Sustainable Transformation and Development
              (COSTrAD) is an initiative of the Logos-Rhema Foundation for
              Leadership Resource Development, a Non-Governmental Foundation
              registered in Ghana.
            </p>
         
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutSectionOne;
