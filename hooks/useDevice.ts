// hooks/useDevice.ts
import { useEffect, useState } from "react";

export const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth <= 1100;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setIsMobile(isMobileWidth || isPortrait);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    isMobile,
    isDesktop: !isMobile,
  };
};
