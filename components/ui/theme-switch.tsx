"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { SunFilledIcon } from "@/components/ui/icons";
import { LucideMoonStar } from "lucide-react";
import clsx from "clsx";

export interface ThemeSwitchProps {
  className?: string;
  text?: string;
  displayText?: boolean;
  size?: number;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  text = "Theme",
  displayText = false,
  size = 22,
}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "flex items-center justify-center rounded-lg px-2 py-1 transition-opacity hover:opacity-80",
        className
      )}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? (
        <LucideMoonStar className="text-neutral-950" size={size} />
      ) : (
        <SunFilledIcon className="text-yellow-500" size={size} />
      )}
      {displayText && <span className="ml-2">{text}</span>}
    </button>
  );
};
