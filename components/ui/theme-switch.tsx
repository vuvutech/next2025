"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon } from "@/components/ui/icons";
import { LucideMoonStar } from "lucide-react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: {
    base?: string;
    wrapper?: string;
  };
  text?: string;
  displayText?: boolean;
  size?: number;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
  text = "Theme",
  displayText = false,
  size = 22,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange,
  });
  // Upddated this spaghetti code
  return (
    <div>
      <Component
        {...getBaseProps({
          className: clsx(
            "px-px transition-opacity hover:opacity-80 cursor-pointer",
            className,
            classNames?.base
          ),
        })}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: clsx(
              [
                "w-auto h-auto",
                "bg-transparent",
                "rounded-lg",
                "flex items-center justify-center",
                "group-data-[selected=true]:bg-transparent",
                "!text-default-500",
                "pt-px",
                "px-0",
                "mx-0",
              ],
              classNames?.wrapper
            ),
          })}
        >
          {!isSelected || isSSR ? (
            <SunFilledIcon className="text-yellow-500" size={size} />
          ) : (
            <LucideMoonStar className="text-neutral-950 shadow-sm" size={size} />
          )}
          {displayText && <span className="ml-2 ">{text}</span>}
        </div>
      </Component>
    </div>
  );
};
