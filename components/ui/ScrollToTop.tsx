"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center cursor-pointer",
            "rounded-full border border-primary/20 bg-background/90 backdrop-blur-sm",
            "shadow-lg shadow-primary/20 ring-2 ring-primary/30",
            "hover:bg-primary hover:text-primary-foreground hover:scale-110",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "transition-all duration-300 ease-out"
          )}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M17 11l-5-5-5 5" />
            <path d="M17 18l-5-5-5 5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}