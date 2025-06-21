"use client";

import { useDevice } from "@/hooks/useDevice";

interface JumbotronProps {
  heroImage?: string;
  height?: string;
  shade?: string;
  className?: string;
}

export default function Jumbotron({
  heroImage = "/images/center8.jpg",
  height = "md:h-[400px]",
  shade = "5",
  className,
}: JumbotronProps) {
  const { isMobile } = useDevice();

  return (
    <header className="relative w-full">
      <div className="md:min-w-[1440px] mx-auto">
        {/* Hero Section */}
        <div className={`relative w-full h-[400px] ${height} overflow-hidden`}>
          <div
            className={`${!isMobile ? "kenburns" : ""} ${className} absolute inset-0`}
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          />
          <div className={`absolute inset-0 bg-black/${shade}`} />
        </div>
      </div>
    </header>
  );
}
