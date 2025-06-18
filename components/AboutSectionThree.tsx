import React from "react";
import Image from "next/image";

type Props = {};

const AboutSectionThree = (props: Props) => {
  return (
    <div className="py-8">
      <section className="max-w-8xl w-full py-10 md:px-8 md:py-10 mx-auto  dark:bg-firefly-900">
        {/* Grid */}
        <div className="grid md:grid-cols-3  md:gap-8 ">
          <Image
            className="rounded-2xl h-dvh md:h-[90vh] md:col-span-2"
            src="/images/quarterglobe.jpg"
            alt="Costrad on leadership"
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
            priority
          />
          {/* End Col */}
          <div className="mt-5 sm:mt-10 md:mt-0 md:order-1 md:col-span-1 md:flex flex-col justify-center ">
            <div className="space-y-6 sm:space-y-8">
              {/* Title */}
              <div className="space-y-2 md:space-y-4">
                <h5 className="text-firefly uppercase">
                  Discover Our Agenda
                </h5>
                <h2 className="uppercase text-foreground font-anton text-2xl md:text-4xl ">
                  Developing The Transformational Capacity of Nations
                </h2>
                <p className="text-lg text-firefly-700 dark:text-white prose dark:prose-invert">
                  Our agenda touches key areas in governance, building strong
                  institutions, Economy, Education and Skills development,
                  Innovation and Technology as well as social foundations and
                  belief systems. These are just some of the key factors that
                  contribute to a nation's transformational capacity, and the
                  specific mix of factors will vary depending on the context and
                  challenges faced by each individual and nation. 
                </p>
              </div>
              {/* End Title */}
        
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </section>
    </div>
  );
};

export default AboutSectionThree;
