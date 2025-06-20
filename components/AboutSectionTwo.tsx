import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutSectionTwo = ({
  backgroundImage = "/images/lecture_in_progress.webp",
  title = "Investing in the leadership that transforms nations",
  subtitle = "Seeing the invisible, hearing the inaudible, touching the intangible, perceiving the imperceptible and doing the seemingly impossible.",
  primaryButtonText = "Get started",
  primaryButtonHref = "#",
  secondaryButtonText = "Our Institutes",
  secondaryButtonHref = "institutes",
}) => {
  return (
    <section className="relative ">
      <Image
        src={backgroundImage}
        alt="Background image"
        fill
        className="object-cover rounded-3xl"
        priority
      />
      <div className="absolute inset-0 bg-gray-500 opacity-5 rounded-3xl"></div>
      <div className="relative z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mb-8 text-lg font-normal shadow text-secondary lg:text-xl sm:px-16 lg:px-48">
          {subtitle}
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          
          <Link
            href={primaryButtonHref}
            className="inline-flex justify-center items-center py-1 px-5 text-base font-medium text-center text-white rounded-full
             bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/50"
          >
            {primaryButtonText}
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <Link
            href={secondaryButtonHref}
            className="inline-flex justify-center hover:text-gray-900 items-center py-1 px-5 sm:ms-4 text-base font-medium text-center text-white  border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 rounded-full"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
