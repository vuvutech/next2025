"use client";

import Image from "next/image";
import { useDevice } from "@/hooks/useDevice";

interface JumbotronProps {
  heroImage?: string;
  height?: string;
  shade?: string;
  className?: string;
}

export default function Jumbotron({
  heroImage = "/images/contact.jpg",
  height = "md:h-[450px]",
  shade = "5",
  className,
}: JumbotronProps) {
  const { isMobile } = useDevice();

  return (
    <header className="relative w-full">
      <div className="md:min-w-[1440px] mx-auto">
        {/* Hero Section */}
        <div className={`relative w-full h-[400px] ${height} overflow-hidden`}>
          <Image
            src={heroImage}
            alt="Hero background"
            fill
            priority
            className={`${!isMobile ? "kenburns" : ""} ${className} object-cover`}
          />
          <div className={`absolute inset-0 bg-black/${shade}`} />
        </div>
      </div>
    </header>
  );
}
