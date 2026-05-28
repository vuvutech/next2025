import {
	Anton,
	Bebas_Neue,
	IBM_Plex_Sans,
	Open_Sans,
	Oswald,
	Poppins,
	Special_Elite,
} from "next/font/google";

type Props = {
	subset: string | string[];
	weight: string | string[];
	style: string | string[];
	display: string | string[];
};

export const ibmplex = IBM_Plex_Sans({
	weight: ["100", "200", "300", "700"],
	subsets: ["latin"],
	style: "normal",
	display: "swap",
	adjustFontFallback: true,
	variable: "--font-ibmplex",
});

export const anton = Anton({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-anton",
});
export const opensans = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-opensans",
});

export const specialElite = Special_Elite({
	subsets: ["latin"],
	weight: ["400"], // Special Elite typically comes in a single weight
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-special-elite",
});

export const oswald = Oswald({
	weight: ["200", "300", "400", "500", "600", "700"],
	subsets: ["latin"],
	style: ["normal"],
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-oswald",
});
export const bebas = Bebas_Neue({
	weight: ["400"],
	subsets: ["latin"],
	style: ["normal"],
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-bebas",
});

export const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "900"],
	style: ["normal"],
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-poppins",
});
