import React from "react";
import Image from "next/image"; // Import Image component
import Link from "next/link"; // Optional: Import Link if using Next.js routing

const AboutSectionFour = () => {
  return (
    <div className="py-8">
      <section className="max-w-8xl p-4 md:px-8 mx-auto h-auto">
        <div className="relative overflow-hidden rounded-2xl z-10">
          {/* Background Image with Next.js Image */}
          <Image
            src="/images/lecture_in_progress2.webp" // Path relative to public directory
            alt="Lecture in progress"
            fill // Makes the image fill the parent container
            className="object-cover" // Mimics bg-cover
            priority // Optional: Prioritize loading for above-the-fold images
          />
          {/* Overlay */}
          <div className="absolute inset-0 w-full h-full bg-gray-950 opacity-25 dark:opacity-40 z-20" />

          <div className="h-auto md:p-8 mx-auto p-4 relative shadow-2xl z-30">
            <div className="py-32 space-y-6">
              <div className="text-center mx-auto">
                {/* Title */}
                <div className="mb-5 max-w-4xl mx-auto">
                  <p className="block text-white text-xl max-w-3xl mx-auto md:text-3xl font-['anton'] font-thin uppercase">
                    Empowering visionary leaders to drive transformative change
                    across all societal domains.
                  </p>
                </div>
                {/* End Title */}
              </div>
              <div className="max-w-7xl grid grid-cols-2 md:grid-cols-9 gap-6 md:gap-6 mx-auto my-8">
                {[
                  {
                    href: "/institutes/family-development-institute",
                    src: "/images/logos/fdi.webp",
                    alt: "Family Development Institute",
                    label: "fdi",
                  },
                  {
                    href: "/institutes/mindset-transformation-institute",
                    src: "/images/logos/mti.webp",
                    alt: "Mindset Transformation Institute",
                    label: "mti",
                  },
                  {
                    href: "/institutes/institute-of-governance-and-public-policy",
                    src: "/images/logos/igpp.webp",
                    alt: "Institute of Governance & Public Policy",
                    label: "igpp",
                  },
                  {
                    href: "/institutes/institute-of-economic-affairs",
                    src: "/images/logos/iea.webp",
                    alt: "Institute of Economic Affairs",
                    label: "iea",
                  },
                  {
                    href: "/institutes/college-of-sustainable-transformation-and-development",
                    src: "/images/logos/costrad.webp",
                    alt: "College of Sustainable Transformation & Development",
                    label: "costrad",
                  },
                  {
                    href: "/institutes/education-training-and-development-institute",
                    src: "/images/logos/etadi.webp",
                    alt: "Education, Training & Development Institute",
                    label: "etadi",
                  },
                  {
                    href: "/institutes/futuristic-institute-of-revolutionary-science-and-technology",
                    src: "/images/logos/first.webp",
                    alt: "Futuristic Institute of Revolutionary Science & Technology",
                    label: "first",
                  },
                  {
                    href: "/institutes/media-of-communication-institute",
                    src: "/images/logos/moci.webp",
                    alt: "Media of Communication Institute",
                    label: "moci",
                  },
                  {
                    href: "/institutes/institute-of-arts-sports-and-cultural-development",
                    src: "/images/logos/ioasc.webp",
                    alt: "Institute of Arts, Sports and Cultural Development",
                    label: "ioasc",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex md:flex-col justify-start items-center gap-2 text-center text-white space-y-2 font-extrabold text-xs md:text-lg"
                  >
                    {/* Using Link for client-side navigation */}
                    <Link
                      href={item.href}
                      className="flex flex-shrink-0 hover:-translate-y-1 items-center justify-center text-center transition"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={80} // Adjust based on md:w-20 (20 * 4 = 80px)
                        height={80} // Assuming square images; adjust if needed
                        className="w-12 md:w-20"
                      />
                    </Link>
                    <div className="uppercase">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mx-auto text-center max-w-2xl pt-5">
                <div className="mt-3 inline-flex group items-center text-foreground hover:shadow-sm relative overflow-hidden rounded-full p-[2px]">
                  <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#338EF7_0%,#F54180_50%,#338EF7_100%)]" />
                  <div className="inline-flex px-5 h-full w-full cursor-pointer items-center justify-center rounded-full bg-background transition-background p-2.5 text-xs font-medium hover:font-semibold text-foreground backdrop-blur-3xl">
                    <span className="text-xl">Explore Our Institutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSectionFour;
