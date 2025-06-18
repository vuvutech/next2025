import { type Institute, type Edition } from "@prisma/client";

export type InstituteWithEditions = Institute & {
  editions: Edition[];
};
