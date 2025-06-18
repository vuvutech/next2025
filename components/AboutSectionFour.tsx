import React from "react";

type Props = {};

const AboutSectionFour = (props: Props) => {
  return (
    <div className="py-8">
      <section className="max-w-8xl p-4 md:px-8   mx-auto h-auto ">
        <div
          className="relative overflow-hidden rounded-2xl bg-cover z-10"
          style={{
            backgroundImage: "url('images/lecture_in_progress2.jpg')",
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-gray-950 opacity-25 dark:opacity-40 z-20" />

          <div className="h-auto md:p-8   mx-auto p-4 relative shadow-2xl z-30">
            <div className=" py-32 space-y-6">
              <div className="text-center mx-auto">
                {/* Title */}
                <div className="mb-5 max-w-4xl mx-auto">
                  <p className="block  text-white text-xl max-w-3xl mx-auto md:text-3xl font-['anton'] font-thin  uppercase">
                    Empowering visionary leaders to drive transformative change
                    across all societal domains.
                  </p>
                </div>
                {/* End Title */}
              </div>
              <div className="max-w-7xl grid grid-cols-2 md:grid-cols-9 gap-6 md:gap-6 mx-auto my-8">
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/family-development-institute"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/fdi.png"
                      alt="Family Development Institute"
                    />
                  </a>
                  <div className="uppercase">fdi</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/mindset-transformation-institute"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/mti.png"
                      alt="Mindset Transformation Institute"
                    />
                  </a>
                  <div className="uppercase">mti</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/institute-of-governance-and-public-policy"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/igpp.png"
                      alt="Institute of Governance & Public Policy"
                    />
                  </a>
                  <div className="uppercase">igpp</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/institute-of-economic-affairs"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/iea.png"
                      alt="Institute of Economic Affairs"
                    />
                  </a>
                  <div className="uppercase">iea</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/college-of-sustainable-transformation-and-development"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/costrad.png"
                      alt="College of Sustainable Transformation & Development"
                    />
                  </a>
                  <div className="uppercase">costrad</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/education-training-and-development-institute"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/etadi.png"
                      alt="Education, Training & Development Institute"
                    />
                  </a>
                  <div className="uppercase">etadi</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/futuristic-institute-of-revolutionary-science-and-technology"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/first.png"
                      alt="Futuristic Institute of Revolutionary Science & Technology"
                    />
                  </a>
                  <div className="uppercase">first</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/media-of-communication-institute"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/moci.png"
                      alt="Media of Communication Institute"
                    />
                  </a>
                  <div className="uppercase">moci</div>
                </div>
                <div className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg">
                  <a
                    className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    href="/institutes/institute-of-arts-sports-and-cultural-development"
                  >
                    <img
                      className="w-12 md:w-20"
                      src="/images/logos/ioasc.png"
                      alt="Institute of Arts, Sports and Cultural Development"
                    />
                  </a>
                  <div className="uppercase">ioasc</div>
                </div>
              </div>
              <div className="mx-auto text-center max-w-2xl pt-5">
                <div className="mt-3 inline-flex  group items-center text-foreground hover:shadow-sm relative overflow-hidden rounded-full p-[2px]">
                  <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#338EF7_0%,#F54180_50%,#338EF7_100%)]" />
                  <div className="inline-flex px-5 h-full w-full cursor-pointer items-center justify-center rounded-full bg-background transition-background p-2.5 text-xs font-medium hover:font-semibold text-foreground backdrop-blur-3xl">
                    <span className="text-xl">Explore Our Institutes</span>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSectionFour;
