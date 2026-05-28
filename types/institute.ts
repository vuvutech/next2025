import type { Edition, Institute } from "@prisma/client";

export type InstituteWithEditions = Institute & {
	editions: Edition[];
};
