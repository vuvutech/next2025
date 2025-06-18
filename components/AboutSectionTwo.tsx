import React from "react";
import { Button } from "./ui/button";

type Props = {};

const AboutSectionTwo = (props: Props) => {
  return (
    <div className="py-8">
      <section className="max-w-8xl  mx-auto min-h-[80dvh] h-auto">
        <div
          className="relative overflow-hidden rounded-2xl bg-cover h-[80dvh] "
          style={{
            backgroundImage: "url('/images/lecture_in_progress.jpg')",
          }}
        >
          <div className="flex flex-col h-full justify-center md:p-8 mx-auto p-2 py-8 relative shadow-2xl z-10 ">
            <div className="py-10">
              <div className="text-center mx-auto ">
                <span className="inline-block text-lg font-medium text-primary uppercase ">
                  COSTrAD: Our Transformational Vision
                </span>

                {/* Title */}
                <div className="mt-5 max-w-4xl mx-auto">
                  <p className="block  text-white text-xl md:text-3xl font-['anton'] font-thin  uppercase">
                    Seeing the invisible, hearing the inaudible, touching the
                    intangible, perceiving the imperceptible and doing the
                    seemingly impossible.
                  </p>
                </div>
                {/* End Title */}

                {/* Buttons */}
                <div className="mt-8 flex items-center  gap-2 w-full  sm:justify-center ">
                  <Button
                    variant={"outline"}
                    className="text-sm h-8 w-fit cursor-pointer uppercase rounded-none bg-primary hover:bg-primary/90 px-10 text-foreground"
                  >
                    Our Institutes
                  </Button>
                 
                </div>
                {/* End Buttons */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSectionTwo;
