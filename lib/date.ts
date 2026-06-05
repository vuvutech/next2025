// lib/date.ts

const ACCRA_TIMEZONE = "Africa/Accra";

export function formatTime(time24: string | null | undefined): string {
	if (!time24) return "";
	const [h, m] = time24.split(":");
	const hour = Number.parseInt(h, 10);
	if (Number.isNaN(hour)) return "";
	const period = hour >= 12 ? "PM" : "AM";
	const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
	return `${hour12}:${m} ${period}`;
}

type DateFormat = "long" | "short" | "monthDay" | "monthDayYear" | "PPP";

const FORMAT_CONFIG: Record<DateFormat, Intl.DateTimeFormatOptions> = {
	long: {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: ACCRA_TIMEZONE,
	},
	short: {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: ACCRA_TIMEZONE,
	},
	monthDay: { month: "short", day: "numeric", timeZone: ACCRA_TIMEZONE },
	monthDayYear: {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: ACCRA_TIMEZONE,
	},
	PPP: {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: ACCRA_TIMEZONE,
	},
};

export function formatAccraDate(
	dateInput: string | Date | null | undefined,
	format: DateFormat = "long",
): string {
	if (!dateInput) return "TBD";
	const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
	return new Intl.DateTimeFormat("en-US", FORMAT_CONFIG[format]).format(date);
}
