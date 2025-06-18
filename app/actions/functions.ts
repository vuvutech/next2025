// app/actions/functions.ts
"use server";

import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { baseUrl } from "@/lib/metadata";

export const getInstitutes = async () => {
  try {
    const url = `${baseUrl}/api/institutes`;
    console.log("Fetching institutes from:", url); // Debug log
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 720 }, // 12 minutes
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
