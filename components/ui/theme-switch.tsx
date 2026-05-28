"use client";

import clsx from "clsx";
import { LucideMoonStar } from "lucide-react";
import { useTheme } from "next-themes";
import { type FC, useEffect, useState } from "react";
import { SunFilledIcon } from "@/components/ui/icons";

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
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const isLight = theme === "light";

	return (
		<button
			onClick={() => setTheme(isLight ? "dark" : "light")}
			className={clsx(
				"flex items-center justify-start rounded-lg px-2 py-1 transition-opacity hover:opacity-80 cursor-pointer",
				className,
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
