"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
	{
		key: "light",
		icon: Sun,
		label: "Light mode",
	},
	{
		key: "system",
		icon: Monitor,
		label: "System theme",
	},
	{
		key: "dark",
		icon: Moon,
		label: "Dark mode",
	},
];

export type ThemeSwitcherProps = {
	value?: "light" | "dark" | "system";
	onChange?: (theme: "light" | "dark" | "system") => void;
	defaultValue?: "light" | "dark" | "system";
	className?: string;
};

export const ThemeSwitcher = ({
	value,
	onChange,
	defaultValue = "system",
	className,
}: ThemeSwitcherProps) => {
	const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

	const [theme, setTheme] = useControllableState({
		defaultProp: defaultValue,
		prop:
			value !== undefined ? value : (nextTheme as "light" | "dark" | "system"),
		onChange:
			onChange !== undefined
				? onChange
				: (setNextTheme as (theme: "light" | "dark" | "system") => void),
	});
	const [mounted, setMounted] = useState(false);

	const handleThemeClick = useCallback(
		(themeKey: "light" | "dark" | "system") => {
			setTheme(themeKey);
		},
		[setTheme],
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const activeIndex = themes.findIndex((t) => t.key === theme);

	return (
		<div
			className={cn(
				"relative h-6 w-auto bg-neutral-50 dark:bg-neutral-900 px-0.5 py-1 rounded-full border border-neutral-200/50 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 hidden xl:flex items-center",
				className,
			)}
		>
			<div
				className="absolute h-[20px] w-6 top-[1px] bg-white dark:bg-neutral-700 rounded-full transition-all duration-200 ease-in-out shadow-md"
				style={{ transform: `translateX(${activeIndex * 24}px)` }}
			/>
			{themes.map(({ key, icon: Icon, label }) => {
				const isActive = theme === key;

				return (
					<button
						aria-label={label}
						className={cn(
							"relative z-10 flex items-center justify-center h-4 w-6 rounded-full transition-colors",
							isActive
								? "text-neutral-900 dark:text-white"
								: "text-neutral-500 hover:text-neutral-900 dark:hover:text-white",
						)}
						key={key}
						onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
						type="button"
					>
						<Icon className="size-3" />
					</button>
				);
			})}
		</div>
	);
};
