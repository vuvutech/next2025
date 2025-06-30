// app/actions/functions.ts
"use server";

import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { baseUrl } from "@/lib/metadata";
import { prisma } from "@/prisma/dbConnect";
import crypto from "crypto";


export const getInstitutes = async () => {
  //  get institutes in descending order by startDate
  try {
    const url = `${baseUrl}/api/institutes`;
    const res = await fetch(url, {
      // cache: "force-cache",
      // next: { revalidate: 300 }, // 12 minutes
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
    }

    const institutes = await res.json();
    return Array.isArray(institutes) ? institutes : [];
  } catch (err) {
    console.error("Failed to fetch institutes:", err);
    return null; // Explicitly return null
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getProfilePercentage() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    const profile = await response.json();

    const profileFields = [
      "gender",
      "dateOfBirth",
      "maritalStatus",
      "religion",
      "nationality",
      "telephone",
      "mobile",
      "address",
      "addressLine2",
      "city",
      "state",
      "country",
      "zipcode",
      "emergencyContactName",
      "emergencyContactTelephone",
      "biography",
      "avatar",
      "profession",
      "highestQualification",
      "languagePreference",
      "linkedIn",
      "website",
      "studentId",
      "twitter",
      "facebook",
      "instagram",
      "linkedin",
      "youtube",
      "github",
      "tiktok",
      "personalWebsite",
      "additionalLinks",
      "tags",
      "interests",
      "skills",
    ];

    const totalFields = profileFields.length;
    let filledFields = 0;

    profileFields.forEach((field) => {
      const value = profile[field];
      if (isFieldFilled(value)) {
        filledFields++;
      }
    });

    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

function isFieldFilled(field: string | any[] | null | undefined) {
  if (field === null || field === undefined) {
    return false;
  }
  if (Array.isArray(field)) {
    return field.length > 0;
  }
  if (typeof field === "string") {
    return field !== "";
  }
  return true;
}

export async function generateStudentId(): Promise<string> {
  const result = await prisma.studentIdCounter.findFirst();
  if (!result) {
    // First ever
    await prisma.studentIdCounter.create({
      data: { nextNumber: 8 }, // we'll return 1 now
    });
    return `COSTRAD-00007`;
  }

  const current = result.nextNumber;
  await prisma.studentIdCounter.update({
    where: { id: result.id },
    data: { nextNumber: current + 1 },
  });

  return `COSTRAD-${String(current).padStart(5, "0")}`;
}

export async function getInstituteBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/institutes/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching institute:", error);
    return null;
  }
}

export async function generateUnsubscribeToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function isEmailVerified(email: string): Promise<boolean> {
  if (!email) return false;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { emailVerified: true },
  });

  return user?.emailVerified === true;
}
export async function getUserRole() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return null;
  }

  return session.user.role;
}

export async function getCurrentUser(req?: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
}

export async function getCurrentSession(req?: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ?? null;
}
