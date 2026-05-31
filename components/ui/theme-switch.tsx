"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { type FC } from "react";

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
}) => {
  if (displayText) {
    return (
      <div className="flex w-full items-center justify-between px-3 py-1 text-zinc-700 dark:text-zinc-300">
        <span className="text-sm font-medium">{text}</span>
        <ThemeSwitcher className={className} />
      </div>
    );
  }

  return <ThemeSwitcher className={className} />;
};
